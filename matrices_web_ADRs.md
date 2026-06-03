# Architecture Decision Records (ADRs) - Talent4Pro Matrices

## ADR-001: Next.js como framework principal

**Fecha**: Junio 2026  
**Estado**: Aceptado

**Contexto**: Necesitamos un framework web moderno con SSR/SSG, buena DX y ecosistema robusto.

**Decisión**: Usar Next.js 14 con App Router.

**Consecuencias**:
- (+) Server Components para mejor performance
- (+) Deploy nativo en Vercel
- (+) File-based routing simplifica estructura
- (-) Curva de aprendizaje con App Router vs Pages Router

---

## ADR-002: Supabase como BaaS

**Fecha**: Junio 2026  
**Estado**: Aceptado

**Contexto**: Necesitamos autenticación, base de datos y storage sin gestionar infraestructura.

**Decisión**: Usar Supabase (PostgreSQL + Auth + Realtime + Storage).

**Consecuencias**:
- (+) Auth lista en horas, no días
- (+) Realtime out-of-the-box para colaboración
- (+) Row Level Security para multi-tenant
- (-) Vendor lock-in parcial
- (-) Cold starts en plan gratuito

---

## ADR-003: Vercel para hosting

**Fecha**: Junio 2026  
**Estado**: Aceptado

**Contexto**: Deploy simple, integración nativa con Next.js, preview deployments automáticos.

**Decisión**: Usar Vercel como plataforma de hosting.

**Consecuencias**:
- (+) Preview URLs por branch/PR
- (+) Edge Network global
- (+) CI/CD automático desde GitHub
- (-) Costo escala con uso en producción

---

## ADR-004: Estructura de datos - Matrices como JSON en JSONB

**Fecha**: Junio 2026  
**Estado**: Propuesto

**Contexto**: Las matrices tienen estructura variable según el tipo de evaluación.

**Decisión**: Almacenar la definición de la matriz como JSONB en Supabase, con columnas fijas para metadatos.

**Consecuencias**:
- (+) Flexibilidad para diferentes tipos de matrices
- (+) Queries GROQ-like con operadores JSONB de PostgreSQL
- (-) Menos validación a nivel DB
- (-) Migraciones de schema más complejas

---

## ADR-005: Tailwind CSS para estilos

**Fecha**: Junio 2026  
**Estado**: Aceptado

**Decisión**: Tailwind CSS + shadcn/ui para componentes base.

**Consecuencias**:
- (+) Velocidad de desarrollo alta
- (+) Consistencia visual sin CSS custom
- (-) Clases largas en JSX
