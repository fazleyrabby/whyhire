import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chatSequence = [
  { sender: 'Recruiter', text: 'Build me a Laravel payment system.' },
  { sender: 'AI', text: 'Absolutely! Here\'s 2,000 lines of code.' },
  { sender: 'Fazley', text: 'Hold on.' },
  { sender: 'Fazley', text: 'REVIEW CHECKLIST:\n✓ Idempotency\n✓ Webhook verification\n✓ Retry handling\n✓ Transaction state\n✓ Duplicate event protection\n✓ Failure handling\n✓ Security\n✓ Testing' },
  { sender: 'Fazley', text: 'That’s what you actually hire an engineer for.' }
];

export default function RecruiterChat() {
  const [messages, setMessages] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && messages < chatSequence.length) {
      const delay = messages === 0 ? 500 : messages === 1 ? 1500 : messages === 3 ? 1500 : 2000;
      const timer = setTimeout(() => {
        setMessages(m => m + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, messages]);

  return (
    <section className="section" id="vibe-coder">
      <div className="container">
        <div className="section-badge mono text-accent">[03 // AI PHILOSOPHY & AGENTS]</div>
        <h2 className="section-title">NEED A VIBE CODER?</h2>
        <p className="section-subtitle">
          I tinker with AI constantly—building autonomous agents, self-hosting open-weight LLMs, and stress-testing failure boundaries. But when it comes to production, I apply strict human engineering judgment.
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
            <span className="text-accent font-bold">03 // ZERO HALLUCINATIONS</span>
            <p>Strict human code verification on concurrency, database locks, idempotency, and security.</p>
          </div>
        </div>
        
        <div className="chat-container glass-panel" ref={containerRef}>
          <div className="chat-window-bar mono text-muted">
            <div className="chat-dots">
              <span></span><span></span><span></span>
            </div>
            <span>session: vibe_vs_engineer.sh</span>
          </div>

          <AnimatePresence>
            {chatSequence.slice(0, messages).map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`chat-message ${msg.sender.toLowerCase()}`}
              >
                <div className="message-header mono text-muted">{msg.sender}</div>
                <div className="message-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {isVisible && messages < chatSequence.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="typing-indicator mono text-muted"
              >
                {chatSequence[messages].sender} is typing...
              </motion.div>
            )}
          </AnimatePresence>
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
          margin-bottom: 3rem;
        }
        .ai-principle-card {
          padding: 1.25rem 1.5rem;
          font-size: 0.85rem;
          border: 1px solid var(--color-border);
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
        .chat-container {
          max-width: 650px;
          margin: 0 auto;
          padding: 1.5rem 2rem 2rem 2rem;
          min-height: 460px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border: 1px solid var(--color-border);
        }
        .chat-window-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border);
          font-size: 0.75rem;
        }
        .chat-dots {
          display: flex;
          gap: 5px;
        }
        .chat-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-border);
        }
        .chat-dots span:nth-child(1) { background: #ef4444; }
        .chat-dots span:nth-child(2) { background: #f59e0b; }
        .chat-dots span:nth-child(3) { background: #10b981; }
        .chat-message {
          display: flex;
          flex-direction: column;
          max-width: 85%;
        }
        .chat-message.recruiter {
          align-self: flex-start;
        }
        .chat-message.ai {
          align-self: flex-start;
        }
        .chat-message.fazley {
          align-self: flex-end;
          align-items: flex-end;
        }
        .message-header {
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
          letter-spacing: 0.05em;
        }
        .message-bubble {
          padding: 1rem 1.5rem;
          border-radius: 12px;
          line-height: 1.5;
          font-size: 0.95rem;
        }
        .recruiter .message-bubble {
          background: rgba(255,255,255,0.08);
          border-bottom-left-radius: 0;
        }
        .ai .message-bubble {
          background: rgba(59, 130, 246, 0.12);
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-bottom-left-radius: 0;
        }
        .fazley .message-bubble {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          border-bottom-right-radius: 0;
          text-align: right;
        }
        .typing-indicator {
          font-size: 0.85rem;
          margin-top: auto;
          padding-top: 1rem;
        }
      `}</style>
    </section>
  );
}
