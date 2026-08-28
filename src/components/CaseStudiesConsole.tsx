import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  id: string;
  tabLabel: string;
  title: string;
  stampBadge: string;
  problem: string;
  tech?: string[];
  result?: string;
  resultDesc?: string;
}

const cases: CaseStudy[] = [
  {
    id: "bundle",
    tabLabel: "01. BUNDLE PROBLEM",
    title: "THE BUNDLE PRODUCT PROBLEM",
    stampBadge: "SURVIVED BLACK FRIDAY 🛒",
    problem: "The platform required dynamic multi-item product bundles with complex pricing tiers, stock decrement across child items, cart state persistence, and webhook checkout safety.",
    result: "30%+ SALES INCREASE",
    resultDesc: "HIGHER AVERAGE ORDER VALUE",
    tech: ["Laravel", "MySQL Transactions", "Cart State", "Stripe"]
  },
  {
    id: "payment",
    tabLabel: "02. PAYMENTS & WEBHOOKS",
    title: "MULTI-GATEWAY PAYMENT ENGINE",
    stampBadge: "0 DUPLICATE CHARGES EVER 🛡️",
    problem: "Integrating multiple payment providers (PayPal, Checkout.com, Apple Pay) with strict webhook signature verification, replay protection, and idempotent event ingestion.",
    result: "ZERO DUPLICATE CHARGES",
    resultDesc: "IDEMPOTENT EVENT PIPELINE",
    tech: ["PayPal", "Checkout.com", "Apple Pay", "Queues", "Idempotency Keys"]
  },
  {
    id: "fraud",
    tabLabel: "03. FRAUD DETECTION",
    title: "REAL-TIME RISK & FRAUD ENGINE",
    stampBadge: "CARD ATTACKS NEUTRALIZED 🚫",
    problem: "Preventing card-testing attacks and fraudulent transactions without adding friction for legitimate buyers using velocity rules and BIN/ASN heuristics.",
    result: "SUB-100MS RISK SCORING",
    resultDesc: "AUTOMATED ALLOW / REVIEW / BLOCK",
    tech: ["IP Velocity", "Card Velocity", "BIN Validation", "Redis"]
  },
  {
    id: "analytics",
    tabLabel: "04. CLICKHOUSE ANALYTICS",
    title: "HIGH-VOLUME ANALYTICS AT SCALE",
    stampBadge: "MILLIONS OF ROWS IN <50MS 🚀",
    problem: "Running real-time sub-second aggregation queries over millions of customer events, sales orders, and fee records without loading down the primary transactional database.",
    result: "< 50MS QUERY LATENCY",
    resultDesc: "REAL-TIME EXECUTIVE REPORTING",
    tech: ["ClickHouse", "Event Pipeline", "Kafka/Queue", "Aggregations"]
  },
  {
    id: "performance",
    tabLabel: "05. CACHING & DB TUNING",
    title: "DATABASE OPTIMIZATION & REPLICAS",
    stampBadge: "KEEPS CTO ASLEEP AT 2AM 😴",
    problem: "Eliminating N+1 queries, indexing hot lookup tables, routing heavy reads to MySQL read-replicas, and implementing aggressive multi-tier Redis caching.",
    result: "80% DB LOAD REDUCTION",
    resultDesc: "SURVIVED TRAFFIC SURGES",
    tech: ["MySQL Optimization", "Read Replicas", "Redis", "Slow Query Log"]
  }
];

