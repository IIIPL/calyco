import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 px-2 flex items-center justify-between text-left group min-h-[48px]" // min-h-[48px] for tap target
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-brand-purple' : 'text-gray-800'}`}>
                    {question}
                </span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-brand-gold text-2xl`}>
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 px-2 text-gray-600 leading-relaxed font-sans">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = ({ items }) => {
    return (
        <section id="faq" className="my-12 p-6 bg-warm rounded-2xl border border-stone-100">
            <h2 className="text-2xl font-serif text-brand-purple mb-6 border-b border-stone-200 pb-4">Frequently Asked Questions</h2>
            <div className="space-y-1">
                {items.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </section>
    );
};

export default FAQ;
