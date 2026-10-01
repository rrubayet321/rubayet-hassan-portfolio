"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[portfolio]", error);
  }, [error]);
  return (
    <div className="shell inner-page error-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>
        A small <span className="serif">interruption.</span>
      </h1>
      <p>Please try again. You can also return to the homepage.</p>
      <div className="resume-actions">
        <button type="button" className="button" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="button button-secondary">
          Go home
        </Link>
      </div>
    </div>
  );
}
