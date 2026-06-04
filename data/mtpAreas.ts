export interface MTPAreaDef {
  id: number
  title: string
  description: string
  questions: string[]
}

export const MTP_AREAS: MTPAreaDef[] = [
  {
    id: 1,
    title: 'Interfaces',
    description: 'API, Marketplace, Autoservicio',
    questions: [
      '¿Tienes una API pública que otros puedan integrar?',
      '¿Ofreces un marketplace donde terceros ofrezcan productos o servicios?',
      '¿Tus clientes pueden autogestionar sus pedidos, contratos o soporte sin intervención humana?',
      '¿Existen integraciones con plataformas externas (e-commerce, ERPs, etc.)?',
      '¿Permites acceso programático a tus datos o capacidades?',
    ],
  },
  {
    id: 2,
    title: 'Cuadro de Mando',
    description: 'KPIs, Indicadores, Toma de decisiones',
    questions: [
      '¿Tienes un cuadro de mando con KPIs actualizados en tiempo real?',
      '¿Los indicadores clave están visibles para toda la organización?',
      '¿Las decisiones estratégicas se basan en datos y métricas?',
      '¿Mides el rendimiento de cada área de negocio de forma sistemática?',
      '¿Existen alertas automáticas cuando un KPI sale del rango esperado?',
    ],
  },
  {
    id: 3,
    title: 'Experimentación',
    description: 'Tests, Innovación, Aprendizaje iterativo',
    questions: [
      '¿Realizas experimentos controlados (A/B tests, pilotos) antes de escalar?',
      '¿Tienes un proceso formal para lanzar y aprender de nuevas iniciativas?',
      '¿Se permite el error controlado como parte de la cultura de innovación?',
      '¿Dedicas tiempo y presupuesto a proyectos de exploración no lineales?',
      '¿Las ideas de los empleados tienen un canal para convertirse en experimentos?',
    ],
  },
  {
    id: 4,
    title: 'Autonomía',
    description: 'Decisiones descentralizadas, Liderazgo distribuido',
    questions: [
      '¿Los equipos pueden tomar decisiones de negocio sin escalar a dirección?',
      '¿Existe un modelo de trabajo por OKRs u objetivos claros con autonomía de ejecución?',
      '¿Los líderes de equipo tienen autoridad real sobre recursos y prioridades?',
      '¿La organización tiene pocas capas jerárquicas para agilizar la toma de decisiones?',
      '¿Se fomenta el ownership individual y la responsabilidad sobre resultados?',
    ],
  },
  {
    id: 5,
    title: 'Social',
    description: 'Herramientas colaborativas, Comunicación interna',
    questions: [
      '¿Usas plataformas de colaboración en tiempo real (Slack, Teams, Notion, etc.)?',
      '¿La comunicación interna es transparente y accesible para toda la organización?',
      '¿Tienes canales de feedback bidireccional entre empleados y dirección?',
      '¿La comunidad interna comparte conocimiento y mejores prácticas de forma activa?',
      '¿Usas redes sociales o foros internos para fomentar la cultura corporativa?',
    ],
  },
  {
    id: 6,
    title: 'Empleados a Demanda',
    description: 'Personal flexible, Escalado ágil',
    questions: [
      '¿Cuentas con freelancers, consultores o colaboradores externos según necesidad?',
      '¿Puedes escalar o reducir tu equipo con rapidez ante cambios de demanda?',
      '¿Tienes acceso a talento especializado de forma puntual sin contratos fijos?',
      '¿Trabajas con plataformas de talento bajo demanda (Upwork, Toptal, etc.)?',
      '¿Tu modelo operativo está diseñado para funcionar con equipos distribuidos?',
    ],
  },
  {
    id: 7,
    title: 'Comunidad',
    description: 'Participación externa, Creación de valor compartido',
    questions: [
      '¿Tienes una comunidad activa de clientes, partners o seguidores en torno a tu marca?',
      '¿Los usuarios o clientes contribuyen a mejorar tu producto (feedback, co-creación)?',
      '¿Organizas eventos, foros o espacios donde la comunidad genera valor?',
      '¿Tu propuesta de valor incluye un componente de pertenencia o identidad compartida?',
      '¿Tienes programas de embajadores, referidos o comunidades de práctica?',
    ],
  },
  {
    id: 8,
    title: 'Algoritmos',
    description: 'Automatización, Inteligencia Artificial',
    questions: [
      '¿Usas algoritmos o IA para personalizar la experiencia del cliente?',
      '¿Tienes procesos automatizados que antes requerían trabajo manual repetitivo?',
      '¿Empleas machine learning o modelos predictivos en alguna función de negocio?',
      '¿Los datos generados por tus operaciones se convierten en insights accionables automáticamente?',
      '¿La automatización te permite operar con mayor volumen sin incrementar proporcionalmente el equipo?',
    ],
  },
  {
    id: 9,
    title: 'Activos Externos',
    description: 'Recursos de terceros, Fuentes de ingreso no tradicionales',
    questions: [
      '¿Monetizas activos que no son de tu propiedad directa (como Airbnb o Uber)?',
      '¿Tienes partnerships que aportan capacidad productiva sin inversión directa?',
      '¿Existen ingresos recurrentes basados en el acceso a recursos de tu red?',
      '¿Tu modelo de negocio aprovecha infraestructura, datos o activos de terceros?',
      '¿Tienes acuerdos de revenue share con proveedores, distribuidores o plataformas?',
    ],
  },
  {
    id: 10,
    title: 'Compromiso',
    description: 'Gamificación, Recompensas, Fidelización',
    questions: [
      '¿Tienes mecanismos de gamificación para aumentar la participación de clientes o empleados?',
      '¿Existen programas de recompensas, puntos o insignias que fomenten la fidelización?',
      '¿Mides el nivel de engagement de tus clientes más allá de las ventas?',
      '¿Las experiencias de usuario están diseñadas para crear hábito y retención?',
      '¿Tienes comunicaciones personalizadas basadas en el comportamiento del usuario?',
    ],
  },
  {
    id: 11,
    title: 'Propósito Transformador',
    description: 'Misión ambiciosa, Impacto, Legado',
    questions: [
      '¿Tienes un Propósito Transformador Masivo (MTP) claramente definido y comunicado?',
      '¿Tu misión va más allá del beneficio económico e incluye impacto social o ambiental?',
      '¿Los empleados y clientes se sienten parte de algo más grande que la empresa?',
      '¿Tu propósito atrae talento y clientes que comparten los mismos valores?',
      '¿La organización toma decisiones estratégicas alineadas con ese propósito?',
    ],
  },
]

export const MTP_AREA_COUNT = MTP_AREAS.length // 11

// Score thresholds for color feedback
export function getScoreColor(value: number): string {
  if (value <= 1) return '#dc2626'   // red
  if (value <= 2) return '#ea580c'   // orange
  if (value <= 3) return '#ca8a04'   // yellow
  if (value <= 4) return '#65a30d'   // lime
  return '#16a34a'                   // green
}

export function getScoreLabel(value: number): string {
  const labels: Record<number, string> = {
    0: 'Inexistente',
    1: 'Inicial',
    2: 'En desarrollo',
    3: 'Establecido',
    4: 'Avanzado',
    5: 'Referente',
  }
  return labels[value] ?? ''
}
