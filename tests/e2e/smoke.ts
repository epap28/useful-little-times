import { spawn, type ChildProcess } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = 3000;
const baseUrl = `http://127.0.0.1:${port}`;

process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/useful_little_times?schema=public";
process.env.AUTH_SECRET ??= "local-e2e-secret-for-useful-little-times";
process.env.PLAYWRIGHT_BROWSERS_PATH ??= ".playwright-browsers";

function startServer() {
  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1"
      },
      stdio: ["ignore", "pipe", "pipe"],
      shell: false
    }
  );

  server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
  server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));

  return server;
}

async function waitForServer(server: ChildProcess) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 120_000) {
    if (server.exitCode !== null) {
      throw new Error(`Next dev server exited early with code ${server.exitCode}.`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // The server is still starting.
    }

    await delay(250);
  }

  throw new Error("Timed out waiting for the Next dev server.");
}

async function stopServer(server: ChildProcess) {
  if (server.exitCode !== null || !server.pid) {
    return;
  }

  if (process.platform === "win32") {
    await Promise.race([
      new Promise<void>((resolve) => {
        const killer = spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
          stdio: "ignore"
        });
        killer.on("close", () => resolve());
        killer.on("error", () => resolve());
      }),
      delay(2000)
    ]);
    server.stdout?.destroy();
    server.stderr?.destroy();
    return;
  }

  server.kill("SIGTERM");
  await Promise.race([
    new Promise<void>((resolve) => server.once("close", () => resolve())),
    delay(2000).then(() => {
      if (server.exitCode === null) {
        server.kill("SIGKILL");
      }
    })
  ]);
  server.stdout?.destroy();
  server.stderr?.destroy();
}

async function main() {
  const { chromium } = await import("playwright");
  const server = startServer();
  let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;

  try {
    await waitForServer(server);
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: /start/i }).click();
    await page.getByRole("heading", { name: /start small/i }).waitFor();
    await page.getByRole("button", { name: /create account/i }).waitFor();
    console.log("E2E smoke test passed: public start flow reaches the account screen.");
  } finally {
    await browser?.close();
    await stopServer(server);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
