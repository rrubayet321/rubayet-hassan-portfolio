"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { BulletRow } from "@/components/BulletRow";
import { Highlight } from "@/components/Highlight";
import { SocialLinksRow } from "@/components/SocialLinksRow";
import { now } from "@/lib/now";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-3 inline-flex items-center gap-1.5 font-mono text-[var(--text-small)] text-[var(--accent)] transition-opacity duration-150 hover:opacity-70"
    >
      <span>{children}</span>
      <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

function NameWithMeaning({ reduce, delay }: { reduce: boolean; delay: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative w-fit">
      <motion.h1
        className="cursor-pointer font-medium tracking-[-0.025em] text-[var(--text-primary)]"
        style={{ fontSize: "var(--text-display)" }}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay }}
        onClick={() => setOpen((v) => !v)}
      >
        Rubayet Hassan
      </motion.h1>

      <AnimatePresence>
        {open && (
          <motion.div
            key="name-popup"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-[calc(100%+10px)] z-50 w-72 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] px-5 py-4 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">rubayet</p>
                <p className="mt-0.5 font-mono text-xs text-[var(--text-muted)] opacity-60">روبایت</p>
                <p className="mt-1 text-[var(--text-small)] text-[var(--text-primary)]">
                  quatrains · four-line verses
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                  as in Omar Khayyam&apos;s Rubaiyat. poetry in four lines.
                </p>
              </div>
              <div className="border-t border-[var(--bg-border)]" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">hassan</p>
                <p className="mt-0.5 font-mono text-xs text-[var(--text-muted)] opacity-60">حسن</p>
                <p className="mt-1 text-[var(--text-small)] text-[var(--text-primary)]">
                  beautiful · good · handsome
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                  arabic origin. my parents were optimistic.
                </p>
              </div>
              <div className="border-t border-[var(--bg-border)]" />
              <p className="text-[11px] italic text-[var(--text-muted)]">
                together: &ldquo;beautiful poetry.&rdquo; make of that what you will.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const reduce = useReducedMotionSafe();
  const s = reduce ? 0 : 0.06;

  return (
    <div className="mx-auto flex max-w-content flex-col px-6 py-[60px] md:px-6">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 0 }}
      >
        <Avatar />
      </motion.div>

      <div className="mt-8">
        <NameWithMeaning reduce={reduce} delay={1 * s} />
      </div>

      <motion.p
        className="mt-3 max-w-lg text-[var(--text-small)] leading-relaxed tracking-[0.02em] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 2 * s }}
      >
        cs grad @ <Highlight variant="blue">brac</Highlight> · product engineer · AI dev · dhaka
      </motion.p>

      <motion.div
        className="mt-5"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 2.25 * s }}
      >
        <SocialLinksRow />
      </motion.div>

      <motion.p
        className="mt-4 max-w-lg text-[var(--text-body)] leading-relaxed text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 2.5 * s }}
      >
        <span className="text-[var(--text-muted)]">
          shipped 5 products. zero were assigned. looking for a team that moves fast and regrets it productively.
        </span>
      </motion.p>

      <div className="mt-10 flex flex-col gap-5">
        <BulletRow delay={3 * s}>
          <>
            <strong className="text-[var(--text-primary)]">
              Think in products, ship in code.
            </strong>{" "}
            Before the schema, there&apos;s a user. Before the function,
            there&apos;s a metric. Before the deploy, there&apos;s a{" "}
            <em>&ldquo;does this need to exist?&rdquo;</em> — most engineers
            skip that question.{" "}
            <span className="text-[var(--text-muted)]">
              I&apos;ve learned not to.
            </span>
          </>
        </BulletRow>

        <BulletRow delay={3.5 * s}>
          <>
            <strong className="text-[var(--text-primary)]">
              I ship AI products end-to-end
            </strong>
            — from competitor analytics to a faith-first companion app to
            terms you don&apos;t have to read. If it breaks in prod, I&apos;ve
            already met it.
          </>
        </BulletRow>

        <BulletRow delay={4 * s}>
          <>
            <strong className="text-[var(--text-primary)]">
              Research detour:
            </strong>{" "}
            Long waits for the right label. Spent{" "}
            <strong className="text-[var(--text-primary)]">9 months</strong> on{" "}
            <Highlight variant="blue">C‑MAT</Highlight> — pics + squiggles to one
            readout; <strong className="text-[var(--text-primary)]">~$6</strong> to
            train, works when data is messy,{" "}
            <strong className="text-[var(--text-primary)]">1,100+</strong> people
            across <strong className="text-[var(--text-primary)]">7 countries</strong>
            .
            <span className="text-[var(--text-muted)]">
              {" "}
              Second opinion for doctors — still lab, not sci-fi.
            </span>
          </>
        </BulletRow>

        <BulletRow delay={5 * s}>
          <>
            Off keyboard:{" "}
            <Highlight variant="green">strong coffee</Highlight>, training that
            hurts on purpose, and a loose goal of{" "}
            <Highlight variant="maroon">10k steps</Highlight> so my brain remembers I
            have legs. Founder mode is just endurance with better tooling.
          </>
        </BulletRow>

        <BulletRow delay={6 * s}>
          <>
            <strong className="text-[var(--text-primary)]">
              Credibility that stuck:
            </strong>{" "}
            TA&apos;d Python and biology at{" "}
            <Highlight variant="orange">Vertical Horizon</Highlight> — recursion for
            people who&apos;d never touched a semicolon. Harder than a clean
            deploy; worse logs.
          </>
        </BulletRow>

        <BulletRow delay={7 * s}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-[var(--text-small)] text-[var(--accent)] underline underline-offset-2"
          >
            thesis &amp; shipped work
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </BulletRow>
      </div>

      {/* Now strip */}
      <motion.div
        className="mt-14 border-t border-[var(--bg-border)] pt-10"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 8 * s }}
      >
        <p
          className="font-medium text-[var(--text-secondary)]"
          style={{ fontSize: "var(--text-small)" }}
        >
          now{" "}
          <span className="font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
            · {now.date}
          </span>
        </p>
        <ul className="mt-4 flex flex-col gap-1">
          {now.items.map((item, i) => (
            <li
              key={i}
              className="group flex gap-2 rounded-md px-2 py-1.5 -mx-2 text-[var(--text-small)] leading-relaxed text-[var(--text-muted)] transition-colors duration-150 hover:bg-[var(--bg-surface)] hover:text-[var(--text-secondary)]"
            >
              <span className="shrink-0 font-mono text-[var(--accent)] transition-transform duration-150 group-hover:translate-x-0.5">↳</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="mt-14 border-t border-[var(--bg-border)] pt-10"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 9 * s }}
      >
        <p
          className="font-medium text-[var(--text-secondary)]"
          style={{ fontSize: "var(--text-small)" }}
        >
          product thinking
        </p>
        <SectionLink href="/analysis">notes &amp; teardowns</SectionLink>
      </motion.div>

      <motion.div
        className="mt-14 border-t border-[var(--bg-border)] pt-10"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 10 * s }}
      >
        <p
          className="font-medium text-[var(--text-secondary)]"
          style={{ fontSize: "var(--text-small)" }}
        >
          moments worth keeping
        </p>
        <SectionLink href="/photos">life between the commits</SectionLink>
      </motion.div>
    </div>
  );
}
