import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

function randomFloat(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number) {
  return Math.floor(randomFloat(min, max));
}

function generateRandomNumber(): string {
  const formats = [
    () => randomFloat(0, 99).toFixed(2),
    () => randomFloat(0, 9).toFixed(3),
    () => randomInt(0, 99).toString(),
    () => randomFloat(0, 30).toFixed(1),
  ];
  return formats[randomInt(0, formats.length)]();
}

interface SquareData {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  number: string;
}

interface LineData {
  id: number;
  startIdx: number;
  endIdx: number;
  opacity: number;
  visible: boolean;
}

function rectsOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
  cw: number,
  ch: number
): boolean {
  const aL = (a.x / 100) * cw;
  const aT = (a.y / 100) * ch;
  const aR = aL + a.width;
  const aB = aT + a.height;

  const bL = (b.x / 100) * cw;
  const bT = (b.y / 100) * ch;
  const bR = bL + b.width;
  const bB = bT + b.height;

  const pad = 20;
  return aL - pad < bR && aR + pad > bL && aT - pad < bB && aB + pad > bT;
}

function findNonOverlappingPos(
  existing: SquareData[],
  width: number,
  height: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  cw: number,
  ch: number
): { x: number; y: number } {
  for (let attempt = 0; attempt < 100; attempt++) {
    const x = randomFloat(xMin, xMax);
    const y = randomFloat(yMin, yMax);
    const candidate = { x, y, width, height };
    const overlaps = existing.some((sq) =>
      rectsOverlap(sq, candidate, cw, ch)
    );
    if (!overlaps) return { x, y };
  }
  return { x: randomFloat(xMin, xMax), y: randomFloat(yMin, yMax) };
}

function createSquares(cw: number, ch: number): SquareData[] {
  const squares: SquareData[] = [];
  const sizes = [
    { w: randomFloat(120, 190), h: randomFloat(100, 160) },
    { w: randomFloat(110, 170), h: randomFloat(90, 145) },
    { w: randomFloat(95, 150), h: randomFloat(85, 130) },
    { w: randomFloat(85, 135), h: randomFloat(75, 120) },
    { w: randomFloat(100, 160), h: randomFloat(85, 135) },
    { w: randomFloat(80, 125), h: randomFloat(70, 110) },
    { w: randomFloat(105, 165), h: randomFloat(90, 140) },
    { w: randomFloat(90, 140), h: randomFloat(75, 125) },
  ];

  for (let i = 0; i < 8; i++) {
    const { w, h } = sizes[i];
    const pos = findNonOverlappingPos(squares, w, h, 40, 93, 5, 90, cw, ch);
    squares.push({
      id: i,
      x: pos.x,
      y: pos.y,
      width: w,
      height: h,
      number: generateRandomNumber(),
    });
  }
  return squares;
}

function createLines(squareCount: number): LineData[] {
  const lines: LineData[] = [];
  const usedPairs = new Set<string>();
  const available = Array.from({ length: 6 }, (_, i) => i);

  for (let i = 0; i < 3 && available.length > 0; i++) {
    const idx = available.splice(randomInt(0, available.length), 1)[0];
    if (idx === undefined) break;
    const a = randomInt(0, squareCount);
    let b = randomInt(0, squareCount);
    while (b === a) b = randomInt(0, squareCount);
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    usedPairs.add(key);
    lines.push({
      id: idx,
      startIdx: a,
      endIdx: b,
      opacity: randomFloat(0.15, 0.3),
      visible: true,
    });
  }

  for (let s = 0; s < squareCount; s++) {
    const connected = lines.some(
      (ln) => ln.visible && (ln.startIdx === s || ln.endIdx === s)
    );
    if (!connected && available.length > 0) {
      const idx = available.splice(randomInt(0, available.length), 1)[0];
      if (idx !== undefined) {
        let b = randomInt(0, squareCount);
        while (b === s) b = randomInt(0, squareCount);
        const key = `${Math.min(s, b)}-${Math.max(s, b)}`;
        if (!usedPairs.has(key)) {
          usedPairs.add(key);
          lines.push({
            id: idx,
            startIdx: s,
            endIdx: b,
            opacity: randomFloat(0.15, 0.3),
            visible: true,
          });
        }
      }
    }
  }

  return lines;
}

function SquareElement({ square }: { square: SquareData }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    el.textContent = square.number;
    const id = setInterval(() => {
      if (el) el.textContent = generateRandomNumber();
    }, 300 + randomInt(0, 500));
    return () => clearInterval(id);
  }, [square.number]);

  return (
    <div
      className="absolute"
      style={{
        left: `${square.x}%`,
        top: `${square.y}%`,
        width: square.width,
        height: square.height,
        border: "0.5px solid rgba(255,255,255,0.18)",
        filter: "url(#pixelate)",
        backdropFilter: "blur(0.5px)",
        WebkitBackdropFilter: "blur(0.5px)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        transition: "none",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px",
        }}
      />
      <span
        ref={spanRef}
        className="absolute inset-0 flex items-center justify-center select-none leading-none text-white/35"
        style={{
          fontSize: 11,
          fontFamily: "'Space Mono', monospace",
          fontVariantNumeric: "tabular-nums",
        }}
      />
    </div>
  );
}

