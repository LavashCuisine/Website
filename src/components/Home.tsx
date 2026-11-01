import React from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import useStoreHours from '../hooks/useStoreHours';
import VisitUs from './VisitUs';
import GoogleReviews from './GoogleReviews';
import { INSTAGRAM_URL, GOOGLE_MAPS_URL } from '../business';

interface HomeProps {
  setCurrentView: (view: string) => void;
}

export default function Home({ setCurrentView }: HomeProps) {
  const { isOpen, label } = useStoreHours();

  return (
    <div className="w-full">
      <div className="bg-brand-green text-white border-b border-white/20 px-4 py-5 md:py-7 flex items-center justify-center gap-3 md:gap-5 text-center">
        <ShieldCheck aria-hidden="true" className="w-9 h-9 md:w-12 md:h-12 shrink-0" />
        <p className="font-display text-3xl md:text-5xl uppercase tracking-wide">100% Certified Halal</p>
      </div>
      <header className="relative w-full min-h-[640px] py-16 flex items-center justify-center overflow-hidden border-b border-border-hard">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('/hero-image.jpg')" }}
          ></div>
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center gap-6">
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/60 bg-[#101012] px-5 py-3 text-sm md:text-base font-bold uppercase tracking-wide text-white shadow-lg mb-4">
            <span aria-hidden="true" className={`w-3 h-3 rounded-full shrink-0 ${isOpen ? 'bg-green-400' : 'bg-zinc-300'}`} />
            <span>{isOpen ? `Kitchen Live • ${label}` : label}</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[140px] leading-[0.85] uppercase text-white mix-blend-overlay opacity-90">
            Canton's<br/>Loudest<br/>Flavors
          </h1>
          <p className="font-sub text-lg md:text-2xl text-text-smoke uppercase tracking-widest max-w-2xl mt-4">
            Authentic Lebanese Street Food • Chaotic Good
          </p>
          <div className="mt-8 group">
            <a
              href="https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-primary text-white font-display text-2xl md:text-4xl px-12 py-6 uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-300 transform group-hover:scale-105 shadow-[0_0_40px_-10px_rgba(217,37,37,0.6)] inline-block"
            >
              <span className="relative z-10 flex items-center gap-4">
                Order Now
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </header>

      <div className="w-full bg-brand-yellow text-black overflow-hidden border-b border-border-hard py-3 z-30 relative">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-8 font-display text-2xl uppercase tracking-tight">
          <span>Caution: Extremely Addictive</span> <Star className="w-6 h-6 fill-black" />
          <span>Warning: Garlic Levels Critical</span> <Star className="w-6 h-6 fill-black" />
          <span>Flavor Hazard Zone</span> <Star className="w-6 h-6 fill-black" />
          <span>Proceed With Hunger</span> <Star className="w-6 h-6 fill-black" />
          <span>Warning: May Cause Cravings</span> <Star className="w-6 h-6 fill-black" />
          <span>Spice Level: Dangerous</span> <Star className="w-6 h-6 fill-black" />
          <span>Not Responsible For Addiction</span> <Star className="w-6 h-6 fill-black" />
          <span>Caution: Extremely Addictive</span> <Star className="w-6 h-6 fill-black" />
          <span>Warning: Garlic Levels Critical</span> <Star className="w-6 h-6 fill-black" />
          <span>Flavor Hazard Zone</span> <Star className="w-6 h-6 fill-black" />
          <span>Proceed With Hunger</span> <Star className="w-6 h-6 fill-black" />
          <span>Warning: May Cause Cravings</span> <Star className="w-6 h-6 fill-black" />
          <span>Spice Level: Dangerous</span> <Star className="w-6 h-6 fill-black" />
          <span>Not Responsible For Addiction</span> <Star className="w-6 h-6 fill-black" />
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto w-full border-x border-border-hard min-h-screen grid grid-cols-1 lg:grid-cols-12">
        <section className="lg:col-span-8 border-r border-border-hard p-6 md:p-10">
          <div className="flex items-end justify-between mb-10 border-b border-border-hard pb-4">
            <h2 className="font-display text-5xl md:text-7xl uppercase text-white leading-none">The Heavy<br/>Hitters</h2>
            <button onClick={() => setCurrentView('menu')} className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-white transition-colors uppercase text-sm tracking-wider">
              View Full Menu <ArrowRight className="w-4 h-4 -rotate-45" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 group">
              <div className="relative aspect-[16/9] min-h-[280px] md:min-h-0 overflow-hidden bg-surface-dark border border-border-hard">
                <img src="/beirut-loaded-fries.png" alt="Chicken Shawarma Bowl W/ Fries" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <h3 className="font-display text-3xl md:text-4xl uppercase text-white mb-2 group-hover:text-primary transition-colors">Chicken Shawarma Bowl W/ Fries</h3>
                  <p className="font-body text-text-smoke max-w-lg line-clamp-2">Chicken shawarma served over crispy fries with garlic sauce, pickles, and spicy sauce.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 group">
              <div className="relative aspect-[16/9] min-h-[240px] md:min-h-0 overflow-hidden bg-surface-dark border border-border-hard">
                <img src="/og-falafel.png" alt="Falafel" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-3xl uppercase text-white mb-1 group-hover:text-primary transition-colors">The O.G. Falafel</h3>
                  <p className="font-body text-sm text-text-smoke">Chickpea fritters, tahini, turnips.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 relative mt-4 overflow-hidden group border border-border-hard bg-surface-dark">
              <img src="/new_lavash_tray.png" alt="Lavash Tray" className="absolute inset-0 w-full h-full object-[center_70%] md:object-center object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/70 to-transparent md:to-black/20 z-10"></div>
              <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 h-full min-h-[300px]">
                <div className="text-center md:text-left mt-auto md:mt-0 max-w-xl">
                  <h3 className="font-display text-4xl md:text-5xl uppercase text-white mb-2 group-hover:text-primary transition-colors">Feeding the Crew?</h3>
                  <p className="font-sub text-white/90 text-lg uppercase tracking-wider">Get the Lavash Tray • 5 Sandwiches • Feeds 4-5 People</p>
                </div>
                <a href="tel:+17344951115" className="bg-primary text-white hover:bg-white hover:text-primary font-display text-xl px-8 py-4 uppercase tracking-wider transition-colors min-w-fit text-center border-2 border-primary mt-auto md:mt-0">
                  Call to Order
                </a>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 p-6 md:p-10 bg-background-dark relative">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-8 text-primary">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
              <h2 className="font-sub text-sm uppercase tracking-[0.2em] text-text-smoke">Trending on the Street</h2>
            </div>

            <div className="flex flex-col gap-6">
              <article
                className="relative bg-surface-dark border border-border-hard group hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="bg-primary text-white text-xs font-bold uppercase px-2 py-1 shadow-lg transform rotate-3 inline-block">Viral #1</span>
                </div>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src="/spicy-chicken-manoushi.png" alt="Spicy Chicken Manoushi" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-2xl uppercase text-white leading-none">Spicy Chicken<br/>Manoushi</h3>
                  </div>
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-text-smoke hover:text-white underline underline-offset-4 mb-4">Read our Google reviews</a>
                  <a href="https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave" target="_blank" rel="noopener noreferrer" className="w-full border border-border-hard text-white font-bold py-3 uppercase text-sm hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                    Order Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>

              <article className="relative bg-surface-dark border border-border-hard group hover:border-primary transition-colors duration-300 opacity-80 hover:opacity-100">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src="/hommous.png" alt="Hommous" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-2xl uppercase text-white leading-none">Hommous</h3>
                  </div>
                  <a href="https://order.toasttab.com/online/lavash-lebanese-cuisine-46042-michigan-ave" target="_blank" rel="noopener noreferrer" className="w-full border border-border-hard text-white font-bold py-3 uppercase text-sm hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                    Order Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>


            </div>
          </div>
        </aside>
      </main>

      <GoogleReviews />
      <VisitUs />

      <footer className="border-t border-border-hard bg-background-dark pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-[12vw] leading-none text-white/5 uppercase select-none pointer-events-none">Lavash</h2>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-border-hard text-text-smoke text-sm uppercase tracking-wider">
            <p>© {new Date().getFullYear()} Lavash Lebanese Cuisine. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@lavashlebanesecuisine" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a>
              <a href="#visit-us" className="hover:text-primary transition-colors">Location & Hours</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
