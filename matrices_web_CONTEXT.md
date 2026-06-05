# Talent4Pro Matrices - Contexto del Proyecto

## Visión General

**Talent4Pro Matrices** es una aplicación web que digitaliza y automatiza el sistema de matrices de evaluación de talento utilizado actualmente en hojas de cálculo (Excel/Google Sheets).

## Problema que Resuelve

- Las matrices de evaluación están dispersas en múltiples hojas de cálculo
- No hay trazabilidad ni historial de cambios
- Colaboración limitada entre evaluadores
- Sin integración con otros sistemas de HR

## Solución

Plataforma web con:
- Matrices interactivas digitales
- Evaluaciones colaborativas en tiempo real
- Historial y trazabilidad completa
- Integración con Supabase como backend

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 15 (App Router) |
| Backend/DB | Supabase (PostgreSQL + Auth) |
| Hosting | Vercel |
| Styling | CSS Modules (design system propio) |
| Tipografía | Playfair Display + Bodoni Moda + Montserrat |

## Usuarios Objetivo

- **Evaluadores**: RRHH, managers, líderes de equipo
- **Evaluados**: Empleados, candidatos
- **Admins**: Configuradores del sistema de matrices

## Métricas de Éxito

- Reducción del tiempo de evaluación en 60%
- 100% de trazabilidad en evaluaciones
- Adopción por parte del equipo en el primer mes

---

## ESTADO ACTUAL (v1.4.0) — Rediseño Premium Editorial + Design System

### Versión: 1.4.0
Anterior: v1.3.0 (Design System genérico)
Actual: v1.4.0 (Rediseño Premium Editorial completo — Paleta WS, Tipografía editorial, bordes agudos)

### 🎨 REDISEÑO PREMIUM EDITORIAL

**Inspiración:** Paleta y tipografía estilo WS (editorial, audaz, premium)

**Paleta de colores WS:**
- Primarios: #FFFFFF (blanco), #000000 (negro), #1A1A1A (gris oscuro)
- Vibrantes: #FF6B35 (naranja), #E63946 (rojo), #F4D35E (oro), #0090DA (cian)
- Uso: backgrounds alternados blanco/negro, acentos vibrantes en botones/borders

**Tipografía Editorial:**
- h1: Playfair Display, 72px, weight 800-900, letter-spacing -1px
- h2: Bodoni Moda, 48px, weight 700, letter-spacing -0.5px
- h3: Bodoni Moda, 32px-40px, weight 600-700
- Body: Montserrat, 16px, weight 400-500, line-height 1.7
- Label: Montserrat, 12px, weight 700, uppercase, letter-spacing 1px

**Componentes Premium:**
- Buttons: border-radius 0, shadow 4px 8px 16px rgba(0,0,0,0.2), hover levanta (-2px)
- Cards: border-radius 0, border 2px color-tipo, shadow elegante, hover eleva (+4px)
- Secciones: alternadas blanco/#000000/color vibrante, padding 80-100px, layout asimétrico

**Variación Editorial (cada página diferente):**
- Dashboard: Hero negro/cian + texto blanco, cards blancas, CTA naranja
- Matrices: Cards border-top 4px color-tipo, grid con gap:2px efecto editorial
- Ficha: Secciones con border-left cian, inputs border 2px
- MTP: Centro NEGRO con border naranja, textarea blanca semitransparente
- Ikigai: Cuadrantes coloridos, centro NEGRO con borde cian 3px

### Colores por tipo de matriz:
- Ficha Definición: `#0090DA` (cian)
- MTP: `#FF6B35` (naranja)
- Ikigai: `#E63946` (rojo)

### FASE ACTUAL (v1.4.0)

| Tarea | Status | Notas |
|---|---|---|
| T3.1a: Ficha Definición | ✅ | 106 campos, 12 secciones, auto-save |
| T3.1b: MTP | ✅ | 11 áreas, validación, centro negro |
| T3.1c: Ikigai | ✅ | 35+ preguntas, cuadrantes coloreados, auto-síntesis |
| T6: Listado Matrices | ✅ | Cards + vista lista, create modal |
| T6.5: Delete + Toggle Vistas | ✅ | DELETE API, modal confirmación, toggle tarjetas/lista |
| T7: Design System | ✅ | Button, Card, Badge, ProgressBar, Section |
| T8: Rediseño Premium | ✅ | Paleta WS, tipografía editorial, border-radius 0 |

### PRÓXIMAS TAREAS (FASE 2):
- T4: Tests CRUD
- T5: Code Review
- Matrices futuras (4-Valores, 5-Fortalezas, etc.)

### CHECKLIST PARA FUTURAS MATRICES:
- [ ] Usa componentes UI (Button, Card, Badge, ProgressBar)
- [ ] Paleta WS: blanco, negro, + vibrante de tipo
- [ ] Tipografía: Playfair (h1), Bodoni (h2-h3), Montserrat (body)
- [ ] Borders: border-radius 0 (rectas, NO redondeadas)
- [ ] Sombras: elegantes 4px 8px 16px
- [ ] Espaciado: 32px gaps, 40-48px padding cards
- [ ] Hover states: levanta/eleva + shadow aumenta
- [ ] Layout editorial: asimétrico, variado
- [ ] Centro/síntesis: fondo negro con borde de color
- [ ] Responsive: mobile/tablet/desktop

### Archivos del sistema de diseño:
- `app/globals.css` — Variables WS, tipografía, reset
- `styles/ui.module.css` — Botones/Cards/Badges/ProgressBar
- `components/ui/Button.tsx` — Variantes + tamaños
- `components/ui/Card.tsx` — Con prop borderLeft
- `components/ui/Badge.tsx` — Variantes primary/success/warning/error
- `components/ui/ProgressBar.tsx` — Auto-color por progreso
- `components/Navigation.tsx + Navigation.module.css` — Navbar negra editorial
- `components/Footer.tsx + Footer.module.css` — Footer negro
- `styles/FichaDefinicion.module.css` — Cian tipo
- `styles/MTPNew.module.css` — Naranja tipo, centro negro
- `styles/Ikigai.module.css` — Rojo tipo, cuadrantes, centro negro/cian
- `styles/MatricesList.module.css` — Cards borde-top, modal premium
- `DESIGN_SYSTEM_MEGA_PROMPT.md` — Documento maestro de diseño
