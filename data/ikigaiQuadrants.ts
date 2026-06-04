export type QuadrantId = 'passion' | 'profession' | 'mission' | 'vocation'

export interface IkigaiQuadrantDef {
  id: QuadrantId
  title: string
  subtitle: string
  color: string        // accent color
  colorLight: string   // background tint
  icon: string
  placeholder: string
  questions: string[]
}

export const IKIGAI_QUADRANTS: IkigaiQuadrantDef[] = [
  {
    id: 'passion',
    title: 'Pasión',
    subtitle: 'Lo que amas',
    color: '#e05252',
    colorLight: '#fff5f5',
    icon: '❤️',
    placeholder: 'Describe qué actividades y temas te apasionan profundamente…',
    questions: [
      '¿Qué actividades te hacen perder la noción del tiempo?',
      '¿Qué harías aunque no te pagaran por ello?',
      '¿Cuáles son tus tres hobbies o intereses favoritos?',
      '¿Qué temas te apasiona aprender o investigar por puro placer?',
      '¿En qué momentos te sientes más vivo/a y con mayor energía?',
      '¿Qué sueños o aspiraciones personales tienes desde pequeño/a?',
      '¿Qué habilidades o actividades disfrutas tanto que podrías hacerlas durante horas sin cansarte?',
      '¿Qué te inspira y te motiva a levantarte por las mañanas?',
      '¿Qué tipo de contenidos (libros, vídeos, conversaciones) consumes de forma compulsiva?',
    ],
  },
  {
    id: 'profession',
    title: 'Profesión',
    subtitle: 'Por lo que te pagan',
    color: '#0d9488',
    colorLight: '#f0fdfa',
    icon: '💼',
    placeholder: 'Describe tus habilidades valoradas, conocimientos y lo que el mercado paga por ti…',
    questions: [
      '¿Cuáles son tus habilidades y competencias más valoradas por los demás?',
      '¿Por qué tipo de trabajo o servicio te pagarían ahora mismo?',
      '¿Qué conocimientos especializados tienes que otras personas necesitan?',
      '¿En qué áreas eres considerado/a experto/a por tu entorno profesional?',
      '¿Qué soluciones, productos o servicios podrías ofrecer al mercado?',
      '¿Qué formación, certificaciones o experiencia tienes con valor económico?',
      '¿Cuáles son tus logros profesionales más destacados hasta la fecha?',
      '¿Qué problemas de otros puedes resolver con tus capacidades actuales?',
      '¿Cuánto estarían dispuestos a pagarte por tu trabajo más valioso?',
    ],
  },
  {
    id: 'mission',
    title: 'Misión',
    subtitle: 'Lo que el mundo necesita',
    color: '#b45309',
    colorLight: '#fffbeb',
    icon: '🌍',
    placeholder: 'Describe qué problemas del mundo te duelen y cómo podrías contribuir a resolverlos…',
    questions: [
      '¿Qué problemas del mundo te duelen o indignan profundamente?',
      '¿Qué cambio positivo desearías ver en tu comunidad o en la sociedad?',
      '¿Cómo podrías contribuir a mejorar la vida de otras personas?',
      '¿A qué causa o propósito sientes que vale la pena dedicar tu vida?',
      '¿Qué necesidades no cubiertas observas en tu entorno cercano o en el mundo?',
      '¿De qué manera pueden tus talentos ayudar a resolver problemas reales?',
      '¿Qué legado querrías dejar cuando ya no estés?',
      '¿A qué colectivo, sector o comunidad sientes que podrías servir mejor?',
      '¿Qué injusticia o carencia del mundo te moviliza a actuar?',
    ],
  },
  {
    id: 'vocation',
    title: 'Vocación',
    subtitle: 'Lo que se te da bien',
    color: '#2D5016',
    colorLight: '#f0fdf4',
    icon: '✨',
    placeholder: 'Describe las actividades y talentos que realizas de forma natural y en los que destacas…',
    questions: [
      '¿Qué actividades realizas de forma natural, casi sin esfuerzo?',
      '¿En qué tareas o proyectos destacas claramente sobre los demás?',
      '¿Qué habilidades innatas o muy desarrolladas posees?',
      '¿Qué es lo que más elogian de ti tus amigos, familia o compañeros de trabajo?',
      '¿Qué tareas dominas hasta el punto de que podrías enseñarlas a otros?',
      '¿Cuáles son tus fortalezas según tests de personalidad o feedback recibido?',
      '¿Qué problemas resuelves con facilidad que a otros les cuesta mucho?',
      '¿Qué actividades realizas mejor que la mayoría de personas que conoces?',
      '¿En qué situaciones los demás suelen pedirte consejo o ayuda?',
    ],
  },
]

// Order for the 2×2 grid layout: [top-left, top-right, bottom-left, bottom-right]
export const GRID_ORDER: QuadrantId[] = ['passion', 'mission', 'profession', 'vocation']

// Helper: get quadrant def by id
export const QUADRANT_BY_ID = Object.fromEntries(
  IKIGAI_QUADRANTS.map(q => [q.id, q])
) as Record<QuadrantId, IkigaiQuadrantDef>
