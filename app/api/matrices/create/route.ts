import { NextResponse } from 'next/server'
import { getAuthContext, AuthError } from '@/lib/auth-utils'
import { createMatrix } from '@/lib/db-utils'
import type { MatrixType, CreateMatrixPayload } from '@/lib/types'

const VALID_MATRIX_TYPES: MatrixType[] = [
  '1-ficha-definicion',
  '2-mtp',
  '3-ikigai',
  '4-valores',
  '5-fortalezas',
  '6-competencias',
  '7-feedback',
  '8-plan-desarrollo',
]

// ─── POST /api/matrices/create ────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { user, supabase } = await getAuthContext(req)

    // Parse body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const payload = validateCreateBody(body)

    const id = await createMatrix(user.id, payload, supabase)

    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (err) {
    return handleError(err)
  }
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validateCreateBody(body: unknown): CreateMatrixPayload {
  if (!body || typeof body !== 'object') {
    throw new ValidationError('Request body is required')
  }

  const b = body as Record<string, unknown>

  if (typeof b.type !== 'string' || !VALID_MATRIX_TYPES.includes(b.type as MatrixType)) {
    throw new ValidationError(
      `"type" must be one of: ${VALID_MATRIX_TYPES.join(', ')}`
    )
  }

  if (typeof b.title !== 'string' || b.title.trim().length === 0) {
    throw new ValidationError('"title" is required and cannot be empty')
  }

  if (b.title.trim().length > 255) {
    throw new ValidationError('"title" cannot exceed 255 characters')
  }

  if (b.description !== undefined && typeof b.description !== 'string') {
    throw new ValidationError('"description" must be a string if provided')
  }

  return {
    type: b.type as MatrixType,
    title: b.title.trim(),
    description: typeof b.description === 'string' ? b.description.trim() : undefined,
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

  if (err instanceof ValidationError) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    )
  }

  console.error('[matrices/create route]', err)
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
