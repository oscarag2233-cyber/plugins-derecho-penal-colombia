import { createServer as createHttpServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const PORT = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "*";
const FETCH_TIMEOUT_MS = 15000;
const MAX_TEXT_LENGTH = 24000;

const SOURCES = [
  {
    id: "suin-ley-599-2000",
    title: "SUIN-Juriscol — Ley 599 de 2000, Código Penal",
    url: "https://www.suin-juriscol.gov.co/viewDocument.asp?id=1663230",
    authority: "SUIN-Juriscol / Ministerio de Justicia",
    topics: "Código Penal Ley 599 de 2000 parte general delitos penas prescripción vigencia reformas",
    description: "Texto y evolución normativa informativa del Código Penal colombiano.",
  },
  {
    id: "suin-ley-906-2004",
    title: "SUIN-Juriscol — Ley 906 de 2004, Código de Procedimiento Penal",
    url: "https://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Leyes%2F1670249",
    authority: "SUIN-Juriscol / Ministerio de Justicia",
    topics: "Código de Procedimiento Penal Ley 906 de 2004 sistema penal acusatorio indagación investigación imputación acusación juicio prueba recursos medidas de aseguramiento",
    description: "Texto y evolución normativa informativa del Código de Procedimiento Penal.",
  },
  {
    id: "suin-reformas-codigo-penal",
    title: "SUIN-Juriscol — Reformas al Código Penal colombiano",
    url: "https://www.suin-juriscol.gov.co/legislacion/justicia.html",
    authority: "SUIN-Juriscol / Ministerio de Justicia",
    topics: "reformas Ley 599 de 2000 Ley 906 de 2004 política criminal penitenciaria sistema penal acusatorio",
    description: "Índice institucional para localizar reformas y normas relacionadas.",
  },
  {
    id: "funcion-publica-ley-599",
    title: "Gestor Normativo — Ley 599 de 2000",
    url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=6388",
    authority: "Departamento Administrativo de la Función Pública",
    topics: "Código Penal texto gestor normativo delito función pública penas",
    description: "Copia institucional en el Gestor Normativo de Función Pública.",
  },
  {
    id: "funcion-publica-ley-906",
    title: "Gestor Normativo — Ley 906 de 2004",
    url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=14787",
    authority: "Departamento Administrativo de la Función Pública",
    topics: "Código de Procedimiento Penal proceso penal audiencias competencia ejecución penas",
    description: "Copia institucional en el Gestor Normativo de Función Pública.",
  },
  {
    id: "csj-relatoria-penal",
    title: "Corte Suprema — Relatoría de la Sala de Casación Penal",
    url: "https://cortesuprema.gov.co/sala-de-casacion-penal-relatoria/",
    authority: "Corte Suprema de Justicia — Sala de Casación Penal",
    topics: "jurisprudencia penal casación tutela doctrina probable sistema penal acusatorio extractos relatoría",
    description: "Portal oficial de relatoría, publicaciones y materiales de consulta penal.",
  },
  {
    id: "csj-boletines-penal",
    title: "Corte Suprema — Boletines jurisprudenciales de la Sala Penal",
    url: "https://cortesuprema.gov.co/sala-de-casacion-penal-relatoria-boletines/",
    authority: "Corte Suprema de Justicia — Sala de Casación Penal",
    topics: "boletines jurisprudencia reciente sala penal decisiones 2026 2025",
    description: "Índice oficial de boletines jurisprudenciales periódicos.",
  },
  {
    id: "csj-consulta-jurisprudencia",
    title: "Corte Suprema — Sistema de consulta jurisprudencial",
    url: "https://www.cortesuprema.gov.co/corte/index.php/rl_aplicativo/",
    authority: "Corte Suprema de Justicia",
    topics: "consulta sentencias providencias radicado fecha ponente texto completo jurisprudencia",
    description: "Sistema institucional para buscar providencias por distintos criterios.",
  },
  {
    id: "cc-relatoria",
    title: "Corte Constitucional — Relatoría",
    url: "https://www.corteconstitucional.gov.co/relatoria/",
    authority: "Corte Constitucional de Colombia",
    topics: "jurisprudencia constitucional penal tutela constitucionalidad conflictos de jurisdicción derechos fundamentales",
    description: "Portal oficial de decisiones, boletines y relatoría constitucional.",
  },
  {
    id: "cc-c-007-2026",
    title: "Corte Constitucional — Sentencia C-007 de 2026",
    url: "https://www.corteconstitucional.gov.co/relatoria/2026/C-007-26.htm",
    authority: "Corte Constitucional de Colombia",
    topics: "legalidad penal JEP personalidad del agente individualización sanción conceptos jurídicos indeterminados",
    description: "Decisión constitucional de 2026 incorporada como semilla de búsqueda, no como lista exhaustiva.",
  },
  {
    id: "cc-c-225-2025",
    title: "Corte Constitucional — Sentencia C-225 de 2025",
    url: "https://www.corteconstitucional.gov.co/relatoria/2025/C-225-25.htm",
    authority: "Corte Constitucional de Colombia",
    topics: "Ley 599 de 2000 Ley 906 de 2004 control constitucional prisión domiciliaria",
    description: "Decisión constitucional relacionada con disposiciones penales y procesales.",
  },
  {
    id: "cc-su-063-2025",
    title: "Corte Constitucional — Sentencia SU-063 de 2025",
    url: "https://www.corteconstitucional.gov.co/relatoria/2025/SU063-25.htm",
    authority: "Corte Constitucional de Colombia",
    topics: "JEP competencia jurisdicción penal ordinaria juez natural víctimas graves violaciones derechos humanos tutela contra providencia",
    description: "Decisión de unificación sobre competencia entre jurisdicciones en un caso penal.",
  },
  {
    id: "jep-portal",
    title: "Jurisdicción Especial para la Paz — Portal institucional",
    url: "https://www.jep.gov.co/",
    authority: "Jurisdicción Especial para la Paz",
    topics: "JEP competencia justicia transicional comparecientes víctimas sanciones propias restaurativa",
    description: "Portal institucional para verificar competencia y decisiones de la JEP.",
  },
];

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value) => normalize(value).split(" ").filter((token) => token.length > 2);

