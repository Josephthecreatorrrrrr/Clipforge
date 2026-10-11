import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic, style, length } = await req.json();

  if (!topic || typeof topic !== "string") {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const seconds = [30, 45, 60].includes(length) ? length : 30;
  const words = seconds === 60 ? 150 : seconds === 45 ? 110 : 75;

  const prompt = `You are an expert scriptwriter for viral faceless short-form videos (TikTok, Reels, YouTube Shorts).
Topic: "${topic}"
Style: ${style || "Educational facts"}
Length: about ${seconds} seconds, roughly ${words} words of narration in total.

Return ONLY valid JSON in exactly this shape:
{
  "title": "catchy video title",
  "hook": "the first spoken line, a scroll-stopping hook",
  "scenes": [
    { "narration": "spoken words for this scene", "visual": "what should be on screen, described in 4 to 8 words" }
  ],
  "cta": "short closing call to action",
  "caption": "post caption under 150 characters",
  "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Rules:
- The first scene's narration must start with the hook.
- Use 5 to 8 scenes with short, punchy sentences.
- Visuals must be filmable stock footage ideas, with no on-screen people speaking.
- No emojis. Hashtags without the # symbol.`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
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

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return NextResponse.json({ error: "No script returned" }, { status: 500 });
  }

  try {
    const result = JSON.parse(text);
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: "Could not read the AI response. Try again." },
      { status: 500 }
    );
  }
}
