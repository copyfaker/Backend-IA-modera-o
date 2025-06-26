import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function moderateText(text) {
  const prompt = `
Classifique o sentimento e detecte risco ou violação de política no seguinte texto:
Texto: "${text}"

Responda neste JSON:
{
  "sentimento": "positivo" | "negativo" | "neutro",
  "toxico": true | false,
  "temLink": true | false,
  "temTelefone": true | false,
  "permitido": true | false,
  "motivo": "..."
}
  `;

  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const content = chat.choices[0].message.content;

  try {
    const jsonStart = content.indexOf("{");
    const json = JSON.parse(content.slice(jsonStart));
    return json;
  } catch (e) {
    throw new Error("Resposta da IA inválida: " + content);
  }
}
