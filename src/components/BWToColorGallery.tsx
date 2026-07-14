import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import ancientRelief from "../assets/Ancient Relief With Character.jpg";
import ancientTextile from "../assets/Ancient Textile Artifact.jpg";
import motionReady from "../assets/Motion-Ready Image.jpg";
import ancientDecorative from "../assets/Ancient Decorative Object.jpg";
import modernLightSculpture from "../assets/Modern Light Sculpture.jpg";

const bwItems = [
  { src: ancientRelief, label: "Ancient · Relief" },
  { src: ancientTextile, label: "Ancient · Textile" },
  { src: motionReady, label: "Motion · Study" },
  { src: ancientDecorative, label: "Ancient · Decorative" },
  { src: modernLightSculpture, label: "Modern · Light Sculpture" },
];

export default function BWToColorGallery() {
  return (
    <motion.section
      className="bg-surface min-h-screen py-24 px-10 lg:px-16 cursor-none relative"
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
        Color on touch
      </TextReveal>
      <TextReveal
        as="h2"
        delay={0.1}
        stagger={0.05}
        className="font-heading italic text-4xl lg:text-5xl tracking-[-0.03em] text-text mb-4"
      >
        Monochrome to living hue.
      </TextReveal>
      <TextReveal
        as="p"
        delay={0.25}
        className="font-body text-sm text-muted max-w-xl leading-relaxed mb-10"
      >
        Hover to reveal the warmth beneath—each fragment holds a quiet spectrum
        waiting to surface.
      </TextReveal>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {bwItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group relative overflow-hidden rounded-[28px] bg-surfaceSoft border border-stroke/40 aspect-[4/5]"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full liquid-glass text-[11px] tracking-[0.18em] uppercase text-text opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
