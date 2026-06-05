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

---

## ADR-019: Rediseño Premium Editorial

**Fecha**: Junio 2026
**Estado**: CONGELADA

**Decisión**: Rediseñar interfaz completa con paleta WS, tipografía editorial (Playfair Display + Bodoni Moda), bordes agudos (border-radius 0), sombras elegantes, y variación de layout editorial en CADA página.

**Razón**:
- UI anterior: genérica, redondeada, suave, corporativa
- Cliente quiere: premium, editorial, audaz, profesional
- Paleta WS (blanco/negro + vibrantes) es más impactante que colores pastel
- Tipografía serif masiva (Playfair/Bodoni) transmite premium
- Bordes rectos: más agudo, más editorial, menos "SaaS genérico"
- Variación editorial: no repetitivo, cada página tiene personalidad propia

**Implementación**:
- `app/globals.css` — Variables WS completas, reset, tipografía base
- `styles/ui.module.css` — Sistema de componentes border-radius 0
- `app/layout.tsx` — next/font: Playfair Display + Bodoni Moda + Montserrat
- `app/home.module.css` — Hero asimétrico negro+naranja, features hover negro
- `app/dashboard/dashboard.module.css` — Hero negro+cian, cards hover negro, CTA naranja
- `styles/MatricesList.module.css` — Cards gap:2px editorial, modal premium
- `styles/FichaDefinicion.module.css` — Border-left cian, Bodoni headers
- `styles/MTPNew.module.css` — Centro NEGRO premium con textarea blanca
- `styles/Ikigai.module.css` — Cuadrantes 4 colores, centro negro/borde cian

**Consecuencias**:
✅ Interfaz completamente rediseñada con premium editorial feel
✅ Paleta WS aplicada a todas las páginas
✅ Tipografía editorial (Playfair/Bodoni/Montserrat) en toda la app
✅ border-radius: 0 en botones, cards, inputs — agudos, NO redondeados
✅ Sombras elegantes (4px 8px 16px, NO suave blur)
✅ Variación editorial: dashboard ≠ matrices ≠ cada matrix
✅ Centro MTP + Ikigai: NEGRO con borde de color (destacado, premium)
✅ Cuadrantes Ikigai: 4 colores distintos
✅ Efectos hover: cards se vuelven negras, botones se levantan
✅ NO genérico LLM

**Documento maestro**: `DESIGN_SYSTEM_MEGA_PROMPT.md`
