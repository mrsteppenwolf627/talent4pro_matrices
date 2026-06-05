'use client'

import type { MTPValidationResult } from '@/hooks/useMTPNew'
import MTPValidationChecklist from './MTPValidationChecklist'
import styles from '@/styles/MTPNew.module.css'

interface MTPCenterPanelProps {
  mtpText: string
  validating: boolean
  validationResult: MTPValidationResult | null
  onMTPChange: (text: string) => void
  onValidate: () => void
}

export default function MTPCenterPanel({
  mtpText,
  validating,
  validationResult,
  onMTPChange,
  onValidate,
}: MTPCenterPanelProps) {
  return (
    <div className={styles.centerPanel}>
      <div className={styles.panelBox}>
        <h2 className={styles.panelTitle}>
          <span>🚀</span> ÁREA 12: MTP DEFINITIVO
        </h2>
        <p className={styles.areaDesc} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Síntesis de atributos internos y externos. Describe tu propósito masivo y transformador.
        </p>
        <textarea
          className={styles.mtpTextarea}
          placeholder="Escribe aquí tu Propósito Transformativo Masivo..."
          value={mtpText}
          onChange={(e) => onMTPChange(e.target.value)}
        />
      </div>

      <div className={styles.panelBox}>
        <h2 className={styles.panelTitle}>
          <span>✅</span> ÁREA 13: VALIDACIÓN
        </h2>
        
        {validationResult && (
          <div className={`${styles.banner} ${validationResult.isValid ? styles.bannerSuccess : styles.bannerError}`}>
            {validationResult.isValid ? '✓ MTP VALIDADO CORRECTAMENTE' : '✗ EL MTP NECESITA AJUSTES'}
            <div style={{ fontSize: '0.875rem', fontWeight: 400, marginTop: '0.5rem' }}>
              {validationResult.message}
            </div>
          </div>
        )}

        <MTPValidationChecklist />

        <div style={{ marginTop: '2rem' }}>
          <button
            className={styles.validateBtn}
            onClick={onValidate}
            disabled={validating}
          >
            {validating ? 'Validando...' : 'VALIDAR MTP'}
          </button>
        </div>
      </div>
    </div>
  )
}