function searchSources(query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return SOURCES
    .map((source) => {
      const haystack = normalize(`${source.title} ${source.authority} ${source.topics} ${source.description}`);
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { source, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.source.title.localeCompare(right.source.title))
    .slice(0, 8)
    .map(({ source }) => ({ id: source.id, title: source.title, url: source.url }));
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(source.url, {
      headers: {
        accept: "text/html,application/xhtml+xml,text/plain;q=0.9",
        "user-agent": "derecho-penal-colombia-mcp/0.1.0",
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`La fuente respondió HTTP ${response.status}.`);
    const html = await response.text();
    const text = stripHtml(html);
    const truncated = text.length > MAX_TEXT_LENGTH;
    return {
      id: source.id,
      title: source.title,
      text: truncated ? `${text.slice(0, MAX_TEXT_LENGTH)}\n\n[Contenido recortado; consulte la fuente oficial.]` : text,
      url: source.url,
      metadata: {
        authority: source.authority,
        retrievedAt: new Date().toISOString(),
        sourceType: "official-public-web-source",
        truncated,
        note: "La fuente oficial prevalece; SUIN-Juriscol advierte que sus datos son informativos y no certifican por sí solos la vigencia.",
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

const SEARCH_OUTPUT = {
  results: z.array(z.object({ id: z.string(), title: z.string(), url: z.string().url() })),
};

const FETCH_OUTPUT = {
  id: z.string(),
  title: z.string(),
  text: z.string(),
  url: z.string().url(),
  metadata: z.record(z.unknown()).optional(),
};

function createServer() {
  const server = new McpServer(
    { name: "derecho-penal-colombia", version: "0.1.0" },
    {
      instructions:
        "Consulta primero search y luego fetch para verificar fuentes oficiales colombianas. No trates resultados como asesoría definitiva: distingue texto normativo, jurisprudencia, inferencia y datos no verificados. Indica siempre la fecha de consulta y enlaza la fuente oficial.",
    },
  );

  server.registerTool(
    "search",
    {
      title: "Buscar fuentes penales colombianas",
      description:
        "Use this when the user wants to locate official Colombian criminal-law statutes, reforms, court decisions, or institutional jurisprudence sources. Returns citable official URLs; call fetch with a returned id to retrieve page text.",
      inputSchema: { query: z.string().min(1).max(500) },
      outputSchema: SEARCH_OUTPUT,
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ query }) => {
      const results = searchSources(query);
      const payload = { results };
      return {
        structuredContent: payload,
        content: [{ type: "text", text: JSON.stringify(payload) }],
      };
    },
  );

  server.registerTool(
    "fetch",
    {
      title: "Consultar fuente penal oficial",
      description:
        "Use this after search when the user needs the text of an official Colombian criminal-law source. Retrieves the public page associated with the returned source id and includes its canonical URL and retrieval timestamp.",
      inputSchema: { id: z.string().min(1).max(100) },
      outputSchema: FETCH_OUTPUT,
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ id }) => {
      const source = SOURCES.find((candidate) => candidate.id === id);
      if (!source) throw new Error("El id no corresponde a una fuente oficial permitida.");
      const payload = await fetchSource(source);
      return {
        structuredContent: payload,
        content: [{ type: "text", text: JSON.stringify(payload) }],
      };
    },
  );

  return server;
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  response.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "content-type, mcp-session-id, authorization");
  response.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

const httpServer = createHttpServer(async (request, response) => {
  if (!request.url) {
    response.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);

  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end(
      "Plugins Derecho Penal Colombia MCP server",
    );
    return;
  }

  if (request.method === "OPTIONS" && url.pathname === MCP_PATH) {
    setCorsHeaders(response);
    response.writeHead(204).end();
    return;
  }

  if (url.pathname === MCP_PATH && ["POST", "GET", "DELETE"].includes(request.method ?? "")) {
    setCorsHeaders(response);
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    response.on("close", () => {
      void transport.close();
      void server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(request, response);
    } catch (error) {
      console.error("MCP request failed", error);
      if (!response.headersSent) response.writeHead(500).end("Internal server error");
    }
    return;
  }

  response.writeHead(404).end("Not Found");
});

httpServer.listen(PORT, () => {
  console.log(`Derecho Penal Colombia MCP server listening on http://localhost:${PORT}${MCP_PATH}`);
});
