import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { scrollToSection } from "../utils/scrollToSection";
import TextReveal from "./TextReveal";
import HeroGridOverlay from "./HeroGridOverlay";
import diptychVideo from "../assets/Diptych — Ancient + Modern.mp4";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number | null = null;
    let latestProgress = 0;
    let lastSeekTime = 0;

    const unsubscribe = rawProgress.on("change", (p) => {
      latestProgress = p;
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        frameId = null;
        if (!video.duration || Number.isNaN(video.duration)) return;
        if (video.seeking) return;
        const now = performance.now();
        if (now - lastSeekTime < 80) return;
        const clamped = Math.min(Math.max(latestProgress, 0), 0.985);
        const raw = clamped * video.duration;
        const targetTime = Math.round(raw * 30) / 30;
        if (Math.abs(targetTime - video.currentTime) < 0.25) return;
        lastSeekTime = now;
        if (typeof video.fastSeek === "function") {
          video.fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      });
    });

    return () => {
      unsubscribe();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [rawProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, -40]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const videoX = useTransform(mouseX, (v) => v * 4);
  const videoY = useTransform(mouseY, (v) => v * 4);
  const hudX = useTransform(mouseX, (v) => v * 7);
  const hudY = useTransform(mouseY, (v) => v * 7);
  const textMX = useTransform(mouseX, (v) => v * 10);
  const textMY = useTransform(mouseY, (v) => v * 10);

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden hero-3d-root cursor-none">
        <motion.div style={{ x: videoX, y: videoY }} className="absolute inset-0">
          <video
            ref={videoRef}
            src={diptychVideo}
            muted
            playsInline
            preload="auto"
            aria-label="Diptych video showing ancient and modern art"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-bg/50 to-transparent opacity-70 pointer-events-none" />
        <div className="absolute inset-y-0 right-[-15%] w-2/3 bg-[radial-gradient(circle_at_center,#f1c46b26,transparent_65%)] opacity-80 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22/%3E%3C/svg%3E')] bg-repeat" />

        <motion.div style={{ x: hudX, y: hudY }} className="absolute inset-0 z-[3]">
          <HeroGridOverlay />
        </motion.div>

        <header className="relative z-20 px-10 pt-8 flex items-center justify-between max-w-6xl mx-auto">
          <div className="font-heading italic text-xl tracking-[0.25em] uppercase text-text">
            Art Landing
          </div>

          <nav className="hidden md:flex items-center gap-8 text-muted text-xs tracking-[0.22em] uppercase" aria-label="Main navigation">
            <a href="#gallery" className="hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-accent">
              Gallery
            </a>
            <a href="#ancient" className="hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-accent">
              Ancient
            </a>
            <a href="#modern" className="hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-accent">
              Modern
            </a>
            <a href="#about" className="hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-accent">
              About
            </a>
          </nav>

          <div className="flex flex-col items-end gap-1">
            <span className="text-muted text-xs tracking-[0.3em] uppercase">
              2026
            </span>
            <div className="w-10 accent-gradient rounded-full h-[2px]" />
          </div>
        </header>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 max-w-6xl mx-auto flex flex-col justify-center h-full px-10 lg:px-16 pb-20"
        >
          <motion.div style={{ x: textMX, y: textMY }}>
            <TextReveal
              as="p"
              delay={0}
              className="text-text/50 text-xs tracking-[0.28em] uppercase mb-4"
            >
              Curated echoes of time
            </TextReveal>
            <TextReveal
              as="h1"
              delay={0.15}
              stagger={0.06}
              className="font-heading italic text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.02] text-text mb-6"
            >
              Ancient lines, modern light.
            </TextReveal>
            <TextReveal
              as="p"
              delay={0.4}
              className="font-body text-sm text-muted max-w-md leading-relaxed mb-8"
            >
              A quiet gallery of sculptures, frescoes, and digital forms—where
              marble and pixels share the same calm, deliberate space.
            </TextReveal>
            <div className="flex flex-col items-start gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.button
                  onClick={() => scrollToSection("gallery")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-text text-bg text-xs font-medium tracking-[0.18em] uppercase hover:bg-bg hover:text-text border border-text/40 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className="w-2 h-2 rounded-full accent-gradient" />
                  Enter the gallery
                </motion.button>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-text/50 text-xs tracking-wider"
              >
                Scroll to explore
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
