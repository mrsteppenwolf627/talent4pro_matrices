export interface IkigaiQuadrantDef {
  id: 'passion' | 'vocation' | 'mission' | 'profession'
  title: string
  subtitle: string
  color: string
  icon: string
  questions: string[]
}

export const IKIGAI_QUADRANTS: IkigaiQuadrantDef[] = [
  {
    id: 'passion',
    title: 'PASIÓN',
    subtitle: 'Lo que amas',
    color: '#FF6B6B',
    icon: '❤️',
    questions: [
      '¿Cuáles son las actividades que te hacen perder la noción del tiempo cuando las realizas?',
      '¿Qué hobbies o intereses te entusiasman y te llenan de energía?',
      '¿Cuándo te sientes más auténtico/a contigo mismo/a?',
      '¿Hay momentos específicos en tu vida en los que te has sentido realmente feliz y satisfecho/a?',
      '¿Qué tipo de contenido consumes con gusto, ya sea libros, películas, música o cualquier otra forma?',
      '¿En qué actividades te sumerges con facilidad y te sientes completamente absorbido/a?',
      '¿Cuáles son tus sueños o metas a largo plazo que reflejan tus verdaderas pasiones?',
      '¿Hay alguna causa o tema por el que sientas una conexión profunda?',
      '¿Qué te hace sentir vivo/a y lleno/a de energía?'
    ]
  },
  {
    id: 'vocation',
    title: 'VOCACIÓN',
    subtitle: 'En lo que eres bueno',
    color: '#95E1D3',
    icon: '✨',
    questions: [
      '¿Cuáles son las tareas o actividades en las que destacas y que otras personas suelen elogiar?',
      '¿En qué situaciones te sientes más seguro/a y competente?',
      '¿Qué habilidades técnicas o blandas posees que te destacan en tu entorno personal o profesional?',
      '¿Qué logros has alcanzado en el pasado que demuestran tus habilidades y talentos?',
      '¿Cuáles son las áreas en las que te encuentras naturalmente inclinado/a?',
      '¿Cómo utilizas tu tiempo libre y cómo estas actividades podrían revelar tus talentos innatos?',
      '¿Qué feedback has recibido en entornos académicos, laborales o sociales que destaque tus habilidades?',
      '¿Hay alguna actividad que harías sin esperar recompensa económica porque simplemente te apasiona?'
    ]
  },
  {
    id: 'mission',
    title: 'MISIÓN',
    subtitle: 'Lo que necesita el mundo',
    color: '#FFE66D',
    icon: '🌍',
    questions: [
      '¿Cuáles son los desafíos o problemas en el mundo que te preocupan y te impulsan a actuar?',
      '¿En qué áreas sientes que tu contribución podría marcar una diferencia significativa?',
      '¿Cómo puedes aplicar tus habilidades y conocimientos para abordar necesidades globales o locales?',
      '¿Qué causa o proyecto social te motiva y te hace sentir comprometido/a?',
      '¿Existen habilidades específicas que posees y que podrían ser útiles para mejorar la vida de los demás?',
      '¿Cuáles son los valores fundamentales que guían tus decisiones y acciones?',
      '¿Hay grupos vulnerables o comunidades a las que te gustaría servir?',
      '¿Qué legado te gustaría dejar en el mundo?'
    ]
  },
  {
    id: 'profession',
    title: 'PROFESIÓN',
    subtitle: 'Por lo que te pagan',
    color: '#4ECDC4',
    icon: '💼',
    questions: [
      '¿En qué áreas profesionales o sectores hay demanda y oportunidades económicas?',
      '¿Cuáles son las habilidades o conocimientos que están valorando y pagando en el mercado laboral actual?',
      '¿Qué tipo de roles o trabajos están alineados con tus habilidades y, al mismo tiempo, son bien remunerados?',
      '¿Cuáles son las tendencias económicas o industrias emergentes que podrían ofrecer oportunidades?',
      '¿Cómo puedes combinar tus habilidades y pasiones con un modelo de negocio sostenible y rentable?',
      '¿Qué es lo que el mercado valora y está dispuesto a pagar por tu experiencia o servicios?',
      '¿Cuál es tu potencial de ingresos basado en tu experiencia y habilidades?',
      '¿Hay nichos de mercado menos saturados en tu área de expertise?'
    ]
  }
]
