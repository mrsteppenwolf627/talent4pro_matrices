import { NextResponse } from 'next/server'
import { getAuthContext, AuthError } from '@/lib/auth-utils'
import { DbNotFoundError } from '@/lib/db-utils'
import {
  validateMTPRules,
  generateMTPDefinition,
  buildValidationMessage,
} from '@/lib/mtp-validation'
import type { MatrixData } from '@/lib/types'

// ─── POST /api/matrices/[id]/validate-mtp ────────────────────────────────────

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { supabase } = await getAuthContext(req)

    // 1. Verify the matrix exists and the user can access it (RLS)
    const { data: matrix, error: matrixErr } = await supabase
      .from('matrices')
      .select('id, type')
      .eq('id', id)
      .single()

    if (matrixErr || !matrix) {
      throw new DbNotFoundError('Matrix not found or access denied')
    }

    if (matrix.type !== '2-mtp') {
      return NextResponse.json(
        { success: false, error: 'Esta matriz no es de tipo MTP' },
        { status: 400 }
      )
    }

    // 2. Read all area scores from matrix_data
    const { data: cells, error: cellsErr } = await supabase
      .from('matrix_data')
      .select('row_key, content')
      .eq('matrix_id', id)
      .like('row_key', 'area_%')

    if (cellsErr) throw cellsErr

    // 3. Build scores map  { 1: 3, 2: 4, ... }
    const scores: Record<number, number> = {}
    for (const cell of (cells ?? []) as Pick<MatrixData, 'row_key' | 'content'>[]) {
      const areaId = parseInt(cell.row_key.replace('area_', ''), 10)
      if (!isNaN(areaId)) {
        scores[areaId] = Number(cell.content?.value ?? 0)
      }
    }

    // 4. Apply validation rules
    const validation = validateMTPRules(scores)

    // 5. Generate synthesis if valid
    const mtpDefinition = validation.isValid
      ? generateMTPDefinition(scores)
      : ''

    const message = buildValidationMessage(validation)

    return NextResponse.json({
      success: true,
      isValid: validation.isValid,
      message,
      mtpDefinition,
      errors: validation.errors,
      stats: validation.stats,
    })
  } catch (err) {
    return handleError(err)
  }
}

// ─── Error handler ─────────────────────────────────────────────────────────────

function handleError(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.statusCode }
    )
  }
  if (err instanceof DbNotFoundError) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 404 }
    )
  }
  console.error('[validate-mtp route]', err)
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}
