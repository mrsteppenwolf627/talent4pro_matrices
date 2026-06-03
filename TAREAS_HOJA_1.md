# Tareas Hoja 1 - Talent4Pro Matrices

## Descripción de la Hoja 1

La **Hoja 1** es la primera matriz de evaluación que se digitalizará. Contiene los criterios de evaluación base del sistema Talent4Pro.

## Análisis de la Hoja Original

### Estructura identificada
- **Filas**: Competencias/criterios de evaluación
- **Columnas**: Niveles de desempeño (1-5) o descriptores
- **Celdas**: Descripciones del comportamiento esperado
- **Metadatos**: Peso de cada competencia, área, categoría

## Tareas de Digitalización

### T1.1 - Mapeo de estructura
- [ ] Documentar todas las filas (competencias) de la Hoja 1
- [ ] Documentar todas las columnas (niveles/dimensiones)
- [ ] Identificar tipos de datos por celda
- [ ] Definir schema JSONB para esta matriz

### T1.2 - Schema de base de datos
- [ ] Crear migración SQL específica para Hoja 1
- [ ] Definir estructura JSONB del campo `schema`
- [ ] Crear índices para queries frecuentes
- [ ] Documentar el schema en TypeScript types

### T1.3 - Componente de visualización
- [ ] Crear `<MatrizHoja1 />` component
- [ ] Grid interactivo con todas las celdas
- [ ] Resaltado de celda seleccionada
- [ ] Modo lectura vs modo edición
- [ ] Responsive design (desktop first)

### T1.4 - Funcionalidad de evaluación
- [ ] Formulario de nueva evaluación
- [ ] Selección de evaluado
- [ ] Navegación por competencias
- [ ] Guardado automático (autosave)
- [ ] Validación de campos requeridos

### T1.5 - Cálculo de puntuaciones
- [ ] Lógica de cálculo por competencia
- [ ] Puntuación total ponderada
- [ ] Comparativa con evaluaciones anteriores
- [ ] Exportar resultados a PDF

### T1.6 - Testing
- [ ] Unit tests para lógica de cálculo
- [ ] Integration tests para guardado
- [ ] E2E test para flujo completo de evaluación

## Criterios de Aceptación Globales

- La Hoja 1 digitalizada es funcionalmente equivalente al Excel original
- El tiempo de completar una evaluación es ≤ al tiempo con Excel
- Los cálculos son 100% correctos vs Excel
- Los datos se guardan en tiempo real (no se pierde trabajo)

## Dependencias

```
Análisis Hoja 1 (ANALISIS_HOJA_1.md)
    └── T1.1 Mapeo
        └── T1.2 Schema DB
            └── T1.3 Componente visualización
                └── T1.4 Funcionalidad evaluación
                    └── T1.5 Cálculos
                        └── T1.6 Testing
```
