import React, { useState, useRef } from "react";
import BackgroundEffects from "./components/BackgroundEffects";
import Hero from "./components/Hero";
import PhotoGallery from "./components/PhotoGallery";
import MiddleMessage from "./components/MiddleMessage";
import LoveLetterEnvelope from "./components/LoveLetterEnvelope";
import LoveLetter from "./components/LoveLetter";
import FlowerAnimation from "./components/FlowerAnimation";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";

export default function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const letterSectionRef = useRef(null);

  const handleOpenLetter = () => {
    setShowFlowers(true);
    setIsLetterOpen(true);

    // Mektup açıldığında mobilde yumuşakça mektuba odaklan
    setTimeout(() => {
      if (letterSectionRef.current) {
        letterSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 200);
  };

  const handleResetLetter = () => {
    setIsLetterOpen(false);
    setShowFlowers(false);
  };

  return (
    <div className="main-wrapper">
      {/* 1. Arka Plan Işık & Parıltı Efektleri */}
      <BackgroundEffects />

      {/* Müzik Çalar (Sabit sağ üst) */}
      <MusicPlayer />

      {/* Çiçek Yaprakları Animasyonu (Mektup açıldığında) */}
      {showFlowers && (
        <FlowerAnimation onComplete={() => setShowFlowers(false)} />
      )}

      {/* Ana Sayfa Akışı */}
      <main className="app-container">
        {/* 2. Hero / Başlık Bölümü */}
        <Hero />

        {/* 3. 3'lü Fotoğraf Galerisi & Lightbox */}
        <PhotoGallery />

        {/* 4. Fotoğrafların Altındaki Romantik Mesaj */}
        <MiddleMessage />

        {/* 5. Aşk Mektubu / Zarf Bölümü */}
        <div ref={letterSectionRef} className="letter-interactive-anchor" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {!isLetterOpen ? (
            <LoveLetterEnvelope onOpenLetter={handleOpenLetter} />
          ) : (
            <LoveLetter onReset={handleResetLetter} />
          )}
        </div>

        {/* 6. Footer */}
        <Footer />
      </main>

      <style>{`
        .main-wrapper {
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
          overflow-x: hidden;
          width: 100%;
        }

        .letter-interactive-anchor {
          width: 100%;
          scroll-margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}
