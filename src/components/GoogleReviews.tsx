import { Star, ArrowUpRight } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../reviews';
import { GOOGLE_MAPS_URL } from '../business';

export default function GoogleReviews() {
  return (
    <section aria-labelledby="reviews-heading" className="border-t border-border-hard bg-surface-dark px-6 py-14 md:px-10 md:py-20">
      <div className="max-w-[1520px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div><p className="font-sub uppercase tracking-widest text-brand-green mb-3">Real guests. Real flavor.</p><h2 id="reviews-heading" className="font-display text-4xl md:text-6xl uppercase text-white">From our Google reviews</h2></div>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold underline underline-offset-4 decoration-primary hover:text-primary">See all Google reviews <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
        </div>
        <div className="grid min-w-0 md:grid-cols-3 gap-6">
          {GOOGLE_REVIEWS.map(review => (
            <article key={review.url} className="flex min-w-0 flex-col gap-5 p-6 md:p-8 border border-border-hard rounded-lg bg-background-dark">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="w-12 h-12 rounded-full bg-brand-green/20 text-white font-bold flex items-center justify-center shrink-0">{review.author.split(' ').map(word => word[0]).slice(0, 2).join('')}</span>
                <div><h3 className="font-bold text-white">{review.author}</h3><p className="text-sm text-text-smoke">Google review</p></div>
              </div>
              <div className="flex items-center gap-2" aria-label={`${review.rating} out of 5 stars`}>
                <span className="flex gap-1" aria-hidden="true">{[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-5 h-5 ${star <= review.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-text-smoke'}`} />)}</span>
                <span className="text-sm text-white" aria-hidden="true">{review.rating}/5</span>
              </div>
              <blockquote className="font-body text-lg md:text-xl text-white leading-relaxed flex-1"><p>“{review.excerpt}”</p></blockquote>
              <a href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${review.author}'s original review on Google`} className="inline-flex items-center gap-2 text-text-smoke hover:text-white font-bold underline underline-offset-4">Read original review <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
