import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import useStoreHours from '../hooks/useStoreHours';

interface MenuProps {
  setCurrentView: (view: string) => void;
}

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  img: string;
  badge?: string;
  badgeColor?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  subtitle: string;
  items: MenuItem[];
}

const SKYTAB_URL = 'https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave';

const categories: MenuCategory[] = [
  {
    id: 'wraps-sandwiches',
    label: 'Wraps & Sandwiches',
    subtitle: 'Street Style',
    items: [
      {
        id: 'chicken-shawarma-wrap',
        name: 'Lavash Saj Bread Chicken Shawarma',
        desc: 'Juicy marinated chicken carved fresh off the spit, wrapped in house-baked saj bread with pickles and garlic whip.',
        tags: ['Signature'],
        badge: 'Fan Favorite',
        badgeColor: 'bg-primary',
        img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'spicy-chicken-manoushi',
        name: 'Spicy Chicken Manoushi',
        desc: 'Wood-fired Lebanese flatbread topped with spiced chicken, melted cheese, and a kick of chili garlic sauce.',
        tags: ['Spicy'],
        badge: 'Spicy',
        badgeColor: 'bg-black/70 backdrop-blur-sm',
        img: '/spicy-chicken-manoushi.png'
      },
      {
        id: 'caesar-chicken-wrap',
        name: 'Caesar Chicken Wrap',
        desc: 'Grilled chicken, crisp romaine, shaved parmesan, and creamy Caesar dressing rolled in a soft tortilla.',
        tags: [],
        img: 'https://images.unsplash.com/photo-1626804475297-41609ea0aa4eb?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'tawook',
        name: 'Tawook',
        desc: 'Tender marinated chicken breast cubes, coleslaw, pickles, fries tucked inside, and our signature garlic whip.',
        tags: ['Halal'],
        img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'platters',
    label: 'Platters',
    subtitle: 'Authentic Plates',
    items: [
      {
        id: 'chicken-shawarma-bowl',
        name: 'Chicken Shawarma Bowl',
        desc: 'Slow-roasted shawarma over turmeric rice with pickled turnips, hummus, and toum garlic sauce.',
        tags: ['GF', 'High Protein'],
        badge: 'Most Popular',
        badgeColor: 'bg-primary',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'mixed-grill',
        name: 'Mixed Grill',
        desc: 'A generous platter of kafta, chicken tawook, and lamb skewers served with grilled vegetables and fresh pita.',
        tags: ['Halal'],
        img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'lamb-chops',
        name: 'Lamb Chops',
        desc: 'Three tender marinated chops grilled to perfection, served with roasted potatoes and mint yogurt.',
        tags: [],
        badge: 'Premium',
        badgeColor: 'bg-brand-green',
        img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'starters',
    label: 'Starters',
    subtitle: 'Share the Table',
    items: [
      {
        id: 'hommous',
        name: 'Hommous',
        desc: 'Silky smooth chickpea dip drizzled with extra virgin olive oil, served with warm pita bread.',
        tags: ['VG', 'GF'],
        img: 'https://images.unsplash.com/photo-1637949385162-e416da77e06b?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'fattoush',
        name: 'Fattoush',
        desc: 'Crispy pita chips tossed with fresh greens, tomatoes, radish, and tangy pomegranate vinaigrette.',
        tags: ['VG'],
        img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'grape-leaves',
        name: 'Grape Leaves',
        desc: 'Hand-rolled grape leaves stuffed with herbed rice, slow-cooked in lemon and olive oil.',
        tags: ['VG'],
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'wings',
        name: 'Wings',
        desc: 'Crispy golden wings tossed in your choice of our signature Lebanese spice blend or garlic butter.',
        tags: [],
        badge: 'Crowd Pleaser',
        badgeColor: 'bg-primary',
        img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'falafel',
        name: 'Falafel',
        desc: 'Crispy chickpea fritters with fresh herbs, served with tahini sauce and pickled vegetables.',
        tags: ['VG'],
        badge: 'Vegan',
        badgeColor: 'bg-brand-green',
        img: 'https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'beirut-loaded-fries',
        name: 'Beirut Loaded Fries',
        desc: 'Thick-cut fries smothered in garlic whip, spiced ground beef, pickles, and a drizzle of tahini.',
        tags: [],
        img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'desserts',
    label: 'Desserts',
    subtitle: 'Sweet Finish',
    items: [
      {
        id: 'baklava',
        name: 'Baklava',
        desc: 'Flaky layers of phyllo pastry filled with crushed pistachios and walnuts, soaked in rose-scented honey syrup.',
        tags: [],
        badge: 'House Made',
        badgeColor: 'bg-brand-yellow text-black',
        img: 'https://images.unsplash.com/photo-1519676867240-f03562e64571?q=80&w=800&auto=format&fit=crop'
      }
    ]
  }
];

export default function Menu({ setCurrentView }: MenuProps) {
  const { isOpen, label } = useStoreHours();

  return (
    <div className="flex h-[calc(100vh-96px)] overflow-hidden">
      <aside className="hidden lg:flex flex-col w-64 h-full border-r border-border-hard bg-background-dark overflow-y-auto py-8 pl-10 pr-4 shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-white font-display text-4xl uppercase leading-none tracking-tight mb-2">The<br/>Menu</h1>
            <p className="text-text-smoke text-xs uppercase tracking-widest text-brand-yellow">Authentic Lebanese</p>
          </div>

          <nav className="flex flex-col gap-2">
            {categories.map((cat, i) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`group flex items-center justify-between py-3 pl-4 pr-2 rounded-r-lg transition-all ${
                  i === 0
                    ? 'border-l-4 border-brand-green bg-gradient-to-r from-brand-green/10 to-transparent'
                    : 'border-l-4 border-transparent hover:border-border-hard hover:bg-white/5'
                }`}
              >
                <span className={`font-display text-xl uppercase tracking-wide ${i === 0 ? 'text-white' : 'text-text-smoke hover:text-white'}`}>{cat.label}</span>
                <ArrowRight className={`w-4 h-4 transition-all ${
                  i === 0
                    ? 'text-brand-green opacity-100 translate-x-0'
                    : 'text-text-smoke opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-8 border-t border-border-hard">
          <div className="flex items-center gap-2 text-xs">
            <Clock className={`w-4 h-4 ${isOpen ? 'text-brand-green' : 'text-primary'}`} />
            <span className={isOpen ? 'text-brand-green' : 'text-primary'}>{label}</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-full relative">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] z-0 select-none">
          <h1 className="text-[20vw] font-display text-white uppercase leading-none whitespace-nowrap">LAVASH</h1>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10 pb-20">

          <div className="flex items-center justify-between bg-surface-dark border border-border-hard rounded-lg p-5">
            <p className="text-white font-sub text-lg uppercase tracking-wide">View full menu & order online</p>
            <a
              href={SKYTAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-colors shrink-0"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {categories.map((cat, catIndex) => (
            <React.Fragment key={cat.id}>
              <section id={cat.id} className="scroll-mt-24">
                <div className="flex items-baseline justify-between mb-8 border-b border-border-hard pb-4">
                  <h2 className="text-white font-display text-5xl uppercase tracking-tight">{cat.label}</h2>
                  <span className="text-brand-green font-mono text-sm uppercase tracking-wider">{cat.subtitle}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cat.items.map(item => (
                    <div
                      key={item.id}
                      className="group relative flex flex-col bg-surface-dark border border-border-hard rounded-lg overflow-hidden hover:border-brand-green/50 transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {item.badge && (
                          <div className={`absolute top-3 left-3 z-10 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${item.badgeColor}`}>
                            {item.badge}
                          </div>
                        )}
                        <img
                          src={item.img}
                          alt={item.name}
                          className="object-cover w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1 gap-3">
                        <h3 className="text-white font-display text-2xl uppercase leading-none">{item.name}</h3>
                        <p className="text-text-smoke text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                        <div className="mt-auto pt-2 flex justify-between items-center">
                          <div className="flex gap-2">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-xs border border-border-hard text-text-smoke px-1.5 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                          <a href={SKYTAB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#27272A] hover:bg-primary text-white transition-colors group/btn">
                            <ArrowRight className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {catIndex === 1 && (
                <section className="relative w-full rounded-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
                  <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop" alt="Catering" className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">Catering</span>
                      <h2 className="text-white font-display text-4xl md:text-5xl uppercase leading-[0.9] mb-2">Feeding the crew?<br/><span className="text-primary">Get the Lavash Tray.</span></h2>
                      <p className="text-text-smoke text-lg">Serves 10-12 hungry humans. Includes all meats, all sides, and extra garlic sauce.</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <button onClick={() => setCurrentView('catering')} className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-colors">
                        View Catering
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </React.Fragment>
          ))}

          <div className="flex flex-col items-center gap-4 py-8 border-t border-border-hard">
            <p className="text-text-smoke text-center text-lg">Ready to order? View our full menu with pricing on SkyTab.</p>
            <a
              href={SKYTAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary hover:bg-red-600 text-white px-10 py-4 rounded-lg font-display text-2xl uppercase tracking-wide transition-colors"
            >
              View Full Menu & Order <ArrowRight className="w-6 h-6" />
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
