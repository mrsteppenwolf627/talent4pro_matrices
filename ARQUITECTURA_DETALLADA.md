# Arquitectura Detallada - Talent4Pro Matrices

## Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL (Edge)                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    NEXT.JS 14                            │ │
│  │                                                         │ │
│  │  ┌──────────────┐    ┌──────────────┐                   │ │
│  │  │ App Router   │    │  API Routes  │                   │ │
│  │  │ /app         │    │  /api        │                   │ │
│  │  └──────┬───────┘    └──────┬───────┘                   │ │
│  │         │                  │                            │ │
│  │  ┌──────▼───────────────────▼───────┐                   │ │
│  │  │         Server Components        │                   │ │
│  │  │    (fetching directo a Supabase) │                   │ │
│  │  └──────────────────────────────────┘                   │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS / WebSocket
┌────────────────────────▼────────────────────────────────────┐
│                      SUPABASE                                │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Auth     │  │ Database │  │ Realtime │  │  Storage  │  │
│  │ (JWT)    │  │ Postgres │  │ (WS)     │  │  (Files)  │  │
│  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Estructura de Carpetas

```
talent4pro_matrices/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Route group - autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Route group - app principal
│   │   ├── matrices/        # Lista de matrices
│   │   │   └── [id]/        # Detalle/edición de una matriz
│   │   ├── evaluaciones/    # Evaluaciones activas
│   │   └── reportes/        # Reportes y análisis
│   ├── api/                 # API Routes (server-side)
│   │   ├── matrices/
│   │   └── evaluaciones/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── matrices/            # Componentes específicos de matrices
│   └── shared/              # Componentes compartidos
├── lib/
│   ├── supabase/           # Cliente Supabase + helpers
│   ├── utils/              # Utilidades generales
│   └── validations/        # Zod schemas
├── types/                   # TypeScript types
├── hooks/                   # Custom React hooks
└── stores/                  # Zustand stores
```

## Schema de Base de Datos (Supabase)

```sql
-- Organizaciones/Empresas
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matrices (plantillas)
CREATE TABLE matrices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  schema JSONB NOT NULL,      -- Definición de la matriz
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evaluaciones (instancias de matrices)
CREATE TABLE evaluaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matriz_id UUID REFERENCES matrices(id),
  evaluado_id UUID REFERENCES auth.users(id),
  evaluador_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft',  -- draft, in_progress, completed
  data JSONB,                    -- Respuestas/puntuaciones
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Flujos Principales

### Flujo 1: Crear Evaluación
1. Admin crea/selecciona matriz plantilla
2. Asigna evaluador y evaluado
3. Sistema genera instancia de evaluación
4. Evaluador recibe notificación
5. Evaluador completa la matriz
6. Sistema calcula puntuaciones
7. Reporte disponible para admin

### Flujo 2: Autenticación
1. Usuario entra a `/login`
2. Supabase Auth maneja OAuth/email
3. JWT almacenado en cookies httpOnly
4. Middleware Next.js protege rutas
5. Row Level Security en Supabase valida acceso

## Patrones de Código

### Server Component con Supabase
```typescript
// app/(dashboard)/matrices/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function MatricesPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: matrices } = await supabase
    .from('matrices')
    .select('*')
    .order('created_at', { ascending: false })

  return <MatricesList matrices={matrices} />
}
```
