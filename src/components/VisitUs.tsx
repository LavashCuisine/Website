import { MapPin, Clock, Instagram, ArrowUpRight } from 'lucide-react';
import { SCHEDULE, formatTime } from '../hooks/useStoreHours';
import { ADDRESS, DIRECTIONS_URL, INSTAGRAM_URL } from '../business';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const linkClass = 'inline-flex items-center gap-2 text-white font-bold underline decoration-primary underline-offset-4 hover:text-primary transition-colors';

export default function VisitUs() {
  return (
    <>
      <section id="visit-us" aria-labelledby="visit-heading" className="scroll-mt-28 border-t border-border-hard bg-background-dark px-6 py-14 md:px-10 md:py-20">
        <div className="max-w-[1520px] mx-auto">
          <p className="font-sub uppercase tracking-widest text-brand-green mb-3">46042 Michigan Avenue · Canton</p>
          <h2 id="visit-heading" className="font-display text-5xl md:text-7xl uppercase text-white mb-10">Find us. Come hungry.</h2>
          <div className="grid lg:grid-cols-2 border border-border-hard bg-surface-dark overflow-hidden rounded-lg">
            <div className="p-6 md:p-10 space-y-8">
              <div className="space-y-4">
                <h3 className="font-display text-3xl uppercase text-white flex items-center gap-3"><MapPin aria-hidden="true" className="text-primary shrink-0" /> Our location</h3>
                <address className="not-italic text-text-smoke text-lg">{ADDRESS}</address>
                <a href="tel:+17344951115" className={linkClass}>(734) 495-1115</a>
                <div><a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">Get directions <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a></div>
              </div>
              <div className="space-y-4 border-t border-border-hard pt-8">
                <h3 className="font-display text-3xl uppercase text-white flex items-center gap-3"><Clock aria-hidden="true" className="text-primary shrink-0" /> Hours of operation</h3>
                <p className="text-white">Open until 9 PM everyday</p>
                <dl className="space-y-2 max-w-md">{[1, 2, 3, 4, 5, 6, 0].map(day => {
                  const hours = SCHEDULE[day];
                  return <div key={day} className="flex justify-between gap-4"><dt className="text-text-smoke">{days[day]}</dt><dd className="text-white text-right">{hours ? `${formatTime(hours.open)} – ${formatTime(hours.close)}` : 'Closed'}</dd></div>;
                })}</dl>
              </div>
            </div>
            <iframe title="Lavash Lebanese Cuisine location on Google Maps" src={'https://maps.google.com/maps?q=' + encodeURIComponent('Lavash Lebanese Cuisine ' + ADDRESS) + '&output=embed'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-96 lg:h-full lg:min-h-[560px] border-0" />
          </div>
        </div>
      </section>
      <section aria-labelledby="instagram-heading" className="border-t border-border-hard bg-surface-dark px-6 py-10 md:px-10">
        <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div><h2 id="instagram-heading" className="font-display text-3xl uppercase text-white flex items-center gap-3"><Instagram aria-hidden="true" className="text-primary" /> Follow the flavor</h2><p className="text-text-smoke mt-3">Food, specials, and the latest from our kitchen.</p></div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>@lavashlebanesecuisine <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" /></a>
        </div>
      </section>
    </>
  );
}
