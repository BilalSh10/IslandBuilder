"use client";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ started }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (started && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((e) => {
            console.warn("Autoplay failed:", e);
          });
      }
    }
  }, [started]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <div className="absolute top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="./music/Zambolino - Surfing (freetouse.com).mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className="p-3 rounded-full bg-black/60 backdrop-blur hover:bg-black/80 transition text-white cursor-pointer"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <MdOutlineMusicNote className="w-5 h-5" />
        ) : (
          <MdOutlineMusicOff className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
