"use client";

/**
 * Renders when the root layout fails. Must include html/body; global CSS may not load.
 */
export default function GlobalError({
  error,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "system-ui, sans-serif",
          background: "#030305",
          color: "#f4f4f8",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.875rem", marginTop: 12 }}>
            {process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 20,
              padding: "10px 18px",
              cursor: "pointer",
              background: "#121218",
              color: "#f4f4f8",
              border: "1px solid #27272f",
              borderRadius: 8,
              fontSize: "0.875rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
