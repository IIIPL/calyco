import { useState, useRef, useEffect } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
    {
        question: "What is Calyco Paints?",
        answer: "Calyco Paints is an eco-premium paint and coatings company that blends modern lifestyle design with sustainability. We offer low-VOC, water-based, safe-for-family paints and industrial-grade coatings for contractors, developers, and government projects.",
        category: "About Calyco"
    },
    {
        question: "How is Calyco different from other paint brands?",
        answer: "Unlike traditional dealer-driven paint companies, Calyco is online-first, delivering paints directly to homes, projects, and government buyers. We combine luxury lifestyle appeal (like Asian Paints), minimal modern UI (like Birla Opus), and eco-premium positioning (like Lick Paint) with a special focus on contractors and government compliance.",
        category: "About Calyco"
    },
    {
        question: "Are Calyco paints safe for children and pets?",
        answer: "Yes. All our paints are low-VOC, odor-free, and non-toxic, making them safe for indoor spaces where families live, sleep, and play.",
        category: "Product Safety & Sustainability"
    },
    {
        question: "What does low-VOC mean?",
        answer: "VOC (Volatile Organic Compounds) are chemicals that evaporate into the air and harm indoor air quality. Our low-VOC paints reduce exposure, improving health and environmental safety.",
        category: "Product Safety & Sustainability"
    },
    {
        question: "What surfaces can Calyco paints be used on?",
        answer: "Our range covers interior walls, exterior walls, wood, metal, concrete, asphalt, roofing, and specialty industrial surfaces.",
        category: "Applications & Usage"
    },
    {
        question: "Are your paints waterproof and weather-resistant?",
        answer: "Yes. We offer waterproof coatings, anti-fungal interior paints, heat-reflective roof coatings, and long-lasting exterior emulsions designed for Indian weather conditions.",
        category: "Applications & Usage"
    },
    {
        question: "Do you have a room visualizer?",
        answer: "Yes. Our Room Visualizer lets you preview Calyco Sacred Palette colors on sample rooms or your own photos.",
        category: "Tools & Resources"
    },
    {
        question: "How do I calculate paint quantity?",
        answer: "Use our Coverage Calculator. Enter room dimensions and surface type, and it will recommend the exact litres required.",
        category: "Tools & Resources"
    },
    {
        question: "Can I order paints directly online?",
        answer: "Yes. Calyco is 100% online-first. You can order retail packs for home projects or bulk packs for contractors and developers.",
        category: "Ordering & Delivery"
    },
    {
        question: "Do you deliver to project sites?",
        answer: "Yes. We provide doorstep delivery for consumers and site delivery for contractors, real estate projects, and government tenders.",
        category: "Ordering & Delivery"
    },
    {
        question: "Why should contractors choose Calyco?",
        answer: "Faster drying for quicker handovers, better coverage for reduced cost, and reliable supply for ongoing projects. We also offer volume discounts and loyalty rewards.",
        category: "For Contractors, Developers & OEMs"
    },
    {
        question: "Can Calyco supply paint in bulk?",
        answer: "Yes. OEMs, contractors, and developers can order large quantities, including private label options for OEM customers.",
        category: "For Contractors, Developers & OEMs"
    },
    {
        question: "Is Calyco registered on GeM (Government e-Marketplace)?",
        answer: "Yes. Calyco is empaneled on GeM for direct procurement.",
        category: "Government & Institutional Buyers"
    },
    {
        question: "Which government projects can Calyco supply?",
        answer: "We cater to PWD, CPWD, MES, NBCC, Indian Railways, Smart Cities, Defence, Schools, and Hospitals, ensuring compliance with tender requirements.",
        category: "Government & Institutional Buyers"
    },
    {
        question: "How do I prepare a surface before painting?",
        answer: "Surfaces should be clean, dry, and free from dust or grease. Specific primers may be required depending on surface type (concrete, wood, or metal).",
        category: "Technical & Support"
    },
    {
        question: "Do you offer on-site demos?",
        answer: "Yes. For contractors and government projects, our team arranges site demos and application training.",
        category: "Technical & Support"
    },
    {
        question: "Do Calyco paints come with a warranty?",
        answer: "Yes. Depending on the product, warranties range from 3 years (interior emulsions) to 7–10 years (exterior and specialty coatings).",
        category: "Warranty & After-Sales"
    },
    {
        question: "What happens if the paint peels or fails?",
        answer: "If applied according to instructions and with proper surface prep, Calyco paints are covered under warranty. Our team investigates and replaces defective product if necessary.",
        category: "Warranty & After-Sales"
    }
];

export const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current = contentRefs.current.slice(0, faqData.length);
    }, []);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const visibleFaqs = showAll ? faqData : faqData.slice(0, 6);

    return (
        <div className="mt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen mb-20">
            <h2 className="text-4xl font-extrabold mb-14 text-center">About Calyco</h2>

            {visibleFaqs.map((item, index) => (
                <div
                    key={index}
                    className="border-b border-gray-300 transition-all duration-200 ease-out"
                >
                    <div
                        className="flex justify-between items-center cursor-pointer py-6 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => toggle(index)}
                    >
                        <div className="text-xl sm:text-2xl font-semibold pr-4 flex-1">
                            {item.question}
                        </div>
                        <div className="relative rounded-full bg-[#493657] p-2 text-white flex-shrink-0 transition-all duration-200 ease-out hover:scale-105 hover:bg-[#5a4269]">
                            <div className="relative w-5 h-5">
                                {/* Plus Icon */}
                                <Plus 
                                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-out ${
                                        openIndex === index 
                                            ? 'rotate-90 opacity-0 scale-75' 
                                            : 'rotate-0 opacity-100 scale-100'
                                    }`} 
                                />
                                {/* Minus Icon */}
                                <Minus 
                                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-out ${
                                        openIndex === index 
                                            ? 'rotate-0 opacity-100 scale-100' 
                                            : 'rotate-90 opacity-0 scale-75'
                                    }`} 
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{
                            height: openIndex === index ? 
                                contentRefs.current[index]?.scrollHeight + 'px' : 
                                '0px'
                        }}
                    >
                        <div 
                            ref={el => contentRefs.current[index] = el}
                            className="pb-6 text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line"
                        >
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}

            {/* See More/Less Button */}
            <div className="text-center mt-12 mb-8 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                <button
                    onClick={() => {
                        setShowAll(!showAll);
                        console.log('Button clicked, showAll:', !showAll);
                    }}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-[#493657] text-white rounded-xl font-semibold hover:bg-[#5a4269] transition-all duration-200 hover:scale-105 shadow-lg text-lg border-2 border-[#493657]"
                >
                    {showAll ? (
                        <>
                            Show Less
                            <ChevronUp className="w-6 h-6" />
                        </>
                    ) : (
                        <>
                            See More FAQs
                            <ChevronDown className="w-6 h-6" />
                        </>
                    )}
                </button>
                <p className="text-gray-600 mt-3 text-sm">
                    {showAll ? `Showing all ${faqData.length} questions` : `Showing 6 of ${faqData.length} questions`}
                </p>
            </div>
        </div>
    );
}