import React from 'react';
import { INSTAGRAM_URL } from '../business';
import { ArrowRight, Phone, ExternalLink, UtensilsCrossed, Users, Truck, Flame, PartyPopper, Briefcase, GraduationCap, Trophy } from 'lucide-react';

const PHONE_NUMBER = 'tel:+17344951115';
const EZCATER_URL = 'https://www.ezcater.com/catering/lavash-lebanese-cuisine-3';

const categories = [
  {
    icon: UtensilsCrossed,
    title: 'Trays & Platters',
    description: 'Build your spread with hummus, baba ghanouj, fattoush, tabbouli, rice, and sides.',
  },
  {
    icon: Flame,
    title: 'Skewers & Grills',
    description: 'Choose chicken, beef, or mixed shawarma, plus shish tawook, kafta, and kabob skewers.',
  },
  {
    icon: Truck,
    title: 'Wings & Tenders',
    description: 'Whole wings, sweet BBQ boneless chicken wings, and chicken tenders for group orders.',
  },
  {
    icon: Users,
    title: 'Sandwiches & Pies',
    description: 'Chicken shawarma, beef shawarma, falafel sandwiches, and spinach or meat pies for your gathering.',
  },
];

const steps = [
  { number: '01', title: 'Browse the Menu', description: 'Browse our catering menu and current pricing on ezCater.' },
  { number: '02', title: 'Place Your Order', description: 'Place your catering order on ezCater or call (734) 495-1115 to discuss your event.' },
  { number: '03', title: 'We Prep It Fresh', description: 'Everything is made fresh for your event. No shortcuts, no compromises.' },
];

const useCases = [
  { label: 'Office Lunches', icon: Briefcase },
  { label: 'Family Gatherings', icon: Users },
  { label: 'Weddings', icon: PartyPopper },
  { label: 'Graduations', icon: GraduationCap },
  { label: 'Game Day', icon: Trophy },
  { label: 'Corporate Events', icon: Briefcase },
];

export default function Catering() {
  return (
    <div className="w-full">
      {/* Hero */}
      <header className="relative w-full min-h-[480px] md:min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-border-hard">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-background-dark/30 z-10"></div>
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/new_lavash_tray.png')" }}
          ></div>
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center gap-5 md:gap-6 py-12 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/20 border border-brand-green/50 text-brand-green text-xs font-bold uppercase tracking-widest">
            <UtensilsCrossed className="w-3 h-3" />
            Catering & Large Orders
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[120px] leading-[0.85] uppercase text-white">
            Feed the<br />Crew
          </h1>
          <p className="font-sub text-lg md:text-2xl text-text-smoke uppercase tracking-widest max-w-2xl mt-2">
            100% Certified Halal Lebanese catering in Canton, MI for events, offices, and parties. Order on ezCater or call the restaurant.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={EZCATER_URL}
              className="flex items-center gap-3 bg-primary hover:bg-red-700 text-white font-display text-xl md:text-2xl px-6 py-4 md:px-10 md:py-5 uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(217,37,37,0.6)]"
            >
              Order on ezCater
              <ExternalLink className="w-6 h-6" />
            </a>
            <a
              href={PHONE_NUMBER}
              className="flex items-center gap-3 border-2 border-white/30 hover:border-white text-white font-display text-xl md:text-2xl px-6 py-4 md:px-10 md:py-5 uppercase tracking-wider transition-all hover:bg-white/5"
            >
              Call for Catering
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* What We Offer */}
      <section className="border-b border-border-hard">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-28">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase text-white leading-none">What We Offer</h2>
            <p className="font-sub text-lg text-text-smoke uppercase tracking-widest mt-4">Something for every event, every appetite</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-surface-dark border border-border-hard p-6 md:p-8 hover:border-primary transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/30 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl uppercase text-white mb-3">{cat.title}</h3>
                <p className="font-body text-sm text-text-smoke leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border-hard bg-surface-dark">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-28">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase text-white leading-none">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center md:text-left">
                <span className="font-display text-6xl md:text-7xl text-primary/20 leading-none">{step.number}</span>
                <h3 className="font-display text-2xl uppercase text-white mt-2 mb-3">{step.title}</h3>
                <p className="font-body text-text-smoke leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="border-b border-border-hard">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-28">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase text-white leading-none">Perfect For</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {useCases.map((uc) => (
              <div
                key={uc.label}
                className="flex items-center gap-2 px-5 py-3 bg-surface-dark border border-border-hard text-white font-sub text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
              >
                <uc.icon className="w-4 h-4" />
                {uc.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden border-b border-border-hard">
        <div className="absolute inset-0 bg-primary/90 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-30"
          style={{ backgroundImage: "url('/new_lavash_tray.png')" }}
        ></div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-28 text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase text-white leading-none">
            Ready to Feed<br />the Crowd?
          </h2>
          <p className="font-sub text-lg text-white/80 uppercase tracking-widest max-w-xl">
            Order on ezCater or call (734) 495-1115 for custom menus and large event pricing.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={EZCATER_URL}
              className="flex items-center gap-3 bg-white text-primary hover:bg-black hover:text-white font-display text-xl md:text-2xl px-6 py-4 md:px-10 md:py-5 uppercase tracking-wider transition-all transform hover:scale-105"
            >
              Order on ezCater
              <ExternalLink className="w-6 h-6" />
            </a>
            <a
              href={PHONE_NUMBER}
              className="flex items-center gap-3 border-2 border-white/50 hover:border-white text-white font-display text-xl md:text-2xl px-6 py-4 md:px-10 md:py-5 uppercase tracking-wider transition-all hover:bg-white/10"
            >
              Call for Catering
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-hard bg-background-dark pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-[12vw] leading-none text-white/5 uppercase select-none pointer-events-none">Lavash</h2>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-border-hard text-text-smoke text-sm uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Lavash Lebanese Cuisine. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@lavashlebanesecuisine" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a>
              <a href="/location" className="hover:text-primary transition-colors">Location &amp; Hours</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