export default function CaseStudiesConsole() {
  const [activeId, setActiveId] = useState<string>("bundle");
  const activeCase = cases.find(c => c.id === activeId) || cases[0];

  return (
    <div className="console-wrapper glass-panel">
      {/* Console Tab Bar */}
      <div className="console-tabs mono">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`tab-btn ${activeId === c.id ? 'active text-accent' : ''}`}
            aria-selected={activeId === c.id}
          >
            {c.tabLabel}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="console-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="console-grid"
          >
            {/* Left: Problem & Business Results */}
            <div className="case-details">
              <div className="case-badge-row">
                <span className="stamp-badge mono">{activeCase.stampBadge}</span>
              </div>
              <h3 className="case-title">{activeCase.title}</h3>
              <p className="case-problem">{activeCase.problem}</p>

              {activeCase.tech && (
                <div className="case-tech mono">
                  {activeCase.tech.map((t, idx) => (
                    <span key={idx}>#{t}</span>
                  ))}
                </div>
              )}

              {activeCase.result && (
                <div className="case-metric-box">
                  <div className="result-metric text-accent mono">{activeCase.result}</div>
                  <div className="result-desc mono text-muted">{activeCase.resultDesc}</div>
                </div>
              )}
            </div>

            {/* Right: Modern CSS Architecture Flowchart */}
            <div className="case-diagram-panel">
              <div className="diagram-header mono text-muted">
                <span>[ARCHITECTURE FLOW: {activeCase.id.toUpperCase()}]</span>
              </div>

              {activeCase.id === 'bundle' && (
                <div className="flow-diagram">
                  <div className="flow-row multi-input">
                    <div className="flow-node">PRODUCT A</div>
                    <div className="flow-node">PRODUCT B</div>
                    <div className="flow-node">PRODUCT C</div>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node highlight">BUNDLE ENGINE (Pricing & Inventory Logic)</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">CART STATE PERSISTENCE</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">ATOMIC CHECKOUT & PAYMENT</div>
                </div>
              )}

              {activeCase.id === 'payment' && (
                <div className="flow-diagram">
                  <div className="flow-node">INCOMING PAYMENT REQUEST</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">PAYMENT GATEWAY (Stripe / PayPal)</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node highlight">WEBHOOK RECEIVER & SIGNATURE CHECK</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">IDEMPOTENCY KEY VERIFICATION</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-row split">
                    <div className="flow-node">PERSISTED EVENT QUEUE</div>
                    <div className="flow-node highlight">TRANSACTION DB</div>
                  </div>
                </div>
              )}

              {activeCase.id === 'fraud' && (
                <div className="flow-diagram">
                  <div className="flow-row multi-input small">
                    <div className="flow-node">IP VELOCITY</div>
                    <div className="flow-node">CARD ATTEMPTS</div>
                    <div className="flow-node">BIN / ASN</div>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node highlight">REAL-TIME RISK ENGINE</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-row split">
                    <div className="flow-node text-green">ALLOW</div>
                    <div className="flow-node text-yellow">MANUAL REVIEW</div>
                    <div className="flow-node text-red">BLOCK</div>
                  </div>
                </div>
              )}

              {activeCase.id === 'analytics' && (
                <div className="flow-diagram">
                  <div className="flow-row multi-input small">
                    <div className="flow-node">USERS</div>
                    <div className="flow-node">ORDERS</div>
                    <div className="flow-node">TRANSACTIONS</div>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">ASYNC EVENT INGESTION</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node highlight">CLICKHOUSE COLUMNAR STORAGE</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">SUB-SECOND REPORTING DASHBOARD</div>
                </div>
              )}

              {activeCase.id === 'performance' && (
                <div className="flow-diagram">
                  <div className="flow-node">INCOMING CLIENT REQUEST</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node highlight">REDIS CACHE HIT?</div>
                  <div className="flow-row split">
                    <div className="split-branch">
                      <div className="flow-arrow">YES</div>
                      <div className="flow-node text-green">RETURN CACHED (Sub-1ms)</div>
                    </div>
                    <div className="split-branch">
                      <div className="flow-arrow">NO</div>
                      <div className="flow-node">MYSQL READ-REPLICA</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .console-wrapper {
          overflow: hidden;
          margin-top: 2rem;
          border: 1px solid var(--color-border);
        }

        .console-tabs {
          display: flex;
          overflow-x: auto;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid var(--color-border);
        }

        .tab-btn {
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          border-right: 1px solid var(--color-border);
          border-bottom: 2px solid transparent;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          color: var(--color-text);
          background: rgba(255, 255, 255, 0.03);
        }

        .tab-btn.active {
          background: rgba(16, 185, 129, 0.08);
          border-bottom-color: var(--color-accent);
          font-weight: 700;
        }

        .console-body {
          padding: 2.5rem;
          min-height: 450px;
        }

        .console-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 900px) {
          .console-grid {
            grid-template-columns: 1.1fr 1fr;
          }
        }

        .case-badge-row {
          margin-bottom: 0.75rem;
        }

        .stamp-badge {
          display: inline-block;
          padding: 0.25rem 0.65rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px dashed var(--color-accent);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-accent);
          letter-spacing: 0.05em;
        }

        .case-title {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .case-problem {
          color: var(--color-text-muted);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .case-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .case-tech span {
          padding: 0.25rem 0.6rem;
          background: var(--glass-light-bg);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .case-metric-box {
          padding: 1.25rem;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid var(--color-accent);
          border-radius: 8px;
        }

        .result-metric {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .result-desc {
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        .case-diagram-panel {
          background: var(--glass-dark-bg);
          padding: 1.75rem;
          border-radius: 8px;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .diagram-header {
          font-size: 0.75rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px dashed var(--color-border);
          padding-bottom: 0.5rem;
        }

        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .flow-row {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          width: 100%;
        }

        .flow-row.split {
          gap: 1rem;
        }

        .flow-node {
          padding: 0.5rem 0.9rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          text-align: center;
          color: var(--color-text-muted);
          white-space: nowrap;
        }

        .flow-node.highlight {
          color: var(--color-accent);
          border-color: var(--color-accent);
          background: rgba(16, 185, 129, 0.08);
          box-shadow: 0 0 15px var(--color-accent-glow);
          font-weight: bold;
        }

        .flow-arrow {
          color: var(--color-accent);
          padding: 0.35rem 0;
          font-weight: bold;
          opacity: 0.7;
        }

        .multi-input {
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.75rem;
        }

        .multi-input .flow-node {
          flex: 1;
          font-size: 0.7rem;
          padding: 0.4rem;
        }

        .text-green { color: #10b981; border-color: #10b981; }
        .text-yellow { color: #f59e0b; border-color: #f59e0b; }
        .text-red { color: #ef4444; border-color: #ef4444; }

        .split-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .console-body {
            padding: 1.25rem;
          }
          .flow-node {
            font-size: 0.65rem;
            padding: 0.4rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
