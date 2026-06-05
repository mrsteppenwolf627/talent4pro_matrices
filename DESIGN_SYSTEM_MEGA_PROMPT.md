# 🎨 MEGA PROMPT: DESIGN SYSTEM TALENT4PRO

## VISIÓN: Rediseño completo inspirado en Mango Marketing (mango azul oscuro)

**Objetivo:** Crear un sistema de diseño profesional, moderno y consistente para Talent4Pro que sea:
- ✅ Aplicable a TODAS las matrices (Ficha, MTP, Ikigai, futuras)
- ✅ Documentado y escalable
- ✅ Reutilizable para nuevas matrices
- ✅ Profesional y con PRESENCIA visual

---

## PARTE 1: ANÁLISIS VISUAL MANGO MARKETING

### Características clave a CALCAR:

**Layout:**
- Hero section MASIVO (50% texto elegante + 50% imagen profesional)
- Navbar top limpia con información
- Secciones full-width alternadas
- Espaciado GENEROSO entre elementos
- Imágenes prominentes y de alta calidad

**Tipografía:**
- Headings: Serif elegante (tipo "Playfair Display")
- Body: Sans-serif limpio (tipo "Montserrat", "Poppins")
- Letra grande, legible, breathing room
- Jerarquía clara

**Colores:**
- Primario: Naranja (#F4A460) → **EN TU CASO: Azul Oscuro (#001F3F)**
- Secundario: Crema/Beige (#F5F1E8) → **EN TU CASO: Gris Claro (#F8F9FA)**
- Acentos: Negro/Gris oscuro → **IGUAL**
- Blanco limpio para secciones principales

**Componentes:**
- Botones grandes, rellenos, con hover sutil
- Cards con shadow mínima
- Border-left grueso en elementos destacados
- Badges/pills para metadata
- Icons simples y minimalistas

**Espaciado:**
- Padding vertical secciones: 80-100px
- Padding horizontal: 40px (desktop), 20px (mobile)
- Gap entre items: 24-32px
- Border-radius: 4-8px

---

## PARTE 2: PALETA DEFINITIVA (AZUL OSCURO)

```css
/* COLORES PRIMARIOS */
--primary-dark: #001F3F      /* Azul marino oscuro - navbar, headings */
--primary-blue: #0074D9      /* Azul eléctrico - botones, links */
--primary-cyan: #7FDBCA      /* Cyan/turquesa - acentos */

/* COLORES SECUNDARIOS */
--bg-light: #FFFFFF          /* Blanco puro */
--bg-soft: #F8F9FA           /* Gris muy claro - alternancia secciones */
--bg-warm: #F5F1E8           /* Crema cálida - para elegancia */

/* TEXTO */
--text-dark: #1A1A1A         /* Casi negro - body text */
--text-gray: #666666         /* Gris - secondary text */
--text-light: #FFFFFF        /* Blanco - en fondo oscuro */

/* ESTADOS */
--success: #27AE60           /* Verde - validación OK */
--warning: #F39C12           /* Naranja - alerta */
--error: #DC3545             /* Rojo - error, delete */

/* SOMBRAS */
--shadow-sm: 0 2px 8px rgba(0,0,0,0.06)
--shadow-md: 0 4px 12px rgba(0,0,0,0.08)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12)

/* BORDERS */
--border-color: #E0E0E0      /* Gris claro para borders */
--border-focus: #0074D9      /* Azul en focus */
```

---

## PARTE 3: TIPOGRAFÍA

```css
/* GOOGLE FONTS A IMPORTAR */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Montserrat:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

/* FUENTES */
--font-serif: 'Playfair Display', serif        /* Headings principales */
--font-sans: 'Montserrat', sans-serif          /* Headings secundarios */
--font-body: 'Inter', sans-serif               /* Body text */

/* SIZES */
h1: 48px, weight 700, font-serif
h2: 36px, weight 700, font-serif
h3: 28px, weight 600, font-sans
h4: 22px, weight 600, font-sans
p: 16px, weight 400, font-body, line-height 1.6
small: 14px, weight 400, font-body
label: 13px, weight 500, font-body, text-transform uppercase, letter-spacing 0.5px
```

---

## PARTE 4: COMPONENTES REUTILIZABLES

### 1. BUTTON (Todas las variantes)

```jsx
<Button variant="primary" size="lg">Crear Matriz</Button>
<Button variant="secondary" size="md">Más información</Button>
<Button variant="danger" size="sm">Eliminar</Button>
```

**Estilos:**
```css
/* PRIMARY */
background: #0074D9
color: white
padding: 14px 32px (lg), 12px 24px (md), 10px 16px (sm)
border-radius: 4px
font-weight: 600
border: none
cursor: pointer
transition: all 0.2s
hover: background #0052A3, box-shadow --shadow-md

/* SECONDARY */
background: transparent
border: 2px #0074D9
color: #0074D9
hover: background #F0F7FF

/* DANGER */
background: #DC3545
color: white
hover: background #C82333

/* DISABLED */
opacity: 0.5
cursor: not-allowed
```

### 2. CARD (Contenedor principal)

```jsx
<Card border="left" borderColor="primary">
  <Card.Header>Título</Card.Header>
  <Card.Body>Contenido</Card.Body>
</Card>
```

**Estilos:**
```css
background: white
border: 1px #E0E0E0
border-left: 4px #0074D9
border-radius: 8px
padding: 24px
box-shadow: --shadow-sm
hover: box-shadow --shadow-md, transition 0.2s
```

### 3. SECTION (Full-width alternada)

```jsx
<Section background="light">
  <Container>
    Contenido
  </Container>
</Section>
```

**Estilos:**
```css
width: 100vw
padding: 80px 40px (desktop), 60px 20px (tablet), 40px 16px (mobile)
background: alternado blanco (#FFF) / gris (#F8F9FA)
max-width container: 1200px
margin: 0 auto
```

### 4. INPUT/TEXTAREA

```jsx
<Input type="text" placeholder="..." />
<Textarea rows="4" />
```

**Estilos:**
```css
border: 1px #E0E0E0
border-radius: 4px
padding: 12px 16px
font-family: --font-body
font-size: 14px
line-height: 1.5
transition: border 0.2s, box-shadow 0.2s

focus:
  outline: none
  border-color: #0074D9
  box-shadow: 0 0 0 3px rgba(0,116,217,0.1)

error:
  border-color: #DC3545
  box-shadow: 0 0 0 3px rgba(220,53,69,0.1)
```

### 5. BADGE/PILL

```jsx
<Badge variant="primary">Completado</Badge>
<Badge variant="warning">Pendiente</Badge>
```

**Estilos:**
```css
display: inline-block
padding: 4px 12px
border-radius: 20px
font-size: 12px
font-weight: 600
text-transform: uppercase
letter-spacing: 0.5px

primary: background #E8F4FF, color #0074D9
success: background #E8F5E9, color #27AE60
warning: background #FFF3E0, color #F39C12
error: background #FFEBEE, color #DC3545
```

### 6. PROGRESS BAR

```jsx
<ProgressBar value={75} max={100} color="primary" />
```

**Estilos:**
```css
width: 100%
height: 8px
background: #E0E0E0
border-radius: 4px
overflow: hidden

fill:
  height: 100%
  background: #0074D9
  border-radius: 4px
  transition: width 0.3s ease

states:
  success (100%): background #27AE60
  warning (50-99%): background #F39C12
  error (<50%): background #DC3545
```

---

## PARTE 5: ESTRUCTURA POR PÁGINA

### LAYOUT GLOBAL (app/layout.tsx)

```
┌─────────────────────────────────────────────────┐
│ NAVBAR (--primary-dark)                         │
│ Logo | Nav Links | Auth                        │
└─────────────────────────────────────────────────┘
│                                                 │
│            CHILDREN (routed pages)              │
│                                                 │
├─────────────────────────────────────────────────┤
│ FOOTER (--primary-dark)                         │
│ Copyright | Links                              │
└─────────────────────────────────────────────────┘
```

### NAVBAR
```css
background: --primary-dark (#001F3F)
height: 64px
position: sticky
top: 0
z-index: 1000
display: flex
align-items: center
padding: 0 40px

logo: font-serif, size 28px, color white
nav-links: font-body, size 14px, color white, spacing 32px
auth-button: Button primary, size sm
```

### DASHBOARD (app/page.tsx)

```
┌─────────────────────────────────────────────────┐
│ HERO SECTION (MASIVO)                           │
│                                                 │
│ 50% TEXTO IZQUIERDA            50% IMAGEN DER   │
│                                                 │
│ Headline grande serif          [IMAGEN]         │
│ Subheading               (profesional, 1200px)  │
│ [Button CTA]                                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ PANEL PRINCIPAL (Section bg soft)               │
│                                                 │
│ Panel Principal (h3)                            │
│ Descripción corta                               │
│ [Ver Matrices] button                           │
└─────────────────────────────────────────────────┘
```

**Hero estilos:**
```css
background: linear-gradient(135deg, #001F3F 0%, #003d66 100%)
min-height: 600px
display: grid
grid-template-columns: 1fr 1fr
gap: 60px
align-items: center
padding: 100px 40px
color: white

/* Izquierda - Texto */
h1: font-serif, 48px, color white, margin-bottom 24px
p: font-body, 18px, color rgba(255,255,255,0.9), line-height 1.8
button: margin-top 32px

/* Derecha - Imagen */
img: width 100%, max-width 600px, border-radius 8px, box-shadow --shadow-lg
```

### MATRICES PAGE (/matrices)

```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
│ "Mis Matrices" (h2)   [Tarjetas] [Lista] [↻]   │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Card] [Card] [Card]  (VISTA TARJETAS)         │
│ [Card] [Card] [Card]                           │
│                                                 │
│ O                                               │
│                                                 │
│ [Row] [Ver] [Eliminar]  (VISTA LISTA)          │
│ [Row] [Ver] [Eliminar]                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Card estilos:**
```css
Card:
  border: 1px #E0E0E0
  border-left: 4px [COLOR_TIPO]
  padding: 24px
  border-radius: 8px
  background: white
  box-shadow: --shadow-sm
  hover: box-shadow --shadow-md, translate(0, -2px), transition 0.2s

  Badge tipo: font-sans, 12px, weight 600, color dinámico
  h4: título matriz, color --text-dark
  p: fecha, color --text-gray, font-size 13px
  
  Buttons:
    [Ver]: primary
    [Eliminar]: danger
    spacing: 8px entre botones
```

**Colores por tipo:**
```
1-ficha-definicion: border-left #0074D9, badge bg #E8F4FF, badge color #0074D9
2-mtp: border-left #7FDBCA, badge bg #E0F7F4, badge color #007A6C
3-ikigai: border-left #F39C12, badge bg #FFF3E0, badge color #E67E22
```

---

## PARTE 6: ESTRUCTURA MATRICES (Ficha, MTP, Ikigai)

### TOOLBAR (Sticky top)
```css
background: white
border-bottom: 1px #E0E0E0
padding: 16px 40px
position: sticky
top: 64px (bajo navbar)
z-index: 900
display: flex
justify-content: space-between
align-items: center

/* Izquierda - Título */
h3: título matriz

/* Centro - Estado */
"Guardado hace 30s" (font-body, 13px, color #999)
spinner si no está guardado

/* Derecha - Botones */
Button "Guardar" (primary) con loading state
```

### CONTENIDO MAIN (max-width 1200px, centrado)
```css
padding: 60px 40px (desktop)
padding: 40px 20px (tablet)
padding: 30px 16px (mobile)

Secciones/Cards:
  border-left: 4px [COLOR_PRIMARIO]
  background: white
  padding: 32px
  margin-bottom: 32px
  border-radius: 8px
  box-shadow: --shadow-sm
```

### FICHA DEFINICIÓN (/matrices/1-ficha-definicion/[id])

```
┌─────────────────────────────────┐
│ TOOLBAR                         │
├─────────────────────────────────┤
│                                 │
│ [Sección 1] colapsable          │
│ ├─ Pregunta 1 [textarea]        │
│ ├─ Pregunta 2 [textarea]        │
│ └─ 2/10 completadas (badge)     │
│                                 │
│ [Sección 2] colapsable          │
│ ├─ Pregunta 1 [textarea]        │
│ └─ 0/8 completadas              │
│                                 │
│ [... más secciones]             │
│                                 │
│ PROGRESS BAR GLOBAL: 28/106     │
└─────────────────────────────────┘
```

**Sección colapsable:**
```css
Header:
  background: #F8F9FA
  padding: 16px 20px
  cursor: pointer
  display: flex
  justify-content: space-between
  align-items: center
  
  Título: h4, color --primary-dark, font-weight 600
  Badge: "X/Y completadas", color dinámico
  Chevron: ↓ (anima cuando expande)

Body (expandida):
  padding: 24px 20px
  border-top: 1px #E0E0E0
  
  Campos:
    label: "Pregunta X"
    textarea: 4-6 líneas, border --border-color, focus --border-focus
    margin-bottom: 24px
```

### MTP (/matrices/2-mtp/[id])

```
┌────────────────┬─────────────────┬────────────────┐
│ ATRIBUTOS      │ ÁREA 12:        │ ATRIBUTOS      │
│ INTERNOS       │ MTP DEFINITIVO  │ EXTERNOS       │
│ (1-6)          │                 │ (7-11)         │
│                │ ÁREA 13:        │                │
│ [Área 1]       │ VALIDACIÓN      │ [Área 7]       │
│ [Preguntas]    │                 │ [Preguntas]    │
│ [Score 0-5]    │ [Checklist]     │ [Score 0-5]    │
│                │ [OK/ERROR]      │                │
│ [Área 2]       │                 │ [Área 8]       │
│ ...            │                 │ ...            │
└────────────────┴─────────────────┴────────────────┘
```

**Área Card (MTP):**
```css
border: 2px [COLOR_ÁREA]
border-radius: 8px
padding: 24px
background: white
box-shadow: --shadow-sm

Header:
  h4: nombre área, color [COLOR_ÁREA]
  Badge: puntuación 0-5, background [COLOR_DINÁMICO]

Preguntas:
  p: "→ Pregunta X"
  color: --text-gray
  font-size: 14px
  margin-bottom: 8px

Score Input:
  Radio buttons 0-5
  Color dinámico según valor (0=rojo, 5=verde)
```

**Centro (Área 12 + 13):**
```css
background: #F8F9FA
border: 2px #0074D9
border-radius: 8px
padding: 32px

Área 12 (MTP Definitivo):
  textarea: grande, border #0074D9
  
Área 13 (Validación):
  Checklist DEBE TENER (9 items)
  Checklist NO DEBE TENER (7 items)
  Button "Validar MTP"
  
  Si OK: banner verde, color #27AE60
  Si ERROR: banner rojo, color #DC3545, lista de errores
```

### IKIGAI (/matrices/3-ikigai/[id])

```
┌──────────────────────┬──────────────────────┐
│ ❤️ PASIÓN            │ ✨ VOCACIÓN          │
│ Lo que amas          │ En lo que eres bueno │
│                      │                      │
│ → Pregunta 1         │ → Pregunta 1         │
│   [textarea]         │   [textarea]         │
│ → Pregunta 2         │ → Pregunta 2         │
│   [textarea]         │   [textarea]         │
│ [...]                │ [...]                │
└──────────────────────┴──────────────────────┘

┌──────────────────────┬──────────────────────┐
│ 🌍 MISIÓN            │ 💼 PROFESIÓN         │
│ Lo que necesita...   │ Por lo que te pagan  │
│                      │                      │
│ → Pregunta 1         │ → Pregunta 1         │
│   [textarea]         │   [textarea]         │
│ [...]                │ [...]                │
└──────────────────────┴──────────────────────┘

┌──────────────────────────────────┐
│ 🎯 MI IKIGAI                     │
│ [textarea grande editable]       │
└──────────────────────────────────┘
```

**Cuadrante Ikigai:**
```css
border: 2px [COLOR_CUADRANTE]
border-radius: 8px
padding: 28px
background: white
box-shadow: --shadow-sm

Header:
  display: flex
  align-items: center
  gap: 12px
  
  Icon: 32px (emoji)
  Título: h4, color [COLOR_CUADRANTE]
  Subtítulo: p, color --text-gray, font-size 13px

Preguntas:
  li: "→ Pregunta X"
  color: --text-gray
  font-size: 14px
  margin-bottom: 12px
  margin-left: 0

Textarea por pregunta:
  border: 1px #E0E0E0
  border-radius: 4px
  padding: 12px 16px
  focus: border #0074D9, shadow 3px rgba(0,116,217,0.1)
  margin-bottom: 20px

Colores cuadrantes:
  Pasión: #FF6B6B
  Vocación: #95E1D3
  Misión: #FFE66D
  Profesión: #4ECDC4
```

**Centro (Mi Ikigai):**
```css
background: #F8F9FA
border: 2px #0074D9
border-radius: 8px
padding: 32px
margin-top: 40px

textarea:
  width: 100%
  min-height: 150px
  border: 1px #E0E0E0
  border-radius: 4px
  padding: 16px
  font-family: --font-body
  font-size: 16px
  line-height: 1.6
  
  focus: border #0074D9, box-shadow 0 0 0 3px rgba(0,116,217,0.1)
```

---

## PARTE 7: RESPONSIVE DESIGN

### BREAKPOINTS
```css
Desktop: 1200px+
Tablet: 768px - 1199px
Mobile: < 768px
```

### ADAPTACIONES POR BREAKPOINT

**Desktop (1200px+):**
- Navbar: 64px height, logo 28px
- Hero: 50% + 50% grid
- Matrices grid: 3 columnas
- MTP: 3 columnas (internos | centro | externos)
- Ikigai: 2x2 grid
- Padding: 40px
- Font sizes: 100%

**Tablet (768px - 1199px):**
- Navbar: 56px height, logo 22px
- Hero: stack vertical (100% + 100%) o ajustar
- Matrices grid: 2 columnas
- MTP: stack vertical
- Ikigai: 2x2 pero más compacto
- Padding: 24px
- Font sizes: 95%
- Secciones: gap reducido a 16px

**Mobile (< 768px):**
- Navbar: 56px height, hamburger menu
- Hero: stack vertical, imagen abajo
- Matrices grid: 1 columna
- MTP: 1 columna, stack vertical
- Ikigai: 1 columna, stack vertical
- Padding: 16px
- Font sizes: 90%
- h1: 36px, h2: 28px, h3: 22px, p: 15px
- Buttons: width 100% en mobile

---

## PARTE 8: GUÍA DE IMPLEMENTACIÓN

### ARCHIVOS A CREAR

**1. styles/globals.css**
```css
- Reset CSS
- Variables CSS (colores, fonts, sombras)
- Estilos globales (body, html, a)
- Tipografía imports
- Utility classes
```

**2. styles/components.css**
```css
- Estilos reutilizables (Card, Button, Badge, etc.)
- Hover states
- Focus states
- Animaciones
```

**3. components/ui/Button.tsx**
```jsx
- Variantes: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- Estados: disabled, loading
- Props: variant, size, onClick, children
```

**4. components/ui/Card.tsx**
```jsx
- Wrapper flexible
- Props: border, borderColor, shadow, children
- Subcomponents: Card.Header, Card.Body, Card.Footer
```

**5. components/ui/Badge.tsx**
```jsx
- Variantes: primary, success, warning, error
- Props: variant, children
- Uso para metadata, estados
```

**6. components/ui/ProgressBar.tsx**
```jsx
- Props: value, max, color
- Animación de fill
- Estados dinámicos
```

**7. components/Navbar.tsx**
```jsx
- Logo + Nav links + Auth button
- Sticky top
- Responsive hamburger mobile
```

**8. components/Footer.tsx**
```jsx
- Background dark
- Links, copyright
- Redes sociales
```

**9. components/Section.tsx**
```jsx
- Full-width alternada
- Props: background, children
```

**10. app/layout.tsx (actualizar)**
```jsx
- Navbar
- Children
- Footer
- Imports globals.css
```

### ARCHIVOS A ACTUALIZAR

- app/page.tsx (Hero + Dashboard)
- app/matrices/page.tsx (Listado + Toggle vistas)
- Todos los components de matrices (Ficha, MTP, Ikigai)
- Eliminar estilos antiguos (MTP.module.css, etc.)

---

## PARTE 9: CHECKLIST DE CONSISTENCIA

**Para CADA matriz nueva que se cree en el futuro:**

- [ ] ¿Usa componentes Button, Card, Badge del sistema?
- [ ] ¿Colores siguen la paleta definida?
- [ ] ¿Tipografía es Playfair (h1-h2), Montserrat (h3-h4), Inter (body)?
- [ ] ¿Espaciado respeta los gaps definidos (24-32px)?
- [ ] ¿Responsivo en mobile/tablet/desktop?
- [ ] ¿Shadows y borders consistentes?
- [ ] ¿Focus states en inputs?
- [ ] ¿Hover states en botones/cards?
- [ ] ¿Accessibility: contrast, labels, alt text?

---

## PARTE 10: EJEMPLO DE IMPLEMENTACIÓN (Matriz Nueva)

Si en el futuro se crea una matriz "MATRIZ X":

```jsx
// app/matrices/4-matriz-x/[id]/page.tsx
import SheetMatrixX from '@/components/SheetMatrixX'

export default async function Page({ params }) {
  const { id } = await params
  return <SheetMatrixX matrixId={id} matrixType="4-matriz-x" />
}

// components/SheetMatrixX.tsx
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import styles from '@/styles/MatrixX.module.css'

export default function SheetMatrixX({ matrixId, matrixType }) {
  // ... lógica
  
  return (
    <>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <h3>Matriz X</h3>
        <div>
          <span>Guardado</span>
          <Button variant="primary" size="md">Guardar</Button>
        </div>
      </div>
      
      {/* Contenido */}
      <section className={styles.container}>
        <ProgressBar value={50} max={100} />
        
        <Card border="left" borderColor="primary">
          <Card.Header>Sección 1</Card.Header>
          <Card.Body>
            {/* Campos */}
          </Card.Body>
        </Card>
      </section>
    </>
  )
}
```

---

## CONCLUSIÓN

Este DESIGN SYSTEM es la **GUÍA DEFINITIVA** para que:
1. El rediseño actual sea profesional y consistente
2. Todas las matrices futuras sigan el mismo patrón
3. Nuevos colaboradores sepan exactamente cómo diseñar
4. La UI sea coherente y escalable

**El documento debe vivir en el repositorio** y ser referenciado en EVERY PR de nuevas matrices.

---

**ESTADO: READY PARA IMPLEMENTACIÓN CON GEMINI**
