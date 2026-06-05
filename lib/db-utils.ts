import type { SupabaseClient } from '@supabase/supabase-js'
import { supabaseServer } from '@/lib/supabase-server'
import type { MatrixData, MatrixMetadata, UpsertCellPayload } from '@/lib/types'

// ─── Read ──────────────────────────────────────────────────────────────────────

export async function getUserMatrices(
  userId: string,
  client: SupabaseClient = supabaseServer
): Promise<MatrixMetadata[]> {
  const { data, error } = await client
    .from('matrices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []) as MatrixMetadata[]
}

export async function getMatrixMetadata(
  matrixId: string,
  client: SupabaseClient = supabaseServer
): Promise<MatrixMetadata> {
  const { data, error } = await client
    .from('matrices')
    .select('*')
    .eq('id', matrixId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') throw new DbNotFoundError('Matrix not found')
    throw error
  }

  return data as MatrixMetadata
}

export async function getMatrixCells(
  matrixId: string,
  client: SupabaseClient = supabaseServer
): Promise<MatrixData[]> {
  const { data, error } = await client
    .from('matrix_data')
    .select('*')
    .eq('matrix_id', matrixId)
    .order('row_key')
    .order('column_key')

  if (error) throw error

  return (data ?? []) as MatrixData[]
}

export async function getMatrixWithData(
  matrixId: string,
  client: SupabaseClient = supabaseServer
): Promise<{ matrix: MatrixMetadata; cells: MatrixData[] }> {
  const [matrix, cells] = await Promise.all([
    getMatrixMetadata(matrixId, client),
    getMatrixCells(matrixId, client),
  ])

  return { matrix, cells }
}

// ─── Write ─────────────────────────────────────────────────────────────────────

export async function upsertMatrixCells(
  matrixId: string,
  cells: UpsertCellPayload[],
  client: SupabaseClient = supabaseServer
): Promise<void> {
  if (cells.length === 0) return

  const rows = cells.map(cell => ({
    matrix_id: matrixId,
    row_key: cell.row_key,
    column_key: cell.column_key,
    content: cell.content,
    // Version increment handled DB-side via trigger; send 1 for new rows
    version: 1,
  }))

  const { error } = await client
    .from('matrix_data')
    .upsert(rows, {
      onConflict: 'matrix_id,row_key,column_key',
      ignoreDuplicates: false,
    })

  if (error) throw error
}

export async function touchMatrix(
  matrixId: string,
  client: SupabaseClient = supabaseServer
): Promise<void> {
  const { error } = await client
    .from('matrices')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', matrixId)

  if (error) throw error
}

export async function createMatrix(
  userId: string,
  payload: { type: string; title: string; description?: string },
  client: SupabaseClient = supabaseServer
): Promise<string> {
  const { data, error } = await client
    .from('matrices')
    .insert({
      user_id: userId,
      type: payload.type,
      title: payload.title.trim(),
      description: payload.description?.trim() ?? null,
    })
    .select('id')
    .single()

  if (error) throw error

  return data.id as string
}

// ─── Custom errors ─────────────────────────────────────────────────────────────

export class DbNotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message)
    this.name = 'DbNotFoundError'
  }
}
