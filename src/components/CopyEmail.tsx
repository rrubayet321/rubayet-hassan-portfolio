"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { IconCheck, IconCopy } from "@/components/icons";
export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3500);
  }
  return (
    <div className="email-controls">
      <a className="email-link" href={"mailto:" + profile.email}>
        {profile.email}
      </a>
      <button
        type="button"
        className="icon-button copy-button"
        aria-label="Copy email address"
        onClick={copy}
      >
        {status === "copied" ? <IconCheck /> : <IconCopy />}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={"copy-status " + (status === "failed" ? "copy-failed" : "")}
      >
        {status === "copied"
          ? "Copied to clipboard"
          : status === "failed"
            ? "Couldn’t copy. Select the address, or open it to email me."
            : ""}
      </span>
    </div>
  );
}
