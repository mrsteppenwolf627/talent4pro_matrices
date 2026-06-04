import { createClient } from '@supabase/supabase-js'
import { supabaseServer } from '@/lib/supabase-server'
import type { User } from '@supabase/supabase-js'

interface AuthContext {
  user: User
  // User-scoped client — RLS policies apply automatically
  supabase: ReturnType<typeof createClient>
}

// Validates Bearer JWT and returns the user + a RLS-aware client
export async function getAuthContext(req: Request): Promise<AuthContext> {
  const authHeader = req.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AuthError('Missing or malformed Authorization header', 401)
  }

  const token = authHeader.split(' ')[1]

  // Validate the token against Supabase Auth
  const { data, error } = await supabaseServer.auth.getUser(token)

  if (error || !data.user) {
    throw new AuthError('Invalid or expired token', 401)
  }

  // Create a client that carries the user's JWT → RLS applied by Supabase
  const userClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  return { user: data.user, supabase: userClient }
}

// Simpler helper when only the user object is needed
export async function getAuthUser(req: Request): Promise<User> {
  const { user } = await getAuthContext(req)
  return user
}

// Typed auth error so API routes can distinguish 401 from 500
export class AuthError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}
