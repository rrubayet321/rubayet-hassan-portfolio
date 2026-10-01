"use client";
import { useState } from "react";
export function CopyResumeLink({ url }: { url: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch {
      setStatus("Couldn’t copy. You can share this page’s address directly.");
    }
  }
  return (
    <div className="resume-copy">
      <button type="button" className="button button-secondary" onClick={copy}>
        Copy page link
      </button>
      <span role="status" className="caption">
        {status}
      </span>
    </div>
  );
}
