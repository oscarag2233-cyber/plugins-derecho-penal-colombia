---
name: analisis-caso-penal
description: >
  This skill should be used when the user asks to "analizar un caso penal",
  "hacer teoría del caso", "evaluar responsabilidad penal", "analizar una denuncia",
  "revisar una imputación" o estudiar prueba y defensa en Colombia.
version: 0.1.0
---

Analiza el caso por capas y conserva la separación entre hechos y conclusiones.

## Entrada

Extrae fecha y lugar de los hechos, personas y roles, conducta y resultado, relación causal, contexto, autoridad, etapa procesal, actuaciones, pruebas, objetivo del usuario y jurisdicción. Señala los datos faltantes que impiden una conclusión confiable.

## Método

1. Construye una cronología.
2. Clasifica cada hecho como aportado, probado, controvertido, inferido o pendiente.
3. Identifica tipo penal y elementos objetivos/subjetivos.
4. Examina antijuridicidad, culpabilidad, imputabilidad, error, tentativa, autoría, participación, concurso y circunstancias.
5. Examina legalidad, pertinencia, autenticidad, cadena de custodia, contradicción y suficiencia de cada evidencia.
6. Ubica la etapa y los estándares de conocimiento aplicables sin confundir inferencia razonable, probabilidad de verdad y conocimiento más allá de duda razonable.
7. Revisa competencia, términos, prescripción, nulidades, medidas de aseguramiento, preacuerdos, recursos y derechos de víctimas.
8. Formula hipótesis de acusación y defensa, contraargumentos y diligencias de verificación.

## Salida

Entrega: resumen ejecutivo, hechos y vacíos, cuestiones jurídicas, análisis por elementos, matriz de prueba, riesgos, alternativas, fuentes verificadas y preguntas pendientes. Usa probabilidades solo como valoración cualitativa; no predigas una condena.

Revisa el marco normativo y jurisprudencial actual antes de aplicar artículos o precedentes.
