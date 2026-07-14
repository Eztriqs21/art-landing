import { MotionValue } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Group, Mesh } from "three";

const MODEL_PATH = `${import.meta.env.BASE_URL}futuristic-cube-portal-3d-model.glb`;

interface ConceptArtifactProps {
  progress: MotionValue<number>;
}

export default function ConceptArtifact({ progress }: ConceptArtifactProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<Group>(null);
  const leftGroupRef = useRef<Group>(null);
  const rightGroupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);

  // Decompose GLB into left/right mesh groups
  const { leftMeshes, rightMeshes } = useMemo(() => {
    const meshes: Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof Mesh) meshes.push(child);
    });

    if (meshes.length === 0) return { leftMeshes: [], rightMeshes: [] };

    // Use local positions to split
    const positions = meshes.map(m => m.position.x);
    const minX = Math.min(...positions);
    const maxX = Math.max(...positions);
    const spread = maxX - minX;

    // If spread is significant, split by position
    if (spread > 0.1) {
      const mid = (minX + maxX) / 2;
      return {
        leftMeshes: meshes.filter((_, i) => positions[i] < mid),
        rightMeshes: meshes.filter((_, i) => positions[i] >= mid),
      };
    }

    // Fallback: treat all as one group (no split possible)
    return { leftMeshes: meshes, rightMeshes: [] };
  }, [scene]);

  useFrame(() => {
    const p = progress.get();
    const group = groupRef.current;
    if (!group) return;

    // Base rotation for the whole group
    group.rotation.y = p * Math.PI * 0.5;

    // Shell: move halves apart
    const shellOpen = Math.min(Math.max((p - 0.1) / 0.4, 0), 1);
    if (leftGroupRef.current) {
      leftGroupRef.current.position.x = -shellOpen * 1.0;
    }
    if (rightGroupRef.current) {
      rightGroupRef.current.position.x = shellOpen * 1.0;
    }

    // Ring: scale and rotate
    const ringProgress = Math.min(Math.max((p - 0.3) / 0.4, 0), 1);
    if (ringRef.current) {
      const rs = ringProgress * 1.0;
      ringRef.current.scale.set(rs, rs, rs);
      ringRef.current.rotation.x += 0.008;
      ringRef.current.rotation.z += 0.005;
      ringRef.current.visible = ringProgress > 0.01;
    }

    // Core: fade in and pulse
    const coreProgress = Math.min(Math.max((p - 0.6) / 0.3, 0), 1);
    if (coreRef.current) {
      const pulse = 1 + Math.sin(p * Math.PI * 4) * 0.08 * coreProgress;
      const cs = (0.3 + coreProgress * 0.7) * pulse;
      coreRef.current.scale.set(cs, cs, cs);
      coreRef.current.rotation.y += 0.01;
      coreRef.current.visible = coreProgress > 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* GLB shell — left group */}
      <group ref={leftGroupRef}>
        {leftMeshes.map((mesh, i) => (
          <primitive key={`l-${i}`} object={mesh.clone()} />
        ))}
      </group>

      {/* GLB shell — right group */}
      <group ref={rightGroupRef}>
        {rightMeshes.map((mesh, i) => (
          <primitive key={`r-${i}`} object={mesh.clone()} />
        ))}
      </group>

      {/* Middle ring */}
      <mesh ref={ringRef} visible={false}>
        <torusGeometry args={[1.2, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#7b5cff"
          emissive="#7b5cff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner core */}
      <mesh ref={coreRef} visible={false}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#ffd27f"
          emissive="#ffd27f"
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  );
}
