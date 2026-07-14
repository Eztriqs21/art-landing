import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import ancientTerracotta from "../assets/Ancient Terracotta Figure.jpg";
import ancientManuscript from "../assets/Ancient Manuscript Fragment.jpg";
import ancientDecorative from "../assets/Ancient Decorative Object.jpg";

interface Era {
  title: string;
  image: string;
}

const eras: Era[] = [
  {
    title: "Classical stone reliefs",
    image: ancientTerracotta,
  },
  {
    title: "Indus Valley seals",
    image: ancientManuscript,
  },
  {
    title: "Hellenistic bronze forms",
    image: ancientDecorative,
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0px", "-20px"]);

  return (
    <motion.section
      id="ancient"
      ref={sectionRef}
      className="bg-surface min-h-screen py-24 px-10 lg:px-16 relative cursor-none"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_50%,#f1c46b,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_70%_30%,#f1c46b,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-b from-white/10 via-transparent to-white/10" />
      </motion.div>

      {/* Foreground content */}
      <motion.div className="relative z-10" style={{ y: foregroundY }}>
        {/* Header */}
        <TextReveal
          as="p"
          delay={0}
          className="text-muted text-xs tracking-[0.26em] uppercase mb-3"
        >
          Ancient threads
        </TextReveal>
        <TextReveal
          as="h2"
          delay={0.1}
          stagger={0.05}
          className="font-heading italic text-4xl lg:text-5xl tracking-[-0.03em] text-text mb-4"
        >
          Clean lines from older worlds.
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.25}
          className="font-body text-sm text-muted max-w-xl leading-relaxed mb-10"
        >
          Notes from stone, clay, and pigment—quietly aligned along a simple line.
        </TextReveal>

        {/* Horizontal timeline */}
        <div className="relative flex gap-12 items-start overflow-x-auto pb-8">
          {/* Baseline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-stroke/60"
          />

          {eras.map((era, i) => (
            <ScrollReveal key={i} distance={30}>
              <div className="relative flex flex-col gap-4 shrink-0">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-[11px] tracking-[0.16em] uppercase text-text w-fit">
                  Ancient · Era
                </span>
                <TextReveal
                  as="h3"
                  delay={0.1 + i * 0.1}
                  className="font-heading italic text-lg tracking-[-0.02em] text-text"
                >
                  {era.title}
                </TextReveal>
                <div className="mt-3 w-[340px] h-[240px] rounded-2xl bg-gradient-to-br from-surfaceSoft/70 to-surfaceSoft border border-stroke/40 overflow-hidden">
                  <img
                    src={era.image}
                    alt={era.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
