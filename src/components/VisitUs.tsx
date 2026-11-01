import { MapPin, Clock, Instagram, ShieldCheck, ArrowUpRight, MessageSquare } from 'lucide-react';
import useStoreHours, { SCHEDULE, formatTime } from '../hooks/useStoreHours';
import { ADDRESS, GOOGLE_MAPS_URL, DIRECTIONS_URL, INSTAGRAM_URL } from '../business';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const linkClass = 'inline-flex items-center gap-2 text-white font-bold underline decoration-primary underline-offset-4 hover:text-primary transition-colors';

export default function VisitUs() {
  const { isOpen, label } = useStoreHours();
  return (
    <section id="visit-us" aria-labelledby="visit-heading" className="scroll-mt-28 border-t border-border-hard bg-background-dark px-6 py-14 md:px-10 md:py-20">
      <div className="max-w-[1520px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div><p className="font-sub uppercase tracking-widest text-brand-green mb-3">Your next stop in Canton</p><h2 id="visit-heading" className="font-display text-5xl md:text-7xl uppercase text-white">Come hungry.</h2></div>
          <div className="inline-flex items-center gap-3 self-start border border-brand-green bg-brand-green/10 px-5 py-4 text-white"><ShieldCheck aria-hidden="true" className="text-brand-green w-8 h-8 shrink-0" /><span className="font-sub text-xl uppercase tracking-wide">100% Certified Halal</span></div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <article className="bg-surface-dark border border-border-hard p-6 flex flex-col gap-4">
            <MapPin aria-hidden="true" className="text-primary" /><h3 className="font-display text-2xl uppercase text-white">Find Lavash</h3>
            <address className="not-italic text-text-smoke">{ADDRESS}</address><a href="tel:+17344951115" className={linkClass}>(734) 495-1115</a>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Get directions <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
          </article>
          <article className="bg-surface-dark border border-border-hard p-6 flex flex-col gap-4">
            <Clock aria-hidden="true" className="text-primary" /><h3 className="font-display text-2xl uppercase text-white">Opening hours</h3>
            <p className={isOpen ? 'text-brand-green' : 'text-text-smoke'}>{label} · Canton time</p>
            <dl className="text-sm space-y-2">{[1, 2, 3, 4, 5, 6, 0].map(day => {
              const hours = SCHEDULE[day];
              return <div key={day} className="flex justify-between gap-3"><dt className="text-text-smoke">{days[day]}</dt><dd className="text-white text-right">{hours ? `${formatTime(hours.open)} – ${formatTime(hours.close)}` : 'Closed'}</dd></div>;
            })}</dl>
          </article>
          <article className="bg-surface-dark border border-border-hard p-6 flex flex-col gap-4">
            <MessageSquare aria-hidden="true" className="text-primary" /><h3 className="font-display text-2xl uppercase text-white">Google reviews</h3>
            <p className="text-text-smoke">See what our guests are saying on Google. Enjoyed your visit? Share your experience with us.</p>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Read &amp; leave a review <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
          </article>
          <article className="bg-surface-dark border border-border-hard p-6 flex flex-col gap-4">
            <Instagram aria-hidden="true" className="text-primary" /><h3 className="font-display text-2xl uppercase text-white">Follow the flavor</h3>
            <p className="text-text-smoke">Fresh from our kitchen: food, specials, and the latest from Lavash.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>@lavashlebanesecuisine <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" /></a>
          </article>
        </div>
        <iframe title="Lavash Lebanese Cuisine location on Google Maps" src={'https://maps.google.com/maps?q=' + encodeURIComponent('Lavash Lebanese Cuisine ' + ADDRESS) + '&output=embed'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-72 md:h-96 mt-6 border-0 rounded-lg" />
      </div>
    </section>
  );
}
