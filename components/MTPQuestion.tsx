import styles from '@/styles/MTPNew.module.css'

interface MTPQuestionProps {
  text: string
}

export default function MTPQuestion({ text }: MTPQuestionProps) {
  return <div className={styles.questionItem}>{text}</div>
}
