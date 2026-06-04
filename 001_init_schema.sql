-- =============================================================================
-- 001_init_schema.sql
-- Talent4Pro Matrices - Schema inicial
-- Creado: 2026-06-04
--
-- ADR-002: Supabase PostgreSQL con RLS
-- ADR-004: JSONB para contenido flexible de celdas
-- =============================================================================


-- =============================================================================
-- TABLA: matrices
-- Metadatos de cada matriz (tipo, título, propietario, con quién se comparte)
-- =============================================================================

CREATE TABLE IF NOT EXISTS matrices (
  id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type           VARCHAR(50)   NOT NULL,
  title          VARCHAR(255)  NOT NULL,
  description    TEXT,
  created_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
  shared_with    UUID[]        NOT NULL DEFAULT '{}',

  -- Validaciones a nivel DB
  CONSTRAINT matrices_title_not_empty  CHECK (length(trim(title)) > 0),
  CONSTRAINT matrices_type_valid CHECK (
    type IN (
      '1-ficha-definicion',
      '2-mtp',
      '3-ikigai',
      '4-valores',
      '5-fortalezas',
      '6-competencias',
      '7-feedback',
      '8-plan-desarrollo'
    )
  )
);

COMMENT ON TABLE  matrices              IS 'Metadatos de cada matriz de evaluación de talento';
COMMENT ON COLUMN matrices.user_id      IS 'Propietario de la matriz (FK a auth.users)';
COMMENT ON COLUMN matrices.type         IS 'Tipo de matriz según el sistema Talent4Pro';
COMMENT ON COLUMN matrices.shared_with  IS 'Array de user_ids con acceso de lectura';


-- =============================================================================
-- TABLA: matrix_data
-- Contenido dinámico de cada celda en formato JSONB (ADR-004)
-- =============================================================================

CREATE TABLE IF NOT EXISTS matrix_data (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  matrix_id   UUID          NOT NULL REFERENCES matrices(id) ON DELETE CASCADE,
  row_key     VARCHAR(100)  NOT NULL,
  column_key  VARCHAR(100)  NOT NULL,
  -- Estructura esperada: { value, type, formula?, metadata? }
  -- Validación delegada a la aplicación (ADR-004)
  content     JSONB         NOT NULL,
  version     INT           NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT matrix_data_unique_cell UNIQUE (matrix_id, row_key, column_key),
  CONSTRAINT matrix_data_version_positive CHECK (version > 0)
);

COMMENT ON TABLE  matrix_data            IS 'Contenido JSONB de cada celda de una matriz';
COMMENT ON COLUMN matrix_data.row_key    IS 'Identificador de fila (ej: "habilidad_1", "objetivo_a")';
COMMENT ON COLUMN matrix_data.column_key IS 'Identificador de columna (ej: "nivel_actual", "meta")';
COMMENT ON COLUMN matrix_data.content    IS 'Dato de la celda: {value, type, formula?, metadata?}';
COMMENT ON COLUMN matrix_data.version    IS 'Contador de versión para auditoría de cambios';


-- =============================================================================
-- FUNCIÓN: auto-actualizar updated_at en cada UPDATE
-- =============================================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER set_matrices_updated_at
  BEFORE UPDATE ON matrices
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE OR REPLACE TRIGGER set_matrix_data_updated_at
  BEFORE UPDATE ON matrix_data
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();


-- =============================================================================
-- ÍNDICES (performance)
-- =============================================================================

-- Consultas de matrices por usuario (listado principal)
CREATE INDEX IF NOT EXISTS idx_matrices_user_id
  ON matrices (user_id);

-- Ordenación cronológica inversa
CREATE INDEX IF NOT EXISTS idx_matrices_created_at
  ON matrices (created_at DESC);

-- Consultas de celdas por matriz (carga de una matriz completa)
CREATE INDEX IF NOT EXISTS idx_matrix_data_matrix_id
  ON matrix_data (matrix_id);

-- Detectar celdas modificadas recientemente (sync / auditoría)
CREATE INDEX IF NOT EXISTS idx_matrix_data_updated_at
  ON matrix_data (updated_at DESC);

-- Búsqueda GIN sobre contenido JSONB (para queries por valor/tipo de celda)
CREATE INDEX IF NOT EXISTS idx_matrix_data_content_gin
  ON matrix_data USING GIN (content);


-- =============================================================================
-- ROW LEVEL SECURITY (RLS) - ADR-002 / ADR-005
-- CRÍTICO: sin RLS cualquier usuario autenticado puede leer todos los datos
-- =============================================================================

ALTER TABLE matrices    ENABLE ROW LEVEL SECURITY;
ALTER TABLE matrix_data ENABLE ROW LEVEL SECURITY;


-- -----------------------------------------------------------------------------
-- POLICIES: matrices
-- -----------------------------------------------------------------------------

-- SELECT: propietario O usuario en shared_with
CREATE POLICY "matrices_select"
  ON matrices
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR auth.uid() = ANY(shared_with)
  );

-- INSERT: solo el propio usuario crea sus matrices
CREATE POLICY "matrices_insert"
  ON matrices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: solo el propietario puede modificar
CREATE POLICY "matrices_update"
  ON matrices
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: solo el propietario puede eliminar
CREATE POLICY "matrices_delete"
  ON matrices
  FOR DELETE
  USING (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- POLICIES: matrix_data
-- Heredan visibilidad de la tabla matrices via subquery
-- -----------------------------------------------------------------------------

-- SELECT: el usuario puede ver celdas si puede ver la matriz padre
CREATE POLICY "matrix_data_select"
  ON matrix_data
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matrices m
      WHERE m.id = matrix_data.matrix_id
        AND (
          m.user_id = auth.uid()
          OR auth.uid() = ANY(m.shared_with)
        )
    )
  );

-- INSERT: solo el propietario de la matriz puede añadir celdas
CREATE POLICY "matrix_data_insert"
  ON matrix_data
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM matrices m
      WHERE m.id = matrix_data.matrix_id
        AND m.user_id = auth.uid()
    )
  );

-- UPDATE: solo el propietario de la matriz puede editar celdas
CREATE POLICY "matrix_data_update"
  ON matrix_data
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM matrices m
      WHERE m.id = matrix_data.matrix_id
        AND m.user_id = auth.uid()
    )
  );

-- DELETE: solo el propietario de la matriz puede eliminar celdas
CREATE POLICY "matrix_data_delete"
  ON matrix_data
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM matrices m
      WHERE m.id = matrix_data.matrix_id
        AND m.user_id = auth.uid()
    )
  );


-- =============================================================================
-- VERIFICACIÓN FINAL
-- Ejecuta estas queries para confirmar que todo se creó correctamente
-- =============================================================================

-- SELECT table_name, row_security FROM information_schema.tables
--   WHERE table_schema = 'public' AND table_name IN ('matrices', 'matrix_data');

-- SELECT schemaname, tablename, policyname, cmd, qual
--   FROM pg_policies
--   WHERE tablename IN ('matrices', 'matrix_data')
--   ORDER BY tablename, cmd;

-- SELECT indexname, indexdef FROM pg_indexes
--   WHERE tablename IN ('matrices', 'matrix_data')
--   ORDER BY tablename;
