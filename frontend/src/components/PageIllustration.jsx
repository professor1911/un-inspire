import { motion } from "framer-motion";

/**
 * Renders one of the recolored unDraw illustrations in src/assets/illustrations.
 * Source: unDraw (https://undraw.co) by Katerina Limpitsouni - free for
 * personal and commercial use, modification permitted, no attribution
 * required (credited here anyway). Files were recolored locally to match
 * the site's palette; see frontend/src/assets/illustrations/README.md.
 */
export default function PageIllustration({ src, alt, className = "", float = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        animate={float ? { y: [0, -10, 0] } : undefined}
        transition={float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="w-full h-auto select-none"
        draggable={false}
      />
    </motion.div>
  );
}
