# Talent4Pro — Plataforma de Evaluación de Talento Digital

> **v1.4.0** — Rediseño Premium Editorial completo

Plataforma web multi-usuario para digitalizar matrices de evaluación de talento empresarial. Reemplaza hojas Excel con una experiencia editorial premium.

**Stack:** Next.js 15 · Supabase · TypeScript · CSS Modules · Vercel

---

## Matrices disponibles

| # | Matriz | Campos | Estado |
|---|---|---|---|
| 1 | Ficha de Definición | 106 campos, 12 secciones | ✅ |
| 2 | MTP (Propósito Masivo Transformador) | 11 áreas, validación automática | ✅ |
| 3 | Ikigai | 35+ preguntas, 4 cuadrantes | ✅ |
| 4 | Valores | — | ⏳ |
| 5 | Fortalezas | — | ⏳ |

---

## Diseño Premium Editorial

### Paleta WS

```
Blanco:  #FFFFFF    Negro:   #000000    Gris:  #1A1A1A
Naranja: #FF6B35    Rojo:    #E63946    Oro:   #F4D35E    Cian: #0090DA
```

### Tipografía

- **h1**: Playfair Display — 72px, weight 900, letter-spacing -1px
- **h2-h3**: Bodoni Moda — 48px-32px, weight 700
- **Body**: Montserrat — 16px, weight 400-500

### Principios

- `border-radius: 0` en todo — bordes rectos, agudos
- Sombras: `4px 8px 16px rgba(0,0,0,0.2)` — elegantes, NO suaves
- Hover: cards y botones se elevan `translateY(-2px/-4px)` + shadow aumenta
- Layout asimétrico — cada página diferente (NO repetitivo)
- Centro síntesis: fondo **negro** con borde de color (MTP + Ikigai)

---

## Funcionalidades

- ✅ Auth con Supabase (JWT + RLS)
- ✅ Auto-save cada 30s (silencioso)
- ✅ Crear, ver, editar, eliminar matrices
- ✅ Toggle vistas: tarjetas / lista
- ✅ Modal confirmación antes de borrar
- ✅ Validación MTP automática
- ✅ Auto-síntesis Ikigai
- ✅ Responsive: mobile / tablet / desktop

---

## Quick Start

```bash
git clone https://github.com/mrsteppenwolf627/talent4pro_matrices.git
cd talent4pro_matrices
npm install
cp .env.example .env.local
# Completar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura

```
app/
├── layout.tsx              ← Navbar + Footer
├── page.tsx                ← Home editorial
├── dashboard/              ← Dashboard protegido
├── auth/                   ← Login / Register
├── matrices/               ← Listado + CRUD
│   ├── 1-ficha-definicion/
│   ├── 2-mtp/
│   └── 3-ikigai/
└── api/matrices/           ← REST API

components/
├── ui/                     ← Button, Card, Badge, ProgressBar
├── Sheet*.tsx              ← Sheets de cada matriz
├── MatricesList.tsx        ← Lista/tarjetas
└── Navigation/Footer.tsx

styles/
├── globals.css             ← Variables WS + tipografía
├── ui.module.css           ← Componentes base
├── FichaDefinicion.module.css
├── MTPNew.module.css
├── Ikigai.module.css
└── MatricesList.module.css

data/
├── fichaDefinicionFields.ts  ← 106 campos
├── mtpAreasReal.ts           ← 11 áreas
└── ikigaiQuadrantsReal.ts    ← 35+ preguntas
```

---

## Base de datos (Supabase)

```sql
-- Metadatos de cada matriz
matrices (
  id UUID PK,
  user_id UUID FK→auth.users CASCADE,
  type VARCHAR(50),   -- '1-ficha-definicion' | '2-mtp' | '3-ikigai'
  title VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Datos de células (estructura flexible)
matrix_data (
  id UUID PK,
  matrix_id UUID FK→matrices CASCADE,
  row_key VARCHAR(100),
  column_key VARCHAR(100),
  content JSONB,
  UNIQUE(matrix_id, row_key, column_key)
)
```

RLS activo: cada usuario solo ve y modifica sus propias matrices.

---

## Documentación

| Archivo | Contenido |
|---|---|
| `matrices_web_CONTEXT.md` | Estado actual, tareas, checklist |
| `matrices_web_ADRs.md` | 19 decisiones arquitectónicas |
| `DESIGN_SYSTEM_MEGA_PROMPT.md` | Guía completa de diseño |
| `docs/ESTADO_v1.4.0.md` | Changelog v1.4.0 |

---

## Próximas tareas

1. **T4**: Tests CRUD
2. **T5**: Code Review
3. **Matrices 4-8**: Valores, Fortalezas, Competencias, Feedback, Plan de Desarrollo

---

*Última actualización: Junio 2026 — v1.4.0*
*© Talent4Pro / LUV Studio — Privado*
