export interface MTPArea {
  id: number
  title: string
  description: string
  questions: string[]
}

export const MTP_AREAS_INTERNAL: MTPArea[] = [
  {
    id: 1,
    title: 'INTERFACES',
    description: 'API, Marketplace, Autoservicio',
    questions: [
      '¿Podemos crear una API que conecte nuestros sistemas con la comunidad?',
      '¿Podemos crear un marketplace para dirigir el crecimiento?',
      '¿Qué podemos hacer para ofrecer nuestro producto/servicio en forma de autoservicio?',
      '¿Podemos construir una nube externa de "empleados"?',
      '¿Tenemos los procesos claros?',
      '¿Lo tenemos digitalizado?',
      '¿Está preparada la organización para escalarse y multiplicar x10 nuestro negocio?'
    ]
  },
  {
    id: 2,
    title: 'CUADRO DE MANDO',
    description: 'Indicadores, Tiempo Real, Sistemas',
    questions: [
      '¿Utiliza la organización indicadores clave de rendimiento (KPI)?',
      '¿Están los datos disponibles en tiempo real?',
      '¿Qué sistemas utilizamos para la recolección de datos?',
      '¿Qué haremos con los datos una vez analizados?'
    ]
  },
  {
    id: 3,
    title: 'EXPERIMENTACIÓN',
    description: 'Lean Startup, MVP, Aprendizaje',
    questions: [
      '¿Aplicamos la metodología Lean Startup?',
      '¿Cómo validamos nuestras hipótesis?',
      '¿Tenemos procesos de experimentación rápida?',
      '¿Cómo gestionamos el aprendizaje de los fallos?'
    ]
  },
  {
    id: 4,
    title: 'AUTONOMÍA',
    description: 'Equipos Auto-organizados, Descentralización',
    questions: [
      '¿Tienen los equipos autonomía para tomar decisiones?',
      '¿Está la estructura organizacional descentralizada?',
      '¿Cómo se fomenta la proactividad?',
      '¿Existen jerarquías rígidas que frenan la innovación?'
    ]
  },
  {
    id: 5,
    title: 'SOCIAL',
    description: 'Colaboración, Comunicación, Herramientas',
    questions: [
      '¿Qué herramientas de colaboración social utilizamos?',
      '¿Es fluida la comunicación entre departamentos?',
      '¿Cómo compartimos el conocimiento interno?',
      '¿Existe una cultura de transparencia?'
    ]
  },
  {
    id: 6,
    title: 'TECNOLOGÍAS EXPONENCIALES',
    description: 'IA, Blockchain, IoT, Robótica',
    questions: [
      '¿Estamos utilizando Inteligencia Artificial en nuestros procesos?',
      '¿Qué otras tecnologías exponenciales estamos explorando?',
      '¿Cómo impactan estas tecnologías en nuestra propuesta de valor?',
      '¿Estamos al día con las tendencias tecnológicas del sector?'
    ]
  }
]

export const MTP_AREAS_EXTERNAL: MTPArea[] = [
  {
    id: 7,
    title: 'EMPLEADOS A DEMANDA',
    description: 'Personal externo, escalado',
    questions: [
      '¿Cómo podríamos contar con los mejores empleados para cada actividad?',
      '¿Cómo los encontramos y los contratamos?',
      '¿Permite nuestro sistema que los empleados tengan un plan de carrera?',
      '¿A través de una agencia? ¿Directamente? ¿Localmente?',
      '¿De manera remota? ¿A través de una plataforma?',
      '¿Cómo sabremos que la estrategia de personal es buena y funciona?'
    ]
  },
  {
    id: 8,
    title: 'COMUNIDAD Y MULTITUD',
    description: 'Fidelización, Redes, Crowd',
    questions: [
      '¿Existe una comunidad en torno a nuestro propósito?',
      '¿Cómo podemos convertir a nuestros usuarios en embajadores?',
      '¿Utilizamos el crowdsourcing para resolver retos?',
      '¿Cómo escuchamos la voz de la multitud?'
    ]
  },
  {
    id: 9,
    title: 'ALGORITMOS',
    description: 'Automatización, Análisis Predictivo',
    questions: [
      '¿Por qué algoritmos estamos apostando?',
      '¿Hemos comprobado el coste-beneficio de automatizar?',
      '¿Cómo garantizamos la calidad de los datos para los algoritmos?',
      '¿Son nuestros algoritmos escalables?'
    ]
  },
  {
    id: 10,
    title: 'ACTIVOS APALANCADOS',
    description: 'No propiedad, Acceso vs Posesión',
    questions: [
      '¿Qué activos podemos alquilar o compartir en lugar de comprar?',
      '¿Cómo reducimos los costes fijos de activos?',
      '¿Podemos escalar sin necesidad de adquirir más infraestructura física?',
      '¿Quiénes son nuestros partners clave para activos?'
    ]
  },
  {
    id: 11,
    title: 'COMPROMISO (ENGAGEMENT)',
    description: 'Gamificación, Incentivos, Lealtad',
    questions: [
      '¿Cómo mantenemos a los usuarios enganchados?',
      '¿Utilizamos técnicas de gamificación?',
      '¿Cuáles son los incentivos para la participación recurrente?',
      '¿Cómo medimos la lealtad de la comunidad?'
    ]
  }
]

export const MTP_VALIDATION_MUST_HAVE = [
  'Describe un estado deseado para el mundo',
  '¿Es altamente aspiracional?',
  '¿Es único?',
  '¿Es audazmente masiva?',
  '¿Involucra una industria, comunidad o planeta?',
  '¿Es transformadora?',
  '¿Es el propósito claro e inequívoco?',
  '¿Hay alto sentido de pasión?',
  '¿Describe factor clave de éxito?'
]

export const MTP_VALIDATION_MUST_NOT = [
  '¿Es una declaración de visión sobre la organización?',
  '¿Es sobre misión y "cómo" lograr?',
  '¿Es restrictivo a nuevos modelos?',
  '¿Es un slogan de marketing?',
  '¿Es una frase para clientes?',
  '¿Es una frase para nosotros?',
  '¿Es sobre el negocio?'
]
