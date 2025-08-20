import { motion } from "framer-motion";

export default function VisualizerBanner() {
  return (
    <section className="w-full bg-[#F3F0F9] py-12">
      <motion.div
        className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            See CALYCO Colors in Your Space
          </h2>
          <p className="mt-2 text-[#333333] text-sm">
            Upload a photo or try sample rooms with our Visualizer Tool.
          </p>
        </div>
        <a
          href="/room-visualization"
          data-cta="visualizer-widget"
          className="inline-flex items-center justify-center rounded-xl bg-[#5E3A98] text-white px-6 py-3 text-lg font-medium shadow-sm hover:bg-[#472b7a] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5E3A98] focus:outline-none min-w-[220px] text-center"
        >
          Try the Visualizer
        </a>
      </motion.div>
    </section>
  );
}
