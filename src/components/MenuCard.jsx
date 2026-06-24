import { useRef, useEffect } from 'react';

const NEON = {
  Pizza:    { neon: 'rgba(248,113,113,.65)', glow: 'rgba(248,113,113,.22)', accent: '#f87171' },
  Burgers:  { neon: 'rgba(255,184,48,.65)',  glow: 'rgba(255,184,48,.22)',  accent: '#ffb830' },
  Drinks:   { neon: 'rgba(56,189,248,.65)',  glow: 'rgba(56,189,248,.20)',  accent: '#38bdf8' },
  Desserts: { neon: 'rgba(167,139,250,.65)', glow: 'rgba(167,139,250,.18)', accent: '#a78bfa' },
};

export default function MenuCard({ item, index }) {
  const ref = useRef(null);
  const { neon, glow, accent } = NEON[item.category] ?? NEON.Burgers;

  /* CSS-only 3D tilt via inline custom property updates */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e) {
      const r  = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width  - 0.5;  /* -0.5 → 0.5 */
      const ny = (e.clientY - r.top)  / r.height - 0.5;
      const ry =  nx * 12;   /* rotateY */
      const rx = -ny * 9;    /* rotateX */
      el.style.transform =
        `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    }

    function onLeave() {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); obs.disconnect(); } },
      { rootMargin: '-40px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mcard"
      style={{
        '--card-neon':   neon,
        '--card-glow':   glow,
        '--card-accent': accent,
        '--delay':       `${index * 0.07}s`,
      }}
    >
      {/* image */}
      <div className="mcard__img-wrap">
        <img src={item.image} alt={item.name} className="mcard__img" loading="lazy" />
        <div className="mcard__price-badge mono">{item.price}</div>
      </div>

      {/* body */}
      <div className="mcard__body">
        <p className="mcard__cat mono">{item.category}</p>
        <h3 className="mcard__name display-font">{item.name}</h3>
        <p className="mcard__desc">{item.description}</p>
      </div>

      {/* neon bottom bar */}
      <div className="mcard__bar" />

      {/* availability */}
      <div className="mcard__avail mono">
        <div className="mcard__avail-dot" />
        Available
      </div>
    </div>
  );
}
