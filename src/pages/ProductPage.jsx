import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle } from "react-icons/fa";

export const ProductPage = ({ productName = "Benjamin Moore Aura" }) => {
    const [selectedSheen, setSelectedSheen] = useState("Eggshell");
    const [selectedSize, setSelectedSize] = useState("1 Liter");
    const [quantity, setQuantity] = useState(1);
    const [showNotification, setShowNotification] = useState(false);

    const sheens = ["Eggshell", "Semi-Gloss", "Satin", "Matte"];
    const sizes = ["1 liter", "2 liters", "5 liters", "10 liters"];
    const productPrice = 1099;
    useEffect(() => {
        document.title = productName;
    }, [productName]);

    

    const getPrice = () => {
        const basePrice = selectedSize === "1 gallon" ? 103.99 : 45.99;
        return (basePrice * quantity).toFixed(2);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F0C85A]/5">
            {/* Notification */}
            <motion.section 
                className="w-full max-w-7xl mx-auto px-4 py-10 pt-32"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Breadcrumb */}
                <motion.div 
                    className="flex items-center gap-2 text-sm text-[#493657]/60 mb-8"
                    variants={itemVariants}
                >
                    <span>Home</span>
                    <span>/</span>
                    <span>Products</span>
                    <span>/</span>
                    <span className="text-[#493657] font-medium">{productName}</span>
                </motion.div>

                {/* Top Section: Image + Info */}
                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Left: Image Section */}
                    <motion.div 
                        className="xl:w-1/2 sticky top-24 self-start"
                        variants={itemVariants}
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F0C85A]/20 to-[#493657]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                                <img
                                    src="https://assets.benjaminmoore.com/transform/5fc4f693-ecee-4a42-bbf4-96ae27f7ef0e/image_N524_1080x1080_en_US"
                                    alt="Paint can"
                                    className="w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Info Section */}
                    <motion.div 
                        className="xl:w-1/2 flex flex-col gap-8"
                        variants={itemVariants}
                    >
                        {/* Title, Rating and Price */}
                        <div className="space-y-4">
                            
                            <h1 className="text-4xl font-bold text-[#493657]">{productName}</h1>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-bold text-[#F0C85A]">₹{productPrice}</p>
                                <span className="text-sm text-[#493657]/60">per {selectedSize}</span>
                            </div>
                        </div>

                        {/* Feature List */}
                        <div className="bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-2xl p-6">
                            <h3 className="font-semibold text-[#493657] mb-4 flex items-center gap-2">
                                <FaInfoCircle className="text-[#F0C85A]" />
                                Key Features
                            </h3>
                            <ul className="space-y-2 text-[#493657]/80">
                                <li className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                    Proprietary Color Lock® Technology
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                    Fade resistant, vibrant color
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                    Unparalleled depth and richness
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                    Unmatched flow and leveling
                                </li>
                            </ul>
                        </div>

                        {/* Sheen Selection */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-[#493657]">Sheen</h3>
                            <div className="flex gap-3 flex-wrap">
                                {sheens.map((sheen) => (
                                    <motion.button
                                        key={sheen}
                                        onClick={() => setSelectedSheen(sheen)}
                                        className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                                            selectedSheen === sheen
                                                ? "bg-[#493657] text-white border-[#493657] shadow-lg"
                                                : "bg-white text-[#493657] border-[#493657]/20 hover:border-[#F0C85A] hover:bg-[#F0C85A]/10"
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {sheen}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-[#493657]">Size</h3>
                            <div className="flex gap-3 flex-wrap">
                                {sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                                            selectedSize === size
                                                ? "bg-[#493657] text-white border-[#493657] shadow-lg"
                                                : "bg-white text-[#493657] border-[#493657]/20 hover:border-[#F0C85A] hover:bg-[#F0C85A]/10"
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Shipping & Returns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#493657]/10">
                                <FaTruck className="w-5 h-5 text-[#F0C85A]" />
                                <div>
                                    <p className="font-medium text-[#493657] text-sm">Free Shipping</p>
                                    <p className="text-xs text-[#493657]/60">Orders over $75</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#493657]/10">
                                <FaShieldAlt className="w-5 h-5 text-[#F0C85A]" />
                                <div>
                                    <p className="font-medium text-[#493657] text-sm">Warranty</p>
                                    <p className="text-xs text-[#493657]/60">Lifetime guarantee</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#493657]/10">
                                <FaUndo className="w-5 h-5 text-[#F0C85A]" />
                                <div>
                                    <p className="font-medium text-[#493657] text-sm">Returns</p>
                                    <p className="text-xs text-[#493657]/60">30-day policy</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Product Details Section */}

                <motion.div 
                    className="mt-24 border-t border-[#493657]/20 pt-16 space-y-16"
                    variants={itemVariants}
                >
                    {/* Product Details Section */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-[#493657] mb-6">Product Details</h3>
                            <p className="text-[#493657]/80 text-lg mb-6 max-w-4xl leading-relaxed">
                                Aura® Interior is Benjamin Moore's most premium paint, favored by top designers and professionals for its exceptional coverage, enduring color, and unmatched finish. Whether you're designing a cozy bedroom or a modern kitchen, Aura delivers beauty that lasts.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#493657] text-lg">Premium Features</h4>
                                <ul className="space-y-3 text-[#493657]/80">
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Unparalleled paint on the market for performance and beauty
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Color Lock Technology® ensures lasting, vibrant color
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Burnish and scuff resistant
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Unbeatable hide for a flawless finish
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#493657] text-lg">Environmental Benefits</h4>
                                <ul className="space-y-3 text-[#493657]/80">
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Low VOC and environmentally responsible
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Available in 3,500+ unique designer colors
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Backed by Gennex® Color Technology
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="w-4 h-4 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                        Ideal for high-traffic residential areas
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specifications Section */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-[#493657] mb-6">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                {[
                                    { label: "Finish Options", value: "Matte, Eggshell, Satin, Semi-Gloss" },
                                    { label: "Coverage", value: "350 - 400 sq. ft. per gallon" },
                                    { label: "Dry Time", value: "1 hour to touch, 4 hours to recoat" }
                                ].map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                        <span className="font-medium text-[#493657]">{spec.label}</span>
                                        <span className="text-[#493657]/70">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "Cleanup", value: "Soap and water" },
                                    { label: "VOC Level", value: "< 50 g/L" },
                                    { label: "Base", value: "Water-based" }
                                ].map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#493657]/10">
                                        <span className="font-medium text-[#493657]">{spec.label}</span>
                                        <span className="text-[#493657]/70">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.section>   
        </div>
    );
};