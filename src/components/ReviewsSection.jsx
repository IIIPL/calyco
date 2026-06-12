// ReviewsSection — completely replaced with rich customer review layout
// Original file was a basic component; this version has social proof bar,
// filterable review cards, video placeholder, and lead CTA.
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Volume2, VolumeX } from 'lucide-react';
import { customerReviews, SOCIAL_PROOF } from '../data/reviews';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const StarRow = ({ rating = 5, size = 'sm' }) => {
  const sz = size === 'lg' ? 'text-lg' : 'text-sm';
  return (
    <div className={`flex items-center gap-0.5 ${sz}`} aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-[#F0C85A]' : 'text-[#0F1221]/15'}>&#9733;</span>
      ))}
    </div>
  );
};

// ─── Social proof bar ─────────────────────────────────────────────────────────
const SocialProofBar = () => (
  <div className="rounded-2xl border border-[#0F1221]/8 bg-[#FAFAF8] px-5 sm:px-8 py-5 mb-10">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8">
      <div className="col-span-2 sm:col-span-1 flex items-center gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0F1221] flex-shrink-0">
          <span className="text-[#F0C85A] text-xl font-bold">{SOCIAL_PROOF.rating}</span>
        </div>
        <div>
          <StarRow rating={5} size="lg" />
          <p className="text-xs text-[#0F1221]/50 font-light mt-1">{SOCIAL_PROOF.totalReviews}+ reviews</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0F1221]/35 mt-0.5">Average rating</p>
        </div>
      </div>
      <div className="text-center sm:text-left sm:border-l sm:border-[#0F1221]/8 sm:pl-8">
        <p className="text-3xl font-light text-[#0F1221] tracking-[-0.01em]">{SOCIAL_PROOF.completedProjects}+</p>
        <p className="text-sm text-[#0F1221]/55 font-medium mt-0.5">Projects completed</p>
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#0F1221]/30 font-bold mt-0.5">and counting</p>
      </div>
      <div className="text-center sm:text-left sm:border-l sm:border-[#0F1221]/8 sm:pl-8">
        <p className="text-3xl font-light text-[#0F1221] tracking-[-0.01em]">{SOCIAL_PROOF.cities}+</p>
        <p className="text-sm text-[#0F1221]/55 font-medium mt-0.5">Cities served</p>
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#0F1221]/30 font-bold mt-0.5">across India</p>
      </div>
      <div className="text-center sm:text-left sm:border-l sm:border-[#0F1221]/8 sm:pl-8">
        <p className="text-3xl font-light text-[#0F1221] tracking-[-0.01em]">{SOCIAL_PROOF.repeatCustomers}</p>
        <p className="text-sm text-[#0F1221]/55 font-medium mt-0.5">Repeat customers</p>
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#0F1221]/30 font-bold mt-0.5">book again</p>
      </div>
    </div>
  </div>
);

