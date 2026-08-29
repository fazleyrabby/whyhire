import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chatSequence = [
  { sender: 'Recruiter', text: 'Build me a Laravel payment system.' },
  { sender: 'AI', text: 'Absolutely! Here\'s 2,000 lines of code.' },
  { sender: 'Fazley', text: 'Hold on.' },
  { sender: 'Fazley', text: 'REVIEW CHECKLIST:\n✓ Idempotency\n✓ Webhook verification\n✓ Retry handling\n✓ Transaction state\n✓ Duplicate event protection\n✓ Failure handling\n✓ Security\n✓ Testing' },
  { sender: 'Fazley', text: 'And if it’s an obscure edge-case? I turn AI into an obsessive interrogation tool to hunt down 99.99% of hidden landmines.' },
  { sender: 'Fazley', text: 'That’s what you actually hire an engineer for.' }
];

export default function HeroChat() {
  const [messages, setMessages] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

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
      const delay = messages === 0 ? 500 : messages === 1 ? 1500 : messages === 3 ? 1500 : messages === 4 ? 1500 : 2000;
      const timer = setTimeout(() => {
        setMessages(m => m + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, messages]);

  return (
    <>
      <div className="hero-chat-container glass-panel" ref={containerRef}>
        <div className="chat-window-bar mono text-muted">
            <div className="chat-dots">
              <span></span><span></span><span></span>
            </div>
            <span>session: vibe_vs_engineer.sh</span>
          </div>

          <div className="chat-messages-scroll-area" ref={scrollAreaRef}>
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
        .hero-chat-container {
          width: 100%;
          padding: 1.5rem 1rem 1rem 1.5rem; /* Adjusted padding for scrollbar */
          height: 480px; /* Fixed height instead of min-height */
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: rgba(11, 15, 25, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .chat-messages-scroll-area {
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-right: 0.5rem; /* Space for the scrollbar */
        }
        
        /* Custom Scrollbar for chat area */
        .chat-messages-scroll-area::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages-scroll-area::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .chat-messages-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .chat-messages-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
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
    </>
  );
}
