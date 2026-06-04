import { MTP_AREAS } from '@/data/mtpAreas'

const AREA_NAMES = Object.fromEntries(MTP_AREAS.map(a => [a.id, a.title]))
const TOTAL_AREAS = MTP_AREAS.length // 11

// ── Validation ────────────────────────────────────────────────────────────────

export interface MTPValidationOutput {
  isValid: boolean
  errors: string[]
  stats: {
    average: number
    total: number
    moderateCount: number   // areas with score >= 3
    highCount: number       // areas with score >= 4
    missingAreas: number[]
  }
}

export function validateMTPRules(
  scores: Record<string | number, number>
): MTPValidationOutput {
  const errors: string[] = []

  // Normalise keys to numbers
  const normalised: Record<number, number> = {}
  for (const [k, v] of Object.entries(scores)) {
    const n = parseInt(String(k), 10)
    if (!isNaN(n)) normalised[n] = Number(v) || 0
  }

  // Rule 1 — all 11 areas must be scored
  const missingAreas: number[] = []
  for (let i = 1; i <= TOTAL_AREAS; i++) {
    if (!(i in normalised)) missingAreas.push(i)
  }
  if (missingAreas.length > 0) {
    errors.push(
      `Faltan ${missingAreas.length} área(s) sin evaluar: ${missingAreas.map(i => `Área ${i} (${AREA_NAMES[i] ?? i})`).join(', ')}.`
    )
  }

  // Rule 2 — at least 5 areas must score >= 3
  const values = Object.values(normalised)
  const moderateCount = values.filter(v => v >= 3).length
  if (moderateCount < 5) {
    errors.push(
      `Solo ${moderateCount} de ${TOTAL_AREAS} áreas tienen puntuación ≥ 3. Se necesitan al menos 5 áreas en nivel "Establecido" o superior.`
    )
  }

  // Rule 3 — global average must be >= 2.0
  const total = values.reduce((s, v) => s + v, 0)
  const average = values.length > 0 ? total / TOTAL_AREAS : 0
  if (average < 2) {
    errors.push(
      `La media global es ${average.toFixed(1)}/5. Se requiere una media mínima de 2.0 para que el MTP sea viable.`
    )
  }

  // Rule 4 — no area can score > 5 or < 0
  for (const [id, val] of Object.entries(normalised)) {
    if (val < 0 || val > 5) {
      errors.push(`Puntuación fuera de rango en Área ${id}: ${val} (debe ser 0-5).`)
    }
  }

  const highCount = values.filter(v => v >= 4).length

  return {
    isValid: errors.length === 0,
    errors,
    stats: { average, total, moderateCount, highCount, missingAreas },
  }
}

// ── Synthesis generator ───────────────────────────────────────────────────────

export function generateMTPDefinition(
  scores: Record<string | number, number>
): string {
  const normalised: Record<number, number> = {}
  for (const [k, v] of Object.entries(scores)) {
    const n = parseInt(String(k), 10)
    if (!isNaN(n)) normalised[n] = Number(v) || 0
  }

  const values = Object.values(normalised)
  const total = values.reduce((s, v) => s + v, 0)
  const average = values.length > 0 ? total / TOTAL_AREAS : 0

  // Strengths (score >= 4)
  const highAreas = MTP_AREAS.filter(a => (normalised[a.id] ?? 0) >= 4).map(a => a.title)

  // Medium areas (score == 3)
  const mediumAreas = MTP_AREAS.filter(a => (normalised[a.id] ?? 0) === 3).map(a => a.title)

  // Weak areas (score <= 2) to improve
  const weakAreas = MTP_AREAS.filter(a => (normalised[a.id] ?? 0) <= 2).map(a => a.title)

  // Maturity level
  const level =
    average >= 4.5 ? 'Exponencial'
    : average >= 3.5 ? 'Avanzado'
    : average >= 2.5 ? 'Consolidado'
    : 'En Desarrollo'

  // Build definition
  const strengthsText =
    highAreas.length > 0
      ? `con fortalezas destacadas en **${highAreas.join(', ')}**`
      : mediumAreas.length > 0
      ? `con capacidades establecidas en **${mediumAreas.join(', ')}**`
      : 'con capacidades en desarrollo en todas las áreas'

  const improveText =
    weakAreas.length > 0
      ? ` Para consolidar el MTP, se recomienda reforzar: ${weakAreas.join(', ')}.`
      : ' Todas las áreas presentan un nivel sólido.'

  return (
    `Tu organización se encuentra en nivel **${level}** de madurez MTP ` +
    `(media ${average.toFixed(1)}/5, total ${total}/${TOTAL_AREAS * 5} puntos), ` +
    `${strengthsText}.` +
    improveText +
    ` Tu Propósito Transformador Masivo debe articularse en torno a ` +
    `${highAreas.length > 0 ? highAreas.slice(0, 3).join(', ') : mediumAreas.slice(0, 3).join(', ')} ` +
    `como palancas de diferenciación y escalado.`
  )
}

// ── Validation result message ─────────────────────────────────────────────────

export function buildValidationMessage(output: MTPValidationOutput): string {
  if (output.isValid) {
    const { average, highCount, moderateCount } = output.stats
    return (
      `MTP válido. Media ${average.toFixed(1)}/5 · ` +
      `${highCount} área(s) avanzadas · ${moderateCount} área(s) establecidas.`
    )
  }
  return `El MTP no cumple los criterios mínimos. Corrige los ${output.errors.length} error(es) indicados.`
}
