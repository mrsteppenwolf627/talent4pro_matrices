import styles from '@/styles/Ikigai.module.css'

interface IkigaiQuestionProps {
  text: string
}

export default function IkigaiQuestion({ text }: IkigaiQuestionProps) {
  return <div className={styles.questionItem}>{text}</div>
}
