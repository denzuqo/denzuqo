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

      time += 0.005;
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

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-white font-mono mb-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-5xl w-full text-center">
          <img
            src="https://pbs.twimg.com/profile_images/1925158023057846272/j2XhJgJ6_400x400.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-white/30"
          />
          <h1 className="text-4xl font-bold mt-4">Denzuqo</h1>
          <p className="mt-2 text-lg text-white/80">
            Technologist | Full Stack Developer | AI & Web3 Enthusiast
          </p>
        </div>

        <section className="grid md:grid-cols-2 gap-6 w-full max-w-5xl pt-6">
          <div className="p-6 rounded-xl bg-blue-500/20 backdrop-blur-md border border-blue-400">
            <h2 className="text-3xl font-semibold mb-4">About</h2>
            <p className="text-justify">
              I’m from Indonesia, specifically from West Java, born during the economic crisis of Suharto's era. Passionate about tech — from OOP to functional programming, Web3, and AI.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-green-500/20 backdrop-blur-md border border-green-400">
            <h2 className="text-3xl font-semibold mb-4">Principle</h2>
            <p className="text-justify">
              Technology isn't just a hobby — it's a lens to understand and shape the future. Hope you find inspiration here!
            </p>
          </div>
        </section>

        <section className="mt-12 w-full max-w-5xl">
          <h2 className="text-4xl font-bold mb-4 border-b pb-2">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 backdrop-blur-md">
            {["Full Stack Developer", "Artificial Intelligence", "Blockchain Developer", "DevOPS", "Cyber Security"].map((label, index) => (
              <div
                key={index}
                className="p-4 bg-purple-500/20 border border-purple-400 rounded-xl flex flex-col items-center text-center"
              >
                <img
                  src={`https://img.icons8.com/?size=40&id=${[
                    "lS8MFGKJuQ0-",
                    "18823",
                    "22852",
                    "33284",
                    "16135"
                  ][index]}&format=png&color=ffffff`}
                  alt={label}
                />
                <span className="mt-3 text-lg font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 w-full max-w-5xl">
          <h2 className="text-4xl font-bold mb-4 border-b pb-2">Social</h2>
          <div className="grid grid-cols-2 gap-4 backdrop-blur-md">
            {[
              {
                label: "Github",
                img: "https://img.icons8.com/?size=40&id=20675&format=png&color=ffffff",
                link: "https://github.com/denzuqo",
              },
              {
                label: "TwitterX",
                img: "https://img.icons8.com/?size=40&id=7WVpwSy9g6hn&format=png&color=ffffff",
                link: "https://x.com/denzuqo",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                className="p-4 bg-cyan-500/20 border border-cyan-400 rounded-xl flex flex-col items-center hover:bg-cyan-600/30 transition"
              >
                <img src={item.img} alt={item.label} />
                <span className="mt-2 font-semibold">{item.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Maintenance;
