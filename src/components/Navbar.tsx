import { useEffect, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}
const ORDER_URL = 'https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave';

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [mobileOpen]);
  function navigate(view: string) {
    setCurrentView(view);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function visitUs() {
    navigate('home');
    requestAnimationFrame(() => document.getElementById('visit-us')?.scrollIntoView({ behavior: 'smooth' }));
  }
  const navClass = 'min-h-11 px-3 text-left font-sub uppercase tracking-wider text-base text-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
  return (
    <nav aria-label="Main navigation" className="fixed top-0 inset-x-0 z-40 border-b border-border-hard bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between gap-3">
        <button onClick={() => navigate('home')} aria-label="Lavash home" className="shrink-0 focus-visible:outline-2 focus-visible:outline-white rounded">
          <img src="/40d5f3fe-bf32-42eb-8908-98dd60b9e62e.PNG" alt="Lavash Lebanese Cuisine" className="h-24 w-24 md:h-32 md:w-32 object-contain" />
        </button>
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          <button onClick={() => navigate('menu')} aria-current={currentView === 'menu' ? 'page' : undefined} className={navClass}>Menu</button>
          <button onClick={visitUs} className={navClass}>Visit Us</button>
          <button onClick={() => navigate('catering')} aria-current={currentView === 'catering' ? 'page' : undefined} className={navClass}>Catering</button>
        </div>
        <div className="flex items-center gap-2">
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 flex items-center justify-center rounded-lg bg-primary hover:bg-red-700 text-white px-4 md:px-6 text-sm font-bold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Order Now</a>
          <button className="md:hidden text-white w-11 h-11 flex items-center justify-center rounded-lg border border-border-hard" onClick={() => setMobileOpen(open => !open)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <X aria-hidden="true" className="w-6 h-6" /> : <MenuIcon aria-hidden="true" className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileOpen && <div id="mobile-navigation" className="md:hidden border-t border-border-hard px-4 py-3 flex flex-col gap-1 max-h-[calc(100dvh-80px)] overflow-y-auto">
        <button onClick={() => navigate('menu')} className={navClass}>Menu</button>
        <button onClick={visitUs} className={navClass}>Location &amp; Hours</button>
        <button onClick={() => navigate('catering')} className={navClass}>Catering</button>
      </div>}
    </nav>
  );
}
