"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio: ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${email}`);
    window.location.href = `mailto:rrubayet321@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-md space-y-4">
      <input
        name="name"
        placeholder="your name"
        className="w-full rounded border border-[var(--bg-border)] bg-[var(--bg-surface)] px-[14px] py-2.5 font-mono text-[var(--text-small)] text-[var(--text-secondary)] outline-none transition-[border-color] duration-150 focus:border-[var(--accent)]"
      />
      <input
        name="email"
        type="email"
        placeholder="your email"
        className="w-full rounded border border-[var(--bg-border)] bg-[var(--bg-surface)] px-[14px] py-2.5 font-mono text-[var(--text-small)] text-[var(--text-secondary)] outline-none transition-[border-color] duration-150 focus:border-[var(--accent)]"
      />
      <textarea
        name="message"
        placeholder="what's on your mind"
        rows={5}
        className="w-full resize-y rounded border border-[var(--bg-border)] bg-[var(--bg-surface)] px-[14px] py-2.5 font-mono text-[var(--text-small)] text-[var(--text-secondary)] outline-none transition-[border-color] duration-150 focus:border-[var(--accent)]"
      />
      <button
        type="submit"
        className="rounded border border-[var(--bg-border)] px-[14px] py-2 font-mono text-[var(--text-small)] text-[var(--text-secondary)] transition-[border-color,color] duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        send it →
      </button>
      {sent && (
        <p className="font-mono text-[var(--text-small)] text-[var(--accent)]">
          sent. i&apos;ll get back to you.
        </p>
      )}
    </form>
  );
}
