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
        <h2 className="section-title text-accent">NEED A VIBE CODER?</h2>
        <p className="section-subtitle">
          I can prompt the AI. I can review the AI. I can debug the AI.<br/>
          I can tell the AI it's wrong. And I can ship the result.
        </p>
        
        <div className="chat-container glass-panel" ref={containerRef}>
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
        .chat-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 450px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .chat-message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
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
          background: rgba(255,255,255,0.1);
          border-bottom-left-radius: 0;
        }
        .ai .message-bubble {
          background: rgba(59, 130, 246, 0.15); /* blueish */
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-bottom-left-radius: 0;
        }
        .fazley .message-bubble {
          background: rgba(16, 185, 129, 0.15); /* green/accent */
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
