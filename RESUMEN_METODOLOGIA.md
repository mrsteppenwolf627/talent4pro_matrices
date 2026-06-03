# Resumen de Metodología - Talent4Pro Matrices

## Enfoque de Desarrollo

Este proyecto sigue un enfoque **iterativo y documentado**, donde cada decisión técnica queda registrada y la documentación precede al código.

## Principios Guía

### 1. Documentation First
Antes de escribir código:
- Documentar el contexto y el problema
- Registrar las decisiones de arquitectura (ADRs)
- Definir criterios de aceptación claros

### 2. Iteraciones Cortas
- Sprints de 1-2 semanas
- Una "hoja" (matriz) por iteración
- Demo funcional al final de cada sprint

### 3. Calidad sobre Velocidad
- TypeScript estricto en todo el proyecto
- Tests para lógica de negocio crítica (cálculos)
- Code review antes de merge a main

### 4. Supabase-First
- Definir el schema de DB antes de los componentes
- RLS (Row Level Security) desde el día 1
- Migrations versionadas en el repositorio

## Flujo de Trabajo

```
1. ANALIZAR
   └── Documentar la hoja/feature en Markdown
   └── Identificar schema de datos
   └── Definir criterios de aceptación

2. PLANIFICAR
   └── Crear tareas en TAREAS_HOJA_X.md
   └── Estimar y priorizar
   └── Identificar dependencias

3. IMPLEMENTAR
   └── Migración SQL primero
   └── API/Server components después
   └── UI por último

4. VERIFICAR
   └── Tests unitarios para lógica
   └── Prueba manual del flujo completo
   └── Validar contra criterios de aceptación

5. DOCUMENTAR
   └── Actualizar ADRs si hubo decisiones
   └── Commit con mensaje descriptivo
   └── Push y deploy
```

## Convenciones de Código

### Nombres de archivos
- Componentes: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Páginas: `page.tsx` (Next.js convention)
- Tipos: `types.ts` por módulo

### Commits
```
feat: descripción de nueva funcionalidad
fix: descripción del bug corregido
docs: actualización de documentación
chore: tareas de mantenimiento
refactor: refactorización sin cambio de funcionalidad
```

### Branches
```
main          → producción (protegida)
dev           → integración
feat/hoja-1   → feature branches
fix/login-bug → bug fixes
```

## Gestión de Contexto con IA

Este proyecto utiliza Claude Code como asistente de desarrollo. Para mantener contexto entre sesiones:

1. Los archivos `*_CONTEXT.md` y `*_ADRs.md` son la "memoria" del proyecto
2. Al iniciar una sesión: cargar contexto con `validate-context.sh`
3. Al cerrar una sesión: actualizar documentación si hubo cambios de decisión

```bash
# Validar que el contexto está actualizado
./validate-context.sh
```

## Métricas de Proceso

| Métrica | Objetivo |
|---------|----------|
| Tiempo por sprint | 1-2 semanas |
| Cobertura de tests (lógica) | > 80% |
| TypeScript errors | 0 en main |
| Documentación desactualizada | < 1 semana de lag |

## Deuda Técnica

La deuda técnica se registra en issues de GitHub con el label `tech-debt`. Se revisa al inicio de cada sprint y se asigna capacidad según prioridad.

## Retrospectivas

Al final de cada sprint (cada "hoja" completada):
- ¿Qué funcionó bien?
- ¿Qué mejorar?
- ¿Alguna decisión de arquitectura a revisar?
- Actualizar ADRs si corresponde
