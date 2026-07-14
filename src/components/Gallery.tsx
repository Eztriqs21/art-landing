import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import TiltCard from "./TiltCard";
import ancientSculpture from "../assets/Ancient Sculpture — Minimal Museum Art.jpg";
import ancientClayTablet from "../assets/Ancient Clay Tablet.jpg";
import ancientBronzeOffering from "../assets/Ancient Bronze Offering.mp4";
import ancientSealAmulet from "../assets/Ancient Seal or Amulet.jpg";
import modernMonochrome from "../assets/Modern Monochrome Installation.jpg";
import modernLayeredRelief from "../assets/Modern Layered Paper Relief.mp4";
import modernLightSculpture from "../assets/Modern Light Sculpture.jpg";
import modernArchitectural from "../assets/Modern Architectural Study.jpg";

interface GalleryCardProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

function GalleryCard({ children, label, className = "" }: GalleryCardProps) {
  return (
    <ScrollReveal distance={40}>
      <div
        className={`relative rounded-[28px] bg-surface overflow-hidden border border-stroke/40 group ${className}`}
      >
        <div className="w-full h-full min-h-[380px] transition-transform duration-700 group-hover:scale-[1.03]">
          {children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full liquid-glass flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-text">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {label}
        </div>
      </div>
    </ScrollReveal>
  );
}

interface GalleryItem {
  src: string;
  label: string;
  span: string;
  isVideo?: boolean;
}

const ancientItems: GalleryItem[] = [
  { src: ancientSculpture, label: "Ancient · Sculpture", span: "col-span-5" },
  { src: ancientClayTablet, label: "Ancient · Clay Tablet", span: "col-span-7" },
  { src: ancientBronzeOffering, label: "Ancient · Bronze Offering", span: "col-span-5", isVideo: true },
  { src: ancientSealAmulet, label: "Ancient · Seal or Amulet", span: "col-span-7" },
];

const modernItems: GalleryItem[] = [
  { src: modernMonochrome, label: "Modern · Monochrome", span: "col-span-7" },
  { src: modernLayeredRelief, label: "Modern · Layered Relief", span: "col-span-5", isVideo: true },
  { src: modernLightSculpture, label: "Modern · Light Sculpture", span: "col-span-5" },
  { src: modernArchitectural, label: "Modern · Architectural", span: "col-span-7" },
];

const items = [...ancientItems, ...modernItems];

export default function Gallery() {
  return (
    <motion.section
      id="gallery"
      className="bg-bg min-h-screen py-24 px-10 lg:px-16 cursor-none relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bg-stroke" />
        <TextReveal
          as="span"
          delay={0}
          className="text-muted text-xs tracking-[0.26em] uppercase"
        >
          Selected works
        </TextReveal>
      </div>
      <TextReveal
        as="h2"
        delay={0.1}
        stagger={0.05}
        className="font-heading italic text-4xl lg:text-5xl tracking-[-0.03em] text-text mb-4"
      >
        A still walk through epochs.
      </TextReveal>
      <TextReveal
        as="p"
        delay={0.25}
        className="font-body text-sm text-muted max-w-xl leading-relaxed mb-10"
      >
        Pieces arranged as if along a quiet corridor—ancient reliefs on one
        side, contemporary experiments on the other.
      </TextReveal>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {items.map((item, i) => {
          const card = (
            <GalleryCard key={i} label={item.label}>
              {item.isVideo ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </GalleryCard>
          );

          return (
            <div key={i} className={item.span}>
              {i < 3 ? <TiltCard>{card}</TiltCard> : card}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
