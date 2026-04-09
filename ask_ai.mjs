import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Read .env manually (no external deps needed)
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, ".env");
const envContent = readFileSync(envPath, "utf-8");
const apiKey = envContent.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();

if (!apiKey) {
  console.error("OPENAI_API_KEY not found in .env");
  process.exit(1);
}

const projectDescription =
  "платформа на основе ИИ для автоматизации поиска и анализа тендеров";
const prompt = `Придумай 3 креативных названия для моего проекта: ${projectDescription}`;

console.log(`Запрос: ${prompt}\n`);
console.log("Ответ от OpenAI:");
console.log("-".repeat(40));

const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  }),
});

const data = await response.json();

if (!response.ok) {
  console.error("Ошибка API:", data.error?.message ?? JSON.stringify(data));
  process.exit(1);
}

console.log(data.choices[0].message.content);
