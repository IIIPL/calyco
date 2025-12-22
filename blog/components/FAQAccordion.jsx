import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section id="faq" className="faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${openIndex === index ? 'active' : ''}`}
                    >
                        <button
                            className="faq-question"
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={openIndex === index}
                        >
                            <span>{faq.question}</span>
                            <ChevronDown
                                className={`faq-icon ${openIndex === index ? 'rotated' : ''}`}
                                size={20}
                            />
                        </button>
                        <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                            <div
                                className="faq-answer-content"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQAccordion;
