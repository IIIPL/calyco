import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/AsianPaints.module.css';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'visualizer',
    title: 'Discover Your Perfect Shade',
    subtitle: 'Use our new Visualizer to try before you buy.',
    ctaLabel: 'Launch Visualizer',
    ctaHref: '/visualize',
    imageSrc: '/Assets/HERO/hero1-full-page.png',
    imageAlt: 'Warm living room painted in Calyco neutrals with accent chairs.',
  },
  {
    id: 'eco-paints',
    title: 'Zero-VOC, Maximum Performance',
    subtitle: "Explore Calyco's Green Assure certified formulas for a healthier home.",
    ctaLabel: 'Shop Eco-Paints',
    ctaHref: '/eco-friendly-paint',
    imageSrc: '/Assets/HERO/hero2.png',
    imageAlt: 'Sunlit space with Calyco eco-friendly paint on walls and trim.',
  },
];

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: JSX.Element;
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'interior',
    title: 'Interior Walls',
    description: 'Premium, washable paints for every room.',
    href: '/interior-paint',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="36" height="22" rx="6" fill="#fde68a" />
        <path d="M12 18h24v-8l-12-6-12 6z" fill="#2563eb" opacity="0.85" />
        <path d="M12 30h24" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" opacity="0.45" />
        <rect x="16" y="26" width="8" height="10" rx="2" fill="#ffffff" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: 'exterior',
    title: 'Exterior Walls',
    description: 'Weather-resistant, dust-proof coatings for lasting protection.',
    href: '/exterior-paint',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 38h36v-16L24 8 6 22z" fill="#c7d2fe" />
        <path d="M12 38V24l12-9 12 9v14" fill="#2563eb" opacity="0.85" />
        <path d="M6 38h36" stroke="#1e293b" strokeWidth={2} strokeLinecap="round" opacity="0.3" />
        <rect x="20" y="28" width="8" height="10" rx="2" fill="#f8fafc" />
      </svg>
    ),
  },
  {
    id: 'wood-metal-finishes',
    title: 'Wood & Metal Finishes',
    description: 'Durable stains and enamels for trim and furniture.',
    href: '/products/wood-metal-finishes',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="28" width="36" height="10" rx="4" fill="#fbbf24" />
        <rect x="18" y="12" width="12" height="20" rx="4" fill="#1f2937" />
        <path d="M12 32h24" stroke="#0f172a" strokeWidth={2} strokeLinecap="round" opacity="0.35" />
        <path d="M22 12h4" stroke="#f8fafc" strokeWidth={2} strokeLinecap="round" opacity="0.9" />
      </svg>
    ),
  },
];

interface DigitalTool {
  id: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  icon: JSX.Element;
}

const DIGITAL_TOOLS: DigitalTool[] = [
  {
    id: 'visualizer',
    title: 'Wall Visualizer',
    description: 'See Calyco colors on your own walls instantly.',
    href: '/visualize',
    buttonLabel: 'Try Now',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" fill="#dbeafe" />
        <path d="M16 24h16" stroke="#2563eb" strokeWidth={2.4} strokeLinecap="round" />
        <path d="M24 16v16" stroke="#7c3aed" strokeWidth={2.4} strokeLinecap="round" />
        <circle cx="24" cy="24" r="6" fill="#1d4ed8" opacity="0.85" />
      </svg>
    ),
  },
  {
    id: 'budget',
    title: 'Paint Budget Calculator',
    description: 'Estimate your project cost in minutes.',
    href: '/tools?focus=budget-calculator',
    buttonLabel: 'Calculate',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="28" height="32" rx="6" fill="#e0f2fe" />
        <rect x="16" y="14" width="16" height="6" rx="2" fill="#0ea5e9" />
        <path d="M18 26h4m8 0h-4m-8 6h4m8 0h-4" stroke="#1f2937" strokeWidth={2} strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'finish-guide',
    title: 'Finish Guide',
    description: 'Choose the right sheen (Matte, Satin, Gloss) for your project.',
    href: '/interior-paint#finishes',
    buttonLabel: 'Learn More',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 34l8-20 8 16 8-12" stroke="#7c3aed" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="34" r="4" fill="#fbbf24" />
        <circle cx="28" cy="30" r="4" fill="#22d3ee" />
        <circle cx="36" cy="22" r="4" fill="#2563eb" />
      </svg>
    ),
  },
];

