"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { Photo } from "@/lib/photos";
function PhotoImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  return failedSource === src ? (
    <div
      className="photo-fallback"
      role="img"
      aria-label={alt + ". Photo unavailable."}
    >
      <span>Photo unavailable</span>
      <small>{alt}</small>
    </div>
  ) : (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSource(src)}
    />
  );
}
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const unlockScroll = useCallback(() => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }, []);
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return unlockScroll;
  }, [open, unlockScroll]);
  if (!photos.length) return <p className="muted">More moments to come.</p>;
  const photo = photos[current];
  function close() {
    dialogRef.current?.close();
  }
  return (
    <>
      <div className="photo-grid">
        {photos.map((item, index) => (
          <Reveal key={item.src} delay={(index % 3) * 0.07}>
            <figure className="photo-card">
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={"Enlarge photo: " + item.caption}
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                  )
                    return;
                  // The underlying image link is also a working no-JavaScript fallback.
                  if (!dialogRef.current?.showModal) return;
                  event.preventDefault();
                  openerRef.current = event.currentTarget;
                  setCurrent(index);
                  setOpen(true);
                }}
              >
                <div className="photo-thumb">
                  <PhotoImage
                    src={item.src}
                    alt={item.caption}
                    sizes="(max-width: 479px) calc(100vw - 40px), (max-width: 767px) calc((100vw - 58px) / 2), (max-width: 1023px) calc((100vw - 88px) / 2), 331px"
                    priority={index === 0}
                  />
                </div>
              </a>
              <figcaption>
                <span className="photo-index" aria-hidden="true">
                  0{index + 1}
                </span>
                {item.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="photo-dialog"
        aria-labelledby="photo-viewer-title"
        onClose={() => {
          unlockScroll();
          setOpen(false);
          openerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const controls = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>(
                'button:not([disabled]), a[href], [tabindex="0"]',
              ),
            );
            event.preventDefault();
            const index = controls.indexOf(
              document.activeElement as HTMLElement,
            );
            const nextIndex =
              index < 0
                ? event.shiftKey
                  ? controls.length - 1
                  : 0
                : (index + (event.shiftKey ? -1 : 1) + controls.length) %
                  controls.length;
            controls[nextIndex]?.focus();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setCurrent((value) => Math.min(value + 1, photos.length - 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setCurrent((value) => Math.max(value - 1, 0));
          }
        }}
      >
        <div className="photo-viewer">
          <div className="viewer-toolbar">
            <h2 id="photo-viewer-title" className="eyebrow">
              A few moments
            </h2>
            <button
              type="button"
              className="icon-button"
              onClick={close}
              aria-label="Close photo"
              autoFocus
            >
              ✕
            </button>
          </div>
          <div className="viewer-image">
            <PhotoImage
              src={photo.src}
              alt={photo.caption}
              sizes="(max-width: 768px) 90vw, 800px"
            />
          </div>
          <div className="viewer-bottom">
            <p aria-live="polite">{photo.caption}</p>
            <div className="viewer-navigation">
              <button
                type="button"
                className="icon-button"
                disabled={current === 0}
                onClick={() => setCurrent((value) => value - 1)}
                aria-label="Previous photo"
              >
                ←
              </button>
              <span className="caption" aria-live="polite">
                {current + 1} / {photos.length}
              </span>
              <button
                type="button"
                className="icon-button"
                disabled={current === photos.length - 1}
                onClick={() => setCurrent((value) => value + 1)}
                aria-label="Next photo"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
