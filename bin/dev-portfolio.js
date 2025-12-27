#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import { build } from "../src/build.js";

function ask(rl, question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function init() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const name = await ask(rl, "Your name: ");
    const title = await ask(rl, "Title: ");
    const location = await ask(rl, "Location: ");
    const bio = await ask(rl, "Short bio: ");
    const github = await ask(rl, "GitHub URL: ");
    const linkedin = await ask(rl, "LinkedIn URL: ");
    const email = await ask(rl, "Email: ");
    const skillsRaw = await ask(rl, "Skills (comma separated): ");

    const skills = skillsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const projects = [];
    const projectCountRaw = await ask(rl, "Number of projects to add: ");
    const projectCount = parseInt(projectCountRaw, 10) || 0;

    for (let i = 0; i < projectCount; i++) {
        console.log(`\nProject ${i + 1}:`);
        const pname = await ask(rl, "  Name: ");
        const pdesc = await ask(rl, "  Description: ");
        const ptechRaw = await ask(rl, "  Tech (comma separated): ");
        const plink = await ask(rl, "  Link (GitHub or live URL): ");

        const ptech = ptechRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        projects.push({
            name: pname,
            description: pdesc,
            tech: ptech,
            link: plink
        });
    }

    rl.close();

    const config = {
        name,
        title,
        location,
        bio,
        links: { github, linkedin, email },
        skills,
        projects
    };

    fs.writeFileSync("portfolio.json", JSON.stringify(config, null, 2), "utf-8");
    console.log("\nSaved portfolio.json");
}

const args = process.argv.slice(2);

if (args[0] === "init") {
    init();
} else if (args[0] === "build") {
    const configIndex = args.indexOf("--config");
    const outIndex = args.indexOf("--out");

    const configPath =
        configIndex !== -1 && args[configIndex + 1]
            ? args[configIndex + 1]
            : "portfolio.json";

    const outDir =
        outIndex !== -1 && args[outIndex + 1] ? args[outIndex + 1] : "dist";

    build({ configPath, outDir });
} else {
    console.log("Usage:");
    console.log("  dev-portfolio init");
    console.log("  dev-portfolio build --config portfolio.json --out dist");
}
