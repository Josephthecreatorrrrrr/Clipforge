"use client";

import { useState } from "react";

type Scene = { narration: string; visual: string };
type Result = {
  title: string;
  hook: string;
  scenes: Scene[];
  cta: string;
  caption: string;
  hashtags: string[];
};

const STYLES = [
  "Educational facts",
  "Storytime",
  "Motivational",
  "Mystery / Creepy",
  "Funny",
];
const LENGTHS = [30, 45, 60];

const field = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  border: "1px solid #26263a",
  background: "#0b0b12",
  color: "#f4f4f8",
  fontSize: "1rem",
  marginBottom: 12,
} as const;

export default function ScriptForm() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState(STYLES[0]);
  const [length, setLength] = useState(30);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style, length }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong");
      else setResult(data.result);
    } catch {
      setError("Network error. Try again.");
    }

    setLoading(false);
  }

  async function copyAll() {
    if (!result) return;
    const text = [
      result.title,
      "",
      ...result.scenes.map(
        (s, i) => `Scene ${i + 1}\nVoice: ${s.narration}\nVisual: ${s.visual}`
      ),
      "",
      `CTA: ${result.cta}`,
      "",
      `Caption: ${result.caption}`,
      result.hashtags.map((h) => "#" + h).join(" "),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
      <h3 style={{ marginBottom: 12 }}>Try it: generate a short</h3>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. 3 facts about black holes"
        style={field}
      />

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        style={field}
      >
        {STYLES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        style={field}
      >
        {LENGTHS.map((l) => (
          <option key={l} value={l}>
            {l} seconds
          </option>
        ))}
      </select>

      <button
        onClick={generate}
        disabled={loading}
        className="btn"
        style={{ border: "none", cursor: "pointer", width: "100%" }}
      >
        {loading ? "Generating..." : "Generate short"}
      </button>

      {error && <p style={{ color: "#f87171", marginTop: 12 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ marginBottom: 6 }}>{result.title}</h3>
          <p style={{ color: "#8b5cf6", fontWeight: 700, marginBottom: 16 }}>
            Hook: {result.hook}
          </p>

          {result.scenes.map((s, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #26263a",
                borderRadius: 12,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <div className="step-num">Scene {i + 1}</div>
              <p style={{ color: "#f4f4f8" }}>{s.narration}</p>
              <p style={{ color: "#9a9ab0", marginTop: 6, fontSize: "0.9rem" }}>
                Visual: {s.visual}
              </p>
            </div>
          ))}

          <p style={{ marginTop: 12 }}>
            <strong>CTA:</strong> {result.cta}
          </p>
          <p style={{ marginTop: 8, color: "#9a9ab0" }}>{result.caption}</p>
          <p style={{ marginTop: 8, color: "#ec4899" }}>
            {result.hashtags.map((h) => "#" + h).join(" ")}
          </p>

          <button
            onClick={copyAll}
            className="btn"
            style={{
              border: "none",
              cursor: "pointer",
              width: "100%",
              marginTop: 16,
            }}
          >
            {copied ? "Copied!" : "Copy everything"}
          </button>
        </div>
      )}
    </div>
  );
}
