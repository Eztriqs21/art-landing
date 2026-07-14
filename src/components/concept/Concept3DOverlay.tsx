import { motion, useTransform, MotionValue } from "framer-motion";

interface Concept3DOverlayProps {
  progress: MotionValue<number>;
}

export default function Concept3DOverlay({ progress }: Concept3DOverlayProps) {
  const phase1Opacity = useTransform(progress, [0, 0.2, 0.25], [1, 1, 0]);
  const phase2Opacity = useTransform(progress, [0.22, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const phase3Opacity = useTransform(progress, [0.47, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const phase4Opacity = useTransform(progress, [0.72, 0.75, 1, 1], [0, 1, 1, 1]);

  return (
    <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
      {/* Side text panel */}
      <div className="w-full md:w-[40%] lg:w-[35%] px-6 md:px-10 lg:px-14">
        <div className="space-y-8">
          {/* Phase 1: Outer Shell */}
          <motion.div style={{ opacity: phase1Opacity }}>
            <h2 className="font-heading italic text-2xl md:text-3xl tracking-[-0.03em] text-text">
              Outer Shell
            </h2>
            <p className="mt-2 font-body text-sm md:text-base text-muted leading-relaxed">
              The closed artifact represents the visual shell of the landing page.
            </p>
          </motion.div>

          {/* Phase 2: Structure */}
          <motion.div style={{ opacity: phase2Opacity }}>
            <h2 className="font-heading italic text-2xl md:text-3xl tracking-[-0.03em] text-text">
              Structure &amp; Scroll
            </h2>
            <p className="mt-2 font-body text-sm md:text-base text-muted leading-relaxed">
              As the shell opens, you see the frames that map to sections, parallax, and horizontal motion.
            </p>
          </motion.div>

          {/* Phase 3: Interactions */}
          <motion.div style={{ opacity: phase3Opacity }}>
            <h2 className="font-heading italic text-2xl md:text-3xl tracking-[-0.03em] text-text">
              Interactions
            </h2>
            <p className="mt-2 font-body text-sm md:text-base text-muted leading-relaxed">
              The middle layer hints at the mechanics driving hover, tilt, and custom cursor interactions.
            </p>
          </motion.div>

          {/* Phase 4: Core */}
          <motion.div style={{ opacity: phase4Opacity }}>
            <h2 className="font-heading italic text-2xl md:text-3xl tracking-[-0.03em] text-text">
              Concept Core
            </h2>
            <p className="mt-2 font-body text-sm md:text-base text-muted leading-relaxed">
              At the center, the glowing core represents the story that binds Ancient threads and modern responses.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side reserved for model */}
      <div className="hidden md:block md:w-[60%] lg:w-[65%]" />
    </div>
  );
}
