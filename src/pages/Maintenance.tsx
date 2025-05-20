import React, { useEffect, useRef } from "react";

const Maintenance: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let fontSize = window.innerWidth < 768 ? 18 : 24;
    const chars = ["•", "₿", "Ł", "", "", "", ""];

    const noise = (x: number, y: number, t: number): number =>
      Math.sin(x * 0.1 + t) * Math.cos(y * 0.15 + t * 1.3) +
      Math.sin(x * 0.5 + t * 1.5) * Math.cos(y * 0.3 + t * 0.7);

    const fractalNoise = (x: number, y: number, t: number): number => {
      let value = 1;
      let amplitude = 2;
      let frequency = 0.15;
      let max = 0;
      for (let i = 4; i > 1; i--) {
        value += amplitude * noise(x * frequency, y * frequency, t);
        max += amplitude;
        amplitude *= 1;
        frequency *= 2;
      }
      return value / max;
    };

    let cols: number;
    let rows: number;
    let time = 0;

    const resize = () => {
      fontSize = window.innerWidth < 768 ? 18 : 24;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      rows = Math.floor(canvas.height / fontSize);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = fractalNoise(x, y, time);
          let norm = (n + 1) / 2;
          norm = Math.min(1, Math.max(0, norm));
          let charIndex = Math.floor(norm * (chars.length - 1));
          charIndex = Math.min(chars.length - 1, Math.max(0, charIndex));
          const ch = chars[charIndex];

          if (ch === "₿") {
            ctx.fillStyle = "orange";
          } else if (ch === "•") {
            ctx.fillStyle = "#a4b0be";
          } else {
            ctx.fillStyle = "#57606f";
          }

          ctx.fillText(ch, x * fontSize, y * fontSize);
        }
      }

      time += 0.008;
      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          display: "block",
          background: "black",
          imageRendering: "pixelated",
        }}
      />

      <div
        className="flex justify-center items-center min-h-screen relative z-10 text-white text-2xl font-mono text-[clamp(2rem,10vw,9rem)] p-5">
            <div>
                Under Maintenis!
            </div>
      </div>
    </>
  );
};

export default Maintenance;
