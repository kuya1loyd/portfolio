import { useEffect, useRef } from 'react';

const lineColor = 'rgba(184, 98, 28, 0.32)';
const smallNodeColor = 'rgba(255, 165, 92, 0.78)';
const hubColor = 'rgba(255, 191, 128, 0.98)';

const networkStyles = `
  .tech-root {
    --mouse-x: 50%;
    --mouse-y: 50%;
    --mouse-x-px: 0px;
    --mouse-y-px: 0px;
    --cursor-x-px: 0px;
    --cursor-y-px: 0px;
    --shift-x-sm: 0px;
    --shift-y-sm: 0px;
    --shift-x-md: 0px;
    --shift-y-md: 0px;
    --shift-x-lg: 0px;
    --shift-y-lg: 0px;
  }

  @keyframes techPan {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-1.8%, 1.1%, 0) scale(1.028); }
  }

  @keyframes techFloatA {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(12px, -8px, 0); }
  }

  @keyframes techFloatB {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(-14px, 10px, 0); }
  }

  @keyframes techFloatC {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(15px, 9px, 0); }
  }

  @keyframes techFloatD {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(-10px, -9px, 0); }
  }

  @keyframes techPulse {
    0%, 100% { transform: scale(1); opacity: 0.84; }
    50% { transform: scale(1.24); opacity: 1; }
  }

  @keyframes techGlow {
    0%, 100% { transform: scale(1); opacity: 0.35; }
    50% { transform: scale(1.22); opacity: 0.8; }
  }

  @keyframes techRotateClockwise {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes techRotateCounter {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes techScan {
    0% { transform: translateY(-120%); opacity: 0; }
    12% { opacity: 0.2; }
    45% { opacity: 0.12; }
    100% { transform: translateY(120%); opacity: 0; }
  }

  @keyframes techGridShift {
    0% { background-position: 0 0, 0 0; }
    100% { background-position: 110px 55px, -110px 0; }
  }

  @keyframes techBeamA {
    0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.22; }
    50% { transform: translateX(18px) scaleY(1.08); opacity: 0.4; }
  }

  @keyframes techBeamB {
    0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.14; }
    50% { transform: translateX(-14px) scaleY(1.12); opacity: 0.28; }
  }

  @keyframes techBlink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @keyframes techCursorPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.18; }
    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.4; }
  }

  @keyframes techCursorCore {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.72; }
    50% { transform: translate(-50%, -50%) scale(1.14); opacity: 1; }
  }

  @keyframes techTraceShift {
    0% { background-position: 0 0, 0 0, 0 0; }
    100% { background-position: 180px 0, -160px 90px, 70px -70px; }
  }

  @keyframes techHudSweep {
    0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.16; }
    50% { transform: translate3d(18px, -10px, 0); opacity: 0.3; }
  }

  .tech-pan {
    animation: techPan 30s ease-in-out infinite;
    transform-origin: center;
  }

  .tech-grid {
    animation: techGridShift 28s linear infinite;
  }

  .tech-cluster {
    transform-box: fill-box;
    transform-origin: center;
    will-change: transform;
  }

  .tech-float-a { animation: techFloatA 14s ease-in-out infinite; }
  .tech-float-b { animation: techFloatB 18s ease-in-out infinite; }
  .tech-float-c { animation: techFloatC 16s ease-in-out infinite; }
  .tech-float-d { animation: techFloatD 19s ease-in-out infinite; }

  .tech-hub {
    transform-box: fill-box;
    transform-origin: center;
    animation: techPulse 4.2s ease-in-out infinite;
  }

  .tech-hub-glow {
    transform-box: fill-box;
    transform-origin: center;
    animation: techGlow 4.2s ease-in-out infinite;
  }

  .tech-ring-a {
    animation: techRotateClockwise 20s linear infinite;
  }

  .tech-ring-b {
    animation: techRotateCounter 24s linear infinite;
  }

  .tech-scan {
    animation: techScan 9s linear infinite;
  }

  .tech-beam-a {
    animation: techBeamA 12s ease-in-out infinite;
  }

  .tech-beam-b {
    animation: techBeamB 15s ease-in-out infinite;
  }

  .tech-blink {
    animation: techBlink 3.6s ease-in-out infinite;
  }

  .tech-parallax-sm {
    transform: translate3d(var(--shift-x-sm), var(--shift-y-sm), 0);
    will-change: transform;
  }

  .tech-parallax-md {
    transform: translate3d(var(--shift-x-md), var(--shift-y-md), 0);
    will-change: transform;
  }

  .tech-parallax-lg {
    transform: translate3d(var(--shift-x-lg), var(--shift-y-lg), 0);
    will-change: transform;
  }

  .tech-cursor-ring {
    animation: techCursorPulse 4.2s ease-in-out infinite;
  }

  .tech-cursor-core {
    animation: techCursorCore 2.8s ease-in-out infinite;
  }

  .tech-cursor-track {
    transform: translate3d(var(--cursor-x-px), var(--cursor-y-px), 0);
    will-change: transform;
  }

  .tech-circuit {
    animation: techTraceShift 32s linear infinite;
  }

  .tech-hud-sweep {
    animation: techHudSweep 10s ease-in-out infinite;
  }
`;

