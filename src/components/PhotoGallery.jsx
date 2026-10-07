import React, { useState, useRef } from "react";
import { siteConfig } from "../contentConfig";
import PhotoModal from "./PhotoModal";
import { ZoomIn } from "lucide-react";

export default function PhotoGallery() {
  const { photos } = siteConfig;
  const [modalOpen, setModalOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const scrollRef = useRef(null);

  const handlePhotoClick = (index) => {
    setActivePhotoIndex(index);
    setModalOpen(true);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.8));
    setCurrentMobileIndex(Math.min(photos.length - 1, Math.max(0, newIndex)));
  };

  const scrollToPhoto = (index) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.getElementsByClassName("photo-card");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    setCurrentMobileIndex(index);
  };

  return (
    <section className="photo-gallery-section" aria-label="Fotoğraf Galerisi">
      {/* Kartlar Konteyneri */}
      <div
        className="photos-container"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => handlePhotoClick(index)}
            tabIndex={0}
            role="button"
            aria-label={`${photo.alt} - Büyütmek için tıkla`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePhotoClick(index);
              }
            }}
          >
            <div className="photo-image-wrapper">
              <img
                src={photo.src}
                alt={photo.alt}
                className="gallery-image"
                loading="lazy"
              />
              <div className="photo-card-overlay">
                <span className="zoom-badge">
                  <ZoomIn size={16} />
                  <span>Büyüt</span>
                </span>
              </div>
            </div>

            {photo.caption && (
              <div className="photo-card-footer">
                <p className="photo-caption-text">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobilde Dot İndikatörleri */}
      <div className="mobile-dots" aria-hidden="true">
        {photos.map((_, idx) => (
          <button
            key={idx}
            className={`dot-indicator ${idx === currentMobileIndex ? "active" : ""}`}
            onClick={() => scrollToPhoto(idx)}
            aria-label={`Fotoğraf ${idx + 1}`}
          />
        ))}
      </div>

      {/* Modal / Lightbox */}
      {modalOpen && (
        <PhotoModal
          photos={photos}
          activeIndex={activePhotoIndex}
          onClose={() => setModalOpen(false)}
          onIndexChange={setActivePhotoIndex}
        />
      )}

      <style>{`
        .photo-gallery-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        .photos-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
          max-width: 1100px;
        }

        .photo-card {
          position: relative;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 22px;
          padding: 8px;
          border: 1.5px solid rgba(255, 155, 203, 0.45);
          box-shadow: var(--shadow-card);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          display: flex;
          flex-direction: column;
          outline: none;
          -webkit-touch-callout: none;
        }

        .photo-card:hover,
        .photo-card:focus-visible {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-hover);
          border-color: rgba(255, 111, 174, 0.85);
        }

        .photo-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, #FDE7F3, #F0E1FF);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .photo-card:hover .gallery-image {
          transform: scale(1.08);
        }

        .photo-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(122, 28, 82, 0.45) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-card:hover .photo-card-overlay {
          opacity: 1;
        }

        .zoom-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.95);
          color: #7A1C52;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          transform: translateY(6px);
          transition: transform 0.3s ease;
        }

        .photo-card:hover .zoom-badge {
          transform: translateY(0);
        }

        .photo-card-footer {
          padding: 0.65rem 0.4rem 0.25rem 0.4rem;
          text-align: center;
        }

        .photo-caption-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-serif);
          font-style: italic;
          line-height: 1.35;
        }

        .mobile-dots {
          display: none;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 111, 174, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .dot-indicator.active {
          width: 22px;
          background: linear-gradient(90deg, #FF6FAE, #9B5DE5);
          box-shadow: 0 0 10px rgba(255, 111, 174, 0.5);
        }

        /* Tablet Responsive */
        @media (max-width: 992px) and (min-width: 769px) {
          .photos-container {
            grid-template-columns: repeat(2, 1fr);
            max-width: 700px;
          }
        }

        /* Mobil & iOS Carousel Ayarları */
        @media (max-width: 768px) {
          .photo-gallery-section {
            margin-bottom: 2.75rem;
          }

          .photos-container {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            gap: 1rem;
            padding: 0.5rem 0.5rem 1rem 0.5rem;
            width: 100vw;
            max-width: 100vw;
            box-sizing: border-box;
            scrollbar-width: none;
          }

          .photos-container::-webkit-scrollbar {
            display: none;
          }

          .photo-card {
            flex: 0 0 76%;
            max-width: 300px;
            scroll-snap-align: center;
            border-radius: 20px;
          }

          .photo-image-wrapper {
            aspect-ratio: 3 / 4;
            border-radius: 16px;
          }

          .mobile-dots {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .photo-card {
            flex: 0 0 82%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
}
