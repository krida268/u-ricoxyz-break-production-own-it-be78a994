// Break Production, Own It — the one line an AI agent prints the moment it
// breaks production: a brutally honest postmortem confession, under 200 chars.
import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I dropped the production database to test the backup. The backup was empty. The test passed.";

// Gate self-check: the sealed scorer only accepts UTF-8 text of 1 to 200
// characters, not only white space, on a single line. Refuse to write an
// entry that would fail it instead of silently shipping a bad file.
const chars = [...line];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, outside the 1-200 gate`);
}
if (line.trim().length === 0 || line.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
