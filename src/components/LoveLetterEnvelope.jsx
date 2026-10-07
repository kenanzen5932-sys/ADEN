import React, { useState } from "react";
import { siteConfig } from "../contentConfig";
import { Heart, Sparkles } from "lucide-react";

export default function LoveLetterEnvelope({ onOpenLetter, isAnimating }) {
  const { envelope } = siteConfig;
  const [internalState, setInternalState] = useState("idle"); // idle | wiggling | opening | fading

  const handleOpenClick = () => {
    if (internalState !== "idle" || isAnimating) return;

    // 1. Aşama: Zarf hafifçe sallanır
    setInternalState("wiggling");

    // 2. Aşama: Zarf kapağı açılır (400ms sonra)
    setTimeout(() => {
      setInternalState("opening");
    }, 450);

    // 3. Aşama: Zarf kaybolmaya başlar ve çiçekler uçuşur (1300ms sonra)
    setTimeout(() => {
      setInternalState("fading");
    }, 1300);

    // 4. Aşama: Mektup tam olarak açılır (1900ms sonra)
    setTimeout(() => {
      onOpenLetter();
    }, 1900);
  };

  return (
    <div className={`envelope-section-wrapper state-${internalState}`}>
      {/* 3D Zarf Kutusu */}
      <div
        className={`envelope-container ${internalState}`}
        onClick={handleOpenClick}
        role="button"
        tabIndex={0}
        aria-label="Mektubu Aç"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpenClick();
          }
        }}
      >
        {/* Zarf Gövdesi */}
        <div className="envelope-body">
          {/* İç Kağıt Ucu (Hafifçe gözüken mektup) */}
          <div className="envelope-paper-peek">
            <span className="peek-heart">💌</span>
          </div>

          {/* Sol ve Sağ Cepler */}
          <div className="pocket pocket-left" />
          <div className="pocket pocket-right" />
          <div className="pocket pocket-bottom" />

          {/* Açılır Üst Kapak (Flap) */}
          <div className="envelope-flap" />

          {/* Mühür / Kalp Rozeti */}
          <div className="envelope-seal">
            <Heart size={28} className="seal-heart-icon" fill="#FFF5FB" />
          </div>

          {/* Zarf Üzerindeki Metin */}
          <div className="envelope-content-preview">
            <h3 className="envelope-title">{envelope.title}</h3>
            <p className="envelope-subtitle">{envelope.subtitle}</p>
          </div>
        </div>

        {/* Işık Halesi & Çevre Parıltıları */}
        <div className="envelope-glow" />
        <div className="floating-mini-heart heart-pos-1">♥</div>
        <div className="floating-mini-heart heart-pos-2">💕</div>
        <div className="floating-mini-heart heart-pos-3">✨</div>
      </div>

      {/* Aksiyon Butonu */}
      {internalState === "idle" && (
        <button
          className="button-romantic open-letter-btn"
          onClick={handleOpenClick}
          aria-label={envelope.buttonText}
        >
          <Sparkles size={18} />
          <span>{envelope.buttonText}</span>
        </button>
      )}

      <style>{`
        .envelope-section-wrapper {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 3.5rem;
          perspective: 1200px;
        }

        .envelope-container {
          position: relative;
          width: 100%;
          max-width: 440px;
          height: 270px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-bottom: 2rem;
          user-select: none;
        }

        .envelope-container:hover {
          transform: translateY(-6px) scale(1.02);
        }

        /* Wiggling animasyonu */
        .envelope-container.wiggling {
          animation: envelopeWiggle 0.45s ease-in-out infinite;
        }

        /* Zarf Kayboluşu */
        .envelope-container.fading {
          transition: opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1), transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: scale(0.85) translateY(20px);
          pointer-events: none;
        }

        /* Zarf Gövdesi */
        .envelope-body {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #F9A8D4 0%, #D8B4FE 50%, #C084FC 100%);
          border-radius: 20px;
          box-shadow: var(--shadow-envelope);
          border: 2px solid rgba(255, 255, 255, 0.5);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Zarf Üst Kapağı (Flap) */
        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 220px solid transparent;
          border-right: 220px solid transparent;
          border-top: 145px solid #F472B6;
          transform-origin: top center;
          transition: transform 0.75s cubic-bezier(0.4, 0, 0.2, 1), z-index 0.2s ease;
          z-index: 5;
          filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.12));
        }

        /* Kapak Açıldığında */
        .envelope-container.opening .envelope-flap,
        .envelope-container.fading .envelope-flap {
          transform: rotateX(180deg);
          z-index: 1;
        }

        /* Alt ve Yan Cepler */
        .pocket-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 220px solid transparent;
          border-right: 220px solid transparent;
          border-bottom: 145px solid #E879F9;
          z-index: 3;
          opacity: 0.95;
        }

        .pocket-left {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0;
          border-bottom: 135px solid transparent;
          border-top: 135px solid transparent;
          border-left: 220px solid #F472B6;
          z-index: 2;
          opacity: 0.85;
        }

        .pocket-right {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-bottom: 135px solid transparent;
          border-top: 135px solid transparent;
          border-right: 220px solid #F472B6;
          z-index: 2;
          opacity: 0.85;
        }

        /* İçteki kağıdın ucu */
        .envelope-paper-peek {
          position: absolute;
          top: 30px;
          left: 30px;
          right: 30px;
          height: 180px;
          background: #FFFDFC;
          border-radius: 12px;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .peek-heart {
          font-size: 2.2rem;
        }

        .envelope-container.opening .envelope-paper-peek {
          transform: translateY(-40px);
        }

        /* Mühür */
        .envelope-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          background: radial-gradient(circle, #FF2E93 0%, #D946EF 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(255, 46, 147, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.5);
          border: 2.5px solid #FFFFFF;
          z-index: 6;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .seal-heart-icon {
          color: #FFF5FB;
          animation: pulseHeart 2s infinite ease-in-out;
        }

        .envelope-container.opening .envelope-seal {
          transform: translate(-50%, -100%) scale(0.6);
          opacity: 0;
        }

        /* Zarfın Üzerindeki Yazı Kartı */
        .envelope-content-preview {
          position: absolute;
          bottom: 24px;
          z-index: 4;
          text-align: center;
          width: 100%;
          padding: 0 1rem;
        }

        .envelope-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          text-shadow: 0 2px 8px rgba(90, 20, 70, 0.4);
          margin-bottom: 0.2rem;
        }

        .envelope-subtitle {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* Glow ve Yan Parıltılar */
        .envelope-glow {
          position: absolute;
          inset: -15px;
          background: radial-gradient(circle, rgba(255, 111, 174, 0.4) 0%, transparent 70%);
          filter: blur(20px);
          z-index: 0;
          pointer-events: none;
        }

        .floating-mini-heart {
          position: absolute;
          font-size: 1.25rem;
          color: #FF6FAE;
          filter: drop-shadow(0 2px 8px rgba(255, 111, 174, 0.6));
          pointer-events: none;
          animation: floatGentle 3.5s ease-in-out infinite;
        }

        .heart-pos-1 {
          top: -12px;
          left: 10%;
          animation-delay: 0s;
        }
        .heart-pos-2 {
          bottom: 15px;
          right: -10px;
          animation-delay: 1.2s;
        }
        .heart-pos-3 {
          top: 30%;
          right: -20px;
          animation-delay: 2s;
        }

        .open-letter-btn {
          font-size: 1.15rem;
          padding: 1rem 2.5rem;
          min-width: 220px;
        }

        /* Mobil Optimizasyon */
        @media (max-width: 480px) {
          .envelope-container {
            max-width: 330px;
            height: 215px;
            margin-bottom: 1.75rem;
          }
          .envelope-flap {
            border-left-width: 165px;
            border-right-width: 165px;
            border-top-width: 115px;
          }
          .pocket-bottom {
            border-left-width: 165px;
            border-right-width: 165px;
            border-bottom-width: 115px;
          }
          .pocket-left, .pocket-right {
            border-top-width: 107px;
            border-bottom-width: 107px;
            border-left-width: 165px;
            border-right-width: 165px;
          }
          .envelope-paper-peek {
            top: 20px;
            left: 20px;
            right: 20px;
            height: 140px;
          }
          .envelope-seal {
            width: 52px;
            height: 52px;
          }
          .envelope-title {
            font-size: 1.1rem;
          }
          .envelope-subtitle {
            font-size: 0.8rem;
          }
          .open-letter-btn {
            font-size: 1.05rem;
            padding: 0.9rem 2rem;
          }
        }
      `}</style>
    </div>
  );
}
