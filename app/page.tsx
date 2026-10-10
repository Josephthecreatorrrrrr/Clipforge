export default function Home() {
  return (
    <>
      <div className="container">
        <nav>
          <div className="logo">
            Clip<span>Forge</span>
          </div>
          <a href="#pricing" className="btn">
            Get Started
          </a>
        </nav>

        <header className="hero">
          <h1>
            Turn ideas into <span style={{ color: "#8b5cf6" }}>faceless shorts</span> in minutes
          </h1>
          <p>
            ClipForge writes the script, adds the voiceover, picks the visuals
            and burns in captions. No camera, no editing.
          </p>
          <a href="#pricing" className="btn">
            Create your first short
          </a>
        </header>

        <section className="section" id="features">
          <h2>Everything you need</h2>
          <div className="grid">
            <div className="card">
              <h3>AI Scripts</h3>
              <p>Hook-first scripts written for retention on TikTok, Reels and Shorts.</p>
            </div>
            <div className="card">
              <h3>Natural Voiceover</h3>
              <p>Pick from lifelike AI voices in multiple languages and tones.</p>
            </div>
            <div className="card">
              <h3>Auto Visuals</h3>
              <p>Matching footage and images are chosen for every line of the script.</p>
            </div>
            <div className="card">
              <h3>Animated Captions</h3>
              <p>Eye-catching word-by-word captions added automatically.</p>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <h2>How it works</h2>
          <div className="grid">
            <div className="card">
              <div className="step-num">01</div>
              <h3>Enter a topic</h3>
              <p>Type an idea or paste a link.</p>
            </div>
            <div className="card">
              <div className="step-num">02</div>
              <h3>AI builds your short</h3>
              <p>Script, voice, visuals and captions are generated.</p>
            </div>
            <div className="card">
              <div className="step-num">03</div>
              <h3>Download and post</h3>
              <p>Export in vertical HD and publish anywhere.</p>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <h2>Simple pricing</h2>
          <div className="grid">
            <div className="card">
              <h3>Starter</h3>
              <div className="price">$0</div>
              <p>3 shorts per month to try it out.</p>
            </div>
            <div className="card">
              <h3>Creator</h3>
              <div className="price">$19/mo</div>
              <p>30 shorts per month, no watermark.</p>
            </div>
            <div className="card">
              <h3>Pro</h3>
              <div className="price">$49/mo</div>
              <p>Unlimited shorts and priority rendering.</p>
            </div>
          </div>
        </section>
      </div>

      <footer>© 2026 ClipForge. All rights reserved.</footer>
    </>
  );
}
