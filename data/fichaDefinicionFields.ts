export interface FieldDefinition {
  key: string
  label: string
  placeholder?: string
}

export interface FichaSection {
  id: string
  title: string
  fields: FieldDefinition[]
}

export const FICHA_SECTIONS: FichaSection[] = [
  // ── 1. Información General (10) ──────────────────────────────────────────────
  {
    id: 'info-general',
    title: '1. Información General',
    fields: [
      { key: 'empresa_nombre',        label: 'Nombre de la Empresa',               placeholder: 'Razón social completa' },
      { key: 'empresa_sector',        label: 'Sector / Industria',                  placeholder: 'Ej: Manufactura, Servicios TI, Retail…' },
      { key: 'empresa_actividad',     label: 'Actividad Principal',                 placeholder: 'Descripción de la actividad principal' },
      { key: 'empresa_ubicacion',     label: 'Ubicación / Sede Principal',          placeholder: 'Ciudad, provincia, país' },
      { key: 'empresa_antiguedad',    label: 'Antigüedad de la Empresa',            placeholder: 'Año de fundación y tiempo en el mercado' },
      { key: 'empresa_tamano',        label: 'Tamaño (nº de empleados)',            placeholder: 'Nº total de empleados y distribución' },
      { key: 'empresa_forma_juridica',label: 'Forma Jurídica',                      placeholder: 'S.L., S.A., autónomo, cooperativa…' },
      { key: 'empresa_web',           label: 'Web / Redes Sociales',                placeholder: 'URLs relevantes' },
      { key: 'empresa_responsable',   label: 'Responsable del Proyecto',            placeholder: 'Nombre, cargo y contacto del interlocutor' },
      { key: 'empresa_descripcion',   label: 'Descripción General de la Empresa',   placeholder: 'Resumen ejecutivo de quiénes son' },
    ],
  },

  // ── 2. Información Económica (8) ─────────────────────────────────────────────
  {
    id: 'info-economica',
    title: '2. Información Económica',
    fields: [
      { key: 'eco_facturacion',         label: 'Facturación Anual (último ejercicio)',       placeholder: '€ y comparativa con años anteriores' },
      { key: 'eco_tendencia',           label: 'Tendencia de Facturación (últimos 3 años)',  placeholder: 'Creciente, estable, decreciente + causas' },
      { key: 'eco_beneficio',           label: 'Resultado Neto / Beneficio',                 placeholder: '€ y % sobre facturación' },
      { key: 'eco_costes_principales',  label: 'Principales Partidas de Coste',              placeholder: 'Personal, materiales, logística, etc.' },
      { key: 'eco_rentabilidad',        label: 'Rentabilidad por Línea de Negocio',          placeholder: 'Qué líneas son más/menos rentables' },
      { key: 'eco_financiacion',        label: 'Fuentes de Financiación',                    placeholder: 'Recursos propios, deuda, subvenciones…' },
      { key: 'eco_inversion_prevista',  label: 'Inversión Prevista en Consultoría',          placeholder: 'Presupuesto estimado y condiciones' },
      { key: 'eco_situacion_financiera',label: 'Situación Financiera General',               placeholder: 'Solvencia, liquidez, endeudamiento' },
    ],
  },

  // ── 3. Productos y Servicios (9) ─────────────────────────────────────────────
  {
    id: 'productos-servicios',
    title: '3. Productos y Servicios',
    fields: [
      { key: 'prod_catalogo',             label: 'Catálogo de Productos / Servicios',        placeholder: 'Lista y descripción breve de cada oferta' },
      { key: 'prod_diferenciacion',       label: 'Elemento Diferenciador',                   placeholder: '¿Qué les hace únicos frente a competidores?' },
      { key: 'prod_ciclo_vida',           label: 'Ciclo de Vida del Producto/Servicio',      placeholder: 'Intro, crecimiento, madurez, declive' },
      { key: 'prod_calidad',              label: 'Sistema de Gestión de la Calidad',         placeholder: 'Normas, certificaciones, procesos de control' },
      { key: 'prod_innovacion',           label: 'Innovación y Desarrollo de Nuevos Productos', placeholder: 'Proyectos en curso, I+D, inversión' },
      { key: 'prod_propiedad_intelectual',label: 'Propiedad Intelectual / Patentes',         placeholder: 'Marcas registradas, patentes, know-how' },
      { key: 'prod_proveedores',          label: 'Principales Proveedores',                  placeholder: 'Top 5 proveedores y nivel de dependencia' },
      { key: 'prod_compras',              label: 'Proceso de Compras / Aprovisionamiento',   placeholder: 'Cómo gestionan el suministro' },
      { key: 'prod_margen',               label: 'Márgenes por Línea de Producto',           placeholder: 'Margen bruto y neto por producto/servicio' },
    ],
  },

  // ── 4. Clientes y Mercado (10) ───────────────────────────────────────────────
  {
    id: 'clientes-mercado',
    title: '4. Clientes y Mercado',
    fields: [
      { key: 'cli_segmentos',          label: 'Segmentos de Clientes',                  placeholder: 'B2B, B2C, segmentos clave' },
      { key: 'cli_principales',        label: 'Principales Clientes (top 5)',           placeholder: 'Nombre, sector, % de facturación' },
      { key: 'cli_concentracion',      label: 'Concentración de Clientes',              placeholder: '¿Dependen mucho de pocos clientes?' },
      { key: 'cli_fidelizacion',       label: 'Política de Fidelización',              placeholder: 'Programas, contratos recurrentes, NPS' },
      { key: 'cli_captacion',          label: 'Proceso de Captación de Clientes',       placeholder: 'Canales, coste de adquisición, tiempo de ciclo' },
      { key: 'cli_mercado_geografico', label: 'Mercado Geográfico',                     placeholder: 'Local, nacional, internacional + % por área' },
      { key: 'cli_cuota_mercado',      label: 'Cuota de Mercado Estimada',              placeholder: '% del mercado que ocupan o estiman' },
      { key: 'cli_competencia',        label: 'Principales Competidores',               placeholder: 'Quiénes son, qué hacen mejor/peor' },
      { key: 'cli_tendencias_mercado', label: 'Tendencias del Mercado',                 placeholder: 'Cambios del sector que impactan al negocio' },
      { key: 'cli_satisfaccion',       label: 'Índice de Satisfacción del Cliente',     placeholder: 'NPS, encuestas, reclamaciones, churn rate' },
    ],
  },

  // ── 5. Comercialización y Marketing (9) ──────────────────────────────────────
  {
    id: 'comercializacion-marketing',
    title: '5. Comercialización y Marketing',
    fields: [
      { key: 'mkt_canales',         label: 'Canales de Venta y Distribución',    placeholder: 'Directo, distribuidores, online, marketplaces' },
      { key: 'mkt_estrategia',      label: 'Estrategia Comercial',               placeholder: 'Enfoque, objetivos y palancas comerciales' },
      { key: 'mkt_politica_precios',label: 'Política de Precios',                placeholder: 'Cómo fijan precios, descuentos, tarifas' },
      { key: 'mkt_presupuesto',     label: 'Presupuesto de Marketing',           placeholder: '€ anuales y % sobre facturación' },
      { key: 'mkt_acciones',        label: 'Acciones de Marketing Actuales',     placeholder: 'Campañas, ferias, contenidos, SEO/SEM…' },
      { key: 'mkt_digital',         label: 'Presencia Digital y E-commerce',     placeholder: 'Web, RRSS, tienda online, resultados' },
      { key: 'mkt_marca',           label: 'Gestión de Marca',                   placeholder: 'Posicionamiento, reputación, identidad visual' },
      { key: 'mkt_fuerza_ventas',   label: 'Fuerza de Ventas',                   placeholder: 'Nº comerciales, estructura, objetivos, incentivos' },
      { key: 'mkt_resultados',      label: 'Resultados Comerciales Recientes',   placeholder: 'KPIs comerciales, conversión, pipeline' },
    ],
  },

  // ── 6. Operaciones y Producción (10) ─────────────────────────────────────────
  {
    id: 'operaciones-produccion',
    title: '6. Operaciones y Producción',
    fields: [
      { key: 'ops_procesos',          label: 'Procesos Clave de Operaciones',       placeholder: 'Mapa de procesos principales' },
      { key: 'ops_capacidad',         label: 'Capacidad Productiva / Instalaciones', placeholder: 'Superficie, maquinaria, turnos, % utilización' },
      { key: 'ops_eficiencia',        label: 'Indicadores de Eficiencia Operativa', placeholder: 'OEE, tiempos ciclo, desperdicios, retrabajos' },
      { key: 'ops_logistica',         label: 'Logística y Distribución',            placeholder: 'Almacenes, transporte, plazos de entrega' },
      { key: 'ops_calidad_control',   label: 'Control de Calidad y Mejora Continua',placeholder: 'Sistemas Lean, Six Sigma, herramientas usadas' },
      { key: 'ops_certificaciones',   label: 'Certificaciones',                     placeholder: 'ISO 9001, 14001, 45001, BRC, etc.' },
      { key: 'ops_subcontratacion',   label: 'Subcontratación / Externalización',   placeholder: 'Qué se externaliza, riesgos asociados' },
      { key: 'ops_cuellos_botella',   label: 'Cuellos de Botella Identificados',    placeholder: 'Puntos de dolor operativos actuales' },
      { key: 'ops_plan_continuidad',  label: 'Plan de Continuidad de Negocio',      placeholder: 'Contingencias, backup, gestión de crisis' },
      { key: 'ops_kpis',              label: 'KPIs Operativos Principales',         placeholder: 'Métricas que monitorizan habitualmente' },
    ],
  },

  // ── 7. Tecnología y Digitalización (10) ──────────────────────────────────────
  {
    id: 'tecnologia-digitalizacion',
    title: '7. Tecnología y Digitalización',
    fields: [
      { key: 'tec_sistemas',       label: 'Sistemas de Información (ERP, CRM…)',   placeholder: 'Software en uso, versiones, licencias' },
      { key: 'tec_infraestructura',label: 'Infraestructura Tecnológica',           placeholder: 'Servidores, nube, red, dispositivos' },
      { key: 'tec_digitalizacion', label: 'Nivel de Digitalización General',       placeholder: 'Autoevaluación 1-5 por área y justificación' },
      { key: 'tec_automatizacion', label: 'Automatización de Procesos',            placeholder: 'Procesos automatizados y herramientas usadas' },
      { key: 'tec_ciberseguridad', label: 'Ciberseguridad y Gestión de Datos',     placeholder: 'Políticas, incidentes, GDPR, backups' },
      { key: 'tec_innovacion',     label: 'Proyectos de Innovación Tecnológica',   placeholder: 'IA, IoT, blockchain, proyectos en marcha' },
      { key: 'tec_ecommerce',      label: 'E-commerce / Ventas Online',            placeholder: '% de ventas digitales, plataformas, resultados' },
      { key: 'tec_datos',          label: 'Gestión y Análisis de Datos',           placeholder: 'Business Intelligence, analítica, decisiones data-driven' },
      { key: 'tec_inversiones',    label: 'Inversiones Tecnológicas Recientes',    placeholder: 'Proyectos completados en los últimos 2 años' },
      { key: 'tec_necesidades',    label: 'Necesidades Tecnológicas Identificadas',placeholder: 'Qué echan en falta o quieren mejorar' },
    ],
  },

  // ── 8. Recursos Humanos (8) ──────────────────────────────────────────────────
  {
    id: 'recursos-humanos',
    title: '8. Recursos Humanos',
    fields: [
      { key: 'rrhh_estructura',    label: 'Estructura Organizativa',               placeholder: 'Organigrama y niveles jerárquicos' },
      { key: 'rrhh_plantilla',     label: 'Composición de la Plantilla',           placeholder: 'Fijos, temporales, edad media, formación' },
      { key: 'rrhh_competencias',  label: 'Competencias Clave de la Organización', placeholder: '¿Qué saben hacer especialmente bien?' },
      { key: 'rrhh_seleccion',     label: 'Política de Selección y Retención',     placeholder: 'Cómo contratan, onboarding, retención' },
      { key: 'rrhh_formacion',     label: 'Plan de Formación y Desarrollo',        placeholder: 'Inversión, programas, horas por empleado' },
      { key: 'rrhh_clima',         label: 'Clima Laboral y Cultura Organizacional',placeholder: 'Valores, encuestas, rotación, absentismo' },
      { key: 'rrhh_retribucion',   label: 'Sistema de Retribución e Incentivos',   placeholder: 'Salario fijo, variable, beneficios, equidad' },
      { key: 'rrhh_personas_clave',label: 'Personas Clave y Dependencias',         placeholder: 'Quién es crítico y qué pasa si se va' },
    ],
  },

  // ── 9. Problemas y Necesidades (9) ───────────────────────────────────────────
  {
    id: 'problemas-necesidades',
    title: '9. Problemas y Necesidades',
    fields: [
      { key: 'prob_principales',         label: 'Principales Problemas Identificados',  placeholder: 'Top 3-5 problemas más urgentes' },
      { key: 'prob_causas',              label: 'Causas Raíz de los Problemas',         placeholder: 'Análisis causal (5 por qués, Ishikawa…)' },
      { key: 'prob_impacto',             label: 'Impacto en el Negocio',                placeholder: '€ perdidos, clientes, eficiencia, reputación' },
      { key: 'prob_intentos_solucion',   label: 'Intentos de Solución Anteriores',      placeholder: '¿Qué han probado ya? ¿Por qué falló?' },
      { key: 'prob_urgencia',            label: 'Urgencia y Prioridad',                 placeholder: 'Qué hay que resolver primero y en qué plazo' },
      { key: 'prob_recursos_necesarios', label: 'Recursos Necesarios para Resolver',    placeholder: 'Personas, presupuesto, tecnología, tiempo' },
      { key: 'prob_obstaculos',          label: 'Obstáculos para la Mejora',            placeholder: 'Resistencia interna, limitaciones, riesgos' },
      { key: 'prob_expectativas',        label: 'Expectativas del Cliente',             placeholder: '¿Qué esperan de la consultoría?' },
      { key: 'prob_criterios_exito',     label: 'Criterios de Éxito',                   placeholder: '¿Cómo sabrán que el proyecto fue exitoso?' },
    ],
  },

  // ── 10. Objetivos de la Consultoría (7) ──────────────────────────────────────
  {
    id: 'objetivos-consultoria',
    title: '10. Objetivos de la Consultoría',
    fields: [
      { key: 'obj_objetivo_principal',   label: 'Objetivo Principal',               placeholder: 'El resultado más importante a alcanzar' },
      { key: 'obj_objetivos_especificos',label: 'Objetivos Específicos',             placeholder: 'Lista de 3-7 objetivos medibles (SMART)' },
      { key: 'obj_resultados_esperados', label: 'Resultados Esperados',              placeholder: 'Cambios concretos esperados al finalizar' },
      { key: 'obj_plazo',                label: 'Plazo Previsto del Proyecto',       placeholder: 'Duración, fases y fechas clave' },
      { key: 'obj_alcance',              label: 'Alcance y Limitaciones',            placeholder: 'Qué incluye y qué queda fuera del proyecto' },
      { key: 'obj_entregables',          label: 'Entregables Acordados',             placeholder: 'Informes, planes, formaciones, herramientas…' },
      { key: 'obj_seguimiento',          label: 'Mecanismo de Seguimiento',          placeholder: 'Comités, reporting, frecuencia, responsables' },
    ],
  },

  // ── 11. Madurez Empresarial (10) ─────────────────────────────────────────────
  {
    id: 'madurez-empresarial',
    title: '11. Madurez Empresarial',
    fields: [
      { key: 'mad_estrategia',     label: 'Madurez en Estrategia Empresarial',   placeholder: '1=Sin planificación formal → 5=Estrategia robusta' },
      { key: 'mad_procesos',       label: 'Madurez en Gestión de Procesos',      placeholder: '1=Procesos informales → 5=Procesos documentados y medidos' },
      { key: 'mad_personas',       label: 'Madurez en Gestión de Personas',      placeholder: '1=Sin políticas → 5=RRHH estratégico' },
      { key: 'mad_tecnologia',     label: 'Madurez Tecnológica',                 placeholder: '1=Tecnología obsoleta → 5=Líderes digitales' },
      { key: 'mad_financiera',     label: 'Madurez en Gestión Financiera',       placeholder: '1=Sin control financiero → 5=Gestión financiera avanzada' },
      { key: 'mad_comercial',      label: 'Madurez Comercial y de Marketing',    placeholder: '1=Ventas reactivas → 5=Marketing y ventas integrados' },
      { key: 'mad_innovacion',     label: 'Madurez en Innovación',               placeholder: '1=Sin cultura de innovación → 5=Innovación sistemática' },
      { key: 'mad_sostenibilidad', label: 'Madurez en Sostenibilidad / RSC',     placeholder: '1=Sin iniciativas → 5=Sostenibilidad en el core' },
      { key: 'mad_gobernanza',     label: 'Madurez en Gobernanza y Dirección',   placeholder: '1=Dirección informal → 5=Gobierno corporativo sólido' },
      { key: 'mad_nivel_global',   label: 'Nivel Global de Madurez Empresarial', placeholder: 'Valoración global 1-5 y justificación' },
    ],
  },

  // ── 12. Resumen Ejecutivo (6) ────────────────────────────────────────────────
  {
    id: 'resumen-ejecutivo',
    title: '12. Resumen Ejecutivo',
    fields: [
      { key: 'res_sintesis',          label: 'Síntesis de la Situación Actual',   placeholder: 'Párrafo resumen de la empresa y su contexto' },
      { key: 'res_fortalezas',        label: 'Fortalezas Identificadas',           placeholder: 'Top 3-5 puntos fuertes de la empresa' },
      { key: 'res_debilidades',       label: 'Áreas de Mejora / Debilidades',      placeholder: 'Top 3-5 áreas que necesitan trabajo' },
      { key: 'res_oportunidades',     label: 'Oportunidades Detectadas',           placeholder: 'Factores externos que pueden aprovecharse' },
      { key: 'res_riesgos',           label: 'Riesgos y Amenazas',                 placeholder: 'Factores externos que podrían perjudicar' },
      { key: 'res_recomendaciones',   label: 'Recomendaciones Iniciales',          placeholder: 'Primeras líneas de actuación sugeridas' },
    ],
  },
]

// Flat map for quick field lookup
export const FIELD_BY_KEY: Record<string, FieldDefinition> = Object.fromEntries(
  FICHA_SECTIONS.flatMap(s => s.fields.map(f => [f.key, f]))
)

export const TOTAL_FIELDS = FICHA_SECTIONS.reduce((n, s) => n + s.fields.length, 0)
