"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profileImageSrc } from "@/lib/profile";

export function Avatar() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex flex-col items-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative h-20 w-20 overflow-hidden rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] transition-[border-color] duration-[180ms] ease-out hover:border-[var(--accent)] sm:h-24 sm:w-24 md:h-28 md:w-28"
        aria-hidden
      >
        <Image
          src={profileImageSrc}
          alt="Rubayet Hassan"
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
          priority
        />
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-10 max-w-[280px] whitespace-nowrap font-mono text-[0.6rem] text-[var(--text-muted)]"
          >
            23.8103° N, 90.4125° E · dhaka, bangladesh
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
