import type { App, McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import { useApp } from "@modelcontextprotocol/ext-apps/react";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MarkdownPreview } from "./markdown";

function extractMarkdown(result: CallToolResult): string | undefined {
  return result.content?.find((c) => c.type === "text")?.text;
}

function MarkdownApp() {
  const [toolResult, setToolResult] = useState<CallToolResult | null>(null);
  const [hostContext, setHostContext] = useState<McpUiHostContext | undefined>();

  const { app, error } = useApp({
    appInfo: { name: "Markdown Preview", version: "1.0.0" },
    capabilities: {},
    onAppCreated: (app) => {
      app.onteardown = async () => {
        console.info("App is being torn down");
        return {};
      };

      app.ontoolinput = async (input) => {
        console.info("Received tool call input:", input);
      };

      app.ontoolresult = async (result) => {
        console.info("Received tool call result:", result);
        setToolResult(result);
      };

      app.ontoolcancelled = (params) => {
        console.info("Tool call cancelled:", params.reason);
      };

      app.onerror = console.error;

      app.onhostcontextchanged = (params) => {
        setHostContext((prev) => ({ ...prev, ...params }));
      };
    },
  });

  useEffect(() => {
    if (app) {
      setHostContext(app.getHostContext());
    }
  }, [app]);

  if (error) return <div><strong>ERROR:</strong> {error.message}</div>;
  if (!app) return <div>Connecting...</div>;

  return (
    <MarkdownAppInner
      app={app}
      toolResult={toolResult}
      hostContext={hostContext}
    />
  );
}

interface MarkdownAppInnerProps {
  app: App;
  toolResult: CallToolResult | null;
  hostContext?: McpUiHostContext;
}

function MarkdownAppInner({ toolResult, hostContext }: MarkdownAppInnerProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (toolResult) {
      const markdown = extractMarkdown(toolResult);
      if (markdown) {
        setContent(markdown);
      }
    }
  }, [toolResult]);

  return (
    <main
      style={{
        paddingTop: hostContext?.safeAreaInsets?.top,
        paddingRight: hostContext?.safeAreaInsets?.right,
        paddingBottom: hostContext?.safeAreaInsets?.bottom,
        paddingLeft: hostContext?.safeAreaInsets?.left,
      }}
    >
      <MarkdownPreview content={content} />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MarkdownApp />
  </StrictMode>
);
