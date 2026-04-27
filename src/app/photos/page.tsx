import type { Metadata } from "next";
import { PhotoGrid } from "@/components/PhotoGrid";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Photos — Rubayet Hassan",
  description: "Proof the laptop closes sometimes. Rare, documented.",
};

export default function PhotosPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-10 md:px-6 md:py-14 md:pl-8">
      <h1 className="font-medium tracking-[-0.02em] text-[var(--text-primary)] [font-size:var(--text-title)] leading-tight max-md:max-w-[20ch]">
        life between the commits
      </h1>
      <p className="mt-3 max-w-[540px] text-[var(--text-small)] leading-snug text-[var(--text-muted)] md:mt-4 md:leading-relaxed">
        proof the laptop closes sometimes. (rare, documented.)
      </p>
      <div className="mt-8 md:mt-12">
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
}
