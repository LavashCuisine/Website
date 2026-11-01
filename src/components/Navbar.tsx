import React, { useState } from 'react';
import { Flame, Menu as MenuIcon, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function navigate(view: string) {
    setCurrentView(view);
    setMobileOpen(false);
  }

  function visitUs() {
    navigate('home');
    requestAnimationFrame(() => document.getElementById('visit-us')?.scrollIntoView({ behavior: 'smooth' }));
  }

  return (
    <nav className="fixed top-0 w-full z-40 border-b border-border-hard bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer relative z-50"
          onClick={() => navigate('home')}
        >
          <div className="relative h-32 -my-4 flex items-center justify-center">
            <img
              src="/40d5f3fe-bf32-42eb-8908-98dd60b9e62e.PNG"
              alt="Lavash Logo"
              className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
            />
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                WebkitMaskImage: 'url("/40d5f3fe-bf32-42eb-8908-98dd60b9e62e.PNG")',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
            >
              <motion.div
                className="absolute top-0 bottom-0 w-[150%] -left-[150%]"
                style={{
                  backgroundImage: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                }}
                animate={{ x: ['0%', '200%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              />
            </div>
          </div>
        </div>

        {currentView === 'home' || currentView === 'catering' ? (
          <>
            <div className="hidden md:flex items-center gap-8 font-sub uppercase tracking-wider text-sm text-text-smoke">
              <button onClick={() => navigate('menu')} className="hover:text-primary transition-colors">Menu</button>
              <button onClick={visitUs} className="hover:text-primary transition-colors">Visit Us</button>
              <button onClick={() => navigate('catering')} className="hover:text-primary transition-colors">Catering</button>
            </div>
            <a
              href="https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all transform hover:scale-105"
            >
              <span>Order Now</span>
            </a>
          </>
        ) : (
          <div className="hidden md:flex flex-1 justify-end gap-6">
            <label className="flex flex-col min-w-40 h-10 max-w-64 group">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-hard group-focus-within:border-primary transition-colors">
                <div className="text-text-smoke flex bg-transparent items-center justify-center pl-3">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-zinc-500 px-3 text-sm font-normal outline-none"
                  placeholder="Find your cravings..."
                />
              </div>
            </label>
            <a
              href="https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-red-600 transition-colors text-white text-sm font-bold uppercase tracking-wide border-b-2 border-red-800 active:border-b-0 active:translate-y-[2px]"
            >
              Order Now
            </a>
          </div>
        )}

        <button
          className="md:hidden text-white p-2 relative z-50"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a0a0a] border-t border-border-hard px-4 pb-6 flex flex-col gap-4"
          >
            <button
              onClick={() => navigate('menu')}
              className="text-left font-sub uppercase tracking-wider text-sm text-text-smoke hover:text-primary transition-colors pt-4"
            >
              Menu
            </button>
            <button
              onClick={visitUs}
              className="text-left font-sub uppercase tracking-wider text-sm text-text-smoke hover:text-primary transition-colors"
            >
              Visit Us
            </button>
            <button
              onClick={() => navigate('catering')}
              className="text-left font-sub uppercase tracking-wider text-sm text-text-smoke hover:text-primary transition-colors"
            >
              Catering
            </button>
            <a
              href="https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all"
            >
              Order Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
