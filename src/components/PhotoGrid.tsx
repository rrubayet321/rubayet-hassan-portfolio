import Image from "next/image";

export function PhotoGrid({
  photos,
}: {
  photos: { src: string; caption: string }[];
}) {
  return (
    <div className="columns-1 gap-[10px] sm:columns-2 lg:columns-3">
      {photos.map((p) => (
        <figure key={p.src} className="mb-[10px] break-inside-avoid overflow-hidden rounded-md">
          <div className="overflow-hidden rounded-md">
            <Image
              src={p.src}
              alt=""
              width={800}
              height={600}
              className="h-auto w-full scale-100 object-cover grayscale-[12%] transition-[filter,transform] duration-[280ms] ease-out hover:scale-[1.02] hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-[6px] font-mono text-[var(--text-caption)] leading-snug text-[var(--text-muted)]">
            {p.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
