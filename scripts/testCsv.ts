import { readCSV } from "https://deno.land/x/csv@v0.8.0/mod.ts";

const f = await Deno.open("./data/lists/E-Sainsbury.csv");

for await (const row of readCSV(f)) {
  console.log("row:");
  for await (const cell of row) {
    console.log(`  cell: ${cell}`);
  }
}

f.close();