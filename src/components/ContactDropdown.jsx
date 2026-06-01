import React from 'react';
import { Link } from 'react-router-dom';
import MobileChevron from './MobileChevron';

const contactItems = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Support', path: '/customer-service' },
    { name: 'Become a Dealer', path: '/contact?type=become-dealer', isHighlight: true },
];

const ContactDropdown = ({ onSelect, isMobile = false }) => {
    const [open, setOpen] = React.useState(false);

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
                >
                    <span className="text-lg font-medium">Contact</span>
                    <MobileChevron open={open} />
                </button>
                <div
                    className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
                        } w-full`}
                >
                    <div className="pl-4 flex flex-col gap-3">
                        {contactItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-[#493657] hover:text-[#F0C85A] transition-colors text-base ${item.isHighlight ? 'font-semibold' : 'font-medium'}`}
                                onClick={onSelect}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white/95 backdrop-blur-md border-t border-b border-[#e5e0d8] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-50 font-poppins transition-all duration-300">
            <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-16">
                <div className="flex gap-24">
                    <div className="w-72">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-8">
                            Get in Touch
                        </h3>
                        <ul className="space-y-5">
                            {contactItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        onClick={onSelect}
                                        className={`group flex items-center gap-3 transition-colors duration-300 ${item.isHighlight ? 'text-[#493657] font-bold text-lg' : 'text-[#493657] font-medium text-lg hover:text-[#F0C85A]'}`}
                                    >
                                        <span>{item.name}</span>
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F0C85A]">
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        {/* Clean contact info block */}
                        <div className="bg-[#fcfbf9] p-10 rounded-2xl max-w-lg border border-[#e5e0d8]/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Customer Support</h4>
                            <p className="text-3xl font-light text-[#493657] mb-2 font-outfit tracking-wide">+91 98765 43210</p>
                            <a href="mailto:support@calycopaints.com" className="text-gray-500 hover:text-[#F0C85A] transition-colors mb-8 block text-lg font-light">
                                support@calycopaints.com
                            </a>
                            <Link
                                to="/contact"
                                onClick={onSelect}
                                className="inline-flex items-center gap-2 bg-[#493657] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#F0C85A] hover:text-[#493657] transition-all duration-300"
                            >
                                Visit Help Center
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDropdown;
