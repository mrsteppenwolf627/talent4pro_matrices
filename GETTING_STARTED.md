# Getting Started - Talent4Pro Matrices

## Prerequisitos

- Node.js 18.x o superior
- npm o yarn
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) (para deploy)
- Git

## Setup Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/mrsteppenwolf627/talent4pro_matrices.git
cd talent4pro_matrices
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[tu-proyecto].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[tu-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[tu-service-role-key]
VERCEL_ENV=development
```

Las credenciales las encuentras en:
- Supabase Dashboard → Settings → API

### 4. Configurar Supabase

```bash
# Aplicar migraciones de base de datos
npx supabase db push

# O manualmente en el SQL Editor de Supabase Dashboard
# Ejecutar los archivos en /supabase/migrations/ en orden
```

### 5. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
talent4pro_matrices/
├── app/            # Next.js App Router pages
├── components/     # React components
├── lib/            # Utilities, Supabase clients
├── types/          # TypeScript types
├── hooks/          # Custom hooks
├── stores/         # Zustand state stores
└── supabase/       # Migrations y seeds
```

## Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run type-check   # Verificar TypeScript
npm run lint         # ESLint
npm test             # Tests con Vitest
```

## Deploy a Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Variables de entorno en Vercel Dashboard → Project → Settings → Environment Variables
```

## Documentación Adicional

- [Contexto del proyecto](./matrices_web_CONTEXT.md)
- [Decisiones de arquitectura](./matrices_web_ADRs.md)
- [Arquitectura detallada](./ARQUITECTURA_DETALLADA.md)
- [Primeras tareas](./PRIMERAS_3_TAREAS.md)
- [Análisis Hoja 1](./ANALISIS_HOJA_1.md)
- [Metodología](./RESUMEN_METODOLOGIA.md)

## Contacto y Soporte

- GitHub Issues: https://github.com/mrsteppenwolf627/talent4pro_matrices/issues
