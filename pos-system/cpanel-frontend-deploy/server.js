/**
 * cPanel / CloudLinux Passenger-compatible Next.js server
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Required on many cPanel/Passenger hosts
if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

const dev = false;
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Request error:", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });

    if (typeof PhusionPassenger !== "undefined") {
      // Passenger mode (cPanel)
      server.listen("passenger", () => {
        console.log("Frontend ready (Passenger)");
      });
    } else {
      // Local / non-Passenger
      const port = parseInt(process.env.PORT || "3000", 10);
      server.listen(port, "0.0.0.0", () => {
        console.log(`Frontend ready on port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });
