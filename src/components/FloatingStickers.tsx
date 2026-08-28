import { useState, useRef, useCallback, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Sticker {
  id: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

// ── Sticker shell — Dark Theme, stacked ────────────────────────────────────
function Sticker({
  rotation,
  zIndex,
  x,
  y,
  children,
  shape = 'rounded',
  bg = '#0b0f19', // Dark background
  border = 'rgba(255,255,255,0.08)',
  shadow = 'rgba(0,0,0,0.5)',
  glow = 'rgba(16,185,129,0.4)',
  onDrag,
  onFront,
  id,
}: {
  rotation: number; zIndex: number; x: number; y: number;
  children: React.ReactNode;
  shape?: 'rounded' | 'circle' | 'pill';
  bg?: string; border?: string; shadow?: string; glow?: string;
  onDrag: (id: string, dx: number, dy: number) => void;
  onFront: (id: string) => void;
  id: string;
}) {
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [lifted, setLifted] = useState(false);

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    onFront(id);
    setLifted(true);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    onDrag(id, dx, dy);
  };
  const onUp = () => { dragging.current = false; setLifted(false); };

  const br = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : '14px';

  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex,
        cursor: lifted ? 'grabbing' : 'grab',
        userSelect: 'none',
        background: bg,
        borderRadius: br,
        border: `1.5px solid ${border}`,
        boxShadow: lifted
          ? `0 16px 40px ${shadow}, 0 0 20px ${glow}`
          : `0 8px 24px ${shadow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
        transform: `rotate(${rotation}deg) scale(${lifted ? 0.75 : 0.65})`,
        transformOrigin: 'center',
        transition: lifted
          ? 'box-shadow 0.15s ease, transform 0.15s cubic-bezier(0.34,1.56,0.64,1)'
          : 'box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        willChange: 'transform, left, top',
        backdropFilter: 'blur(12px)',
        // Subtle dark gloss
        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)`,
      }}
    >
      {children}
    </div>
  );
}

// ── Sticker Components ───────────────────────────────────────────────────

function PHPSticker() {
  return (
    <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 80 38" width="80" height="38">
        <rect width="80" height="38" rx="8" fill="#7377AD" opacity="0.2"/>
        <text x="40" y="26" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#8892BF">PHP</text>
      </svg>
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#8892BF', letterSpacing: '0.12em', fontFamily: 'monospace' }}>8.3</span>
    </div>
  );
}

function LaravelSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 52 52" width="52" height="52">
        <path d="M51.4 11.3c.1.3.1.7-.1 1L42.9 26c-.1.2-.3.4-.5.5L27 35.2c-.1 0-.2.1-.3.1H26.5l-.3-.1-6.1-3.5v8.8c0 .4-.2.8-.6 1L5.7 49.9c-.2.1-.4.2-.6.2s-.4-.1-.6-.2c-.3-.2-.5-.6-.5-1V25.5c0-.4.2-.8.6-1l14-8.1V8.5c0-.4.2-.8.6-1l14.5-8.4a1.15 1.15 0 011.2 0l16 9.2c.3.1.5.5.5 1zm-8.8.2l-5.9-3.4-11.3 6.5 5.9 3.4 11.3-6.5zM27.2 33.1l12.5-7.2-5.9-3.4-12.5 7.2 5.9 3.4zm-13.8-7.6l-11.3 6.5v13.6l11.3-6.5V25.5zm13.2 12.2v-5.6L15.1 39v5.6l11.5 6.6V37.7zm0-13.1L14.5 17.4v7.7l12.1 7 5.9-3.4-5.9-3.6zm14 .3l-5.9-3.4v7.5l5.9-3.4v-.7z" fill="#FF2D20"/>
      </svg>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#FF2D20', letterSpacing: '0.08em', fontFamily: 'sans-serif' }}>LARAVEL</span>
    </div>
  );
}

function DockerSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 24 24" width="44" height="44" fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
      </svg>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#2496ED', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>DOCKER</span>
    </div>
  );
}

function GitSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 24 24" width="46" height="46" fill="#F05032">
        <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 11-1.1 1.01l-2.48-2.48v6.522a1.84 1.84 0 11-1.508-.07V9.311a1.837 1.837 0 01-.999-2.416L7.618 4.218.45 11.388a1.55 1.55 0 000 2.187l10.478 10.478a1.55 1.55 0 002.189 0l10.43-10.43a1.55 1.55 0 000-2.192"/>
      </svg>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#F05032', letterSpacing: '0.1em', fontFamily: 'monospace' }}>GIT</span>
    </div>
  );
}

function RedisSticker() {
  return (
    <div style={{ padding: '10px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 24 18" width="64" height="46">
        <ellipse cx="12" cy="4" rx="12" ry="4" fill="#DC382D"/>
        <path d="M0 4v4c0 2.2 5.4 4 12 4s12-1.8 12-4V4c0 2.2-5.4 4-12 4S0 6.2 0 4z" fill="#A41E11"/>
        <path d="M0 8v4c0 2.2 5.4 4 12 4s12-1.8 12-4V8c0 2.2-5.4 4-12 4S0 10.2 0 8z" fill="#DC382D"/>
        <text x="12" y="5.5" textAnchor="middle" fontSize="4.5" fontWeight="900" fill="#fff" fontFamily="monospace">REDIS</text>
      </svg>
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#DC382D', letterSpacing: '0.12em', fontFamily: 'monospace' }}>IN-MEMORY DB</span>
    </div>
  );
}

function MySQLSticker() {
  return (
    <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 60 36" width="70" height="42">
        <rect width="60" height="36" rx="6" fill="#00758F" opacity="0.3"/>
        <text x="30" y="24" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="18" fill="#4479A1">MySQL</text>
      </svg>
      <span style={{ fontSize: '9px', fontWeight: 700, color: '#4479A1', letterSpacing: '0.1em', fontFamily: 'monospace' }}>DATABASE</span>
    </div>
  );
}

function TerminalSticker() {
  const [lineIdx, setLineIdx] = useState(0);
  const lines = ['$ php artisan migrate', '$ git push origin main', '$ docker compose up -d', '$ redis-cli ping', '$ composer install'];
  useEffect(() => {
    const t = setInterval(() => setLineIdx(i => (i + 1) % lines.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: '10px 12px', background: '#070a12', borderRadius: 8, minWidth: 170 }}>
      <div style={{ fontFamily: 'monospace', fontSize: '9px', color: '#6b7280', marginBottom: 5 }}>
        <span style={{ color: '#ff5f57' }}>●</span>&nbsp;<span style={{ color: '#ffbd2e' }}>●</span>&nbsp;<span style={{ color: '#28ca41' }}>●</span>
        &nbsp;&nbsp;<span>~/projects</span>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4b5563', marginBottom: 2 }}>{lines[(lineIdx + lines.length - 1) % lines.length]}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center' }}>
        <span>{lines[lineIdx]}</span>
        <span style={{ animation: 'termBlink 1s step-end infinite', marginLeft: 1 }}>▌</span>
      </div>
    </div>
  );
}

function GithubSticker() {
  return (
    <div style={{ padding: '10px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <svg viewBox="0 0 24 24" width="40" height="40" fill="#f9fafb">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#f9fafb', letterSpacing: '0.08em', fontFamily: 'sans-serif' }}>GITHUB</span>
    </div>
  );
}

function APISticker() {
  return (
    <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(239,68,68,0.2))',
        border: '1px solid rgba(245,158,11,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
        </svg>
      </div>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', fontFamily: 'monospace' }}>REST API</span>
    </div>
  );
}

function ServerSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        background: '#070a12', borderRadius: 8, padding: '8px 10px',
        border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: 4, width: 70,
      }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 1 ? '#10b981' : i === 2 ? '#10b981' : '#6b7280' }}/>
            <div style={{ height: 5, flex: 1, background: '#1e293b', borderRadius: 2 }}/>
            <div style={{ width: 5, height: 5, background: '#1e3a5f', borderRadius: 1 }}/>
          </div>
        ))}
      </div>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', fontFamily: 'monospace' }}>SERVER</span>
    </div>
  );
}

function CPUSticker() {
  return (
    <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 64 64" width="64" height="64">
        <rect x="16" y="16" width="32" height="32" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"/>
        <rect x="20" y="20" width="24" height="24" rx="2" fill="#0f172a"/>
        <text x="32" y="36" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3b82f6" fontFamily="monospace">CPU</text>
        {[22,30,38,46].map(p => (
          <g key={p}>
            <line x1={p} y1="16" x2={p} y2="10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            <line x1={p} y1="48" x2={p} y2="54" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16" y1={p} x2="10" y2={p} stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            <line x1="48" y1={p} x2="54" y2={p} stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          </g>
        ))}
      </svg>
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#60a5fa', letterSpacing: '0.1em', fontFamily: 'monospace' }}>PROCESSOR</span>
    </div>
  );
}