const ParticleBackground = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    let frameId = 0;
    const target = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const current = { ...target };

    const updateVars = () => {
      const root = rootRef.current;
      if (!root) {
        frameId = window.requestAnimationFrame(updateVars);
        return;
      }

      current.x += (target.x - current.x) * 0.28;
      current.y += (target.y - current.y) * 0.28;

      if (Math.abs(target.x - current.x) < 0.35) {
        current.x = target.x;
      }

      if (Math.abs(target.y - current.y) < 0.35) {
        current.y = target.y;
      }

      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const mouseX = (current.x / width) * 100;
      const mouseY = (current.y / height) * 100;
      const shiftX = ((current.x / width) - 0.5) * 44;
      const shiftY = ((current.y / height) - 0.5) * 28;

      root.style.setProperty('--mouse-x', `${mouseX}%`);
      root.style.setProperty('--mouse-y', `${mouseY}%`);
      root.style.setProperty('--mouse-x-px', `${current.x}px`);
      root.style.setProperty('--mouse-y-px', `${current.y}px`);
      root.style.setProperty('--cursor-x-px', `${target.x}px`);
      root.style.setProperty('--cursor-y-px', `${target.y}px`);
      root.style.setProperty('--shift-x-sm', `${shiftX * 0.08}px`);
      root.style.setProperty('--shift-y-sm', `${shiftY * 0.08}px`);
      root.style.setProperty('--shift-x-md', `${shiftX * 0.16}px`);
      root.style.setProperty('--shift-y-md', `${shiftY * 0.16}px`);
      root.style.setProperty('--shift-x-lg', `${shiftX * 0.24}px`);
      root.style.setProperty('--shift-y-lg', `${shiftY * 0.24}px`);

      frameId = window.requestAnimationFrame(updateVars);
    };

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const root = rootRef.current;
      if (root) {
        root.style.setProperty('--cursor-x-px', `${event.clientX}px`);
        root.style.setProperty('--cursor-y-px', `${event.clientY}px`);
      }
    };

    const handleTouchMove = (event) => {
      if (!event.touches[0]) {
        return;
      }

      target.x = event.touches[0].clientX;
      target.y = event.touches[0].clientY;

      const root = rootRef.current;
      if (root) {
        root.style.setProperty('--cursor-x-px', `${event.touches[0].clientX}px`);
        root.style.setProperty('--cursor-y-px', `${event.touches[0].clientY}px`);
      }
    };

    const handleMouseLeave = () => {
      target.x = window.innerWidth / 2;
      target.y = window.innerHeight / 2;

      const root = rootRef.current;
      if (root) {
        root.style.setProperty('--cursor-x-px', `${target.x}px`);
        root.style.setProperty('--cursor-y-px', `${target.y}px`);
      }
    };

    frameId = window.requestAnimationFrame(updateVars);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="tech-root pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <style>{networkStyles}</style>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,_#100605_0%,_#070303_50%,_#030202_100%)]" />

      <div className="absolute inset-0 tech-parallax-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,_rgba(249,115,22,0.12),_transparent_20%),radial-gradient(circle_at_68%_30%,_rgba(249,115,22,0.08),_transparent_28%),radial-gradient(circle_at_82%_68%,_rgba(56,189,248,0.06),_transparent_18%),radial-gradient(circle_at_42%_82%,_rgba(249,115,22,0.05),_transparent_22%)]" />
        <div
          className="absolute inset-0 opacity-80 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 192, 126, 0.22), transparent 12%), radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.1), transparent 24%)',
          }}
        />
      </div>

      <div
        className="tech-grid tech-parallax-sm absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '110px 110px',
          maskImage: 'radial-gradient(circle at center, black 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 100%)',
        }}
      />

      <div
        className="tech-circuit tech-parallax-md absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 38px, rgba(249,115,22,0.08) 38px 39px, transparent 39px 120px), repeating-linear-gradient(0deg, transparent 0 52px, rgba(255,183,119,0.06) 52px 53px, transparent 53px 136px), linear-gradient(125deg, transparent 0 42%, rgba(249,115,22,0.07) 42.2% 42.5%, transparent 42.8% 100%)',
          maskImage: 'radial-gradient(circle at center, black 28%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 28%, transparent 100%)',
        }}
      />

      <div
        className="tech-hud-sweep tech-parallax-sm absolute inset-0 opacity-24 mix-blend-screen"
        style={{
          background:
            'linear-gradient(110deg, transparent 0 20%, rgba(249,115,22,0.08) 20.3% 20.6%, transparent 21% 100%), linear-gradient(35deg, transparent 0 72%, rgba(56,189,248,0.05) 72.2% 72.4%, transparent 72.8% 100%)',
        }}
      />

      <div
        className="tech-parallax-md absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 170, 90, 0.22) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 96%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 96%)',
        }}
      />

      <div className="tech-cursor-track absolute left-0 top-0 z-[2] h-0 w-0">
        <div className="tech-cursor-ring absolute left-0 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/14" />
        <div className="tech-cursor-ring absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/14" style={{ animationDelay: '1.6s' }} />
        <div className="tech-cursor-core absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200 shadow-[0_0_10px_rgba(255,191,128,0.72)]" />
        <div className="tech-cursor-core absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/12" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="tech-parallax-md absolute inset-0">
        <div className="tech-beam-a absolute left-[14%] top-[-12%] h-[124%] w-px bg-gradient-to-b from-transparent via-orange-400/30 to-transparent blur-[1px]" />
        <div className="tech-beam-b absolute right-[17%] top-[-8%] h-[118%] w-px bg-gradient-to-b from-transparent via-sky-400/18 to-transparent blur-[1px]" />
        <div className="tech-beam-a absolute left-[-10%] top-[24%] h-px w-[125%] bg-gradient-to-r from-transparent via-orange-400/18 to-transparent blur-[1px]" />
        <div className="tech-scan absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(249,115,22,0.04)_35%,rgba(255,191,128,0.18)_50%,rgba(249,115,22,0.04)_65%,transparent_100%)]" />
      </div>

      <div className="tech-parallax-lg absolute inset-0">
        <div className="absolute left-[56%] top-[16%] h-44 w-44 rounded-full border border-orange-400/10 tech-ring-a" />
        <div className="absolute left-[55.4%] top-[15.4%] h-[12.2rem] w-[12.2rem] rounded-full border border-dashed border-orange-300/10 tech-ring-b" />
        <div className="absolute right-[10%] bottom-[12%] h-32 w-32 rounded-full border border-sky-400/10 tech-ring-b" />
        <div className="absolute right-[9.4%] bottom-[11.4%] h-[8.7rem] w-[8.7rem] rounded-full border border-dashed border-orange-400/10 tech-ring-a" />
        <div className="absolute left-[8%] top-[12%] h-20 w-20 rounded-full border border-orange-300/10 tech-ring-b" />
        <div className="absolute left-[7.5%] top-[11.5%] h-[5.9rem] w-[5.9rem] rounded-full border border-dashed border-sky-300/10 tech-ring-a" />
      </div>

      <div className="tech-parallax-sm absolute inset-6 opacity-40">
        <div className="absolute left-0 top-0 h-10 w-24 border-l border-t border-orange-300/20" />
        <div className="absolute right-0 top-0 h-10 w-24 border-r border-t border-orange-300/16" />
        <div className="absolute bottom-0 left-0 h-10 w-24 border-b border-l border-sky-300/12" />
        <div className="absolute bottom-0 right-0 h-10 w-24 border-b border-r border-orange-300/16" />
      </div>

      <div className="tech-parallax-md absolute inset-0">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="tech-pan absolute inset-0 h-full w-full opacity-100"
        >
          <defs>
            <filter id="orange-glow" x="-200%" y="-200%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="soft-glow" x="-200%" y="-200%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g stroke={lineColor} strokeWidth="0.18" fill="none">
            <g className="tech-cluster tech-float-a">
              <line x1="3" y1="70" x2="10" y2="60" />
              <line x1="10" y1="60" x2="18" y2="67" />
              <line x1="3" y1="70" x2="18" y2="67" />
              <line x1="10" y1="60" x2="22" y2="54" />
              <line x1="18" y1="67" x2="25" y2="62" />
              <line x1="22" y1="54" x2="25" y2="62" />
              <line x1="18" y1="67" x2="30" y2="70" />
              <line x1="25" y1="62" x2="30" y2="70" />
            </g>

            <g className="tech-cluster tech-float-b">
              <line x1="38" y1="12" x2="46" y2="19" />
              <line x1="46" y1="19" x2="43" y2="29" />
              <line x1="38" y1="12" x2="43" y2="29" />
              <line x1="46" y1="19" x2="55" y2="16" />
              <line x1="55" y1="16" x2="61" y2="24" />
              <line x1="46" y1="19" x2="61" y2="24" />
              <line x1="43" y1="29" x2="56" y2="31" />
              <line x1="56" y1="31" x2="61" y2="24" />
              <line x1="43" y1="29" x2="61" y2="24" />
            </g>

            <g className="tech-cluster tech-float-c">
              <line x1="57" y1="26" x2="67" y2="35" />
              <line x1="67" y1="35" x2="75" y2="32" />
              <line x1="57" y1="26" x2="75" y2="32" />
              <line x1="67" y1="35" x2="71" y2="45" />
              <line x1="75" y1="32" x2="82" y2="43" />
              <line x1="71" y1="45" x2="82" y2="43" />
              <line x1="67" y1="35" x2="82" y2="43" />
              <line x1="71" y1="45" x2="89" y2="56" />
              <line x1="82" y1="43" x2="94" y2="51" />
              <line x1="89" y1="56" x2="94" y2="51" />
              <line x1="82" y1="43" x2="97" y2="35" />
              <line x1="75" y1="32" x2="97" y2="35" />
            </g>

            <g className="tech-cluster tech-float-d">
              <line x1="34" y1="74" x2="43" y2="67" />
              <line x1="43" y1="67" x2="51" y2="73" />
              <line x1="34" y1="74" x2="51" y2="73" />
              <line x1="43" y1="67" x2="47" y2="59" />
              <line x1="47" y1="59" x2="57" y2="64" />
              <line x1="43" y1="67" x2="57" y2="64" />
              <line x1="51" y1="73" x2="61" y2="70" />
              <line x1="57" y1="64" x2="61" y2="70" />
            </g>

            <g className="tech-cluster tech-float-b">
              <line x1="9" y1="18" x2="16" y2="24" />
              <line x1="16" y1="24" x2="14" y2="34" />
              <line x1="9" y1="18" x2="14" y2="34" />
              <line x1="16" y1="24" x2="25" y2="22" />
              <line x1="25" y1="22" x2="29" y2="30" />
              <line x1="14" y1="34" x2="29" y2="30" />
              <line x1="25" y1="22" x2="34" y2="15" />
            </g>

            <g className="tech-cluster tech-float-c">
              <line x1="72" y1="72" x2="79" y2="66" />
              <line x1="79" y1="66" x2="87" y2="72" />
              <line x1="72" y1="72" x2="87" y2="72" />
              <line x1="79" y1="66" x2="83" y2="58" />
              <line x1="83" y1="58" x2="91" y2="62" />
              <line x1="87" y1="72" x2="94" y2="68" />
              <line x1="83" y1="58" x2="94" y2="68" />
            </g>
          </g>

          <g filter="url(#soft-glow)">
            {[
              [3, 70], [10, 60], [18, 67], [22, 54], [25, 62], [30, 70],
              [38, 12], [46, 19], [43, 29], [55, 16], [61, 24], [56, 31],
              [57, 26], [67, 35], [75, 32], [71, 45], [82, 43], [89, 56], [94, 51], [97, 35],
              [34, 74], [43, 67], [51, 73], [47, 59], [57, 64], [61, 70],
              [9, 18], [16, 24], [14, 34], [25, 22], [29, 30], [34, 15],
              [72, 72], [79, 66], [87, 72], [83, 58], [91, 62], [94, 68],
            ].map(([x, y], index) => (
              <circle
                key={`${x}-${y}-${index}`}
                cx={x}
                cy={y}
                r={index % 6 === 0 ? '0.5' : '0.38'}
                fill={smallNodeColor}
                className={index % 5 === 0 ? 'tech-blink' : undefined}
                style={index % 5 === 0 ? { animationDelay: `${index * 0.2}s` } : undefined}
              />
            ))}
          </g>

          <g filter="url(#orange-glow)">
            <g className="tech-hub-glow">
              <circle cx="22" cy="54" r="2.1" fill={hubColor} />
            </g>
            <g className="tech-hub" style={{ animationDelay: '0.5s' }}>
              <circle cx="67" cy="35" r="1.22" fill={hubColor} />
            </g>
            <g className="tech-hub" style={{ animationDelay: '1.1s' }}>
              <circle cx="82" cy="43" r="1.08" fill={hubColor} />
            </g>
            <g className="tech-hub" style={{ animationDelay: '1.7s' }}>
              <circle cx="47" cy="59" r="1.02" fill={hubColor} />
            </g>
            <g className="tech-hub" style={{ animationDelay: '2.2s' }}>
              <circle cx="94" cy="51" r="0.94" fill={hubColor} />
            </g>
            <g className="tech-hub" style={{ animationDelay: '2.7s' }}>
              <circle cx="25" cy="22" r="0.92" fill={hubColor} />
            </g>
            <g className="tech-hub" style={{ animationDelay: '3.1s' }}>
              <circle cx="83" cy="58" r="1.02" fill={hubColor} />
            </g>
          </g>
        </svg>
      </div>

      <div className="tech-parallax-lg absolute left-[21%] top-[18%] h-28 w-28 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="tech-parallax-lg absolute right-[18%] top-[28%] h-32 w-32 rounded-full bg-orange-400/7 blur-[130px]" />
      <div className="tech-parallax-md absolute bottom-[10%] left-[40%] h-36 w-36 rounded-full bg-sky-400/5 blur-[150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_34%,_rgba(2,1,1,0.7)_100%)]" />
    </div>
  );
};

export default ParticleBackground;
