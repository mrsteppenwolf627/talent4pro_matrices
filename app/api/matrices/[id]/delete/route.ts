import { NextResponse } from 'next/server'
import { getAuthContext, AuthError } from '@/lib/auth-utils'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { user, supabase } = await getAuthContext(req)

    // Verify ownership before deleting (RLS also enforces this, but explicit check gives better error)
    const { data: matrix, error: fetchErr } = await supabase
      .from('matrices')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchErr || !matrix) {
      return NextResponse.json({ error: 'Matriz no encontrada' }, { status: 404 })
    }

    const row = matrix as { user_id: string }
    if (row.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete matrix — matrix_data cascades automatically via FK
    const { error: deleteErr } = await supabase
      .from('matrices')
      .delete()
      .eq('id', id)

    if (deleteErr) throw deleteErr

    return NextResponse.json({ success: true, message: 'Matriz eliminada' })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    console.error('[DELETE /api/matrices/[id]/delete]', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
