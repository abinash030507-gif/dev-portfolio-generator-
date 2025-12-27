import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function build({ configPath, outDir }) {
    const configFullPath = path.resolve(configPath);
    const outFullPath = path.resolve(outDir);

    if (!fs.existsSync(configFullPath)) {
        console.error(`Config file not found: ${configFullPath}`);
        process.exit(1);
    }

    const raw = fs.readFileSync(configFullPath, "utf-8");
    const data = JSON.parse(raw);

    const templatePath = path.join(__dirname, "..", "templates", "index.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    const skillsHtml = (data.skills || [])
        .map((s) => `<li>${s}</li>`)
        .join("\n");

    const projectsHtml = (data.projects || [])
        .map((p) => {
            const tech = (p.tech || []).join(", ");
            return `
        <article class="project">
          <h4><a href="${p.link}">${p.name}</a></h4>
          <p>${p.description}</p>
          <p><strong>Tech:</strong> ${tech}</p>
        </article>
      `;
        })
        .join("\n");

    let html = template
        .replace(/{{name}}/g, data.name || "")
        .replace("{{title}}", data.title || "")
        .replace("{{bio}}", data.bio || "")
        .replace("{{location}}", data.location || "")
        .replace("{{github}}", data.links?.github || "#")
        .replace("{{linkedin}}", data.links?.linkedin || "#")
        .replace("{{email}}", data.links?.email || "")
        .replace("{{skills}}", skillsHtml)
        .replace("{{projects}}", projectsHtml);

    fs.mkdirSync(outFullPath, { recursive: true });
    fs.writeFileSync(path.join(outFullPath, "index.html"), html, "utf-8");

    const cssSrc = path.join(__dirname, "..", "templates", "style.css");
    const cssDest = path.join(outFullPath, "style.css");
    if (fs.existsSync(cssSrc)) {
        fs.copyFileSync(cssSrc, cssDest);
    }

    console.log(`Portfolio generated at ${path.join(outFullPath, "index.html")}`);
}
