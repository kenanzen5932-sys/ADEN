import React, { useRef, useEffect } from "react";
import { siteConfig } from "../contentConfig";

export default function MusicPlayer() {
  const { music } = siteConfig;
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Müziği güvenle başlatma fonksiyonu (iOS & Android uyumlu)
  const startAudioSafely = () => {
    if (!audioRef.current || hasInteractedRef.current) return;
    const audio = audioRef.current;

    audio.volume = 0.75;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasInteractedRef.current = true;
        })
        .catch((error) => {
          console.log("Audio autoplay waiting for user gesture:", error);
        });
    }
  };

  useEffect(() => {
    // Kullanıcı ekranda herhangi bir yere ilk dokunduğunda veya tıkladığında müziği başlat
    const handleFirstUserInteraction = () => {
      if (!hasInteractedRef.current) {
        startAudioSafely();
      }
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={music.src}
      loop
      playsInline
      webkit-playsinline="true"
      preload="auto"
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
}
