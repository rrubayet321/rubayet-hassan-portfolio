"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { BulletRow } from "@/components/BulletRow";
import { Highlight } from "@/components/Highlight";
import { SocialLinksRow } from "@/components/SocialLinksRow";
import { homePhotoStrip } from "@/lib/photos";

export default function Home() {
  const reduce = useReducedMotion();
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

      <motion.h1
        className="mt-8 font-medium tracking-[-0.025em] text-[var(--text-primary)]"
        style={{ fontSize: "var(--text-display)" }}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 1 * s }}
      >
        Rubayet Hassan
      </motion.h1>

      <motion.p
        className="mt-3 max-w-lg text-[var(--text-small)] leading-relaxed tracking-[0.02em] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut", delay: 2 * s }}
      >
        cs @ <Highlight variant="blue">brac</Highlight> · product engineering/analyst ·
        builder · dhaka
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
        <span className="text-[var(--text-secondary)]">On campus: </span>
        <span className="text-[var(--text-muted)]">
          class, labs, and the occasional deadline-fueled sprint.
        </span>
      </motion.p>

      <div className="mt-10 flex flex-col gap-5">
        <BulletRow delay={3 * s}>
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
            className="text-[var(--text-small)] text-[var(--accent)] underline underline-offset-2"
          >
            thesis &amp; shipped work →
          </Link>
        </BulletRow>
      </div>

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
          product thinking
        </p>
        <Link
          href="/analysis"
          className="mt-3 inline-block text-[var(--text-small)] text-[var(--accent)] underline-offset-4 hover:underline"
        >
          notes &amp; teardowns →
        </Link>
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
          moments worth keeping
        </p>
        <Link
          href="/photos"
          className="mt-4 block overflow-x-auto pb-2"
          aria-label="View all photos"
        >
          <div className="flex w-max gap-3">
            {homePhotoStrip.map((p) => (
              <div key={p.src} className="w-[120px] shrink-0">
                <div className="relative h-[90px] w-[120px] overflow-hidden rounded-md">
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    className="object-cover grayscale-[12%]"
                    sizes="120px"
                  />
                </div>
                <p className="mt-2 font-mono text-[var(--text-caption)] leading-snug text-[var(--text-muted)]">
                  {p.caption}
                </p>
              </div>
            ))}
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
