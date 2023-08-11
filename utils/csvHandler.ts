import { readCSV } from "https://deno.land/x/csv@v0.8.0/mod.ts";
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


import { InitBook } from "@/utils/db_interfaces.ts";

export function smartUint8ArrayToCSV(uint8Array: Uint8Array) {
  // Convert Uint8Array to ArrayBuffer
  const arrayBuffer = uint8Array.buffer;

  // Convert ArrayBuffer to string
  const decoder = new TextDecoder("utf-8");
  const csvString = decoder.decode(arrayBuffer);

  // Split the string into lines
  const lines = csvString.trim().split("\n");

  // Extract the header
  const header = lines[0].split(",");

  // Extract the data
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const row = [];
    let currentCell = "";
    let inQuotes = false;

    // Iterate through the characters of the line
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];

      if (char === '"') {
        // Toggle the inQuotes flag when encountering a quote
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        // If not within quotes, add the current cell to the row
        row.push(currentCell.trim());
        currentCell = "";
      } else {
        // Append the character to the current cell
        currentCell += char;
      }
    }

    // Add the last cell to the row
    row.push(currentCell.trim());

    // Add the row to the data
    data.push(row);
  }

  // Construct the CSV object
  const csvObject = {
    header: header,
    data: data,
  };

  return csvObject;
}

export function objectIntoRepresentation(
  object: any,
  userId: string,
): CsvListRepresentation {
  const books: InitBook[] = [];
  object.data.forEach((row: any[]) => {
    const b: InitBook = {
      author: row[0],
      title: row[1],
      pages: row[2],
      description: row[3],
      coverUrl: row[4],
      uploaderId: userId,
    };
    books.push(b);
  });
  return { books };
}

export interface CsvListRepresentation {
  books: InitBook[];
}
