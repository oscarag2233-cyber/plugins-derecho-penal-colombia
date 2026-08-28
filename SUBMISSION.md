# Preparación para el Marketplace de ChatGPT

Este repositorio combina un plugin de skills/agentes con un servidor MCP de solo lectura compatible con ChatGPT y Codex.

La implementación sigue el patrón de servidor MCP con endpoint `/mcp`, herramientas `search` y `fetch`, esquemas de salida explícitos y anotaciones de seguridad. Consulte la [documentación oficial para construir un MCP server](https://developers.openai.com/plugins/build/mcp-server), la [guía de envío](https://developers.openai.com/plugins/deploy/submission) y las [directrices de plugins](https://developers.openai.com/plugins/app-guidelines).

## Clasificación

`submission-ready`, `tool-only`: no registra una interfaz visual; expone `search` y `fetch` para localizar y consultar fuentes oficiales. Esta forma también permite compatibilidad con flujos de búsqueda y recuperación.

## Herramientas expuestas

| Herramienta | Uso | `readOnlyHint` | `openWorldHint` | `destructiveHint` |
|---|---|---:|---:|---:|
| `search` | Localiza fuentes oficiales permitidas | `true` | `false` | `false` |
| `fetch` | Recupera el contenido público de una fuente permitida | `true` | `false` | `false` |

Las herramientas no reciben expedientes, nombres, identificaciones, credenciales ni datos personales como parte de su esquema. El servidor solo permite consultar URLs previamente incluidas en una lista de fuentes oficiales.

## Requisitos pendientes antes de enviar

- desplegar `server.js` en infraestructura pública con HTTPS estable y la ruta `/mcp`;
- configurar dominio y contacto de soporte;
- publicar política de privacidad y términos en URLs públicas que correspondan al editor;
- disponer de identidad de desarrollador o empresa verificada y permiso `Apps Management: Write` en OpenAI Platform;
- probar el servidor desplegado con MCP Inspector y luego en ChatGPT Developer Mode;
- escanear nuevamente el servidor desde el portal para importar las skills como snapshot de envío;
- revisar manualmente las respuestas extraídas de cada fuente oficial y preparar logo, categoría, prompts y casos de prueba.

## Desarrollo local

```bash
npm install
npm start
```

El endpoint local es `http://localhost:8787/mcp`. Para conectarlo en ChatGPT durante desarrollo, expóngalo mediante un túnel HTTPS y use la URL terminada en `/mcp`. Después de modificar herramientas o metadatos, refresque la conexión de la app.

## Envío

El archivo `chatgpt-app-submission.json` contiene los metadatos sugeridos, las justificaciones de anotaciones y exactamente cinco casos positivos y tres negativos. Debe importarse en el portal de envío y revisarse antes de enviar. El envío no publica automáticamente: OpenAI debe revisar y aprobar el plugin.