interface InspirationCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const INSPIRATION_CARDS: InspirationCard[] = [
  {
    id: 'modern-textures',
    title: 'Modern Textures',
    description: 'Add depth with our new line of Venetian Plaster finishes.',
    imageSrc: '/Assets/Inspiration/IMG-20250718-WA0018.jpg',
    imageAlt: 'Contemporary living room with textured Calyco feature wall.',
  },
  {
    id: 'timeless-neutrals',
    title: 'Timeless Neutrals',
    description: 'Curated whites, greys, and beiges for enduring elegance.',
    imageSrc: '/Assets/Inspiration/IMG-20250718-WA0019.jpg',
    imageAlt: 'Bright open-plan home styled in calming neutral paint tones.',
  },
  {
    id: 'bold-accents',
    title: 'Bold Accents',
    description: 'Discover statement walls using our designer-favorite hues.',
    imageSrc: '/Assets/Inspiration/bedroom.jpg',
    imageAlt: 'Bedroom featuring a Calyco bold accent wall with complementary decor.',
  },
];

type QuickLink = { label: string; href: string } | { label: string; action: () => void };

interface HeroSliderProps {
  onRequestConsultation: () => void;
}

function HeroSlider({ onRequestConsultation }: HeroSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = HERO_SLIDES.length;

  useEffect(() => {
    if (slideCount <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % slideCount);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slideCount]);

  const quickLinks = useMemo<QuickLink[]>(
    () => [
      { label: 'Explore Colour Catalogue', href: '/tools?focus=palette' },
      { label: 'Book a Free Consultation', action: onRequestConsultation },
      { label: 'Calculate Budget', href: '/tools?focus=budget-calculator' },
    ],
    [onRequestConsultation],
  );

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSlider} aria-live="polite">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeSlide;
          const slideClassName = isActive ? `${styles.heroSlide} ${styles.heroSlideActive}` : styles.heroSlide;

          return (
            <article key={slide.id} className={slideClassName} aria-hidden={!isActive}>
              <div className={styles.heroMedia}>
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 100vw, 100vw"
                />
              </div>
              <div className={styles.heroGradient} />
              <div className={styles.heroInner}>
                <span className={styles.heroEyebrow}>Calyco tools & services</span>
                <h1 className={styles.heroTitle}>{slide.title}</h1>
                <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                <div className={styles.heroCtaRow}>
                  <Link className={styles.heroPrimaryButton} href={slide.ctaHref}>
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
        <div className={styles.heroDots} role="tablist" aria-label="Hero highlights">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            const dotClassName = isActive ? `${styles.heroDot} ${styles.heroDotActive}` : styles.heroDot;

            return (
              <button
                key={slide.id}
                type="button"
                className={dotClassName}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide: ${slide.title}`}
                aria-pressed={isActive}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.heroQuickLinks}>
        {quickLinks.map((item) => {
          if ('action' in item) {
            const buttonClassName = `${styles.heroQuickLink} ${styles.heroQuickLinkAction}`;
            return (
              <button key={item.label} type="button" className={buttonClassName} onClick={item.action}>
                {item.label}
              </button>
            );
          }

          return (
            <Link key={item.label} href={item.href} className={styles.heroQuickLink}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ProductCategories() {
  return (
    <section className={styles.section} id="product-categories">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Shop by surface</span>
        <h2>Product Categories</h2>
        <p>Explore Calyco systems crafted for Indian climates, from washable interior emulsions to fortified exterior shields.</p>
      </div>
      <div className={styles.categoriesGrid}>
        {PRODUCT_CATEGORIES.map((category) => (
          <article key={category.id} className={styles.categoryCard} id={category.id}>
            <div className={styles.categoryIcon}>{category.icon}</div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <Link className={styles.textButton} href={category.href}>
              View Products
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function DigitalTools() {
  return (
    <section className={`${styles.section} ${styles.toolsSection}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Plan with confidence</span>
        <h2>Digital Tools and Guides</h2>
        <p>Accelerate every decision with interactive planning that reflects Calyco's colour science and service support.</p>
      </div>
      <div className={styles.toolsGrid}>
        {DIGITAL_TOOLS.map((tool) => (
          <article key={tool.id} className={styles.toolCard}>
            <div className={styles.toolIcon}>{tool.icon}</div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <Link className={styles.toolButton} href={tool.href}>
              {tool.buttonLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function InspirationGallery() {
  return (
    <section className={`${styles.section} ${styles.inspirationSection}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>Moodboards</span>
        <h2>Inspiration and Textures</h2>
        <p>Design boldly with curated Calyco inspiration spanning layered textures, serene palettes, and vibrant accents.</p>
      </div>
      <div className={styles.inspirationGrid}>
        {INSPIRATION_CARDS.map((card) => (
          <article key={card.id} className={styles.inspirationCard}>
            <div className={styles.inspirationImage}>
              <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
            <div className={styles.inspirationContent}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

interface ServicesCTAProps {
  onRequestConsultation: () => void;
}

function ServicesCTA({ onRequestConsultation }: ServicesCTAProps) {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesCard}>
        <div className={styles.servicesContent}>
          <span className={styles.sectionEyebrow}>End-to-end services</span>
          <h2>Need Expert Guidance?</h2>
          <p>Book a free, personalized consultation with a Calyco color specialist to finalize your project, cost, and schedule.</p>
        </div>
        <button type="button" className={styles.servicesButton} onClick={onRequestConsultation}>
          Book Free Site Visit
        </button>
      </div>
    </section>
  );
}

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (!open) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close consultation form">
          X
        </button>
        <h3 id="consultation-title">Book a Free Site Visit</h3>
        <p className={styles.modalIntro}>Complete the form and our Calyco specialist will reach out within one business day.</p>
        {submitted ? (
          <div className={styles.modalSuccess} role="status">
            <strong>Thank you!</strong>
            <p>Our team will connect with you shortly to finalize your consultation.</p>
          </div>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <label className={styles.modalField}>
              <span>Full name</span>
              <input ref={firstFieldRef} type="text" name="fullName" required placeholder="Ananya Sharma" />
            </label>
            <label className={styles.modalField}>
              <span>Email</span>
              <input type="email" name="email" required placeholder="you@example.com" />
            </label>
            <label className={styles.modalField}>
              <span>City</span>
              <input type="text" name="city" required placeholder="e.g. Bengaluru" />
            </label>
            <label className={styles.modalField}>
              <span>Project type</span>
              <select name="projectType" defaultValue="" required>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="interior">Interior repaint</option>
                <option value="exterior">Exterior upgrade</option>
                <option value="new-build">New construction</option>
                <option value="commercial">Commercial space</option>
              </select>
            </label>
            <label className={styles.modalField}>
              <span>Project details</span>
              <textarea name="details" rows={3} placeholder="Share timelines, square footage or finishes you are considering." />
            </label>
            <button type="submit" className={styles.modalSubmit}>
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AsianPaintsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenConsultation = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseConsultation = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <main className={styles.page}>
      <HeroSlider onRequestConsultation={handleOpenConsultation} />
      <ProductCategories />
      <DigitalTools />
      <InspirationGallery />
      <ServicesCTA onRequestConsultation={handleOpenConsultation} />
      <ConsultationModal open={isModalOpen} onClose={handleCloseConsultation} />
    </main>
  );
}
