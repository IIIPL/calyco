import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { products as allProducts } from "../data/products";

export const ProductPage = () => {
    const { productId } = useParams();
    const product = allProducts[productId];
    const [selectedSheen, setSelectedSheen] = useState(product?.sheens?.[0] || "Matte");
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "1 liter");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) document.title = product.name;
    }, [product]);

    if (!product) {
        return <div className="pt-32 text-center text-2xl text-[#493657]">Product not found.</div>;
    }

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
            <motion.section 
                className="w-full max-w-7xl mx-auto px-4 py-10 pt-32"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="flex items-center gap-2 text-sm text-[#493657]/60 mb-8"
                    variants={itemVariants}
                >
                    <span>Home</span>
                    <span>/</span>
                    <span>Products</span>
                    <span>/</span>
                    <span className="text-[#493657] font-medium">{product.name}</span>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12">
                    <motion.div 
                        className="xl:w-1/2 sticky top-24 self-start"
                        variants={itemVariants}
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F0C85A]/20 to-[#493657]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="xl:w-1/2 flex flex-col gap-8"
                        variants={itemVariants}
                    >
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-[#493657]">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-bold text-[#F0C85A]">₹{product.price}</p>
                                <span className="text-sm text-[#493657]/60">per {selectedSize}</span>
                            </div>
                            {/* Short Description */}
                            <p className="text-[#493657]/80 text-base mt-2">{product.shortDescription}</p>
                        </div>

                        <div className="bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-2xl p-6">
                            <h3 className="font-semibold text-[#493657] mb-4 flex items-center gap-2">
                                <FaInfoCircle className="text-[#F0C85A]" />
                                Key Features
                            </h3>
                            <ul className="space-y-2 text-[#493657]/80">
                                {product.features?.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> {feature}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="mt-24 border-t border-[#493657]/20 pt-16 space-y-16"
                    variants={itemVariants}
                >
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-[#493657] mb-6">Product Details</h3>
                            <p className="text-[#493657]/80 text-lg mb-6 max-w-4xl leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#493657] text-lg">Premium Features</h4>
                                <ul className="space-y-3 text-[#493657]/80">
                                    {product.features?.slice(0, 4).map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2"><FaCheck className="text-[#F0C85A]" /> {feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#493657] text-lg">Technical Specifications</h4>
                                <ul className="space-y-3 text-[#493657]/80">
                                    {product.technicalSpecs && Object.entries(product.technicalSpecs).map(([key, value]) => (
                                        <li key={key} className="flex justify-between items-center p-2 bg-white rounded border border-[#493657]/10">
                                            <span className="font-medium text-[#493657] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <span className="text-[#493657]/70">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
        </div>
    );
};
