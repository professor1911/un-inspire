import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-bay text-paper bg-contours">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {eyebrow && (
            <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{eyebrow}</div>
          )}
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">{title}</h1>
          {description && (
            <p className="mt-5 text-paper/70 max-w-xl leading-relaxed">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
