import Link from "next/link";
import { Arrow } from "@/components/Mark";
export default function NotFound() {
  return (
    <div className="shell inner-page error-page">
      <p className="eyebrow">404 / A wrong turn</p>
      <h1>
        Nothing <span className="serif">here.</span>
      </h1>
      <p>This page doesn’t exist. There’s still plenty to explore.</p>
      <Link href="/" className="button">
        Back to the beginning <Arrow />
      </Link>
    </div>
  );
}
