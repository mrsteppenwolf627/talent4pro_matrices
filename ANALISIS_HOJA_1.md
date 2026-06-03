# Análisis Hoja 1 - Talent4Pro Matrices

## Propósito

Análisis técnico y funcional de la primera hoja de matrices a digitalizar.

## Estructura de la Matriz

### Dimensiones Identificadas

| Dimensión | Descripción | Tipo de Dato |
|-----------|-------------|--------------|
| Competencia | Nombre de la competencia evaluada | string |
| Nivel | Nivel de desempeño (1-5) | integer |
| Descriptor | Descripción del comportamiento | string |
| Peso | Peso relativo de la competencia | float (0-1) |
| Área | Área funcional | enum |
| Categoría | Categoría de competencia | enum |

### Áreas Funcionales

- Técnico
- Liderazgo
- Comunicación
- Adaptabilidad
- Trabajo en equipo

### Niveles de Desempeño

| Nivel | Etiqueta | Descripción |
|-------|----------|-------------|
| 1 | Inicial | No cumple expectativas |
| 2 | En desarrollo | Cumple parcialmente |
| 3 | Competente | Cumple expectativas |
| 4 | Avanzado | Supera expectativas |
| 5 | Experto | Referente en la organización |

## Schema JSONB Propuesto

```json
{
  "version": "1.0",
  "tipo": "evaluacion_desempeno",
  "hoja": 1,
  "competencias": [
    {
      "id": "comp_001",
      "nombre": "Nombre de la competencia",
      "area": "Técnico",
      "categoria": "Core",
      "peso": 0.15,
      "niveles": {
        "1": "Descripción nivel 1",
        "2": "Descripción nivel 2",
        "3": "Descripción nivel 3",
        "4": "Descripción nivel 4",
        "5": "Descripción nivel 5"
      }
    }
  ],
  "instrucciones": "Texto de instrucciones para el evaluador",
  "escala_global": {
    "min": 1,
    "max": 5
  }
}
```

## Fórmulas de Cálculo

### Puntuación por Competencia
```
puntuacion_comp = nivel_seleccionado (1-5)
```

### Puntuación Ponderada Total
```
puntuacion_total = Σ (puntuacion_comp_i × peso_comp_i)
donde Σ peso_comp_i = 1.0
```

### Clasificación Final
```
< 2.0  → "Inicial"
2.0 - 2.9 → "En Desarrollo"
3.0 - 3.9 → "Competente"
4.0 - 4.4 → "Avanzado"
≥ 4.5  → "Experto"
```

## Reglas de Negocio

1. **Completitud**: Todas las competencias deben tener nivel asignado para calcular puntuación total
2. **Comentarios**: Obligatorios para niveles 1 y 5 (destacar o explicar)
3. **Autoevaluación**: Permitida, pero no influye en puntuación final
4. **Historial**: Máximo 12 meses de evaluaciones visibles por defecto
5. **Calibración**: Las evaluaciones pueden ser revisadas por RRHH antes de publicarse

## Mapping Excel → DB

| Campo Excel | Campo DB | Transformación |
|-------------|----------|----------------|
| Columna A (Competencia) | `schema.competencias[].nombre` | Texto directo |
| Columna B (Área) | `schema.competencias[].area` | Normalizar a enum |
| Columna C-G (Niveles 1-5) | `schema.competencias[].niveles` | Objeto JSON |
| Columna H (Peso %) | `schema.competencias[].peso` | Dividir entre 100 |

## Validaciones Requeridas

- Peso total de todas las competencias = 100%
- Mínimo 5 competencias, máximo 30
- Descriptores no pueden estar vacíos
- IDs de competencias únicos dentro de la matriz
