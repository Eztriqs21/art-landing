import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Concept3DCanvas from "./Concept3DCanvas";
import Concept3DOverlay from "./Concept3DOverlay";

export default function Concept3DSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(rawProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });

  const scanY = useTransform(scrollYProgress, [0, 1], ["-5vh", "105vh"]);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="relative h-[180vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-[#030305] to-bg" />

        {/* 3D Canvas */}
        <Concept3DCanvas progress={progress} />

        {/* HUD frame */}
        <div className="absolute inset-[12%] border border-white/[0.06] rounded-2xl pointer-events-none z-10" />

        {/* Corner marks */}
        <div className="absolute top-[12%] left-[12%] w-6 h-6 border-t border-l border-white/20 pointer-events-none z-10" />
        <div className="absolute top-[12%] right-[12%] w-6 h-6 border-t border-r border-white/20 pointer-events-none z-10" />
        <div className="absolute bottom-[12%] left-[12%] w-6 h-6 border-b border-l border-white/20 pointer-events-none z-10" />
        <div className="absolute bottom-[12%] right-[12%] w-6 h-6 border-b border-r border-white/20 pointer-events-none z-10" />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(241,196,107,0.1), transparent)",
            y: scanY,
          }}
        />

        {/* Text overlay */}
        <Concept3DOverlay progress={progress} />
      </div>
    </section>
  );
}
