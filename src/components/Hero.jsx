import React from "react";
import { siteConfig } from "../contentConfig";

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <header className="hero-section">
      <div className="hero-badge">
        <span className="hero-badge-heart">💖</span>
        <span className="hero-badge-text">{hero.badge}</span>
      </div>

      <h1 className="hero-title">
        {hero.title}
      </h1>

      <div className="hero-divider">
        <span className="divider-line" />
        <span className="divider-heart">✦</span>
        <span className="divider-line" />
      </div>

      <style>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 2.25rem;
          width: 100%;
          animation: letterSlideDown 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1.15rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 111, 174, 0.35);
          border-radius: 999px;
          box-shadow: 0 4px 18px rgba(255, 111, 174, 0.2);
          margin-bottom: 1.1rem;
          transition: transform 0.3s ease;
        }

        .hero-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 111, 174, 0.3);
        }

        .hero-badge-heart {
          font-size: 1.1rem;
          animation: pulseHeart 2s infinite ease-in-out;
        }

        .hero-badge-text {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #9B5DE5;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 5.5vw, 3.4rem);
          font-weight: 700;
          line-height: 1.25;
          max-width: 700px;
          background: linear-gradient(135deg, #7A1C52 0%, #B83280 40%, #7B2CBF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 16px rgba(255, 111, 174, 0.15);
          margin-bottom: 0.85rem;
          padding: 0 0.5rem;
        }

        .hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          max-width: 260px;
          margin-top: 0.25rem;
        }

        .divider-line {
          height: 1.5px;
          flex: 1;
          background: linear-gradient(90deg, transparent, rgba(199, 125, 255, 0.5), transparent);
        }

        .divider-heart {
          color: var(--primary-pink);
          font-size: 0.85rem;
          animation: pulseHeart 2.5s infinite ease-in-out;
        }

        @media (max-width: 480px) {
          .hero-section {
            margin-bottom: 1.8rem;
          }
          .hero-title {
            font-size: 2.15rem;
          }
          .hero-badge-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}
