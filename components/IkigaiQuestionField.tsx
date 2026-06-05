import styles from '@/styles/Ikigai.module.css'

interface IkigaiQuestionFieldProps {
  index: number
  question: string
  answer: string
  onChange: (value: string) => void
}

export default function IkigaiQuestionField({ index, question, answer, onChange }: IkigaiQuestionFieldProps) {
  return (
    <div className={styles.questionField}>
      <label className={styles.questionLabel}>
        <span className={styles.questionNumber}>{index + 1}.</span> {question}
      </label>
      <textarea
        className={styles.questionTextarea}
        placeholder="Describe tu respuesta aquí..."
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    </div>
  )
}
