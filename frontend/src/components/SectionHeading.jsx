import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left", variant = "light" }) {
  const isDark = variant === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{eyebrow}</div>
      )}
      <h2 className={`font-display text-3xl md:text-5xl leading-tight ${isDark ? "text-paper" : "text-bay"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 leading-relaxed ${isDark ? "text-paper/70" : "text-ink/70"}`}>{description}</p>
      )}
    </motion.div>
  );
}
