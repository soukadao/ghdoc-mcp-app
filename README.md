# GitHub Style Markdown Preview MCP App

GitHub Flavored Markdown (GFM) preview as an MCP App.

Docs: https://modelcontextprotocol.io/docs/extensions/apps

## Usage

```bash
npm run build    # Build UI into dist/mcp-app.html
npm run serve    # Start server on http://localhost:3001/mcp
```

## Packages

### Dependencies

| Package | Description |
|---------|-------------|
| `@modelcontextprotocol/ext-apps` | MCP Apps SDK (server + client) |
| `@modelcontextprotocol/sdk` | MCP SDK core |
| `react`, `react-dom` | React UI framework |
| `react-markdown` | Markdown renderer for React |
| `remark-gfm` | GitHub Flavored Markdown plugin |
| `github-markdown-css` | GitHub style CSS |
| `zod` | Schema validation |

### Dev Dependencies

| Package | Description |
|---------|-------------|
| `vite` | Build tool |
| `vite-plugin-singlefile` | Bundle into single HTML |
| `@vitejs/plugin-react` | Vite React plugin |
| `express`, `cors` | HTTP server |
| `tsx` | TypeScript execution |
| `typescript` | TypeScript compiler |

## Files

| File | Description |
|------|-------------|
| `server.ts` | MCP server with `preview-markdown` tool |
| `mcp-app.html` | UI entry point |
| `src/mcp-app.tsx` | React app using `useApp` hook |
| `src/markdown.tsx` | Markdown component with GFM support |
| `src/global.css` | GitHub markdown styling |
| `vite.config.ts` | Vite bundler config |
| `tsconfig.json` | TypeScript config |