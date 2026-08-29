import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  sender: 'system' | 'user' | 'fazley';
  text: string;
};

export default function HeroTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'system', text: '> Connection established. Secure link active.' },
  ]);
  const [stage, setStage] = useState<'booting' | 'awaiting_input' | 'responding' | 'finished'>('booting');
  const [isTyping, setIsTyping] = useState(true);

  // Initial boot sequence
  useEffect(() => {
    if (stage === 'booting') {
      const timer1 = setTimeout(() => {
        setMessages(prev => [...prev, { id: '2', sender: 'fazley', text: 'Identify your intent:' }]);
        setIsTyping(false);
        setStage('awaiting_input');
      }, 1500);
      return () => clearTimeout(timer1);
    }
  }, [stage]);

  const handleSelection = (option: number) => {
    setStage('responding');
    
    let userText = '';
    let fazleyResponse: string[] = [];
    
    if (option === 1) {
      userText = 'I need a backend engineer to build scalable systems.';
      fazleyResponse = [
        'Executing sequence...',
        'I design high-availability Laravel APIs, secure payment gateways, and robust cloud infrastructure.',
        'Scroll down to review the production evidence.'
      ];
    } else {
      userText = 'I need someone to fix production fires and edge-cases.';
      fazleyResponse = [
        'Executing sequence...',
        'I specialize in zero-downtime architecture, aggressive error neutralization, and fixing things that break under extreme load.',
        'Scroll down to review the production evidence.'
      ];
    }

    // Add user message instantly
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userText }]);
    setIsTyping(true);

    // Stream Fazley's responses
    fazleyResponse.forEach((text, idx) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString() + idx, sender: 'fazley', text }]);
        if (idx === fazleyResponse.length - 1) {
          setIsTyping(false);
          setStage('finished');
        }
      }, 1000 + (idx * 1500)); // Staggered delays
    });
  };

  return (
    <div className="hero-terminal-wrapper glass-panel">
      <div className="terminal-header mono text-muted">
        <div className="terminal-dots">
          <span></span><span></span><span></span>
        </div>
        <span>guest@fazley-server: ~/init</span>
      </div>

      <div className="terminal-body mono">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`terminal-line ${msg.sender}`}
            >
              {msg.sender === 'fazley' && <span className="prompt-arrow text-accent">{'> '}</span>}
              {msg.sender === 'system' && <span className="prompt-arrow text-muted">{'# '}</span>}
              {msg.sender === 'user' && <span className="prompt-arrow" style={{color: '#f59e0b'}}>{'$ '}</span>}
              <span className="msg-content">{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="terminal-typing text-muted"
          >
            _
          </motion.div>
        )}

        {stage === 'awaiting_input' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="terminal-actions"
          >
            <button onClick={() => handleSelection(1)} className="terminal-btn">
              [1] "I need a backend engineer."
            </button>
            <button onClick={() => handleSelection(2)} className="terminal-btn">
              [2] "I need production fires fixed."
            </button>
          </motion.div>
        )}
      </div>

      <style>{`
        .hero-terminal-wrapper {
          background: rgba(11, 15, 25, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 420px;
          backdrop-filter: blur(12px);
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: rgba(0,0,0,0.4);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.75rem;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .terminal-dots span:nth-child(1) { background: #ef4444; }
        .terminal-dots span:nth-child(2) { background: #f59e0b; }
        .terminal-dots span:nth-child(3) { background: #10b981; }

        .terminal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #e2e8f0;
          overflow-y: auto;
        }

        .terminal-line {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .terminal-line.user {
          color: #f59e0b;
        }
        
        .terminal-line.system {
          color: #94a3b8;
          font-style: italic;
        }

        .terminal-typing {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .terminal-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .terminal-btn {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--color-accent);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          text-align: left;
          font-family: inherit;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .terminal-btn:hover {
          background: rgba(16, 185, 129, 0.2);
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
}
