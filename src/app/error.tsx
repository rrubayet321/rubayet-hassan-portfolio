"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-content flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-medium text-[var(--text-primary)]">Something went wrong</p>
      <p className="mt-2 max-w-md text-[var(--text-small)] text-[var(--text-muted)]">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Please refresh the page or try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-4 py-2 text-[var(--text-small)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
      >
        Try again
      </button>
    </div>
  );
}
