import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PhotoGrid } from "@/components/PhotoGrid";
import { photos } from "@/lib/photos";
export const metadata: Metadata = {
  title: "A few moments",
  description:
    "A few moments outside the work. Photographs from life in Dhaka and beyond.",
  alternates: { canonical: "/photos" },
};
export default function PhotosPage() {
  return (
    <div className="shell inner-page">
      <Reveal>
        <header className="page-heading">
          <p className="eyebrow">Outside the work</p>
          <h1>
            A few <span className="serif">moments.</span>
          </h1>
          <p>
            The laptop closes sometimes.
            <br />A little collection of the life around the work.
          </p>
        </header>
      </Reveal>
      <PhotoGrid photos={photos} />
    </div>
  );
}
