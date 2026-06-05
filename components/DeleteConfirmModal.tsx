import styles from '@/styles/MatricesList.module.css'

interface DeleteConfirmModalProps {
  matrixTitle: string
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export default function DeleteConfirmModal({
  matrixTitle,
  onConfirm,
  onCancel,
  loading,
}: DeleteConfirmModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Eliminar matriz</h2>
        <p className={styles.deleteWarning}>
          ¿Estás seguro de que quieres borrar <strong>&quot;{matrixTitle}&quot;</strong>?
        </p>
        <p className={styles.deleteSubtext}>Esta acción no se puede deshacer.</p>
        <div className={styles.modalActions}>
          <button
            onClick={onCancel}
            disabled={loading}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={styles.deleteButton}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
