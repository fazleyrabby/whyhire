import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const problems = [
  { id: 'db-slow', label: 'Database Slow' },
  { id: 'webhook', label: 'Duplicate Webhook' },
  { id: 'fraud', label: 'Fraud Spike' },
  { id: 'payment', label: 'Payment Failed' }
];

const resolutions: Record<string, string[]> = {
  'db-slow': [
    'INCIDENT DETECTED: DATABASE LATENCY',
    'WHAT\'S YOUR MOVE? → INVESTIGATE FIRST',
    'QUERY ANALYSIS',
    '↓',
    'SLOW QUERY ISOLATED',
    '↓',
    'INDEX OPTIMIZATION APPLIED',
    '↓',
    'REDIS CACHE LAYER ADDED',
    '↓',
    'READ REPLICA DEPLOYED',
    'SYSTEM STABLE'
  ],
  'webhook': [
    'INCIDENT DETECTED: SPAM WEBHOOKS',
    'EXTERNAL SYSTEM MISBEHAVING',
    'WEBHOOK RECEIVED',
    '↓',
    'SIGNATURE VALIDATION: PASSED',
    '↓',
    'IDEMPOTENCY CHECK: FAILED (DUPLICATE)',
    '↓',
    'EVENT DISCARDED',
    'SYSTEM PROTECTED'
  ],
  'fraud': [
    'INCIDENT DETECTED: CARD TESTING ATTACK',
    'RISK ENGINE ENGAGED',
    'IP VELOCITY: EXCEEDED',
    '↓',
    'BIN VALIDATION: FLAGGED',
    '↓',
    'SCORE: HIGH RISK',
    '↓',
    'PAYMENTS BLOCKED',
    'SYSTEM PROTECTED'
  ],
  'payment': [
    'INCIDENT DETECTED: PRIMARY GATEWAY DOWN',
    'TRANSACTION FAILED',
    '↓',
    'PAYMENT STATE REVERTED',
    '↓',
    'CIRCUIT BREAKER OPEN',
    '↓',
    'FALLBACK TO SECONDARY GATEWAY',
    '↓',
    'TRANSACTION SUCCESSFUL',
    'SYSTEM ADAPTED'
  ]
};

export default function IncidentSimulator() {
  const [activeProblem, setActiveProblem] = useState<string | null>(null);

  return (
    <section className="section" id="simulator">
      <div className="container">
        <h2 className="section-title text-accent">GIVE ME A PROBLEM.</h2>
        <p className="section-subtitle">These are the kinds of problems I enjoy solving in production.</p>
        
        <div className="simulator-grid">
          <div className="problem-buttons">
            {problems.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveProblem(p.id)}
                className={`btn btn-outline ${activeProblem === p.id ? 'active' : ''}`}
                style={{ 
                  width: '100%', 
                  marginBottom: '1rem',
                  borderColor: activeProblem === p.id ? 'var(--color-accent)' : 'var(--color-border)'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="simulator-display glass-panel">
            <AnimatePresence mode="wait">
              {activeProblem ? (
                <motion.div
                  key={activeProblem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="resolution-steps mono"
                >
                  {resolutions[activeProblem].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.4 }}
                      className={`step ${step === '↓' ? 'step-arrow text-accent' : ''}`}
                    >
                      {step}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="empty-state mono text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  SELECT AN INCIDENT VECTOR TO BEGIN DIAGNOSTICS...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style>{`
        .simulator-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }
        @media (min-width: 768px) {
          .simulator-grid {
            grid-template-columns: 300px 1fr;
          }
        }
        .simulator-display {
          min-height: 400px;
          padding: 2rem;
          background: var(--glass-dark-bg);
          display: flex;
          flex-direction: column;
        }
        .resolution-steps {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .step {
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.05);
          font-size: 0.9rem;
        }
        .step-arrow {
          background: transparent;
          padding: 0;
          text-align: center;
          font-weight: bold;
        }
        .empty-state {
          margin: auto;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