function LineElement({
  line,
  squares,
}: {
  line: LineData;
  squares: SquareData[];
}) {
  if (!line.visible) return null;

  const s = squares[line.startIdx];
  const e = squares[line.endIdx];
  if (!s || !e) return null;

  const sx = `calc(${s.x}% + ${s.width / 2}px)`;
  const sy = `calc(${s.y}% + ${s.height / 2}px)`;
  const ex = `calc(${e.x}% + ${e.width / 2}px)`;
  const ey = `calc(${e.y}% + ${e.height / 2}px)`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={`rgba(255,255,255,${line.opacity})`}
        strokeWidth="1"
      />
    </svg>
  );
}

function ScanLine({ axis }: { axis: "h" | "v" }) {
  const isHorizontal = axis === "h";

  return (
    <motion.div
      className="absolute"
      style={{
        ...(isHorizontal
          ? { left: 0, right: 0, height: 1 }
          : { top: 0, bottom: 0, width: 1 }),
        background: isHorizontal
          ? "linear-gradient(90deg, transparent 0%, rgba(241,196,107,0.12) 20%, rgba(241,196,107,0.12) 80%, transparent 100%)"
          : "linear-gradient(180deg, transparent 0%, rgba(241,196,107,0.12) 20%, rgba(241,196,107,0.12) 80%, transparent 100%)",
      }}
      animate={
        isHorizontal
          ? { y: ["-10vh", "110vh"] }
          : { x: ["-10vw", "110vw"] }
      }
      transition={{
        duration: isHorizontal ? 12 : 18,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function HeroGridOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dimsRef = useRef({ w: 1200, h: 900 });
  const [squares, setSquares] = useState<SquareData[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) dimsRef.current = { w: width, h: height };
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (dimsRef.current.w > 0 && dimsRef.current.h > 0 && squares.length === 0) {
      const { w, h } = dimsRef.current;
      setSquares(createSquares(w, h));
      setLines(createLines(8));
    }
  }, [squares.length]);

  const teleportSquares = useCallback(() => {
    const { w, h } = dimsRef.current;
    setSquares((prev) =>
      prev.map((sq) => {
        if (Math.random() > 0.5) return sq;
        const newW = randomFloat(80, 190);
        const newH = randomFloat(70, 160);
        const others = prev.filter((o) => o.id !== sq.id);
        const pos = findNonOverlappingPos(
          others, newW, newH, 40, 93, 5, 90, w, h
        );
        return { ...sq, x: pos.x, y: pos.y, width: newW, height: newH, number: generateRandomNumber() };
      })
    );
  }, []);

  const teleportLines = useCallback(() => {
    setLines((prev) => {
      const next = prev.map((ln) => {
        if (Math.random() > 0.5) {
          const a = randomInt(0, 8);
          let b = randomInt(0, 8);
          while (b === a) b = randomInt(0, 8);
          return {
            ...ln,
            startIdx: a,
            endIdx: b,
            visible: Math.random() > 0.15,
          };
        }
        return ln;
      });

      let visibleCount = next.filter((ln) => ln.visible).length;
      while (visibleCount > 3) {
        const idx = next.findIndex((ln) => ln.visible);
        if (idx !== -1) {
          next[idx].visible = false;
          visibleCount--;
        } else break;
      }

      const usedPairs = new Set<string>();
      for (const ln of next) {
        if (ln.visible) {
          const key = `${Math.min(ln.startIdx, ln.endIdx)}-${Math.max(ln.startIdx, ln.endIdx)}`;
          if (usedPairs.has(key)) {
            ln.visible = false;
          } else {
            usedPairs.add(key);
          }
        }
      }

      const connected = new Set<number>();
      for (const ln of next) {
        if (ln.visible) {
          connected.add(ln.startIdx);
          connected.add(ln.endIdx);
        }
      }

      for (let s = 0; s < 8; s++) {
        if (!connected.has(s)) {
          const candidate = next.find((ln) => !ln.visible);
          if (candidate) {
            let b = randomInt(0, 8);
            while (b === s) b = randomInt(0, 8);
            const key = `${Math.min(s, b)}-${Math.max(s, b)}`;
            if (!usedPairs.has(key)) {
              candidate.visible = true;
              candidate.startIdx = s;
              candidate.endIdx = b;
              usedPairs.add(key);
            }
          }
        }
      }

      return next;
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(teleportSquares, 600);
    return () => clearInterval(id);
  }, [teleportSquares, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(teleportLines, 500);
    return () => clearInterval(id);
  }, [teleportLines, reducedMotion]);

  if (reducedMotion) {
    return (
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[3] overflow-hidden opacity-50" style={{ mixBlendMode: "screen" }}>
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="pixelate" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
              <feComponentTransfer in="blur" result="posterize">
                <feFuncR type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1" />
                <feFuncG type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1" />
                <feFuncB type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
        {lines.map((line) => (
          <LineElement key={`line-${line.id}`} line={line} squares={squares} />
        ))}
        {squares.map((sq) => (
          <SquareElement key={`sq-${sq.id}`} square={sq} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[3] overflow-hidden opacity-50" style={{ mixBlendMode: "screen" }}>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="pixelate" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feComponentTransfer in="blur" result="posterize">
              <feFuncR type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1" />
              <feFuncG type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1" />
              <feFuncB type="discrete" tableValues="0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {lines.map((line) => (
        <LineElement key={`line-${line.id}`} line={line} squares={squares} />
      ))}
      {squares.map((sq) => (
        <SquareElement key={`sq-${sq.id}`} square={sq} />
      ))}

      <ScanLine axis="h" />
      <ScanLine axis="v" />
    </div>
  );
}
