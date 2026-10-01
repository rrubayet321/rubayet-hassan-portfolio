"use client";
import Link from "next/link";
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0D0F10",
          color: "#F2EEE7",
          display: "grid",
          placeItems: "center",
          padding: 24,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: 520 }}>
          <p style={{ color: "#DCA77C" }}>Something went wrong</p>
          <h1>A small interruption.</h1>
          <p>Please try again, or return to the homepage.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "12px 20px",
              borderRadius: 4,
              border: 0,
              background: "#DCA77C",
              color: "#0D0F10",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link href="/" style={{ color: "#F2EEE7", marginLeft: 24 }}>
            Go home
          </Link>
        </main>
      </body>
    </html>
  );
}
