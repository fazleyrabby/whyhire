import React from 'react';

export default function AIPhilosophy() {
  return (
    <section className="section" id="vibe-coder">
      <div className="container">
        <div className="section-badge mono text-accent">[03 // AI PHILOSOPHY & AGENTS]</div>
        <h2 className="section-title">NEED A VIBE CODER?</h2>
        <p className="section-subtitle">
          I tinker with AI constantly—building autonomous agents, self-hosting open-weight LLMs, and stress-testing failure boundaries. But when something is ridiculously difficult, I turn AI into an obsessive simulator to root out 99.99% of hidden issues.
        </p>

        {/* AI Competency Pillars */}
        <div className="ai-principles-grid mono">
          <div className="ai-principle-card glass-panel">
            <span className="text-accent font-bold">01 // LOCAL LLM INFRA</span>
            <p>Self-hosting open-weight models (Qwen 2.5, Ollama) on private Ubuntu VPS servers.</p>
          </div>
          <div className="ai-principle-card glass-panel">
            <span className="text-accent font-bold">02 // AGENTS & TOOL-USE</span>
            <p>Building automated tool-calling pipelines, stress-testing prompts, and breaking models on purpose.</p>
          </div>
          <div className="ai-principle-card glass-panel">
            <span className="text-accent font-bold">03 // 99.99% EDGE-CASE RADAR</span>
            <p>Stuck on an impossible bug? I turn AI into a simulation engine to predict and neutralize 99.99% of edge-case disasters.</p>
          </div>
          <div className="ai-principle-card glass-panel">
            <span className="text-accent font-bold">04 // ZERO HALLUCINATIONS</span>
            <p>Strict human code verification on concurrency, database locks, idempotency, and security.</p>
          </div>
        </div>

        {/* AI vs Human Comparison */}
        <div className="ai-vs-human-container mono">
          <div className="ai-side glass-panel">
            <div className="side-header text-muted">WHAT AI CAN DO</div>
            <ul className="comparison-list">
              <li><span className="bullet text-muted">→</span> Generate 2,000 lines of boilerplate in 10 seconds.</li>
              <li><span className="bullet text-muted">→</span> Write complex regex without checking StackOverflow.</li>
              <li><span className="bullet text-muted">→</span> Parse obscure documentation and APIs instantly.</li>
              <li><span className="bullet text-muted">→</span> Scaffold UI components at lightspeed.</li>
            </ul>
          </div>
          
          <div className="vs-badge text-accent">VS</div>

          <div className="human-side glass-panel">
            <div className="side-header text-accent">WHAT HUMANS DO BETTER</div>
            <ul className="comparison-list">
              <li><span className="bullet text-accent">→</span> Take the blame when production crashes at 3 AM.</li>
              <li><span className="bullet text-accent">→</span> Absorb your frustration. You can't curse at an AI for a broken production or lost sale—it won't understand. A human does.</li>
              <li><span className="bullet text-accent">→</span> Push back on bad product requirements.</li>
              <li><span className="bullet text-accent">→</span> Understand actual business logic and user pain.</li>
              <li><span className="bullet text-accent">→</span> Give a damn about the company's survival.</li>
            </ul>
          </div>
        </div>

        {/* The Human Element Quote */}
        <div className="ai-quote-container glass-panel mono">
          <div className="quote-icon text-accent">"</div>
          <p className="quote-text">
            AI can do it all, but when the server is down or a sale drops, AI cannot give you sympathy. It has zero emotion... as fun as it is to tinker with.
          </p>
        </div>
      </div>

      <style>{`
        .section-badge {
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .ai-principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-top: 3rem;
          margin-bottom: 3rem;
        }
        .ai-principle-card {
          padding: 1.25rem 1.5rem;
          font-size: 0.85rem;
          background: #0b0f19;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }
        .ai-principle-card span {
          display: block;
          margin-bottom: 0.4rem;
          letter-spacing: 0.05em;
        }
        .ai-principle-card p {
          color: var(--color-text-muted);
          line-height: 1.5;
          margin: 0;
        }
        
        /* AI vs Human */
        .ai-vs-human-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 3rem 0;
          position: relative;
        }
        @media (min-width: 768px) {
          .ai-vs-human-container {
            flex-direction: row;
            align-items: stretch;
          }
        }
        .ai-side, .human-side {
          flex: 1;
          padding: 1.5rem;
          background: rgba(11, 15, 25, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }
        .human-side {
          background: rgba(16, 185, 129, 0.03);
          border-color: rgba(16, 185, 129, 0.2);
        }
        .side-header {
          font-size: 0.9rem;
          font-weight: bold;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
        }
        .human-side .side-header {
          border-bottom-color: rgba(16, 185, 129, 0.2);
        }
        .comparison-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .comparison-list li {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.4;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .human-side .comparison-list li {
          color: #d1d5db;
        }
        .bullet {
          font-weight: bold;
        }
        .vs-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 0.1em;
          padding: 0.5rem;
        }
        @media (min-width: 768px) {
          .vs-badge {
            width: 40px;
            padding: 0;
          }
        }

        .ai-quote-container {
          margin-top: 1rem;
          padding: 1.5rem 2rem;
          background: rgba(11, 15, 25, 0.6);
          border-radius: 8px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        .quote-icon {
          font-size: 2.5rem;
          line-height: 1;
          font-family: serif;
          opacity: 0.7;
        }
        .quote-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin: 0;
          padding-top: 0.25rem;
        }
      `}</style>
    </section>
  );
}
