# Primeras 3 Tareas - Talent4Pro Matrices

## Contexto

Estas son las 3 primeras tareas concretas para pasar de documentación a código funcional.

---

## TAREA 1: Setup del Proyecto Next.js + Supabase (Completada)

**Prioridad**: CRÍTICA  
**Estimación**: 2-3 horas  
**Dependencias**: Ninguna

### Subtareas
- [x] `npx create-next-app@latest talent4pro-app --typescript --tailwind --app`
- [x] Instalar dependencias: `@supabase/supabase-js @supabase/auth-helpers-nextjs`
- [x] Crear proyecto en Supabase (dashboard.supabase.com)
- [x] Configurar variables de entorno (`.env.local` desde `.env.example`)
- [x] Crear cliente Supabase en `lib/supabase/client.ts`
- [x] Crear cliente server-side en `lib/supabase/server.ts`
- [x] Verificar conexión con query básica

---

## TAREA 2: Autenticación con Supabase Auth (Completada)

**Prioridad**: ALTA  
**Estimación**: 3-4 horas  
**Dependencias**: TAREA 1

### Subtareas
- [x] Crear `middleware.ts` para proteger rutas
- [x] Crear página `/login` con formulario email/password
- [x] Implementar `signIn`, `signOut`, `signUp` con Supabase
- [x] Crear layout para rutas autenticadas `app/(dashboard)/layout.tsx`
- [x] Redirigir usuarios no autenticados a `/login`
- [x] Mostrar email del usuario en header
- [x] Implementar logout

---

## TAREA 3: Crear Primera Matriz (Hoja 1) en DB (Completada)

**Prioridad**: ALTA  
**Estimación**: 4-5 horas  
**Dependencias**: TAREA 1 + TAREA 2

### Subtareas
- [x] Crear migración SQL para tablas `matrices` y `evaluaciones`
- [x] Aplicar migración en Supabase
- [x] Configurar Row Level Security (RLS)
- [x] Crear seed con la estructura de la Hoja 1
- [x] Crear página `/matrices` con listado
- [x] Crear página `/matrices/[id]` con visualización básica
- [x] Verificar que la primera matriz se muestra correctamente

---

## TAREA 6: Listado de Matrices + Crear Nueva (Completada)

**Prioridad**: MEDIA  
**Estimación**: 3 horas  
**Dependencias**: TAREA 3

### Subtareas
- [x] Crear endpoint `GET /api/matrices/list`
- [x] Crear hook `useMatricesList`
- [x] Implementar componente `<MatricesList />`
- [x] Implementar modal `<CreateMatrixModal />`
- [x] Página `/matrices` con protección de ruta
- [x] Redirección automática tras creación

---

## TAREA 3.1b-REDESIGN: MTP Matrix Excel Style (Completada)

**Prioridad**: ALTA  
**Estimación**: 4 horas  
**Dependencias**: TAREA 3

### Subtareas
- [x] Layout de 2 columnas (Internos/Externos) + Centro
- [x] Bloques de área con preguntas guía visibles
- [x] Puntuación radio 0-5
- [x] Síntesis centralizada editable
- [x] Checklist de validación (Must Have / Must NOT)
- [x] Auto-save 30s

---

## Definición de "Done"

- Código commiteado en rama `main`
- Sin errores de TypeScript
- Sin errores de consola en browser
- README actualizado con instrucciones de setup
