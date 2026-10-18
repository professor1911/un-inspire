import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LoopVideo from "./LoopVideo.jsx";

/** A looping video in a thin frame (the clips have pale backgrounds, so the frame makes the edge look intentional). */
export default function VideoCard({ video, className = "", showCaption = true }) {
  const { i18n } = useTranslation();
  if (!video) return null;
  const caption = i18n.language === "ja" ? video.captionJa : video.caption;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="border border-bay/10 bg-white p-2 sm:p-3 shadow-sm">
        <LoopVideo
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          label={caption}
          className="block w-full h-auto"
        />
      </div>
      {showCaption && (
        <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-wide text-bay/55 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
