import React, { useState, useEffect } from 'react';

const SUMMARY_TEXT = "Fazley Rabbi is a Mid level backend engineer specializing in Laravel, PHP, and high-performance systems. He has over 5 years of experience building scalable applications, handling payments and fraud detection, and optimizing data performance with ClickHouse and Redis. He focuses on solving real business problems and ensuring systems survive production. He runs a homelab with 54+ containers, has zero ports publicly exposed, and uses AI to accelerate his workflow while taking full responsibility for the output.";

export default function AISummarizer() {
  const [status, setStatus] = useState('idle'); // 'idle', 'destroying', 'summarizing', 'reconstructing'
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status !== 'summarizing') {
      setDisplayedText("");
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < SUMMARY_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + SUMMARY_TEXT[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 25); // Typing speed
      
      return () => clearTimeout(timeout);
    }
  }, [status, currentIndex]);

  const handleToggle = () => {
    const main = document.querySelector('main');
    if (!main) return;

    if (status === 'idle') {
      setStatus('destroying');
      document.body.style.overflow = 'hidden';
      
      main.classList.remove('site-reconstructed');
      main.classList.add('site-destroyed');
      
      setTimeout(() => {
        main.style.display = 'none';
        setStatus('summarizing');
      }, 1000); // Wait for CRT collapse animation
    } else if (status === 'summarizing') {
      setStatus('reconstructing');
      main.style.display = 'block';
      
      requestAnimationFrame(() => {
        main.classList.remove('site-destroyed');
        main.classList.add('site-reconstructed');
      });
      
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        setStatus('idle');
      }, 1000); // Wait for CRT expand animation
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'destroying': return "SYSTEM OVERRIDE...";
      case 'summarizing': return "Return to Full Site";
      case 'reconstructing': return "REBUILDING SYSTEM...";
      default: return "TL;DR? Summarize with AI";
    }
  };

  const isTransitioning = status === 'destroying' || status === 'reconstructing';
  const buttonColor = status === 'destroying' ? '#ef4444' : (status === 'reconstructing' ? '#3b82f6' : 'var(--color-accent)');

  return (
    <>
      <button 
        onClick={handleToggle}
        disabled={isTransitioning}
        className="mono btn btn-outline"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: buttonColor,
          borderColor: isTransitioning ? buttonColor : 'rgba(16, 185, 129, 0.3)',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          cursor: isTransitioning ? 'wait' : 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease',
          boxShadow: isTransitioning ? `0 0 15px ${buttonColor}80` : 'none',
        }}
      >
        {getButtonText()}
      </button>

      {status === 'summarizing' && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-bg)',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ maxWidth: '42rem', width: '100%' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1rem',
              color: 'var(--color-accent)'
            }}>
              <span className="mono" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>●</span> 
              <span className="mono" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Agent Synthesizing Profile</span>
            </div>
            
            <div className="glass-panel" style={{ 
              padding: '1.5rem', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <p className="mono" style={{ color: '#d1d5db', minHeight: '150px', fontSize: '1.125rem', lineHeight: 1.7 }}>
                {displayedText}
                <span 
                  style={{ 
                    display: 'inline-block', 
                    width: '0.5rem', 
                    height: '1.25rem', 
                    backgroundColor: 'var(--color-accent)', 
                    marginLeft: '0.25rem',
                    verticalAlign: 'text-bottom',
                    animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}>
                </span>
              </p>
            </div>
            
            {currentIndex === SUMMARY_TEXT.length && (
              <div style={{ marginTop: '2rem', textAlign: 'center', animation: 'fadeInUp 0.5s ease-out forwards' }}>
                <button 
                  onClick={handleToggle}
                  className="btn btn-primary"
                >
                  ACCESS FULL PORTFOLIO
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes crtCollapse {
          0% { transform: scale(1, 1); opacity: 1; filter: brightness(1) contrast(1); }
          20% { transform: scale(1.02, 0.9); filter: brightness(1.2) contrast(1.2); opacity: 1; }
          40% { transform: scale(0.9, 0.01); filter: brightness(3) contrast(2); opacity: 0.9; }
          70% { transform: scale(0.05, 0.01); filter: brightness(5) contrast(3); opacity: 0.5; }
          100% { transform: scale(0, 0); opacity: 0; filter: brightness(0); }
        }

        @keyframes crtExpand {
          0% { transform: scale(0, 0); opacity: 0; filter: brightness(0); }
          30% { transform: scale(0.05, 0.01); filter: brightness(5) contrast(3); opacity: 0.5; }
          60% { transform: scale(0.9, 0.01); filter: brightness(3) contrast(2); opacity: 0.9; }
          80% { transform: scale(1.02, 0.9); filter: brightness(1.2) contrast(1.2); opacity: 1; }
          100% { transform: scale(1, 1); opacity: 1; filter: brightness(1) contrast(1); }
        }

        main.site-destroyed {
          animation: crtCollapse 1s cubic-bezier(0.11, 0, 0.5, 0) forwards !important;
          transform-origin: center center;
          will-change: transform, opacity, filter;
        }

        main.site-reconstructed {
          animation: crtExpand 1s cubic-bezier(0.5, 1, 0.89, 1) forwards !important;
          transform-origin: center center;
          will-change: transform, opacity, filter;
        }
      `}</style>
    </>
  );
}
