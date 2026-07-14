import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "./TextReveal";
import TiltCard from "./TiltCard";
import ancientSculpture from "../assets/Ancient Sculpture — Minimal Museum Art.jpg";
import modernCanvas from "../assets/Modern Abstract Canvas — Calm Geometry.jpg";
import modernStripGeometry from "../assets/Modern Strip Geometry.jpg";
import modernStripLightShadow from "../assets/Modern Strip Light and Shadow.mp4";
import modernStripSculptural from "../assets/Modern Strip Sculptural Rhythm.mp4";

const stripArt = [
  { type: "image" as const, src: ancientSculpture, alt: "Ancient sculpture in minimal museum style" },
  { type: "image" as const, src: modernStripGeometry, alt: "Modern geometric strip study" },
  { type: "video" as const, src: modernStripLightShadow, alt: "Light and shadow video study" },
  { type: "video" as const, src: modernStripSculptural, alt: "Sculptural rhythm video study" },
  { type: "image" as const, src: modernCanvas, alt: "Modern abstract canvas with calm geometry" },
];

export default function ModernStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-36%"]);

  return (
    <motion.section
      id="modern"
      ref={sectionRef}
      className="bg-bg min-h-[100vh] py-24 px-10 lg:px-16 cursor-none relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <TextReveal
        as="p"
        delay={0}
        className="text-muted text-xs tracking-[0.26em] uppercase mb-3"
      >
        Modern responses
      </TextReveal>
      <TextReveal
        as="h2"
        delay={0.1}
        stagger={0.05}
        className="font-heading italic text-4xl lg:text-5xl tracking-[-0.03em] text-text mb-4"
      >
        Clean forms, current tools.
      </TextReveal>
      <TextReveal
        as="p"
        delay={0.25}
        className="font-body text-sm text-muted max-w-xl leading-relaxed mb-10"
      >
        Digital studies, rendered sculptures, and quiet installations reflecting
        the same measured calm as their ancestors.
      </TextReveal>

      {/* Horizontal scrolling strip */}
      <div className="overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 justify-end ml-auto">
          {stripArt.map((art, i) => {
            const card = (
              <div className="relative min-w-[260px] w-[300px] h-[360px] rounded-[28px] bg-surfaceSoft border border-stroke/40 overflow-hidden group shrink-0">
                <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.03]">
                  {art.type === "video" ? (
                    <video
                      src={art.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={art.src}
                      alt={art.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full liquid-glass text-[11px] tracking-[0.18em] uppercase text-text">
                  Modern · Study
                </span>
              </div>
            );

            return (i === 0 || i === 4) ? (
              <TiltCard key={i}>{card}</TiltCard>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
