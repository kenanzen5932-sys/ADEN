import React from "react";
import { siteConfig } from "../contentConfig";

export default function MiddleMessage() {
  const { middleMessage } = siteConfig;

  return (
    <section className="middle-message-section" aria-label="Romantik Mesaj">
      <div className="message-container">
        <div className="sparkle-icon-wrapper" aria-hidden="true">
          <span>🌸</span>
        </div>

        <h2 className="middle-title">
          {middleMessage.title}
        </h2>

        <p className="middle-desc">
          {middleMessage.description}
        </p>

        <div className="ornament-divider">
          <span className="ornament-line" />
          <span className="ornament-heart">💕</span>
          <span className="ornament-line" />
        </div>
      </div>

      <style>{`
        .middle-message-section {
          width: 100%;
          max-width: 750px;
          margin-bottom: 4rem;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .message-container {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(255, 155, 203, 0.35);
          border-radius: 28px;
          padding: 2.5rem 2rem;
          box-shadow: var(--shadow-card);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .sparkle-icon-wrapper {
          font-size: 2rem;
          margin-bottom: 0.75rem;
          animation: floatGentle 4s ease-in-out infinite;
        }

        .middle-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4.5vw, 2.85rem);
          font-weight: 700;
          color: #6B1746;
          margin-bottom: 0.85rem;
          line-height: 1.25;
        }

        .middle-desc {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: var(--text-muted);
          max-width: 580px;
          line-height: 1.65;
          font-weight: 400;
          margin-bottom: 1.25rem;
        }

        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          max-width: 200px;
        }

        .ornament-line {
          height: 1.5px;
          flex: 1;
          background: linear-gradient(90deg, transparent, rgba(255, 111, 174, 0.4), transparent);
        }

        .ornament-heart {
          font-size: 1rem;
          animation: pulseHeart 2s infinite ease-in-out;
        }

        @media (max-width: 480px) {
          .middle-message-section {
            margin-bottom: 3rem;
          }
          .message-container {
            padding: 2rem 1.25rem;
            border-radius: 22px;
          }
          .middle-title {
            font-size: 1.95rem;
          }
          .middle-desc {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </section>
  );
}
