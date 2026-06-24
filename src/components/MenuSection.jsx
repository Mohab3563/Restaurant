import { useState, useRef, useEffect } from 'react';
import MenuCard from './MenuCard';

const ITEMS = [
  /* ── PIZZA ── */
  {
    id: 1, category: 'Pizza',
    name: 'Tartufo Nero',
    description: 'Black truffle cream, fior di latte, aged parmesan, wild arugula, sourdough base.',
    price: '$28',
    image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2, category: 'Pizza',
    name: 'Diavola Royale',
    description: 'San Marzano tomato, spicy Calabrian salami, smoked scamorza, chilli honey.',
    price: '$24',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3, category: 'Pizza',
    name: 'Bianca Estate',
    description: 'White base, ricotta, caramelised figs, Gorgonzola, walnuts, balsamic.',
    price: '$26',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4, category: 'Pizza',
    name: 'Margherita DOC',
    description: 'DOP San Marzano, buffalo mozzarella, fresh basil, extra-virgin olive oil.',
    price: '$21',
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  /* ── BURGERS ── */
  {
    id: 5, category: 'Burgers',
    name: 'Wagyu Gold',
    description: '200g A5 wagyu, aged cheddar, caramelised onion jam, truffle aioli, brioche.',
    price: '$38',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6, category: 'Burgers',
    name: 'Smoked BBQ Stack',
    description: 'Double smash patty, bourbon bacon, jalapeño relish, smoked gouda, pickled slaw.',
    price: '$29',
    image: 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7, category: 'Burgers',
    name: 'Crispy Chicken',
    description: 'Nashville-hot fried chicken thigh, sriracha slaw, pickles, comeback sauce.',
    price: '$26',
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8, category: 'Burgers',
    name: 'Garden Umami',
    description: 'Portobello & lentil patty, miso mayo, roasted pepper, avocado, seed bun.',
    price: '$24',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  /* ── DRINKS ── */
  {
    id: 9, category: 'Drinks',
    name: 'Golden Hour',
    description: 'Aged bourbon, honey syrup, lemon, orange bitters, thyme. Hand-carved ice sphere.',
    price: '$18',
    image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 10, category: 'Drinks',
    name: 'Midnight Velvet',
    description: 'Blackberry vodka, elderflower liqueur, lemon, butterfly-pea cold foam.',
    price: '$16',
    image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 11, category: 'Drinks',
    name: 'Sparkling Yuzu',
    description: 'Yuzu juice, Japanese sake, citrus bitters, sparkling water, edible gold.',
    price: '$14',
    image: 'https://images.pexels.com/photos/616833/pexels-photo-616833.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 12, category: 'Drinks',
    name: 'Cold Brew Negroni',
    description: 'Cold brew coffee, Campari, sweet vermouth, orange peel, espresso foam.',
    price: '$17',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  /* ── DESSERTS ── */
  {
    id: 13, category: 'Desserts',
    name: 'Dark Soufflé',
    description: 'Valrhona 72% chocolate, salted caramel core, vanilla crème anglaise tableside.',
    price: '$19',
    image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 14, category: 'Desserts',
    name: 'Mango Saffron',
    description: 'Alfonso mango panna cotta, saffron gel, pistachio crumble, edible florals.',
    price: '$16',
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 15, category: 'Desserts',
    name: 'Opera Royale',
    description: 'Seven-layer almond joconde, coffee buttercream, dark ganache, gold dusted.',
    price: '$17',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 16, category: 'Desserts',
    name: 'Berry Pavlova',
    description: 'Italian meringue, passion fruit curd, fresh mixed berries, mint micro-herbs.',
    price: '$15',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const CATEGORIES = [
  { id: 'All',      emoji: '✦',  label: 'All'      },
  { id: 'Pizza',    emoji: '🍕', label: 'Pizza'    },
  { id: 'Burgers',  emoji: '🍔', label: 'Burgers'  },
  { id: 'Drinks',   emoji: '☕', label: 'Drinks'   },
  { id: 'Desserts', emoji: '🍰', label: 'Desserts' },
];

export default function MenuSection() {
  const [active, setActive]     = useState('All');
  const [visible, setVisible]   = useState(true);
  const headerRef = useRef(null);
  const tabsRef   = useRef(null);

  /* scroll-reveal: header */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); obs.disconnect(); } },
      { rootMargin: '-80px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* scroll-reveal: tabs */
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); obs.disconnect(); } },
      { rootMargin: '-60px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* category switch: fade out → update → fade in */
  function handleCategoryClick(id) {
    if (id === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(id);
      setVisible(true);
    }, 200);
  }

  const filtered = active === 'All'
    ? ITEMS
    : ITEMS.filter(i => i.category === active);

  return (
    <section className="menu-section" id="menu">
      <div className="menu__inner">

        {/* header */}
        <div ref={headerRef} className="menu__header">
          <div className="menu__tag"><span>Digital Menu</span></div>
          <h2 className="menu__title display-font">
            Our <span className="gradient-amber">Signature</span> Dishes
          </h2>
          <p className="menu__sub mono">— select a category to explore —</p>
        </div>

        {/* category tabs */}
        <div ref={tabsRef} className="cat-tabs">
          {CATEGORIES.map(cat => {
            const count = cat.id === 'All'
              ? ITEMS.length
              : ITEMS.filter(i => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`cat-tab${active === cat.id ? ' active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <span className="tab-emoji">{cat.emoji}</span>
                {cat.label}
                <span className="tab-count mono">{count}</span>
              </button>
            );
          })}
        </div>

        {/* grid — CSS gridIn/gridOut animation via `visible` toggle */}
        <div
          className={`menu-grid${visible ? '' : ' switching'}`}
          key={active}
        >
          {filtered.map((item, idx) => (
            <MenuCard key={item.id} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
