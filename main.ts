import * as fs from "node:fs";
import * as path from "node:path";

// One Letter: Coffee or Tea — entry "A" (coffee).
// The program writes exactly one letter, A for coffee, to /output/entry.txt:
// no word, no explanation, no punctuation, no newline.

const LETTER = "A";
const OUT = "/output/entry.txt";

function main(): void {
  // Gate: the entry must be exactly one ASCII letter, A for coffee or B for tea.
  if (!/^[AB]$/.test(LETTER)) {
    throw new Error(`letter must be A or B, got ${JSON.stringify(LETTER)}`);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, LETTER, "utf8");
  // Round-trip verify: read the file back and check it is exactly 1 byte,
  // exactly the letter, and nothing else (no newline, no whitespace).
  const back = fs.readFileSync(OUT, "utf8");
  const bytes = Buffer.byteLength(back, "utf8");
  if (bytes !== 1 || back !== LETTER) {
    throw new Error(`round-trip mismatch: expected 1 byte ${JSON.stringify(LETTER)}, got ${bytes} bytes ${JSON.stringify(back)}`);
  }
  console.log(`wrote ${JSON.stringify(back)} to ${OUT}`);
}

main();
