import React from "react";

/**
 * CALYCO pixel‑match style section with hero background figure.
 * Hero + two bento cards, man image placed as background like Hims screenshot.
 */

export default function HowItWorks() {
    // Local gallery images to replace placeholder picsum URLs
    const galleryImages: string[] = [
        '/Assets/Inspiration/IMG-20250718-WA0008.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0009.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0010.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0011.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0012.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0013.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0014.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0015.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0016.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0017.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0018.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0019.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0020.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0021.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0022.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0023.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0024.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0025.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0026.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0027.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0028.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0029.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0030.jpg',
        '/Assets/Inspiration/IMG-20250718-WA0031.jpg'
    ];

    return (
        <section className="relative isolate overflow-hidden text-white" style={{
            ['--bg1']: '#B77D34',
            ['--bg2']: '#A86F2E',
            ['--bg3']: '#8F5A23',
            ['--box']: 'rgba(67, 39, 11, 0.28)'
        } as React.CSSProperties}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-80px,rgba(255,255,255,0.14),transparent_60%),linear-gradient(to_bottom,var(--bg1),var(--bg2),var(--bg3))]" />

            {/* Wave line with dots */}
            <svg className="pointer-events-none absolute left-0 top-[132px] w-full" viewBox="0 0 1728 120" fill="none">
                <path d="M0 60 C320 10 560 110 864 60 C1168 10 1408 110 1728 60" stroke="rgba(255,220,170,.5)" strokeWidth="2" />
                {Array.from({ length: 14 }).map((_, i) => (
                    <circle key={i} cx={(i + 1) * 118} cy={60 + (i % 2 ? 8 : -8)} r="2.2" fill="rgba(255,220,170,.85)" />
                ))}
            </svg>

            {/* HERO */}
            <div className="relative mx-auto max-w-[1120px] px-6 pt-14 md:pt-20">
                <div className="mx-auto max-w-[760px] text-center">
                    <h1 className="text-white/95 font-[ui-sans-serif] leading-tight tracking-[-.01em] text-[40px] md:text-[52px]">
                        <span className="block">Access a range of</span>
                        eco-premium paints & coatings
                    </h1>
                    <div className="mt-2 text-sm text-white/80">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/20">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 8-6 6-3-3 1.4-1.4L11 13.2l4.6-4.6L17 10Z" /></svg>
                            Low VOC & Safe for families
                        </span>
                    </div>

                    {/* Product minis */}
                    <div className="mt-6 flex items-end justify-center gap-4">
                        <div className="h-16 w-6 rounded-lg bg-black/30" />
                        <div className="h-24 w-9 rounded-xl bg-[#78A9F5] shadow-[0_8px_20px_rgba(0,0,0,.35)]" />
                        <div className="h-14 w-14 rounded-xl bg-[#CC9E4E]" />
                        <div className="h-20 w-10 rounded-xl bg-[#E2C884]" />
                        <div className="h-16 w-8 rounded-xl bg-[#D29E41]" />
                    </div>

                    {/* CTA row */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <a href="/products" className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#6b3a16] shadow-[0_12px_26px_-12px_rgba(0,0,0,.45)]">
                            Explore Products
                        </a>
                        <a href="/visualizer" className="inline-flex h-11 items-center justify-center rounded-full border border-white/50 bg-transparent px-6 text-sm font-semibold text-white/95">
                            Try Color Visualizer
                        </a>
                    </div>
                </div>

                {/* Hero background image of man */}
                <div className="relative mx-auto mt-8 flex justify-center">
                    <div
                        className="relative"
                        style={{
                            borderRadius: '16px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            maxWidth: '980px',
                            maxHeight: '420px'
                        }}
                    >
                        {/* Blurred background layer */}
                        <img
                            src="/Assets/painter-how-it-works.webp"
                            alt="Painter working"
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                                borderRadius: '16px',
                                filter: 'blur(12px)',
                                transform: 'scale(1.1)',
                                opacity: 0.4
                            }}
                        />
                        {/* Sharp foreground layer */}
                        <img
                            src="/Assets/painter-how-it-works.webp"
                            alt="Painter working"
                            className="relative z-10 w-full h-full object-contain"
                            style={{
                                borderRadius: '16px',
                                maxHeight: '420px'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* TWO-COLUMN BENTO */}
            <div className="relative z-[1] mx-auto max-w-[1120px] px-6 pb-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* LEFT CARD */}
                    <article className="rounded-[28px] bg-[color:var(--box)] p-10 backdrop-blur-[2px] shadow-[0_20px_60px_-30px_rgba(0,0,0,.6)]">
                        <h3 className="text-[44px] leading-[1.05] font-semibold tracking-[-.01em]">Moving in the</h3>
                        <div className="mt-6 flex justify-center">
                            <div className="relative h-[360px] w-[260px] overflow-hidden rounded-[28px] ring-1 ring-white/20">
                                <div className="absolute inset-0 bg-[url('/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.jpg')] bg-cover bg-center" />
                                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        </div>
                        <h3 className="mt-6 text-[44px] leading-[1.05] font-semibold tracking-[-.01em]">right direction</h3>
                        <p className="mt-3 max-w-[460px] text-[14px] leading-6 text-white/90">Get a personalized plan designed with one goal in mind: <span className="font-semibold">helping you feel great in your space</span>.</p>
                        <div className="mt-6">
                            <a href="/products" className="inline-flex items-center gap-2 text-[14px] font-semibold text-white underline-offset-4 hover:underline">Explore products
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </a>
                        </div>
                    </article>

                    {/* RIGHT CARD */}
                    <article className="rounded-[28px] bg-[color:var(--box)] p-10 backdrop-blur-[2px] shadow-[0_20px_60px_-30px_rgba(0,0,0,.6)]">
                        <h3 className="text-[44px] leading-[1.05] font-semibold tracking-[-.01em]">Paint smarter,</h3>
                        <h3 className="-mt-1 text-[44px] leading-[1.05] font-semibold tracking-[-.01em] text-[#f4c372]">last longer</h3>
                        <p className="mt-3 max-w-[520px] text-[14px] leading-6 text-white/90">Find premium, durable paints in the Calyco range, to help you protect and enhance your surfaces.</p>
                        <div className="mt-6">
                            <a href="/products" className="inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-5 text-[14px] font-semibold text-white ring-1 ring-white/25">Get started</a>
                        </div>
                        <div className="mt-10 overflow-hidden rounded-[18px] ring-1 ring-white/10">
                            <div className="grid grid-cols-6 gap-2 bg-black/10 p-2">
                                {galleryImages.slice(0, 24).map((src, i) => (
                                    <div key={i} className="aspect-square rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
