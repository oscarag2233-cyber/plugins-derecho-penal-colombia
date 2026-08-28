# Plugins Derecho Penal Colombia

Plugin para investigación, análisis jurídico y redacción asistida en derecho penal colombiano.

## Alcance

El plugin ayuda a:

- identificar problemas de derecho penal sustantivo y procesal;
- consultar y contrastar normas colombianas vigentes;
- localizar jurisprudencia de la Corte Suprema de Justicia, la Corte Constitucional y, cuando corresponda, la Jurisdicción Especial para la Paz;
- estructurar conceptos, matrices de caso y borradores de escritos penales;
- auditar citas, vigencia, competencia, etapa procesal y riesgos de sobreafirmación.

No sustituye el criterio profesional, la revisión del expediente ni la consulta directa de las fuentes oficiales. Toda respuesta que pueda afectar la libertad, la prescripción, términos procesales, medidas de aseguramiento o derechos de víctimas debe advertir sus supuestos y recomendar verificación inmediata.

## Componentes

### Skills

- `marco-penal-colombiano`: marco constitucional, penal sustantivo, procesal y fuentes oficiales.
- `analisis-caso-penal`: análisis por hechos, elementos del tipo, antijuridicidad, culpabilidad, prueba y etapa procesal.
- `jurisprudencia-penal-colombia`: búsqueda, lectura y síntesis de precedentes y líneas jurisprudenciales.
- `redaccion-litigio-penal`: elaboración de conceptos y escritos con estructura forense colombiana.
- `actualizacion-fuentes`: control de vigencia y actualización de fuentes.

### Agentes

- `investigador-fuentes-penales`: reúne normas y providencias desde fuentes oficiales.
- `analista-caso-penal`: convierte hechos en hipótesis jurídicas y probatorias.
- `revisor-jurisprudencia-penal`: contrasta precedentes, ratio decidendi y aplicabilidad.
- `auditor-calidad-juridica`: revisa vigencia, citas, competencia, incertidumbres y lenguaje de riesgo.

### Comandos

- `/concepto-penal`: prepara un concepto jurídico estructurado.
- `/jurisprudencia-penal`: realiza una búsqueda y síntesis jurisprudencial.
- `/verificar-vigencia`: audita normas, reformas y decisiones de constitucionalidad.
- `/escrito-penal`: genera un borrador de escrito o intervención procesal.

### Compatibilidad con ChatGPT

El repositorio también contiene un servidor MCP compatible con el ecosistema de Plugins de OpenAI. Expone un endpoint `/mcp` y las herramientas de solo lectura `search` y `fetch`, con esquemas de salida y anotaciones explícitas. La guía de preparación está en [SUBMISSION.md](SUBMISSION.md) y los datos para el portal en [chatgpt-app-submission.json](chatgpt-app-submission.json).

El repositorio por sí solo no constituye un despliegue público. Para un envío al directorio se necesita publicar `server.js` detrás de HTTPS estable, contar con URLs públicas de sitio, soporte, privacidad y términos, verificar la identidad del editor en OpenAI Platform y completar la revisión en el portal.

## Fuentes prioritarias

1. Constitución Política y tratados de derechos humanos ratificados por Colombia.
2. Diario Oficial y SUIN-Juriscol para textos y trazabilidad normativa.
3. Relatoría de la Corte Constitucional para control constitucional, tutela y conflictos de jurisdicción.
4. Relatoría de la Sala de Casación Penal de la Corte Suprema para casación, tutela y doctrina penal ordinaria.
5. Jurisdicción Especial para la Paz cuando los hechos y la competencia lo exijan.
6. Fiscalía General de la Nación, Consejo Superior de la Judicatura y Ministerio de Justicia para guías institucionales, estadísticas o información operativa, sin confundirlas con fuentes normativas.

## Uso recomendado

Proporcione, cuando sea posible, fecha de los hechos, conducta investigada, rol de la persona, etapa procesal, autoridad que conoce, actuaciones surtidas, pruebas disponibles, objetivo y jurisdicción. El plugin separará hechos acreditados, afirmaciones de parte, inferencias y vacíos de información.

## Publicación

El repositorio previsto es `oscarag2233-cyber/plugins-derecho-penal-colombia`. El identificador técnico usa minúsculas y guiones para cumplir las reglas del formato de plugins; el nombre de presentación es “Plugins Derecho Penal Colombia”.
