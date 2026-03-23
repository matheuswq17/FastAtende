const express = require("express");
const path = require("path");

const app = express();
const cliPortIndex = process.argv.findIndex((arg) => arg === "--port");
const cliPortValue = cliPortIndex >= 0 ? process.argv[cliPortIndex + 1] : process.argv[2];
const START_PORT = Number(cliPortValue || process.env.PORT || 3005);
const MAX_PORT_ATTEMPTS = 20;
const ROOT_DIR = __dirname;

app.get("/", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "index.html"));
});

app.get("/styles.css", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "styles.css"));
});

app.get("/script.js", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "script.js"));
});

app.get("/favicon.ico", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "icone_fastatende.png"), (error) => {
    if (error) {
      res.status(404).end();
    }
  });
});

app.get("/favicon.svg", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "icone_fastatende.png"), (error) => {
    if (error) {
      res.status(404).end();
    }
  });
});

app.get("/logo-fastatende.png", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "logo-fastatende.png"), (error) => {
    if (error) {
      res.status(404).end();
    }
  });
});

app.get("/icone_fastatende.png", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "icone_fastatende.png"), (error) => {
    if (error) {
      res.status(404).end();
    }
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

startServer(START_PORT);

function startServer(port, attempt = 0) {
  const server = app.listen(port);

  server.once("listening", () => {
    console.log(`FastAtende rodando em http://localhost:${port}`);
  });

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && attempt < MAX_PORT_ATTEMPTS) {
      const nextPort = port + 1;
      console.log(`Porta ${port} ocupada. Tentando ${nextPort}...`);
      startServer(nextPort, attempt + 1);
      return;
    }

    console.error("Nao foi possivel iniciar o servidor:", error.message);
    process.exit(1);
  });
}
