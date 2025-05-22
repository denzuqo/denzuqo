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

      <div
        className="container mt-8 mx-auto z-10 text-white text-2xl font-mono text-[clamp(2rem,10vw,9rem)] p-5">
          <div className="flex flex-col p-5 items-center">
              <img src='https://pbs.twimg.com/profile_images/1925158023057846272/j2XhJgJ6_400x400.jpg' className='rounded-xl w-[250px]'/>
                <p className='text-5xl font-bold pt-3 pt-8 lg:text-left'>Denzuqo</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 p-5">
          
            <div className='p-5 bg-blue-600/25 backdrop-blur-sm rounded-xl border border-blue-600'>
              <p className='text-[clamp(2rem,10vw,2rem)] font-bold pt-3 lg:pt-0 pb-3 lg:pb-0 lg:text-left'>About</p>
              <p className='text-[clamp(1rem,10vw,1rem)] font-bold text-justify lg:text-left pt-4'>Here, you can get to know more about me. I’m from Indonesia, specifically from West Java, and I was born during the economic crisis in the era of President Suharto.</p>
              <p className='text-[clamp(1rem,10vw,1rem)] font-bold text-justify lg:text-left pt-4'>I have a deep passion for technology. My hobbies revolve around learning and coding — whether it's Object-Oriented Programming, Functional Programming, or working with native methods. Recently, I've been exploring the fast-growing fields of Web3 and Artificial Intelligence (AI).</p>
            </div>

            <div className='p-5 bg-red-600/25 backdrop-blur-sm rounded-xl border border-red-600'>
                <p className='text-[clamp(2rem,10vw,2rem)] font-bold pt-3 lg:pt-0 pb-3 lg:pb-0 lg:text-left'>Principle</p>
                <p className='text-[clamp(1rem,10vw,1rem)] font-bold text-justify lg:text-left pt-4'>For me, technology is more than just an interest — it's a way to understand the world and shape the future. Thank you for visiting, and I hope you find something valuable or inspiring here!</p>
            </div>
          </div>

          <div className="flex flex-row w-full p-5 gap-4 pt-8 items-center">
            <p className='text-[clamp(2rem,10vw,2rem)] font-bold pt-3 lg:pt-0 pb-3 lg:pb-0 lg:text-left'>
              Skill
            </p>
            <hr className="w-full border-t-4"/>
          </div>

          <div className="flex flex-wrap gap-4 p-5 pt-0 w-full">
            {[
              { img: "https://img.icons8.com/?size=40&id=lS8MFGKJuQ0-&format=png&color=ffffff", label: "Full Stack Developer" },
              { img: "https://img.icons8.com/?size=40&id=18823&format=png&color=ffffff", label: "Artificial Intelligence" },
              { img: "https://img.icons8.com/?size=40&id=22852&format=png&color=ffffff", label: "Blockchain Developer" },
              { img: "https://img.icons8.com/?size=40&id=33284&format=png&color=ffffff", label: "DevOPS" },
              { img: "https://img.icons8.com/?size=40&id=16135&format=png&color=ffffff", label: "Cyber Security" }
            ].map((item, i) => (
              <div
                key={i}
                className="flex-auto items-center p-3 bg-[#F85225]/25 backdrop-blur-sm rounded-xl min-w-[200px] border border-[#F85225]"
              >
                <img src={item.img} alt={item.label} />
                <p className="text-nowrap text-[clamp(1rem,10vw,1.2rem)] font-bold pt-3">{item.label}</p>
              </div>
            ))}
          </div>



          <div className="flex flex-row w-full p-5 gap-4 pt-8 items-center">
            <p className='text-[clamp(2rem,10vw,2rem)] font-bold pt-3 lg:pt-0 pb-3 lg:pb-0 lg:text-left'>
              Social
            </p>
            <hr className="w-full border-t-4"/>
          </div>

          <div className="flex flex-wrap gap-4 p-5 pt-0 w-full">
            {[
              { img: "https://img.icons8.com/?size=40&id=20675&format=png&color=ffffff", label: "Github",
                link: "https://github.com/denzuqo"
              },
              { img: "https://img.icons8.com/?size=40&id=7WVpwSy9g6hn&format=png&color=ffffff", label: "TwitterX",
                link: "https://x.com/denzuqo"
              }
            ].map((item, i) => (
              <a href={item.link} target="_blank" className="flex-auto items-center ">
                <div
                  key={i}
                  className="p-3 bg-[#F85225]/25 backdrop-blur-sm rounded-xl min-w-[200px] border border-[#F85225]"
                >
                  <img src={item.img} alt={item.label} />
                  <p className="text-nowrap text-[clamp(1rem,10vw,1.2rem)] font-bold pt-3">{item.label}</p>
                </div>
              </a>
            ))}
          </div>
      </div>
      <div className="pb-25"></div>
    </>
  );
};

export default Maintenance;
