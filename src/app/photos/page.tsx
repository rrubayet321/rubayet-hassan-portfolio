import { PhotoGrid } from "@/components/PhotoGrid";
import { photos } from "@/lib/photos";

export default function PhotosPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        life between the commits
      </h1>
      <p className="mt-4 max-w-[540px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
        proof the laptop closes sometimes. (rare, documented.)
      </p>
      <div className="mt-12">
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
}
