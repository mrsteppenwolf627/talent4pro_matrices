# Primeras 3 Tareas - Talent4Pro Matrices

## Contexto

Estas son las 3 primeras tareas concretas para pasar de documentación a código funcional.

---

## TAREA 1: Setup del Proyecto Next.js + Supabase

**Prioridad**: CRÍTICA  
**Estimación**: 2-3 horas  
**Dependencias**: Ninguna

### Subtareas
- [ ] `npx create-next-app@latest talent4pro-app --typescript --tailwind --app`
- [ ] Instalar dependencias: `@supabase/supabase-js @supabase/auth-helpers-nextjs`
- [ ] Crear proyecto en Supabase (dashboard.supabase.com)
- [ ] Configurar variables de entorno (`.env.local` desde `.env.example`)
- [ ] Crear cliente Supabase en `lib/supabase/client.ts`
- [ ] Crear cliente server-side en `lib/supabase/server.ts`
- [ ] Verificar conexión con query básica

### Criterio de Aceptación
```bash
# La app corre sin errores
npm run dev
# La conexión a Supabase funciona
# Variables de entorno correctamente configuradas
```

---

## TAREA 2: Autenticación con Supabase Auth

**Prioridad**: ALTA  
**Estimación**: 3-4 horas  
**Dependencias**: TAREA 1

### Subtareas
- [ ] Crear `middleware.ts` para proteger rutas
- [ ] Crear página `/login` con formulario email/password
- [ ] Implementar `signIn`, `signOut`, `signUp` con Supabase
- [ ] Crear layout para rutas autenticadas `app/(dashboard)/layout.tsx`
- [ ] Redirigir usuarios no autenticados a `/login`
- [ ] Mostrar email del usuario en header
- [ ] Implementar logout

### Criterio de Aceptación
- Usuario puede registrarse y loguearse
- Rutas protegidas redirigen a login si no hay sesión
- Logout limpia la sesión correctamente

---

## TAREA 3: Crear Primera Matriz (Hoja 1) en DB

**Prioridad**: ALTA  
**Estimación**: 4-5 horas  
**Dependencias**: TAREA 1 + TAREA 2

### Subtareas
- [ ] Crear migración SQL para tablas `matrices` y `evaluaciones`
- [ ] Aplicar migración en Supabase
- [ ] Configurar Row Level Security (RLS)
- [ ] Crear seed con la estructura de la Hoja 1
- [ ] Crear página `/matrices` con listado
- [ ] Crear página `/matrices/[id]` con visualización básica
- [ ] Verificar que la primera matriz se muestra correctamente

### Criterio de Aceptación
- Tablas creadas en Supabase con RLS habilitado
- La Hoja 1 aparece en la lista de matrices
- Se puede ver el detalle de la matriz

---

## Orden de Ejecución

```
TAREA 1 → TAREA 2 → TAREA 3
(Setup)    (Auth)    (Primera Matriz)
```

## Definición de "Done"

- Código commiteado en rama `main`
- Sin errores de TypeScript
- Sin errores de consola en browser
- README actualizado con instrucciones de setup
