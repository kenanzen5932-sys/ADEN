import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function FlowerAnimation({ onComplete }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // 1. canvas-confetti ile yumuşak pastel çiçek/kalp patlaması
    try {
      const count = 40;
      const defaults = {
        origin: { y: 0.7 },
        colors: ["#FF6FAE", "#FF9BCB", "#C77DFF", "#E0AAFF", "#FFF5FB", "#F72585"],
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.7),
        spread: 60,
        startVelocity: 35,
        shapes: ["circle"],
      });

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.5),
        spread: 90,
        startVelocity: 45,
        ticks: 200,
      });
    } catch (e) {
      // sessizce geç
    }

    // 2. CSS ile ekran geneline yayılan organik uçuşan çiçek yaprakları
    const petalColors = [
      "linear-gradient(135deg, #FF6FAE, #FF9BCB)", // Pembe
      "linear-gradient(135deg, #C77DFF, #9B5DE5)", // Mor
      "linear-gradient(135deg, #FFFFFF, #FDE7F3)", // Beyaz / Açık Pembe
      "linear-gradient(135deg, #E0AAFF, #C77DFF)", // Açık Lila
      "linear-gradient(135deg, #FFB3D9, #FF6FAE)", // Pastel Fuşya
    ];

    const types = ["petal", "flower", "heart"];
    const generatedPetals = [];
    const totalPetals = window.innerWidth < 768 ? 24 : 36;

    for (let i = 0; i < totalPetals; i++) {
      const startX = Math.random() * 100; // vw cinsinden
      const startY = Math.random() * 40 + 60; // Ekranın altından veya ortasından
      const tx = (Math.random() - 0.5) * 260; // px yatay kayma
      const ty = -(Math.random() * 500 + 350); // px yukarı uçuş
      const rot = Math.random() * 720 - 360; // derece dönüş
      const duration = Math.random() * 2.2 + 2.4; // 2.4s - 4.6s arası
      const delay = Math.random() * 0.7; // hafif kademeli başlama
      const size = Math.random() * 16 + 14; // boyut
      const type = types[Math.floor(Math.random() * types.length)];
      const bg = petalColors[Math.floor(Math.random() * petalColors.length)];

      generatedPetals.push({
        id: i,
        startX,
        startY,
        tx,
        ty,
        rot,
        duration,
        delay,
        size,
        type,
        bg,
      });
    }

    setPetals(generatedPetals);

    // Animasyon tamamlandığında callback
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flower-animation-container" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`flying-item flying-${p.type}`}
          style={{
            left: `${p.startX}vw`,
            top: `${p.startY}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.type === "petal" ? p.bg : "transparent",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            "--rot": `${p.rot}deg`,
          }}
        >
          {p.type === "flower" && (
            <svg viewBox="0 0 24 24" fill="none" className="flower-svg">
              <path
                d="M12 2C13 5 15 5 18 4C17 7 19 9 22 10C19 11 17 13 18 16C15 15 13 15 12 18C11 15 9 15 6 16C7 13 5 11 2 10C5 9 7 7 6 4C9 5 11 5 12 2Z"
                fill={p.id % 2 === 0 ? "#FF9BCB" : "#E0AAFF"}
              />
              <circle cx="12" cy="10" r="2.5" fill="#FFF5FB" />
            </svg>
          )}

          {p.type === "heart" && (
            <span
              className="flying-heart-char"
              style={{
                fontSize: `${p.size}px`,
                color: p.id % 2 === 0 ? "#FF6FAE" : "#C77DFF",
              }}
            >
              ♥
            </span>
          )}
        </div>
      ))}

      <style>{`
        .flower-animation-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          overflow: hidden;
        }

        .flying-item {
          position: absolute;
          animation-name: petalDrift;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }

        .flying-petal {
          border-radius: 50% 0 50% 50%;
          box-shadow: 0 4px 12px rgba(255, 111, 174, 0.35);
        }

        .flower-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 3px 8px rgba(199, 125, 255, 0.4));
        }

        .flying-heart-char {
          display: block;
          line-height: 1;
          filter: drop-shadow(0 2px 6px rgba(255, 111, 174, 0.5));
        }
      `}</style>
    </div>
  );
}
