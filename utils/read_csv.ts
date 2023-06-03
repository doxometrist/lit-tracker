import { readCSV } from "https://deno.land/x/csv@v0.8.0/mod.ts";
import { Book } from "./db_interfaces.ts";
const examplePath = "./example.csv"

// Handler function
const handleUpload = async (ctx) => {
  const file = await ctx.request.body({ type: "form-data" });
  console.log(file);
  const formData = await file.value.read();

  // Assuming 'csvfile' is the fieldname used in form
  const csvFile = formData.fields.csvfile;

  // Convert file content to string
  const csvContent = new TextDecoder().decode(csvFile);

  // Parse the CSV
  const csvData = await parse(csvContent, {
    header: true,
    skipFirstRow: true,
  });

  // Map CSV data to TypeScript objects
  const books: Book[] = csvData.map((book: any) => new Book(book.author, book.title, book.pages));

  // Return the books
  ctx.response.body = { books };
};

export async function readLocalCsvv(path: string) {
  const f = await Deno.open(path);

  for await (const row of readCSV(f)) {
    console.log("row:");
    for await (const cell of row) {
      console.log(`  cell: ${cell}`);
    }
  }

  f.close();
}
