import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Make the Judge Smile (u-gentle-badger-68-make-the-judge-smile-9228676d).
// One line about a small good thing today: at 7 a.m. a baker slips an
// extra warm roll into the bag and whispers that it is on the house
// because the customer looks like they could use a win — and the
// narrator admits, with a small turn to the reader, that they did.
// Revision: "need a win" became "could use a win" (warmer, less pitying)
// and the quoted pause became an em dash, so the whisper lands softer.
const ENTRY =
  "At 7 a.m. the baker slipped an extra warm roll into my bag and whispered, 'on the house \u2014 you look like you could use a win' \u2014 and, reader, I did.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate self-check (mirrors the house gate): the file must be UTF-8 text of
// 1 to 200 characters, not only white space. Refuse to write anything that
// would fail it, instead of shipping an invalid entry.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (Buffer.from(ENTRY, "utf8").toString("utf8") !== ENTRY) {
  throw new Error("entry is not valid UTF-8");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: what landed on disk must be byte-for-byte the
// entry above, so a silent write failure can never ship a wrong entry.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error(
    `read-back mismatch: wrote ${ENTRY.length} chars, read ${written.length}`,
  );
}
