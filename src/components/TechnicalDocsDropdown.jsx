import React from 'react';
import { Link } from 'react-router-dom';
import MobileChevron from './MobileChevron';

const docs = [
    { name: 'Budget Calculator', path: '/budget-calculator', description: 'Estimate paint costs and materials for your specific project' },
    { name: 'Coverage Guide', path: '/coverage-guide', description: 'Calculate exactly how much paint you need per square foot' },
    { name: 'Application Guide', path: '/application-guide', description: 'Step-by-step masterclass instructions for perfect application' },
];

const TechnicalDocsDropdown = ({ onSelect, isMobile = false }) => {
    const [open, setOpen] = React.useState(false);

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
                >
                    <span className="text-lg font-medium">Technical Docs</span>
                    <MobileChevron open={open} />
                </button>
                <div
                    className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
                        } w-full`}
                >
                    <div className="pl-4 flex flex-col gap-4">
                        {docs.map((item) => (
                            <div key={item.name}>
                                {item.disabled ? (
                                    <span className="text-gray-400 cursor-not-allowed text-base">{item.name}</span>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="text-[#493657] hover:text-[#F0C85A] text-base font-medium"
                                        onClick={onSelect}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white/95 backdrop-blur-md border-t border-b border-[#e5e0d8] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-50 font-poppins transition-all duration-300">
            <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-16">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-10">
                    Technical Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
                    {docs.map((item) => (
                        <div key={item.name} className="flex flex-col">
                            {item.disabled ? (
                                <div className="group opacity-50 cursor-not-allowed">
                                    <span className="text-gray-400 text-xl font-medium mb-2 block">{item.name}</span>
                                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                                </div>
                            ) : (
                                <Link to={item.path} onClick={onSelect} className="group block">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[#493657] text-xl font-medium group-hover:text-[#F0C85A] transition-colors duration-300">
                                            {item.name}
                                        </span>
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F0C85A]">
                                            →
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed font-light max-w-sm group-hover:text-gray-500 transition-colors">
                                        {item.description}
                                    </p>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechnicalDocsDropdown;
