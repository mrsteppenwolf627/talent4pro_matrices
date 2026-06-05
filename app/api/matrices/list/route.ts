import { NextResponse } from 'next/server'
import { getAuthContext, AuthError } from '@/lib/auth-utils'
import { getUserMatrices } from '@/lib/db-utils'

// ─── GET /api/matrices/list ───────────────────────────────────────────────────

export async function GET(req: Request) {
  try {
    const { user, supabase } = await getAuthContext(req)

    const matrices = await getUserMatrices(user.id, supabase)

    return NextResponse.json({ success: true, data: matrices }, { status: 200 })
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

  console.error('[matrices/list route]', err)
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}
