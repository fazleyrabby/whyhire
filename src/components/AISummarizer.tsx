import React, { useState, useEffect } from 'react';

const SUMMARY_TEXT = "Fazley Rabbi is a Senior Backend Engineer specializing in Laravel, PHP, and high-performance systems. He has over 5 years of experience building scalable applications, handling payments and fraud detection, and optimizing data performance with ClickHouse and Redis. He focuses on solving real business problems and ensuring systems survive production. He runs a homelab with 54+ containers, has zero ports publicly exposed, and uses AI to accelerate his workflow while taking full responsibility for the output.";

export default function AISummarizer() {
  const [isActive, setIsActive] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < SUMMARY_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + SUMMARY_TEXT[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Typing speed
      
      return () => clearTimeout(timeout);
    }
  }, [isActive, currentIndex]);

  const toggleSummary = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Hide the main content
      document.body.style.overflow = 'hidden';
      const main = document.querySelector('main');
      if (main) main.style.display = 'none';
    } else {
      // Restore the main content
      document.body.style.overflow = 'auto';
      const main = document.querySelector('main');
      if (main) main.style.display = 'block';
    }
  };

  return (
    <>
      <button 
        onClick={toggleSummary}
        className="fixed top-4 right-4 z-50 bg-black/80 text-accent border border-accent/30 px-4 py-2 rounded font-mono text-sm hover:bg-accent/10 transition-colors backdrop-blur-sm"
        style={{ zIndex: 9999 }}
      >
        {isActive ? "Return to Full Site" : "TL;DR? Summarize with AI"}
      </button>

      {isActive && (
        <div 
          className="fixed inset-0 bg-black z-40 flex items-center justify-center p-8"
          style={{ zIndex: 9998 }}
        >
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-2 mb-4 text-accent">
              <span className="animate-pulse">●</span> 
              <span className="font-mono text-sm uppercase tracking-wider">AI Agent Synthesizing Profile</span>
            </div>
            
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 font-mono text-lg leading-relaxed shadow-2xl">
              <p className="text-gray-300 min-h-[150px]">
                {displayedText}
                <span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse"></span>
              </p>
            </div>
            
            {currentIndex === SUMMARY_TEXT.length && (
              <div className="mt-8 text-center animate-fade-in">
                <button 
                  onClick={toggleSummary}
                  className="bg-accent text-black px-6 py-3 font-mono font-bold hover:bg-white transition-colors"
                >
                  ACCESS FULL PORTFOLIO
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
