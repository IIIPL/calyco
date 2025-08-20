import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
    {
        question: "What surfaces can I apply Calyco Paint to?",
        answer: `Suitable for interior applications on various surfaces including plaster, drywall, brick, and previously painted walls. Primarily designed for interior use, Calyco Paint can be used outdoors but is not fully recommended for long-term exterior exposure.`,
    },
    {
        question: "Is the paint single-pack or two-pack?",
        answer: "Our paint is single-pack (for standard coatings).",
    },
    {
        question: "How is the paint applied?",
        answer:
        "The paint can be applied using a roller, brush, or airless spray, depending on the specific product and desired finish.",
    },
    {
        question: "What's the recommended drying and recoating time for Calyco Paint?",
        answer:
        "Touch Dry: 30 minutes to 2 hours\nRecoatable: After 1–2 hours under normal room conditions (20°C, low humidity). Drying times may extend in colder or more humid environments. Avoid heavy condensation or direct water exposure until fully cured.",
    },
    {
        question: "What is the coverage per liter or gallon?",
        answer: "For walls: 10-12 m² per liter (1 coat).",
    },
    {
        question: "How can I get new colors for the paint?",
        answer:
        "To achieve custom colors (e.g., red, yellow), use universal colorants compatible with the base paint. Add colorant (usually 5%-10% by volume) and mix thoroughly for even coloring.",
    },
    {
        question: "I've applied Calyco Paint but the finish looks patchy—what went wrong?",
        answer:
        "Patchiness can result from:\n• Uneven absorbency of the surface\n• Skipping a primer or mist coat on bare plaster\n• Over-brushing or rolling\n\nTo resolve this, apply an additional full coat with even coverage using a medium-pile roller or brush. Ensure the surface is dry, dust-free, and primed if necessary.",
    },
    {
        question: "Can Calyco Paint be used in high-humidity areas like kitchens and bathrooms?",
        answer:
        "Yes, Calyco Paint resists light moisture and steam, making it suitable. For constant humidity or splashing areas, use Calyco Stain & Sealer along edges and seams for added protection.",
    },
    {
        question: "What is the expected durability or lifespan of the paint?",
        answer:
        "Wall coatings typically last 10+ years depending on:\n• Traffic & Usage: High-traffic areas may need recoating sooner\n• Environmental Conditions: Humid or sun-exposed areas may need more frequent touch-ups\n• Surface Prep: Proper priming and surface repair improves durability",
    },
];

export const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(false);
    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current = contentRefs.current.slice(0, faqData.length);
    }, []);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    return (
        <div className="mt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen mb-20">
            <h2 className="text-4xl font-extrabold mb-14 text-center">Frequently Asked Questions</h2>

            {faqData.map((item, index) => (
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
        </div>
    );
}