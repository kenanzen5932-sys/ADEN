import React, { useEffect, useState } from "react";
import { siteConfig } from "../contentConfig";
import { Heart, Sparkles, RotateCcw } from "lucide-react";

export default function LoveLetter({ onReset }) {
  const { loveLetter } = siteConfig;
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [showClosing, setShowClosing] = useState(false);

  useEffect(() => {
    const timers = [];

    loveLetter.paragraphs.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleParagraphs((prev) => Math.max(prev, idx + 1));
      }, 350 + idx * 400);
      timers.push(timer);
    });

    const closingTimer = setTimeout(() => {
      setShowClosing(true);
    }, 350 + loveLetter.paragraphs.length * 400 + 350);
    timers.push(closingTimer);

    return () => timers.forEach(clearTimeout);
  }, [loveLetter.paragraphs]);

  return (
    <article className="love-letter-wrapper" aria-label="Aşk Mektubu">
      <div className="love-letter-card">
        {/* Dekoratif Köşe Motifleri */}
        <div className="card-corner corner-tl" aria-hidden="true">❦</div>
        <div className="card-corner corner-tr" aria-hidden="true">❦</div>
        <div className="card-corner corner-bl" aria-hidden="true">❦</div>
        <div className="card-corner corner-br" aria-hidden="true">❦</div>

        {/* Üst Mühür / Kalp İkonu */}
        <div className="letter-header">
          <div className="letter-heart-seal" aria-hidden="true">
            <Heart size={24} fill="#FF6FAE" color="#FF6FAE" />
          </div>
          <h2 className="letter-title">{loveLetter.title}</h2>
          <div className="letter-title-line" />
        </div>

        {/* Paragraflar */}
        <div className="letter-body">
          {loveLetter.paragraphs.map((para, index) => {
            const isVisible = index < visibleParagraphs;
            return (
              <p
                key={index}
                className={`letter-paragraph ${isVisible ? "visible" : ""}`}
              >
                {para.split("\n").map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {line}
                    {lIdx < para.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            );
          })}
        </div>

        {/* Mektubun Sonundaki Mesaj */}
        <div className={`letter-closing-section ${showClosing ? "visible" : ""}`}>
          <div className="closing-divider">
            <span className="closing-line" />
            <Sparkles size={16} className="closing-sparkle" />
            <span className="closing-line" />
          </div>

          <p className="closing-line-1">{loveLetter.closing.line1}</p>
          <p className="closing-line-2">{loveLetter.closing.line2}</p>

          <div className="infinity-love-badge">
            <span className="infinity-text">
              {loveLetter.closing.infinityText}
            </span>
          </div>

          {onReset && (
            <button
              className="reread-btn"
              onClick={onReset}
              aria-label="Mektubu Tekrar Kapat"
            >
              <RotateCcw size={15} />
              <span>Zarfı Yeniden Kapat</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .love-letter-wrapper {
          width: 100%;
          max-width: 680px;
          margin: 0 auto 3rem auto;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          animation: letterSlideDown 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          padding: 0 0.5rem;
        }

        .love-letter-card {
          position: relative;
          width: 100%;
          background: linear-gradient(175deg, #FFFDFC 0%, #FFF5FA 50%, #FDF2F9 100%);
          border-radius: 26px;
          padding: 3.25rem 2.5rem;
          border: 1.5px solid rgba(255, 155, 203, 0.45);
          box-shadow: var(--shadow-letter);
          overflow: hidden;
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          word-break: break-word;
          background-image: 
            radial-gradient(rgba(255, 111, 174, 0.04) 1px, transparent 0),
            radial-gradient(rgba(199, 125, 255, 0.04) 1px, transparent 0);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        /* Köşe Motifleri */
        .card-corner {
          position: absolute;
          font-size: 1.3rem;
          color: rgba(255, 111, 174, 0.3);
          user-select: none;
          line-height: 1;
        }
        .corner-tl { top: 1.2rem; left: 1.2rem; }
        .corner-tr { top: 1.2rem; right: 1.2rem; transform: scaleX(-1); }
        .corner-bl { bottom: 1.2rem; left: 1.2rem; transform: scaleY(-1); }
        .corner-br { bottom: 1.2rem; right: 1.2rem; transform: scale(-1); }

        /* Başlık Kısmı */
        .letter-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          text-align: center;
        }

        .letter-heart-seal {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ffffff;
          border: 1.5px solid rgba(255, 111, 174, 0.35);
          box-shadow: 0 6px 18px rgba(255, 111, 174, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.85rem;
          animation: pulseHeart 2.5s infinite ease-in-out;
        }

        .letter-title {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 5vw, 2.6rem);
          font-weight: 700;
          color: #6B1746;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .letter-title-line {
          width: 70px;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, #FF6FAE, transparent);
          border-radius: 999px;
        }

        /* Gövde Paragrafları */
        .letter-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }

        .letter-paragraph {
          font-family: var(--font-serif);
          font-size: clamp(1rem, 2.6vw, 1.22rem);
          line-height: 1.8;
          color: #42283E;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .letter-paragraph.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Kapanış Bölümü */
        .letter-closing-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .letter-closing-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .closing-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          max-width: 260px;
          margin-bottom: 1.25rem;
        }

        .closing-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, transparent, rgba(199, 125, 255, 0.5), transparent);
        }

        .closing-sparkle {
          color: #FF6FAE;
        }

        .closing-line-1 {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 2.2vw, 0.98rem);
          color: var(--text-muted);
          font-style: italic;
          margin-bottom: 0.35rem;
        }

        .closing-line-2 {
          font-family: var(--font-serif);
          font-size: clamp(1.05rem, 3vw, 1.25rem);
          font-weight: 600;
          color: #7A1C52;
          margin-bottom: 1.35rem;
        }

        .infinity-love-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.5rem;
          background: linear-gradient(135deg, rgba(255, 111, 174, 0.15) 0%, rgba(199, 125, 255, 0.18) 100%);
          border: 1.5px solid rgba(255, 111, 174, 0.4);
          border-radius: 999px;
          box-shadow: 0 4px 18px rgba(255, 111, 174, 0.2);
          margin-bottom: 1.35rem;
          max-width: 100%;
        }

        .infinity-text {
          font-family: var(--font-serif);
          font-size: clamp(1.02rem, 3.2vw, 1.35rem);
          font-weight: 700;
          background: linear-gradient(135deg, #FF6FAE 0%, #9B5DE5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .reread-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          font-size: 0.85rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 155, 203, 0.4);
          cursor: pointer;
          transition: all 0.25s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .reread-btn:hover {
          background: #ffffff;
          color: #7A1C52;
          border-color: #FF6FAE;
          transform: translateY(-2px);
        }

        /* Mobil & iOS Safari Özel İnce Ayarları */
        @media (max-width: 520px) {
          .love-letter-wrapper {
            margin-bottom: 2rem;
            padding: 0 0.25rem;
          }
          .love-letter-card {
            padding: 2.2rem 1.2rem;
            border-radius: 20px;
          }
          .card-corner {
            font-size: 1rem;
          }
          .corner-tl { top: 0.75rem; left: 0.75rem; }
          .corner-tr { top: 0.75rem; right: 0.75rem; }
          .corner-bl { bottom: 0.75rem; left: 0.75rem; }
          .corner-br { bottom: 0.75rem; right: 0.75rem; }
          .letter-header {
            margin-bottom: 1.5rem;
          }
          .letter-title {
            font-size: 1.75rem;
          }
          .letter-body {
            gap: 1.1rem;
            margin-bottom: 1.8rem;
          }
          .letter-paragraph {
            font-size: 0.98rem;
            line-height: 1.72;
          }
          .infinity-love-badge {
            padding: 0.55rem 1.1rem;
          }
          .infinity-text {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </article>
  );
}
