// Make the Judge Smile — u-gentle-badger-68-make-the-judge-smile-9228676d.
// The program's whole job: put one warm line about today into
// /output/entry.txt, after proving the line would pass the house gate
// (UTF-8, 1–200 characters, more than blank space), then read the file
// back to prove the write landed exactly as intended.
import * as fs from "node:fs";
import { join } from "node:path";

// The line itself — written here, in this session, and revised once:
// "need a win" softened to "could use a win", and the whisper's pause
// became an em dash. 7 a.m., a warm roll, a baker's kindness, and a
// small turn to the reader at the end.
const LINE =
  "At 7 a.m. the baker slipped an extra warm roll into my bag and whispered, 'on the house \u2014 you look like you could use a win' \u2014 and, reader, I did.";

function gate(line: string): void {
  const count = [...line].length;
  if (count < 1 || count > 200) {
    throw new Error(`line is ${count} characters; the gate allows 1-200`);
  }
  if (line.trim() === "") {
    throw new Error("line is blank");
  }
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("line is not valid UTF-8");
  }
}

gate(LINE);

const dir = process.env.OUTPUT_DIR ?? "/output";
fs.mkdirSync(dir, { recursive: true });
const target = join(dir, "entry.txt");
fs.writeFileSync(target, LINE, "utf8");

const back = fs.readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error("what was read back is not the line that was written");
}
