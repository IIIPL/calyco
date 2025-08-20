import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react"; // optional; remove if not using

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const onToast = (e) => {
      const t = e.detail || {};
      const id = t.id || Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type: t.type || "success" }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, 2000);
    };
    window.addEventListener("calyco:toast", onToast);
    return () => window.removeEventListener("calyco:toast", onToast);
  }, []);

  return (
    <div
      className="
        pointer-events-none fixed z-[100]
        bottom-4 left-1/2 -translate-x-1/2
        sm:top-4 sm:right-4 sm:left-auto sm:translate-x-0
        space-y-2
      "
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="
              pointer-events-auto flex items-center gap-2
              min-w-[220px] max-w-[92vw] sm:max-w-[320px]
              rounded-xl border px-3 py-2 shadow-lg
              bg-green-50 border-green-200 text-green-900
            "
            role="status"
          >
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold">Item added to cart</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