// ─── Single review card ───────────────────────────────────────────────────────
const ReviewCard = ({ review, featured = false }) => (
  <article className={`rounded-2xl border overflow-hidden flex flex-col transition-all hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] ${featured ? 'border-[#F0C85A]/40 bg-[#FFFDF5] shadow-[0_4px_18px_rgba(240,200,90,0.12)]' : 'border-[#0F1221]/8 bg-white'}`}>
    {review.projectPhoto ? (
      <div className="h-40 overflow-hidden flex-shrink-0">
        <img src={review.projectPhoto} alt={`${review.service} project`} className="w-full h-full object-cover" loading="lazy" />
      </div>
    ) : (
      <div className={`h-5 flex-shrink-0 ${featured ? 'bg-[#F0C85A]' : 'bg-[#0F1221]/8'}`} />
    )}
    <div className="flex flex-col flex-1 p-4 sm:p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${review.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{review.initials}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold text-[#0F1221] text-sm leading-tight truncate">{review.name}</p>
            <StarRow rating={review.rating} />
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3 h-3 text-[#0F1221]/35 flex-shrink-0" />
            <p className="text-[11px] text-[#0F1221]/45 font-medium truncate">{review.area}, {review.city}</p>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Link to={`/services/${review.serviceSlug}`} className="inline-flex items-center gap-1 rounded-full bg-[#493657]/8 text-[#493657] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] hover:bg-[#493657]/15 transition-colors">{review.service}</Link>
        {review.projectSize && <span className="text-[10px] text-[#0F1221]/35 font-light ml-2">{review.projectSize}</span>}
      </div>
      <blockquote className="text-sm text-[#0F1221]/65 font-light leading-[1.75] flex-1 mb-4">
        <span className="text-[#F0C85A] text-base leading-none mr-0.5">&ldquo;</span>
        {review.review}
        <span className="text-[#F0C85A] text-base leading-none ml-0.5">&rdquo;</span>
      </blockquote>
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#0F1221]/6">
        <span className="text-[10px] text-[#0F1221]/30 font-light">{review.date}</span>
        <Link to={`/calculators/service-cost-calculator?service=${review.serviceSlug}`} className="text-[11px] font-bold text-[#493657] hover:text-[#F0C85A] transition-colors whitespace-nowrap">Get similar estimate &#x2192;</Link>
      </div>
    </div>
  </article>
);

// ─── Video testimonial card ────────────────────────────────────────────
// Plays with sound when scrolled into view, mutes + pauses when scrolled away.
// Browsers block sound before the first user interaction with the page —
// until then it falls back to muted playback ("Tap for sound" stays visible).
const VideoTestimonialCard = () => {
  const videoRef = useRef(null);
  const cardRef  = useRef(null);
  const [muted, setMuted] = useState(true);
  const userMutedRef = useRef(false); // visitor explicitly muted — don't auto-unmute again

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    userMutedRef.current = v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  useEffect(() => {
    const v  = videoRef.current;
    const el = cardRef.current;
    if (!v || !el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        // In view — play, with sound unless the visitor muted manually
        if (!userMutedRef.current) {
          v.muted = false;
          v.play().then(() => setMuted(false)).catch(() => {
            // Sound blocked (no user interaction yet) — play muted instead
            v.muted = true;
            setMuted(true);
            v.play().catch(() => {});
          });
        } else {
          v.play().catch(() => {});
        }
      } else {
        // Out of view — mute and pause
        v.muted = true;
        setMuted(true);
        v.pause();
      }
    }, { threshold: [0, 0.6] });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={toggleSound}
      className="rounded-2xl border border-[#0F1221]/8 overflow-hidden relative min-h-[280px] bg-black group cursor-pointer">
      <video
        ref={videoRef}
        src="/real%20project%20section/Customer%20Reviews/Man_speaking_in_apartment_202606111720.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Sound toggle — top right */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); toggleSound(); }}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm text-white px-3 py-1.5 text-[11px] font-semibold hover:bg-black/75 transition-colors">
        {muted
          ? <><VolumeX className="w-3.5 h-3.5 text-[#F0C85A]" /> Tap for sound</>
          : <><Volume2 className="w-3.5 h-3.5 text-[#F0C85A]" /> Sound on</>}
      </button>

      <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#F0C85A] flex items-center justify-center text-black">
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
          <p className="font-bold text-white text-sm">Arjun's Experience</p>
        </div>
        <p className="text-xs text-white/80 line-clamp-2">"The daily updates and clean process completely changed my view on home painting."</p>
      </div>
    </article>
  );
};

// ─── Main export ─────────────────────────────────────────────────────────────
const FILTERS = ['All', 'Interior', 'Exterior', 'Waterproofing', 'Texture', 'Commercial', 'Rental'];

const ReviewsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All'
    ? customerReviews
    : customerReviews.filter((r) => r.service.toLowerCase().includes(activeFilter.toLowerCase()) || r.serviceSlug.includes(activeFilter.toLowerCase()));
  const displayed = filtered.slice(0, 6);

  return (
    <section className="bg-white py-12 sm:py-16 border-y border-[#0F1221]/6">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/40">Customer Reviews</span>
          <div className="mt-2 mb-4 h-[1px] w-10 bg-[#0F1221]/10" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] tracking-[-0.01em]">What Customers Say After Handover.</h2>
            <p className="text-sm text-[#0F1221]/50 font-light max-w-xs leading-[1.75] sm:text-right">Verified reviews from completed Calyco projects across India.</p>
          </div>
        </div>
        <SocialProofBar />
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-6">
          {FILTERS.map((f) => (
            <button key={f} type="button" onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeFilter === f ? 'bg-[#0F1221] text-white shadow-sm' : 'border border-[#0F1221]/12 text-[#0F1221]/55 hover:border-[#0F1221]/25 hover:text-[#0F1221]'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {displayed.map((review) => <ReviewCard key={review.id} review={review} featured={review.featured} />)}
          {activeFilter === 'All' && displayed.length < 7 && <VideoTestimonialCard />}
        </div>
        <div className="mt-10 rounded-2xl bg-[#F7F6F3] border border-[#0F1221]/7 px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StarRow rating={5} size="lg" />
              <span className="text-base font-bold text-[#0F1221]">{SOCIAL_PROOF.rating} average</span>
            </div>
            <p className="text-sm text-[#0F1221]/55 font-light">Based on {SOCIAL_PROOF.totalReviews}+ completed project reviews across {SOCIAL_PROOF.cities}+ Indian cities.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/get-quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white px-6 py-3 text-sm font-bold hover:bg-[#493657] transition-colors whitespace-nowrap">Book Free Site Visit &#x2192;</Link>
            <Link to="/gallery" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/65 px-6 py-3 text-sm font-medium hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-colors whitespace-nowrap">See project gallery &#x2192;</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;