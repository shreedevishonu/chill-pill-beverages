import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          data-ocid="scroll-to-top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          style={{
            background: "linear-gradient(135deg, #FF6B35 0%, #9B5DE5 100%)",
            boxShadow:
              "0 0 18px rgba(255,107,53,0.55), 0 0 36px rgba(155,93,229,0.3), 0 4px 16px rgba(0,0,0,0.4)",
          }}
          whileHover={{
            scale: 1.15,
            boxShadow:
              "0 0 28px rgba(255,107,53,0.75), 0 0 56px rgba(155,93,229,0.45), 0 4px 20px rgba(0,0,0,0.5)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
