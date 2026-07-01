import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";

export function Toast() {
  const toastMessage = useAppStore((s) => s.toastMessage);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-[60] flex justify-center px-6">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key={toastMessage}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto rounded-full bg-zp-text text-black text-sm font-semibold px-5 py-3 shadow-card"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
