"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Photo = { src: string; caption: string };

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      className="group relative block w-full overflow-hidden rounded-lg bg-[var(--bg-elevated)] text-left"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.06 }}
      onClick={onOpen}
      aria-label={photo.caption}
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        width={900}
        height={1200}
        className="h-auto w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Caption overlay — slides up on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12 transition-transform duration-300 ease-out group-hover:translate-y-0">
        <p className="font-mono text-[0.7rem] leading-snug text-white/90">
          {photo.caption}
        </p>
      </div>
      {/* Subtle border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 ring-1 ring-white/20 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.button>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((v) => Math.min(v + 1, photos.length - 1));
      if (e.key === "ArrowLeft") setCurrent((v) => Math.max(v - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, photos.length]);

  const photo = photos[current];

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Image */}
      <motion.div
        key={current}
        className="relative max-h-[80vh] max-w-[90vw]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.caption}
          width={1200}
          height={1600}
          className="max-h-[78vh] w-auto rounded-lg object-contain shadow-2xl"
          sizes="90vw"
          priority
        />
      </motion.div>

      {/* Caption + counter */}
      <div className="mt-4 flex w-full max-w-[600px] items-center justify-between gap-4 px-2" onClick={(e) => e.stopPropagation()}>
        <p className="font-mono text-[0.72rem] text-white/60">{photo.caption}</p>
        <span className="shrink-0 font-mono text-[0.65rem] text-white/30">
          {current + 1} / {photos.length}
        </span>
      </div>

      {/* Prev / next */}
      {current > 0 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setCurrent((v) => v - 1); }}
          className="fixed left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 font-mono text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Previous photo"
        >
          ←
        </button>
      )}
      {current < photos.length - 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setCurrent((v) => v + 1); }}
          className="fixed right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 font-mono text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Next photo"
        >
          →
        </button>
      )}

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 rounded-full bg-white/10 px-3 py-1 font-mono text-[0.7rem] text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        esc
      </button>
    </motion.div>
  );
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <div key={p.src} className="mb-3 break-inside-avoid">
            <PhotoCard
              photo={p}
              index={i}
              onOpen={() => setLightboxIndex(i)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
