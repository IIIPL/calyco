import React from 'react';

const cards = [
  {
    titleTop: 'Paint that fits your',
    titleEmphasis: 'project schedule',
    desc: 'Fast-drying, one-coat coverage for contractors and developers on timelines.',
    img: '/Assets/Rooms/Bedroom/base.jpg',
    cta: 'Get Started',
  },
  {
    titleTop: 'Trusted by builders',
    titleEmphasis: '& developers',
    desc: 'Proven by large residential and commercial projects across India.',
    img: '/Assets/Rooms/LivingRoom/base.jpg',
    cta: 'Request a Quote',
  },
  {
    titleTop: 'Durability you',
    titleEmphasis: 'can count on',
    desc: 'Low‑VOC, scrub‑resistant paints engineered to last 10+ years indoors.',
    img: '/Assets/Nova/novaa.jpg',
    cta: 'Explore Finishes',
  },
  {
    titleTop: 'Eco‑certified,',
    titleEmphasis: 'safe formulas',
    desc: 'Water‑based, eco‑friendly paints with global sustainability standards.',
    img: '/Assets/Logo.png',
    cta: 'Learn More',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <h2 className="text-[20px] font-bold text-[#354147] mb-4">How it works</h2>

        {/* One-row horizontal slider */}
        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex flex-nowrap gap-6">
            {cards.map((card, idx) => (
              <div key={idx} className="flex-shrink-0 w-[320px]">
                <div className="bg-[#F9F6F1] rounded-[28px] p-6 shadow-sm border border-black/5 transition-all duration-300 hover:shadow-md">
                  {/* Title */}
                  <h3 className="text-[22px] leading-tight text-[#0f172a] font-semibold mb-2">
                    {card.titleTop}
                    <br />
                    <span className="font-bold">{card.titleEmphasis}</span>
                  </h3>
                  <p className="text-[#475569] text-sm mb-4">{card.desc}</p>

                  {/* Image */}
                  <div className="rounded-[20px] overflow-hidden bg-white/60">
                    <img src={card.img} alt={card.cta} className="w-full h-40 object-cover" />
                  </div>

                  {/* CTA pill */}
                  <div className="mt-4">
                    <button className="inline-flex items-center px-5 py-2 rounded-full bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#16213e] transition-colors">
                      {card.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
