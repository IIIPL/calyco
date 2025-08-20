import { Button } from "../Button"
import { motion } from "framer-motion"

export const HeroSection = () => {
    return (
        <section className="bg-[#F9F6F1] flex items-center justify-center ">
            <div className="w-full px-4 flex flex-col-reverse md:mx-20 md:flex-row items-center justify-between gap-8">
                
                {/* Left Text Section */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="md:block text-center text-[#493657] font-medium md:text-6xl md:text-left md:w-1/2 space-y-4"
                >
                    <p>ELEVATE</p>
                    <p>YOUR SPACES</p>
                    <div className="flex-col flex gap-2">
                    <Button children={"Explore Products"} to={"/product"} />
                    </div>
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="md:block"
                >
                    <img
                        src="https://res.cloudinary.com/dr98axi2n/image/upload/v1754145841/CALYCO_PREMIUM_Paints__NOVA_DEFENSE_1_mymkfw.png"
                        alt="CALYCO Premium Paints — Nova and Defense paint products showcase"
                        className="w-full max-w-lg mx-auto md:mx-0 object-contain"
                    />
                </motion.div>

            </div>
        </section>
    )
}