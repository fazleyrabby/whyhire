import React from 'react';
import { motion } from 'framer-motion';

export default function HomelabDiagram() {
  return (
    <div className="diagram-container">
      {/* 1. External Network Layer */}
      <div className="layer-row">
        <div className="node-box user-node">
          <div className="node-icon">🌐</div>
          <div className="node-label mono">Public Internet</div>
          <div className="node-sub">HTTPS Traffic</div>
        </div>
        <div className="node-box admin-node">
          <div className="node-icon">💻</div>
          <div className="node-label mono">Admin Devices</div>
          <div className="node-sub">SSH / Management</div>
        </div>
      </div>

      {/* Connection Lines 1 */}
      <div className="flow-lines-row">
        <div className="flow-line left">
          <motion.div 
            className="data-packet"
            animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flow-line right">
          <motion.div 
            className="data-packet admin-packet"
            animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </div>
      </div>

      {/* 2. Edge / Ingress Layer */}
      <div className="layer-row">
        <div className="node-box ingress-node cloudflare">
          <div className="node-icon">☁️</div>
          <div className="node-label mono">Cloudflare Tunnels</div>
          <div className="node-sub">Zero Open Ports</div>
        </div>
        <div className="node-box ingress-node tailscale">
          <div className="node-icon">🛡️</div>
          <div className="node-label mono">Tailscale VPN</div>
          <div className="node-sub">Encrypted Mesh</div>
        </div>
      </div>

      {/* Connection Lines 2 */}
      <div className="flow-lines-row centered">
        <div className="flow-line center">
           <motion.div 
            className="data-packet"
            animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* 3. Bare Metal Server Layer */}
      <div className="server-container glass-panel">
        <div className="server-header mono text-muted">
          <span>BARE-METAL UBUNTU HOST</span>
          <span className="status-dot"></span>
        </div>

        {/* Docker Layer */}
        <div className="docker-network">
          <span className="network-label mono">DOCKER ENGINE NETWORK</span>
          
          <div className="app-tier">
            <div className="node-box app-node">
              <div className="node-label mono">FrankenPHP + Laravel</div>
              <div className="node-sub text-accent">Worker Mode (Sub 10ms)</div>
            </div>
            
            <div className="node-box app-node">
              <div className="node-label mono">Hermes AI Agent</div>
              <div className="node-sub text-accent">Autonomous Sysadmin</div>
            </div>
          </div>

          <div className="flow-lines-row inner-flow">
            <div className="flow-line short">
              <motion.div 
                className="data-packet"
                animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          <div className="data-tier">
            <div className="node-box db-node">
              <div className="node-label mono">MySQL 8.0</div>
              <div className="node-sub">Tuned InnoDB</div>
            </div>
            <div className="node-box cache-node">
              <div className="node-label mono">Redis 7</div>
              <div className="node-sub">In-Memory Cache</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .diagram-container {
          width: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #050505;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
        }

        .layer-row {
          display: flex;
          justify-content: center;
          gap: 4rem;
          width: 100%;
          max-width: 600px;
          position: relative;
          z-index: 2;
        }

        .node-box {
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 180px;
          backdrop-filter: blur(8px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .node-box:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .node-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .node-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .node-sub {
          font-size: 0.7rem;
          color: var(--color-text-muted);
        }

        /* Specific Node Colors */
        .cloudflare { border-color: rgba(245, 158, 11, 0.4); }
        .cloudflare:hover { border-color: rgba(245, 158, 11, 0.8); box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }
        .tailscale { border-color: rgba(16, 185, 129, 0.4); }
        .tailscale:hover { border-color: rgba(16, 185, 129, 0.8); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
        .db-node { border-color: rgba(59, 130, 246, 0.3); }
        .cache-node { border-color: rgba(239, 68, 68, 0.3); }

        .flow-lines-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 250px;
          height: 40px;
          position: relative;
        }

        .flow-lines-row.centered {
          justify-content: center;
        }

        .flow-line {
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .data-packet {
          position: absolute;
          top: 0;
          left: -3px;
          width: 8px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--color-accent);
        }

        .admin-packet {
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }

        .server-container {
          width: 100%;
          max-width: 650px;
          background: rgba(11, 15, 25, 0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 0;
        }

        .server-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed rgba(255,255,255,0.1);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(0.9); }
        }

        .docker-network {
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          padding: 1.5rem;
          position: relative;
          background: rgba(59, 130, 246, 0.02);
        }

        .network-label {
          position: absolute;
          top: -10px;
          left: 1.5rem;
          background: #050505;
          padding: 0 0.5rem;
          font-size: 0.7rem;
          color: rgba(59, 130, 246, 0.8);
        }

        .app-tier, .data-tier {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .inner-flow {
          height: 30px;
          margin: 0.5rem auto;
          justify-content: center;
        }

        @media (max-width: 600px) {
          .layer-row {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
          }
          .flow-lines-row {
            display: none; /* Hide complex routing lines on mobile to avoid overlap */
          }
          .server-container {
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
