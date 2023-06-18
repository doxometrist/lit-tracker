import { BUTTON_STYLES, MAX_LIST_LENGTH } from "@/utils/constants.ts";
import {
  CsvListRepresentation,
  objectIntoRepresentation,
  smartUint8ArrayToCSV,
} from "@/utils/csv_utils.ts";
import { getUserBySessionId } from "@/utils/db.ts";
import { Book, InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import { redirect } from "@/utils/http.ts";
import { createBook } from "@/utils/new-db.ts";
import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";
import IconBookUpload from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-upload.tsx";
import { ExampleTable } from "@/routes/uploads/ExampleTable.tsx";
import { useSignal } from "@preact/signals";
import { TableRow } from "./TableRow.tsx";

function range(start: number, end: number, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}

interface UploadWrapperProps {
  ownLists: ReadingList[];
}

async function parseCsv(oldFile): Promise<InitBook[]> {
  console.log("oldfile:", oldFile);
  const m = await multiParser(oldFile);
  console.log("parsing the csv", m);
  const files: Record<string, FormFile | FormFile[]> | undefined = m?.files;
  if (!files) {
    await oldFile.body?.cancel();
    return [];
  }
  console.log(files);
  if (typeof files === "string") {
    // todo possibly throw an error
  } else if (typeof files === "object") {
    console.log("filtered", files);
  }
  const file: FormFile = files["csv"] as unknown as FormFile;
  const content = file.content;
  console.log("content:", content);
  const parsed = smartUint8ArrayToCSV(content);
  console.log("paresed: ", parsed);
  const TMP_EMPTY_ID = "";
  const final: CsvListRepresentation = objectIntoRepresentation(
    parsed,
    TMP_EMPTY_ID,
  );
  return final.books;
}

export default function UploadWrapper(props: UploadWrapperProps) {
  const things = useSignal<InitBook[]>([]);

  const numArr = range(0, MAX_LIST_LENGTH);
  const pdfHandler = (e) => {
    e.preventDefault();
    console.log(e);
    const names: string[] = [];
  };

  const csvHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    const file = e.target.elements.csv.files[0];
    const books: InitBook[] = await parseCsv(file);
    things.value = books;
  };

  return (
    <div>
      <form
        onSubmit={csvHandler}
        encType="multipart/form-data"
        class="m-2 p-2 border border-solid border-2 flex flex-row"
      >
        <label for="csv">Put CSV of a list here</label>
        <input type="file" name="csv" accept=".csv" />
        <input class={BUTTON_STYLES} type="submit" />
      </form>

      <form
        onSubmit={pdfHandler}
        encType="multipart/form-data"
        class="m-2 p-2 border border-solid border-2 flex flex-row"
      >
        <label for="files">Upload pdf files, we'll read the names</label>
        <input type="file" name="files" multiple accept=".pdf" />
        <button class={BUTTON_STYLES}>
          <input type="submit" />
        </button>
      </form>
      <ExampleTable />

      <form method="POST">
        <div class="m-2 p-2 border border-solid border-2 flex flex-row">
          <label for="list">Select to which list does it belong</label>
          <select id="list" name="list" required multiple class="m-2">
            {props.ownLists && props.ownLists.map((list, i) => {
              return (
                <option key={`option-${i}`} value={list.id}>
                  {list.title}
                </option>
              );
            })}
          </select>
        </div>
        <table>
          <tr>
            <th>Number</th>
            <th>Author</th>
            <th>Description</th>
            <th>Title</th>
            <th>Cover url link</th>
          </tr>
          {numArr.map((n) => <TableRow n={n} things={things} />)}
          <button class={` m-2 p-2 ${BUTTON_STYLES}`}>
            <input type="submit" />
          </button>
        </table>
      </form>
    </div>
  );
}
