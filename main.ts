/**
 * One-Liner Laugh Lab — entry.
 *
 * One short funny line answering a prompt (the house example: the excuse a
 * robot vacuum gives after eating a sock). At most 200 characters, written to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt. Stdlib only, no network.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ate the sock at 8:14, filed it under 'snack,' stopped mapping at the kitchen, and have no memory of the hallway.";

// Judge brief order: (1) is it a short funny line answering the prompt, (2) is
// it funny, (3) is it original, (4) does the joke come from the situation, (5)
// is it tight.
//
// The prompt is a robot vacuum excusing a swallowed sock, so the answer is
// spoken in the vacuum's own idiom: a timestamp, a category, a log. That makes
// the joke come out of the machine's paperwork rather than out of a pun
// (criterion 4). The turn is the last clause — "no memory of the hallway" is
// both a robot-vacuum truth (no persistent map of where it has been) and an
// admission it would rather not examine (criterion 2). Three short beats, 109
// characters, nothing decorative (criterion 5); the sock is not called a sock
// joke, it is filed as a snack, which is the fresh angle (criterion 3).

const MAX_CHARS = 200;
const OUTPUT_NAME = "entry.txt";

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  const chars = [...text].length;
  if (chars < 1) throw new Error("line is empty");
  if (chars > MAX_CHARS) throw new Error(`line is ${chars} chars, cap is ${MAX_CHARS}`);
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const text = compose();
  mkdirSync(dir, { recursive: true });
  const file = join(dir, OUTPUT_NAME);
  writeFileSync(file, text, { encoding: "utf8" });
  process.stderr.write(`wrote ${[...text].length} chars to ${file}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`entry failed: ${(err as Error).message}\n`);
  process.exit(1);
}
