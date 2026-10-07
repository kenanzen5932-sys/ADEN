import React, { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function PhotoModal({ photos, activeIndex, onClose, onIndexChange }) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const modalRef = useRef(null);

  const minSwipeDistance = 45;

  const activePhoto = photos[activeIndex];

  // Klavye Kontrolleri
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Sayfa kaydırmasını kilitle
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePrev = (e) => {
    e?.stopPropagation();
    onIndexChange((activeIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    onIndexChange((activeIndex + 1) % photos.length);
  };

  // Dokunmatik Swipe Kontrolleri (Mobil)
  const onTouchStartHandle = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandle = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandle = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div
      className="photo-modal-overlay"
      onClick={onClose}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Fotoğraf Detayı"
    >
      {/* Üst Bar (Kapat & Sayaç) */}
      <div className="photo-modal-header" onClick={(e) => e.stopPropagation()}>
        <span className="photo-counter">
          {activeIndex + 1} / {photos.length}
        </span>
        <button
          className="modal-icon-btn close-btn"
          onClick={onClose}
          aria-label="Kapat"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigasyon Okları (Desktop/Tablet) */}
      <button
        className="modal-nav-btn prev-btn"
        onClick={handlePrev}
        aria-label="Önceki Fotoğraf"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        className="modal-nav-btn next-btn"
        onClick={handleNext}
        aria-label="Sonraki Fotoğraf"
      >
        <ChevronRight size={28} />
      </button>

      {/* Ana Görsel Kutusu */}
      <div
        className="photo-modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStartHandle}
        onTouchMove={onTouchMoveHandle}
        onTouchEnd={onTouchEndHandle}
      >
        <div className="modal-img-container">
          <img
            key={activePhoto.src}
            src={activePhoto.src}
            alt={activePhoto.alt}
            className="modal-image"
          />
          <button
            className={`heart-like-badge ${isLiked ? "liked" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Beğen"
          >
            <Heart size={20} fill={isLiked ? "#FF6FAE" : "none"} />
          </button>
        </div>

        {activePhoto.caption && (
          <div className="modal-caption-bar">
            <p className="modal-caption">{activePhoto.caption}</p>
          </div>
        )}
      </div>

      <style>{`
        .photo-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(22, 10, 28, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          touch-action: pan-y;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .photo-modal-header {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          right: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10002;
          pointer-events: auto;
        }

        .photo-counter {
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.95rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-icon-btn {
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .modal-icon-btn:hover {
          background: rgba(255, 111, 174, 0.6);
          transform: scale(1.08);
        }

        .modal-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10001;
          transition: all 0.25s ease;
          backdrop-filter: blur(10px);
        }

        .modal-nav-btn:hover {
          background: rgba(255, 111, 174, 0.7);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 25px rgba(255, 111, 174, 0.6);
        }

        .prev-btn {
          left: 1.5rem;
        }

        .next-btn {
          right: 1.5rem;
        }

        .photo-modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: modalImgPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalImgPop {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-img-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 111, 174, 0.35);
          border: 2px solid rgba(255, 155, 203, 0.4);
          max-height: 75vh;
          display: flex;
        }

        .modal-image {
          width: auto;
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        .heart-like-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF6FAE;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .heart-like-badge:hover,
        .heart-like-badge.liked {
          transform: scale(1.15);
        }

        .heart-like-badge.liked {
          background: #ffffff;
          box-shadow: 0 0 20px rgba(255, 111, 174, 0.8);
        }

        .modal-caption-bar {
          margin-top: 1rem;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          padding: 0.5rem 1.25rem;
          max-width: 90%;
        }

        .modal-caption {
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 400;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .modal-nav-btn {
            display: none;
          }
          .photo-modal-content {
            max-width: 96vw;
            max-height: 80vh;
          }
          .modal-image {
            max-height: 68vh;
            border-radius: 16px;
          }
          .modal-caption {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
