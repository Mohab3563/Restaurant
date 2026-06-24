import { Suspense } from 'react';
import FloatingFood from './FloatingFood';

export default function Hero() {
  return (
    <section className="hero">
      {/* R3F canvas stays — it's a renderer, not an animation library */}
      <div className="hero__canvas">
        <Suspense fallback={null}>
          <FloatingFood />
        </Suspense>
      </div>

      <div className="hero__content">
        {/* logo — CSS fadeUp, delay 0.15s */}
        <div className="hero__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#ffb830" strokeWidth="1.4" />
            <path
              d="M14 6 C14 6, 8 10, 8 14 C8 18.4 11.6 21 14 22 C16.4 21 20 18.4 20 14 C20 10, 14 6, 14 6Z"
              stroke="#ffb830" strokeWidth="1.3" fill="rgba(255,184,48,.12)" strokeLinejoin="round"
            />
            <circle cx="14" cy="14" r="2.5" fill="#ffb830" />
          </svg>
        </div>

        {/* eyebrow — CSS fadeUp, delay 0.28s */}
        <p className="hero__eyebrow mono">
          Digital Menu&nbsp;&nbsp;·&nbsp;&nbsp;Est. 2024
        </p>

        {/* name — CSS fadeUp, delay 0.41s */}
        <h1 className="hero__name display-font">
          <span className="gradient-amber">NEON</span>
          <br />
          <span style={{ fontWeight: 300, opacity: 0.7, letterSpacing: '.08em', fontSize: '52%' }}>
            KITCHEN
          </span>
        </h1>

        {/* slogan — CSS fadeUp, delay 0.54s */}
        <p className="hero__slogan">
          Extraordinary flavors, crafted for the bold.
          <br />
          Welcome to the future of fine dining.
        </p>

        {/* dots — CSS fadeUp, delay 0.67s */}
        <div className="hero__dots">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`hero__dot${i === 2 ? ' active' : ''}`} />
          ))}
        </div>
      </div>

      {/* scroll cue — CSS fadeIn, delay 1.6s */}
      <div className="hero__scroll">
        <span className="hero__scroll-label mono">Scroll</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
}
