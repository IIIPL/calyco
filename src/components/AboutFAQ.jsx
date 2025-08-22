import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div
      className="border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:ring-offset-2 rounded-lg px-4"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
      >
        <h3 className="text-lg font-semibold text-[#493657] pr-4">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#493657]" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4">
              <p className="text-[#493657]/70 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutFAQ = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const defaultItems = [
    {
      question: "What makes Calyco paints different from traditional paints?",
      answer: "Calyco paints are distinguished by our proprietary EcoMax Technology, which delivers zero-VOC formulations without compromising on performance. Our paints offer superior color vibrancy, exceptional durability, and are completely safe for indoor use, making them ideal for families and environmentally conscious consumers."
    },
    {
      question: "How does EcoMax Technology work?",
      answer: "EcoMax Technology is our breakthrough in sustainable paint formulation. We developed our own eco-friendly colorants specifically designed for sustainable formulations, eliminating unnecessary chemicals while delivering exceptional color vibrancy and long-lasting durability. This technology ensures our paints remain environmentally safe even after tinting."
    },
    {
      question: "Are Calyco paints suitable for all surfaces?",
      answer: "Yes, our product range includes interior water-based latex paints for walls and ceilings, as well as multi-surface stains and sealers for wood, concrete, masonry, and metal. All our products are engineered to provide superior coverage and protection across various surfaces."
    },
    {
      question: "What certifications do Calyco paints have?",
      answer: "Our paints meet and exceed industry standards with certifications including ISO 9001, Green Seal, EPA certification, and BIS certification. We're committed to transparency and maintaining the highest standards in sustainable paint manufacturing."
    },
    {
      question: "How long do Calyco paints last?",
      answer: "Our paints are engineered to maintain their color and finish for over 10 years. The combination of our EcoMax Technology and high-quality formulations ensures long-lasting protection against fading, peeling, and cracking, so you repaint when you want to, not out of necessity."
    },
    {
      question: "Where can I purchase Calyco paints?",
      answer: "Calyco paints are available through our network of authorized dealers and directly through our website. We also work with professional contractors and interior designers. Contact us to find the nearest dealer or to discuss bulk orders for your projects."
    }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  // Generate JSON-LD schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our sustainable paint solutions and EcoMax Technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {displayItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#493657]/60 text-sm">
            Still have questions? <a href="/contact" className="text-[#F0C85A] hover:text-[#e3b842] font-medium transition-colors duration-300">Contact our team</a> for personalized assistance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFAQ;
