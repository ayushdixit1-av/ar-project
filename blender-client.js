const net = require("net");

const HOST = "localhost";
const PORT = 9876;
const TIMEOUT_MS = 120000;

function sendCommand(code, strictJson = false) {
  return new Promise((resolve, reject) => {
    const sock = net.createConnection(PORT, HOST, () => {
      const request = JSON.stringify({
        type: "execute",
        code,
        strict_json: strictJson,
      });
      sock.write(request + "\0");
    });

    let buf = Buffer.alloc(0);
    const timer = setTimeout(() => {
      sock.destroy();
      reject(new Error("Timeout waiting for Blender response"));
    }, TIMEOUT_MS);

    sock.on("data", (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      const idx = buf.indexOf(0);
      if (idx !== -1) {
        clearTimeout(timer);
        const raw = buf.slice(0, idx).toString("utf-8");
        try {
          const parsed = JSON.parse(raw);
          if (parsed.status === "error") {
            reject(new Error(parsed.message || "Blender error"));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error("Invalid JSON response: " + raw.substring(0, 500)));
        }
        sock.destroy();
      }
    });

    sock.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function runStage(name, code) {
  console.log(`\n--- Sending: ${name} ---`);
  try {
    const resp = await sendCommand(code);
    console.log(`OK: ${JSON.stringify(resp.result)}`);
    if (resp.stdout) console.log("stdout:", resp.stdout.substring(0, 300));
    return resp;
  } catch (err) {
    console.error(`FAILED: ${err.message.substring(0, 500)}`);
    throw err;
  }
}

module.exports = { sendCommand, runStage };
