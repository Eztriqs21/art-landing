import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import ConceptArtifact from "./ConceptArtifact";

interface Concept3DCanvasProps {
  progress: MotionValue<number>;
}

export default function Concept3DCanvas({ progress }: Concept3DCanvasProps) {
  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0.8, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.0} />
          <pointLight position={[0, 0, 2]} intensity={0.6} color="#ffd27f" />
          <Environment preset="city" />
          <ConceptArtifact progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
