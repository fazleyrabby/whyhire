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
      `}</style>
    </section>
  );
}
