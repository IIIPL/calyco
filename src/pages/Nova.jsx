import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle } from "react-icons/fa";

export const Nova = ({ productName = "Calyco Nova – Interior Latex Paint" }) => {
    const [selectedSheen, setSelectedSheen] = useState("Matte");
    const [selectedSize, setSelectedSize] = useState("1 liter");
    const [quantity, setQuantity] = useState(1);

    const sheens = ["Matte", "Eggshell", "Satin", "Semi-Gloss"];
    const sizes = ["1 liter", "2 liters", "5 liters", "10 liters"];
    const productPrice = 499;

    useEffect(() => {
        document.title = productName;
    }, [productName]);

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-white to-[#F0C85A]/5">
            <section className="w-full max-w-7xl mx-auto px-4 py-10 pt-32">
                <div className="flex items-center gap-2 text-sm text-[#493657]/60 mb-8">
                    <Link to={`/`}>
                        Home
                    </Link>
                    <span>/</span>
                    <Link to={`/product`}>
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-[#493657] font-medium">{productName}</span>
                </div>

                <div className="flex flex-col xl:flex-row gap-12">
                    <div className="xl:w-1/2 sticky top-24 self-start">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F0C85A]/20 to-[#493657]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                                <img
                                    src="/Assets/novaa.png"
                                    alt="Paint can"
                                    className="w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="xl:w-1/2 flex flex-col gap-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-[#493657]">{productName}</h1>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-bold text-[#F0C85A]">₹{productPrice}</p>
                                <span className="text-sm text-[#493657]/60">per {selectedSize}</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-2xl p-6">
                            <h3 className="font-semibold text-[#493657] mb-4 flex items-center gap-2">
                                <FaInfoCircle className="text-[#F0C85A]" />
                                Key Features
                            </h3>
                            <ul className="space-y-2 text-[#493657]/80">
                                <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> One-Coat Coverage Guarantee</li>
                                <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Fade-Resistant Bold Color</li>
                                <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Matte Finish, Seamless Walls</li>
                                <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Washable & Scrub-Resistant</li>
                                <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Low-VOC, Water-Based Formula</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-24 border-t border-[#493657]/20 pt-16 space-y-16">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-[#493657] mb-6">Product Details</h3>
                            <p className="text-[#493657]/80 text-lg mb-6 max-w-4xl leading-relaxed">
                                Calyco NOVA is our ultra-premium interior latex paint engineered for effortless one-coat application and long-lasting color. With a rich matte finish and high hide, NOVA brings seamless walls to life—resistant to stains, humidity, and daily wear.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#493657] text-lg">Premium Features</h4>
                                <ul className="space-y-3 text-[#493657]/80">
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> One-Coat Coverage, Exceptional Hide</li>
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Matte Finish Resists Humidity</li>
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Fade-Resistant, Vibrant Colors</li>
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Scrub-Resistant and Easy to Clean</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#493657] text-lg">Environmental Benefits</h4>
                                <ul className="space-y-3 text-[#493657]/80">
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Low-VOC, Water-Based Formula</li>
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Easy Soap & Water Cleanup</li>
                                    <li className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> Safe for Indoor Use</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-[#493657] mb-6">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                    <span className="font-medium text-[#493657]">Finish Options</span>
                                    <span className="text-[#493657]/70">Matte, Eggshell, Satin, Semi-Gloss</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                    <span className="font-medium text-[#493657]">Coverage</span>
                                    <span className="text-[#493657]/70">120–140 sq. ft. per liter per coat</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                    <span className="font-medium text-[#493657]">Dry Time</span>
                                    <span className="text-[#493657]/70">30 minutes to touch, 4 hours to recoat</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                    <span className="font-medium text-[#493657]">Cleanup</span>
                                    <span className="text-[#493657]/70">Soap and water</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                    <span className="font-medium text-[#493657]">VOC Level</span>
                                    <span className="text-[#493657]/70">&lt; 50 g/L</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                    <span className="font-medium text-[#493657]">Base</span>
                                    <span className="text-[#493657]/70">Water-based</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
