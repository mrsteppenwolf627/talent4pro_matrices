import { NextResponse } from 'next/server'
import { getAuthContext, AuthError } from '@/lib/auth-utils'
import { getMatrixWithData, upsertMatrixCells, touchMatrix, DbNotFoundError } from '@/lib/db-utils'
import type { UpsertCellPayload } from '@/lib/types'

// ─── GET /api/matrices/[id] ────────────────────────────────────────────────────

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { supabase } = await getAuthContext(req)

    // RLS on the user-scoped client ensures only accessible matrices are returned
    const { matrix, cells } = await getMatrixWithData(id, supabase)

    return NextResponse.json({
      success: true,
      metadata: matrix,
      cells,
    })
  } catch (err) {
    return handleError(err)
  }
}

// ─── PUT /api/matrices/[id] ────────────────────────────────────────────────────

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { supabase } = await getAuthContext(req)

    // Parse + validate body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const cells = validateUpsertBody(body)

    // Verify the matrix exists and the user has access (RLS)
    // getMatrixWithData will throw DbNotFoundError if inaccessible
    await getMatrixWithData(id, supabase)

    // Upsert cells then bump updated_at on the parent matrix
    await upsertMatrixCells(id, cells, supabase)
    await touchMatrix(id, supabase)

    // Return updated cells so frontend can reconcile ids/versions
    const { cells: updatedCells } = await getMatrixWithData(id, supabase)

    return NextResponse.json({
      success: true,
      message: 'Matriz actualizada',
      cells: updatedCells,
    })
  } catch (err) {
    return handleError(err)
  }
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validateUpsertBody(body: unknown): UpsertCellPayload[] {
  if (!body || typeof body !== 'object' || !('cells' in body)) {
    throw new ValidationError('Body must be { cells: [...] }')
  }

  const { cells } = body as { cells: unknown }

  if (!Array.isArray(cells)) {
    throw new ValidationError('"cells" must be an array')
  }

  return cells.map((cell: unknown, i) => {
    if (!cell || typeof cell !== 'object') {
      throw new ValidationError(`cells[${i}] is not an object`)
    }

    const c = cell as Record<string, unknown>

    if (typeof c.row_key !== 'string' || c.row_key.trim() === '') {
      throw new ValidationError(`cells[${i}].row_key is required`)
    }
    if (typeof c.column_key !== 'string' || c.column_key.trim() === '') {
      throw new ValidationError(`cells[${i}].column_key is required`)
    }
    if (!c.content || typeof c.content !== 'object') {
      throw new ValidationError(`cells[${i}].content is required`)
    }

    const content = c.content as Record<string, unknown>
    const VALID_TYPES = ['text', 'number', 'checkbox', 'formula']
    if (!VALID_TYPES.includes(content.type as string)) {
      throw new ValidationError(
        `cells[${i}].content.type must be one of: ${VALID_TYPES.join(', ')}`
      )
    }

    return {
      row_key: (c.row_key as string).trim(),
      column_key: (c.column_key as string).trim(),
      content: c.content,
    } as UpsertCellPayload
  })
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

  if (err instanceof ValidationError) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    )
  }

  console.error('[matrices/[id] route]', err)
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
