import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <span className="text-accent">Fazley Rabbi's Interactive Dev Console [v2.4.0]</span>
          <br />
          Type <span className="text-accent font-bold">help</span> or click the quick command chips below.
        </div>
      )
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle with backtick (`) or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p>  <span className="text-accent font-bold">sudo hire fazley</span> - Initiate immediate hire sequence</p>
            <p>  <span className="text-accent font-bold">stats</span>            - Print production engineering metrics</p>
            <p>  <span className="text-accent font-bold">stack</span>            - View battle-tested tech stack</p>
            <p>  <span className="text-accent font-bold">superpower</span>       - The 99.99% edge-case & AI debugging radar</p>
            <p>  <span className="text-accent font-bold">vibe</span>             - Check AI & engineering philosophy</p>
            <p>  <span className="text-accent font-bold">homelab</span>          - Live server infrastructure telemetry</p>
            <p>  <span className="text-accent font-bold">contact</span>          - Direct communication endpoints</p>
            <p>  <span className="text-accent font-bold">clear</span>            - Clear terminal window</p>
          </div>
        );
        break;

      case 'superpower':
      case 'edgecases':
        output = (
          <div className="text-emerald-300">
            <p>⚡ <span className="text-accent font-bold">THE 99.99% EDGE-CASE RADAR:</span></p>
            <p>Hit an impossibly obscure bug with zero StackOverflow results?</p>
            <p>I turn AI into an obsessive simulation engine—interrogating failure surfaces, stress-testing hypotheses, and neutralizing 99.99% of hidden landmines before they ever touch production.</p>
          </div>
        );
        break;

      case 'sudo hire fazley':
        output = (
          <div className="text-green-400">
            <p>[AUTH GRANTED] Root access confirmed.</p>
            <p>✓ Production downtime risk: <span className="text-accent font-bold">-90%</span></p>
            <p>✓ Code quality: <span className="text-accent font-bold">Senior Grade</span></p>
            <p>✓ Contract dispatched to: <a href="mailto:fazley111@gmail.com" className="underline text-accent">fazley111@gmail.com</a></p>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div>
            <p>• Experience: 5+ Years Professional Production PHP/Laravel</p>
            <p>• Commercial Impact: 30%+ sales increase via dynamic cart bundling</p>
            <p>• Homelab: 54 active Docker containers running on Ubuntu (fazley-vps)</p>
            <p>• Availability: Open to Remote Global Teams</p>
          </div>
        );
        break;

      case 'stack':
        output = (
          <div>
            <p><span className="text-accent">Core:</span> PHP 8.x, Laravel 11, MySQL 8.0, Redis 7</p>
            <p><span className="text-accent">Scale:</span> ClickHouse, Message Queues, Read Replicas, Webhooks</p>
            <p><span className="text-accent">DevOps:</span> Docker, Traefik v3, Tailscale WireGuard, Linux, Prometheus, Grafana</p>
          </div>
        );
        break;

      case 'vibe':
        output = (
          <div>
            <p className="text-yellow-300">"I can prompt the AI. I can debug the AI. I can tell the AI it's wrong."</p>
            <p className="text-muted text-xs mt-1">100% human architectural ownership. Zero unverified code dumps.</p>
          </div>
        );
        break;

      case 'homelab':
        output = (
          <div>
            <p>HOST: fazley-vps (Ubuntu) | RAM: 3.8GB / 7.5GB</p>
            <p>ACTIVE: 54 containers (MySQL, PostgreSQL, Redis, Grafana, Traefik)</p>
            <p>SECURITY: Zero open public ports, encrypted Tailscale mesh</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div>
            <p>Email: <a href="mailto:fazley111@gmail.com" className="text-accent underline">fazley111@gmail.com</a></p>
            <p>Portfolio: <a href="https://fazleyrabbi.xyz/" target="_blank" rel="noreferrer" className="text-accent underline">https://fazleyrabbi.xyz/</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-red-400">
            command not found: {trimmed}. Type <span className="text-accent font-bold">help</span> for a list of commands.
          </p>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  const quickChips = ['sudo hire fazley', 'stats', 'superpower', 'stack', 'vibe', 'contact'];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="floating-terminal-btn mono"
        aria-label="Open Interactive Dev Console"
      >
        <span className="terminal-icon text-accent">&gt;_</span>
        <span className="btn-label">DEV CONSOLE</span>
        <span className="key-hint">[`]</span>
      </button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="terminal-window glass-panel"
              onClick={e => e.stopPropagation()}
            >
              {/* Window Header */}
              <div className="window-header mono">
                <div className="window-controls">
                  <span className="dot red" onClick={() => setIsOpen(false)}></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-title text-muted">fazley@production-vps:~$ (bash)</div>
                <button className="close-btn text-muted" onClick={() => setIsOpen(false)}>✕</button>
              </div>

              {/* Console Body */}
              <div className="terminal-body mono">
                {history.map((h, i) => (
                  <div key={i} className="history-entry">
                    {h.command !== 'welcome' && (
                      <div className="prompt-line">
                        <span className="prompt-user text-accent">fazley@vps</span>
                        <span className="prompt-colon">:</span>
                        <span className="prompt-path text-blue-400">~</span>
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-cmd">{h.command}</span>
                      </div>
                    )}
                    <div className="cmd-output">{h.output}</div>
                  </div>
                ))}

                {/* Input line */}
                <div className="input-line">
                  <span className="prompt-user text-accent">fazley@vps</span>
                  <span className="prompt-colon">:</span>
                  <span className="prompt-path text-blue-400">~</span>
                  <span className="prompt-symbol">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input mono"
                    placeholder="type a command..."
                    autoFocus
                  />
                </div>

                <div ref={bottomRef} />
              </div>

              {/* Quick Chips for Recruiters */}
              <div className="quick-chips-bar mono">
                <span className="chips-label text-muted">QUICK:</span>
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeCommand(chip)}
                    className="chip-btn"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .floating-terminal-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--color-border);
          border-radius: 9999px;
          color: var(--color-text);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.2s ease;
        }

        .floating-terminal-btn:hover {
          border-color: var(--color-accent);
          transform: translateY(-2px);
          box-shadow: 0 0 20px var(--color-accent-glow);
        }

        .key-hint {
          padding: 0.1rem 0.4rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
          color: var(--color-text-muted);
        }

        .terminal-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .terminal-window {
          width: 100%;
          max-width: 750px;
          height: 520px;
          background: rgba(11, 15, 25, 0.95);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px var(--color-accent-glow);
          overflow: hidden;
        }

        .window-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid var(--color-border);
        }

        .window-controls {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot.red { background: #ef4444; cursor: pointer; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .window-title {
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          font-size: 0.85rem;
        }

        .close-btn:hover {
          color: var(--color-text);
        }

        .terminal-body {
          flex: 1;
          padding: 1.25rem;
          overflow-y: auto;
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .history-entry {
          margin-bottom: 1rem;
        }

        .prompt-line {
          display: flex;
          gap: 0.35rem;
          align-items: center;
          font-weight: bold;
        }

        .input-line {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text);
          font-size: 0.85rem;
          padding: 0;
        }

        .cmd-output {
          margin-top: 0.25rem;
          color: var(--color-text-muted);
        }

        .quick-chips-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(0, 0, 0, 0.5);
          border-top: 1px solid var(--color-border);
          overflow-x: auto;
          font-size: 0.75rem;
        }

        .chip-btn {
          padding: 0.25rem 0.6rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          color: var(--color-accent);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .chip-btn:hover {
          background: var(--color-accent-glow);
          border-color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .floating-terminal-btn {
            bottom: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
          }
          .terminal-window {
            height: 80vh;
          }
        }
      `}</style>
    </>
  );
}
