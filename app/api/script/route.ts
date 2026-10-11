import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic || typeof topic !== "string") {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const prompt = `Write a faceless short-form video script (about 30 seconds, 70 to 90 words) on this topic: "${topic}".
Start with a strong hook in the first sentence. Use short, punchy sentences.
Output only the spoken narration, with no scene directions, labels or emojis.`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flashlash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "Gemini request failed" },
      { status: 500 }
    );
  }

  const script = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!script) {
    return NextResponse.json({ error: "No script returned" }, { status: 500 });
  }

  return NextResponse.json({ script });
}