function NetworkSticker() {
  return (
    <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/>
      </svg>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e', letterSpacing: '0.08em', fontFamily: 'sans-serif' }}>NETWORK</span>
    </div>
  );
}

function KeyboardSticker() {
  return (
    <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div style={{ background: '#1e293b', borderRadius: 8, padding: '6px 8px', border: '1px solid #334155', boxShadow: '0 3px 0 #0f172a' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
          {['Q','W','E','R','T','Y'].map(k => (
            <div key={k} style={{ width: 18, height: 18, background: '#0f172a', borderRadius: 3, border: '1px solid #334155', display:'flex',alignItems:'center',justifyContent:'center', fontSize:'8px', fontWeight:700, color:'#94a3b8' }}>{k}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 4, paddingLeft: 8 }}>
          {['A','S','D','F','G'].map(k => (
            <div key={k} style={{ width: 18, height: 18, background: '#0f172a', borderRadius: 3, border: '1px solid #334155', display:'flex',alignItems:'center',justifyContent:'center', fontSize:'8px', fontWeight:700, color:'#94a3b8' }}>{k}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 60, height: 18, background: '#7c3aed', borderRadius: 3, display:'flex',alignItems:'center',justifyContent:'center', fontSize:'8px', fontWeight:700, color:'#fff', boxShadow:'0 2px 0 #4c1d95' }}>SPACE</div>
          <div style={{ width: 18, height: 18, background: '#ef4444', borderRadius: 3, display:'flex',alignItems:'center',justifyContent:'center', fontSize:'8px', fontWeight:700, color:'#fff', boxShadow:'0 2px 0 #991b1b' }}>⏎</div>
        </div>
      </div>
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#a78bfa', letterSpacing: '0.1em', fontFamily: 'monospace' }}>KEEP TYPING</span>
    </div>
  );
}

function SOSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 24 24" width="44" height="44" fill="#F48024">
        <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.44-2.07-10.478-2.187-.442 2.068zm1.35-4.853l9.706 4.52.89-1.943-9.706-4.52-.89 1.943zm2.75-4.664l8.244 6.83 1.346-1.605-8.244-6.83-1.346 1.605zM15.895 1l-1.728 1.275 6.414 8.678 1.728-1.275L15.895 1z"/>
      </svg>
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#F48024', letterSpacing: '0.05em', fontFamily: 'sans-serif' }}>STACKOVERFLOW</span>
    </div>
  );
}

function ArchSticker() {
  return (
    <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', fontFamily: 'monospace', marginBottom: 2 }}>// SYS.ARCH</div>
      <svg viewBox="0 0 170 90" width="136" height="72" fill="none">
        <rect x="2" y="4" width="40" height="24" rx="4" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="22" y="20" textAnchor="middle" fontSize="7" fill="#60a5fa" fontFamily="monospace" fontWeight="700">Browser</text>
        <line x1="43" y1="16" x2="57" y2="16" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,2"/>
        <polygon points="57,13 63,16 57,19" fill="#3b82f6"/>
        <rect x="64" y="4" width="44" height="24" rx="4" fill="rgba(22,163,74,0.1)" stroke="#16a34a" strokeWidth="1.5"/>
        <text x="86" y="20" textAnchor="middle" fontSize="7" fill="#4ade80" fontFamily="monospace" fontWeight="700">Laravel</text>
        <line x1="86" y1="29" x2="86" y2="44" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2"/>
        <polygon points="83,44 86,50 89,44" fill="#f59e0b"/>
        <rect x="64" y="51" width="44" height="24" rx="4" fill="rgba(202,138,4,0.1)" stroke="#ca8a04" strokeWidth="1.5"/>
        <text x="86" y="67" textAnchor="middle" fontSize="7" fill="#facc15" fontFamily="monospace" fontWeight="700">MySQL</text>
        <line x1="109" y1="16" x2="123" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2"/>
        <polygon points="123,13 129,16 123,19" fill="#ef4444"/>
        <rect x="130" y="4" width="36" height="24" rx="4" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5"/>
        <text x="148" y="20" textAnchor="middle" fontSize="7" fill="#f87171" fontFamily="monospace" fontWeight="700">Redis</text>
        <rect x="2" y="64" width="54" height="18" rx="3" fill="rgba(124,58,237,0.1)" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3,2"/>
        <text x="29" y="76" textAnchor="middle" fontSize="6.5" fill="#a78bfa" fontFamily="monospace">Queue Worker</text>
      </svg>
    </div>
  );
}

function UptimeSticker() {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const t = setInterval(() => setSecs(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(secs / 3600).toString().padStart(2, '0');
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return (
    <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, minWidth: 120 }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.12em', fontFamily: 'monospace' }}>SESSION UPTIME</div>
      <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981', fontFamily: 'monospace', letterSpacing: '0.05em', lineHeight: 1.2 }}>{h}:{m}:{s}</div>
      <div style={{ fontSize: '8px', color: '#6ee7b7', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}/>
        ALL SYSTEMS GO
      </div>
    </div>
  );
}

function LaptopSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 64 48" width="72" height="54">
        <rect x="8" y="4" width="48" height="30" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
        <rect x="11" y="7" width="42" height="24" rx="1" fill="#020617"/>
        <rect x="14" y="10" width="20" height="2" rx="1" fill="#10b981" opacity="0.8"/>
        <rect x="16" y="14" width="14" height="2" rx="1" fill="#3b82f6" opacity="0.8"/>
        <rect x="14" y="18" width="24" height="2" rx="1" fill="#f59e0b" opacity="0.7"/>
        <rect x="16" y="22" width="16" height="2" rx="1" fill="#ef4444" opacity="0.6"/>
        <circle cx="32" cy="5.5" r="1" fill="#475569"/>
        <rect x="4" y="34" width="56" height="6" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
        <rect x="24" y="38" width="16" height="2" rx="1" fill="#0f172a"/>
        <rect x="36" y="15" width="12" height="8" rx="2" fill="#7377AD"/>
        <text x="42" y="21.5" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#fff" fontFamily="monospace">PHP</text>
      </svg>
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', fontFamily: 'monospace' }}>DEV MACHINE</span>
    </div>
  );
}

function ComposerSticker() {
  return (
    <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #c2410c' }}>
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#fff">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
        </svg>
      </div>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#f97316', letterSpacing: '0.06em', fontFamily: 'monospace' }}>COMPOSER</span>
    </div>
  );
}

function VSCodeSticker() {
  return (
    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 100 100" width="52" height="52">
        <path fill="#2C7CDA" d="M74.5 7.3L51.9 31.6 32.7 17.7l-19.8 9.7v45.8l19.8 9.7 19.2-13.9 22.6 24.3L87 88V12L74.5 7.3zM32.7 62.3L20.9 55v-9.9l11.8-7.4 13.6 12.3-13.6 12.3z"/>
      </svg>
      <span style={{ fontSize: '11px', fontWeight: 800, color: '#60a5fa', letterSpacing: '0.06em', fontFamily: 'sans-serif' }}>VS CODE</span>
    </div>
  );
}

// ── Sticker definitions ───────────────────────────────────────────────────
// Note: xFrac is the horizontal position (0 = far left, 1 = far right)
const DEFS = [
  { id: 'php',        xFrac: 0.05, y: 150, rot: -8,  border: 'rgba(119,119,173,0.4)', glow: 'rgba(119,119,173,0.3)', shape: 'rounded' as const },
  { id: 'laravel',    xFrac: 0.85, y: 180, rot:  6,  border: 'rgba(239,68,68,0.4)',   glow: 'rgba(239,68,68,0.3)',   shape: 'rounded' as const },
  { id: 'docker',     xFrac: 0.04, y: 270, rot:  4,  border: 'rgba(37,99,235,0.4)',   glow: 'rgba(37,99,235,0.3)',   shape: 'rounded' as const },
  { id: 'git',        xFrac: 0.87, y: 310, rot: -12, border: 'rgba(249,115,22,0.4)',  glow: 'rgba(249,115,22,0.3)',  shape: 'rounded' as const },
  { id: 'redis',      xFrac: 0.06, y: 410, rot:  10, border: 'rgba(239,68,68,0.4)',   glow: 'rgba(239,68,68,0.3)',   shape: 'rounded' as const },
  { id: 'mysql',      xFrac: 0.84, y: 440, rot: -5,  border: 'rgba(14,165,233,0.4)',  glow: 'rgba(14,165,233,0.3)',  shape: 'rounded' as const },
  { id: 'terminal',   xFrac: 0.03, y: 530, rot:  3,  border: 'rgba(16,185,129,0.4)',  glow: 'rgba(16,185,129,0.3)',  shape: 'rounded' as const },
  { id: 'cpu',        xFrac: 0.88, y: 560, rot: -7,  border: 'rgba(59,130,246,0.4)',  glow: 'rgba(59,130,246,0.3)',  shape: 'rounded' as const },
  { id: 'network',    xFrac: 0.05, y: 640, rot:  5,  border: 'rgba(34,197,94,0.4)',   glow: 'rgba(34,197,94,0.3)',   shape: 'rounded' as const },
  { id: 'github',     xFrac: 0.85, y: 690, rot: -3,  border: 'rgba(156,163,175,0.4)', glow: 'rgba(156,163,175,0.2)', shape: 'rounded' as const },
  { id: 'api',        xFrac: 0.04, y: 760, rot: -9,  border: 'rgba(245,158,11,0.4)',  glow: 'rgba(245,158,11,0.3)',  shape: 'rounded' as const },
  { id: 'arch',       xFrac: 0.86, y: 810, rot:  4,  border: 'rgba(139,92,246,0.4)',  glow: 'rgba(139,92,246,0.3)',  shape: 'rounded' as const },
  { id: 'stackoverflow', xFrac: 0.06, y: 880, rot: 7, border: 'rgba(249,115,22,0.4)', glow: 'rgba(249,115,22,0.3)',  shape: 'rounded' as const },
  { id: 'uptime',     xFrac: 0.84, y: 920, rot: -4,  border: 'rgba(16,185,129,0.4)',  glow: 'rgba(16,185,129,0.3)',  shape: 'rounded' as const },
  { id: 'laptop',     xFrac: 0.05, y: 1000,rot: -6,  border: 'rgba(148,163,184,0.4)', glow: 'rgba(148,163,184,0.3)', shape: 'rounded' as const },
  { id: 'keyboard',   xFrac: 0.87, y: 1050,rot:  8,  border: 'rgba(168,85,247,0.4)',  glow: 'rgba(168,85,247,0.3)',  shape: 'rounded' as const },
  { id: 'composer',   xFrac: 0.03, y: 1120,rot: -5,  border: 'rgba(234,88,12,0.4)',   glow: 'rgba(234,88,12,0.3)',   shape: 'circle' as const },
  { id: 'vscode',     xFrac: 0.85, y: 1180,rot:  6,  border: 'rgba(59,130,246,0.4)',  glow: 'rgba(59,130,246,0.3)',  shape: 'rounded' as const },
];

const CONTENT: Record<string, React.ReactNode> = {
  php:           <PHPSticker />,
  laravel:       <LaravelSticker />,
  docker:        <DockerSticker />,
  git:           <GitSticker />,
  redis:         <RedisSticker />,
  mysql:         <MySQLSticker />,
  terminal:      <TerminalSticker />,
  cpu:           <CPUSticker />,
  network:       <NetworkSticker />,
  github:        <GithubSticker />,
  api:           <APISticker />,
  arch:          <ArchSticker />,
  stackoverflow: <SOSticker />,
  uptime:        <UptimeSticker />,
  laptop:        <LaptopSticker />,
  keyboard:      <KeyboardSticker />,
  composer:      <ComposerSticker />,
  vscode:        <VSCodeSticker />,
};

// ── Root component ────────────────────────────────────────────────────────
export default function FloatingStickers() {
  const [stickers, setStickers] = useState<(typeof DEFS[0] & { x: number; y: number; zIndex: number })[]>([]);
  const [zTop, setZTop] = useState(2000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    setStickers(DEFS.map((d, i) => ({ 
      ...d, 
      x: w * d.xFrac, 
      y: d.y, 
      zIndex: 1500 + i 
    })));
    setMounted(true);
  }, []);

  const bringToFront = useCallback((id: string) => {
    setZTop(z => {
      const nz = z + 1;
      setStickers(prev => prev.map(s => s.id === id ? { ...s, zIndex: nz } : s));
      return nz;
    });
  }, []);

  const handleDrag = useCallback((id: string, dx: number, dy: number) => {
    setStickers(prev => prev.map(s => s.id === id ? { ...s, x: s.x + dx, y: s.y + dy } : s));
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes termBlink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes hintPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>



      {stickers.map(s => (
        <Sticker
          key={s.id} id={s.id}
          x={s.x} y={s.y}
          rotation={s.rot} zIndex={s.zIndex}
          bg="#0b0f19" border={s.border} shadow="rgba(0,0,0,0.6)" glow={s.glow}
          shape={s.shape}
          onDrag={handleDrag} onFront={bringToFront}
        >
          {CONTENT[s.id]}
        </Sticker>
      ))}
    </>
  );
}
