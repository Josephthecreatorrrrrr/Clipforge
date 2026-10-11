"use client";

import { useState } from "react";

export default function ScriptForm() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setScript("");

    try {
      const res = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setScript(data.script);
      }
    } catch {
      setError("Network error. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
      <h3 style={{ marginBottom: 12 }}>Try it: generate a script</h3>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. 3 facts about black holes"
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 12,
          border: "1px solid #26263a",
          background: "#0b0b12",
          color: "#f4f4f8",
          fontSize: "1rem",
          marginBottom: 12,
        }}
      />
      <button
        onClick={generate}
        disabled={loading}
        className="btn"
        style={{ border: "none", cursor: "pointer", width: "100%" }}
      >
        {loading ? "Generating..." : "Generate script"}
      </button>
      {error && <p style={{ color: "#f87171", marginTop: 12 }}>{error}</p>}
      {script && (
        <p style={{ marginTop: 16, whiteSpace: "pre-wrap", color: "#f4f4f8" }}>
          {script}
        </p>
      )}
    </div>
  );
}
