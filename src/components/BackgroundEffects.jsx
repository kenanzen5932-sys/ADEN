import React, { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Ambient Yüzen Kalpler & Işık Parıltıları
    const particles = [];
    const maxAmbientParticles = window.innerWidth < 768 ? 16 : 28;

    for (let i = 0; i < maxAmbientParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.25 + 0.1,
        type: Math.random() > 0.4 ? "heart" : "sparkle",
        hue: Math.random() > 0.5 ? 330 : 280, // Pembe veya Mor
        pulse: Math.random() * Math.PI,
      });
    }

    // 2. Kullanıcı Etkileşimli (Mouse / Dokunma) Kalpler
    const interactiveParticles = [];
    let lastTime = 0;

    const addInteractiveHeart = (clientX, clientY) => {
      if (interactiveParticles.length > 25) return;
      interactiveParticles.push({
        x: clientX,
        y: clientY,
        size: Math.random() * 12 + 10,
        speedY: -(Math.random() * 1.5 + 1.2),
        speedX: (Math.random() - 0.5) * 1.5,
        opacity: 0.8,
        decay: Math.random() * 0.02 + 0.015,
        rotation: (Math.random() - 0.5) * 0.5,
        hue: Math.random() > 0.5 ? 335 : 285,
      });
    };

    const handlePointerMove = (e) => {
      const now = performance.now();
      if (now - lastTime > 60) {
        lastTime = now;
        const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        if (x && y) addInteractiveHeart(x, y);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Kalp Çizim Yardımcısı
    const drawHeart = (c, x, y, size, opacity, hue, rotation = 0) => {
      c.save();
      c.translate(x, y);
      if (rotation) c.rotate(rotation);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        size * 0.9,
        0,
        size * 1.2
      );
      c.bezierCurveTo(
        0,
        size * 0.9,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fillStyle = `hsla(${hue}, 95%, 72%, ${opacity})`;
      c.shadowColor = `hsla(${hue}, 95%, 70%, ${opacity * 0.7})`;
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    };

    // Parıltı Yıldız Çizimi
    const drawSparkle = (c, x, y, size, opacity) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      c.fillStyle = `rgba(255, 255, 255, ${opacity * 1.2})`;
      c.shadowColor = `rgba(255, 180, 220, ${opacity})`;
      c.shadowBlur = 10;
      c.fill();
      c.restore();
    };

    // Render Döngüsü
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Yüzen Ambient Öğeler
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.03;
        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.08;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, Math.max(0.05, currentOpacity), p.hue);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, Math.max(0.05, currentOpacity));
        }
      });

      // İnteraktif Kalpler
      for (let i = interactiveParticles.length - 1; i >= 0; i--) {
        const ip = interactiveParticles[i];
        ip.y += ip.speedY;
        ip.x += ip.speedX;
        ip.opacity -= ip.decay;
        ip.size *= 0.99;

        if (ip.opacity <= 0) {
          interactiveParticles.splice(i, 1);
        } else {
          drawHeart(ctx, ip.x, ip.y, ip.size, ip.opacity, ip.hue, ip.rotation);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  return (
    <div className="background-effects-wrapper" aria-hidden="true">
      {/* Yumuşak Parlayan Bokeh Küreleri */}
      <div className="bokeh-orb orb-1" />
      <div className="bokeh-orb orb-2" />
      <div className="bokeh-orb orb-3" />
      <div className="bokeh-orb orb-4" />

      {/* Canvas Efekt Katmanı */}
      <canvas ref={canvasRef} className="background-canvas" />

      <style>{`
        .background-effects-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .background-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .bokeh-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          animation: softGlowBreath 8s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .orb-1 {
          top: -10%;
          left: -5%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(255, 111, 174, 0.45) 0%, rgba(255, 199, 225, 0) 70%);
          animation-duration: 9s;
        }

        .orb-2 {
          top: 40%;
          right: -10%;
          width: 440px;
          height: 440px;
          background: radial-gradient(circle, rgba(199, 125, 255, 0.4) 0%, rgba(240, 215, 255, 0) 70%);
          animation-duration: 11s;
          animation-delay: -3s;
        }

        .orb-3 {
          bottom: -5%;
          left: 15%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(255, 155, 203, 0.45) 0%, rgba(255, 225, 240, 0) 70%);
          animation-duration: 10s;
          animation-delay: -5s;
        }

        .orb-4 {
          top: 20%;
          left: 45%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(155, 93, 229, 0.25) 0%, rgba(245, 230, 255, 0) 70%);
          animation-duration: 12s;
          animation-delay: -2s;
        }

        @media (max-width: 768px) {
          .bokeh-orb {
            filter: blur(55px);
            opacity: 0.45;
          }
          .orb-1 { width: 240px; height: 240px; }
          .orb-2 { width: 260px; height: 260px; }
          .orb-3 { width: 250px; height: 250px; }
          .orb-4 { width: 180px; height: 180px; }
        }
      `}</style>
    </div>
  );
}
