import React from "react";
import { siteConfig } from "../contentConfig";

export default function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="footer-section" aria-label="Sayfa Sonu">
      <div className="footer-container">
        <p className="footer-title">{footer.title}</p>
        <span className="footer-infinity">{footer.symbol}</span>
      </div>

      <style>{`
        .footer-section {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 2rem 0 1.5rem 0;
          margin-top: auto;
          position: relative;
          z-index: 2;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .footer-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: #7A1C52;
          letter-spacing: 0.5px;
          opacity: 0.9;
        }

        .footer-infinity {
          font-size: 1.6rem;
          line-height: 1;
          color: var(--primary-pink);
          animation: pulseHeart 3s infinite ease-in-out;
        }

        @media (max-width: 480px) {
          .footer-section {
            padding: 1.5rem 0 1rem 0;
          }
          .footer-title {
            font-size: 1.05rem;
          }
          .footer-infinity {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </footer>
  );
}
