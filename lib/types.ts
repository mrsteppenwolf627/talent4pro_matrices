// ─── Cell & Matrix Data ───────────────────────────────────────────────────────

export interface CellContent {
  value: string | number | boolean
  type: 'text' | 'number' | 'checkbox' | 'formula'
  formula?: string
  metadata?: {
    backgroundColor?: string
    fontSize?: number
  }
}

export interface MatrixData {
  id: string
  matrix_id: string
  row_key: string
  column_key: string
  content: CellContent
  version: number
  created_at: string
  updated_at: string
}

export interface MatrixMetadata {
  id: string
  user_id: string
  type: MatrixType
  title: string
  description?: string
  created_at: string
  updated_at: string
  shared_with: string[]
}

// ─── Matrix Types (matching DB constraint) ───────────────────────────────────

export type MatrixType =
  | '1-ficha-definicion'
  | '2-mtp'
  | '3-ikigai'
  | '4-valores'
  | '5-fortalezas'
  | '6-competencias'
  | '7-feedback'
  | '8-plan-desarrollo'

// ─── Column & Row Definitions ─────────────────────────────────────────────────

export interface MatrixColumn {
  key: string
  label: string
  width?: string
  readOnly?: boolean
  type?: CellContent['type']
}

export interface MatrixRowDef {
  key: string
  label: string
}

// ─── Hoja 1 - Evaluación de Desempeño ────────────────────────────────────────

export interface Competencia {
  id: string
  nombre: string
  area: AreaFuncional
  categoria: 'Core' | 'Liderazgo' | 'Técnica'
  peso: number // 0-1, suma total = 1.0
  niveles: Record<'1' | '2' | '3' | '4' | '5', string>
}

export type AreaFuncional =
  | 'Técnico'
  | 'Liderazgo'
  | 'Comunicación'
  | 'Adaptabilidad'
  | 'Trabajo en equipo'

export type NivelDesempeno = 1 | 2 | 3 | 4 | 5

export type ClasificacionFinal =
  | 'Inicial'
  | 'En Desarrollo'
  | 'Competente'
  | 'Avanzado'
  | 'Experto'

// ─── API Response types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface MatrixFullResponse {
  metadata: MatrixMetadata
  cells: MatrixData[]
}

// ─── API Request payload types ────────────────────────────────────────────────

export interface UpsertCellPayload {
  row_key: string
  column_key: string
  content: CellContent
}

export interface CreateMatrixPayload {
  type: MatrixType
  title: string
  description?: string
}

export interface ValidateMTPResponse {
  success: boolean
  isValid: boolean
  message: string
  mtpDefinition: string
  errors: string[]
  stats?: {
    average: number
    total: number
    moderateCount: number
    highCount: number
    missingAreas: number[]
  }
}
