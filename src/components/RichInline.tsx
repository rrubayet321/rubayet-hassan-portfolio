import type { ReactNode } from "react";
import { Highlight, type HighlightVariant } from "@/components/Highlight";

const HIGHLIGHT_NAMES: HighlightVariant[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "purple",
  "blue",
  "green",
  "maroon",
  "orange",
];

const HI_OPEN = new RegExp(
  `^\\{\\{(${HIGHLIGHT_NAMES.join("|")})\\}\\}`,
);

/**
 * Inline rich text for project copy:
 * - `**phrase**` → semibold (inherits color from parent)
 * - `{{purple}}phrase{{/}}` (or a, b, blue, green, maroon, orange, c, d, e) → Highlight
 * Nesting: bold inside highlight and vice versa is supported one level via recursive parse.
 */
export function RichInline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const nodes = parseParts(text);
  if (nodes.length === 0) return null;
  const body = nodes.length === 1 ? nodes[0] : <>{nodes}</>;
  if (className) {
    return <span className={className}>{body}</span>;
  }
  return <>{body}</>;
}

function parseParts(s: string): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;

  while (i < s.length) {
    const boldAt = s.indexOf("**", i);
    const hiAt = s.indexOf("{{", i);
    const next = minIndex(boldAt, hiAt);

    if (next === null) {
      if (i < s.length) out.push(s.slice(i));
      break;
    }

    if (next > i) {
      out.push(s.slice(i, next));
    }

    if (next === boldAt) {
      const end = s.indexOf("**", next + 2);
      if (end < 0) {
        out.push(s.slice(next));
        break;
      }
      const inner = s.slice(next + 2, end);
      out.push(
        <strong
          key={`b-${next}-${end}`}
          className="font-semibold text-[var(--text-primary)]"
        >
          <>{parseParts(inner)}</>
        </strong>,
      );
      i = end + 2;
      continue;
    }

    const rest = s.slice(next);
    const openM = rest.match(HI_OPEN);
    if (!openM) {
      out.push(s.slice(next, next + 2));
      i = next + 2;
      continue;
    }

    const variant = openM[1] as HighlightVariant;
    const afterOpen = next + openM[0].length;
    const close = s.indexOf("{{/}}", afterOpen);
    if (close < 0) {
      out.push(s.slice(next));
      break;
    }

    const inner = s.slice(afterOpen, close);
    out.push(
      <Highlight key={`h-${next}-${close}`} variant={variant}>
        <>{parseParts(inner)}</>
      </Highlight>,
    );
    i = close + 5;
  }

  return out;
}

function minIndex(a: number, b: number): number | null {
  const valid = [a, b].filter((n) => n >= 0);
  if (valid.length === 0) return null;
  return Math.min(...valid);
}
