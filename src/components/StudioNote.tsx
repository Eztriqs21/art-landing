import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

export default function StudioNote() {
  return (
    <motion.section
      id="about"
      className="bg-surface min-h-[70vh] py-20 px-10 lg:px-16 border-t border-stroke/40"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 items-start">
        {/* Left — About */}
        <div className="flex-1">
          <TextReveal
            as="h2"
            delay={0}
            stagger={0.05}
            className="font-heading italic text-3xl tracking-[-0.03em] text-text mb-4"
          >
            A small studio with a long view.
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.15}
            className="font-body text-sm text-muted max-w-md leading-relaxed mb-6"
          >
            Art Landing is a simple space to host both ancient references and
            modern works. Think of it as a long, quiet wall—one side carved from
            stone, the other rendered in light.
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.3}
            className="font-body text-xs text-muted leading-relaxed"
          >
            Built for stillness, not noise. Designed to let the pieces breathe.
          </TextReveal>
        </div>

        {/* Right — Contact CTA */}
        <div className="liquid-glass rounded-[28px] px-6 py-6 flex flex-col gap-4 max-w-sm">
          <TextReveal
            as="span"
            delay={0}
            className="text-[11px] tracking-[0.2em] uppercase text-muted"
          >
            Curate with us
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.1}
            className="font-body text-sm text-text leading-relaxed"
          >
            Share a series, commission a layout, or quietly host a small show.
          </TextReveal>
          <a
            href="mailto:placeholder@example.com"
            className="mt-2 inline-flex items-center justify-between w-full px-4 py-2 rounded-full bg-bg border border-stroke/60 text-[13px] text-text cursor-pointer hover:bg-surfaceSoft/80 transition-colors"
          >
            <span>Contact via email</span>
            <span className="accent-gradient w-8 h-[2px] rounded-full" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
