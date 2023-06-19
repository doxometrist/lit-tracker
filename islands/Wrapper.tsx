import TableRow from "@/islands/TableRow.tsx";
import { ExampleTable } from "@/routes/uploads/ExampleTable.tsx";
import { BUTTON_STYLES, MAX_LIST_LENGTH } from "@/utils/constants.ts";
import {
  CsvListRepresentation,
  objectIntoRepresentation,
  smartUint8ArrayToCSV,
} from "@/utils/csv_utils.ts";
import { InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import { useSignal } from "@preact/signals";
import { range } from "../utils/range.ts";

interface UploadWrapperProps {
  ownLists: ReadingList[];
}

async function parseCsv(file: File): Promise<InitBook[]> {
  console.log("oldfile:", file);
  const buffer = await file.arrayBuffer();
  console.log("content:", buffer);
  const view = new Uint8Array(buffer);
  const parsed = smartUint8ArrayToCSV(view);
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

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(e);
          if (!e.target) return;
          const file = e.target.elements.csv.files[0];
          const books: InitBook[] = await parseCsv(file);
          things.value = books;
        }}
        encType="multipart/form-data"
        class="m-2 p-2 border border-solid border-2 flex flex-row"
      >
        <label for="csv">Put CSV of a list here</label>
        <input type="file" name="csv" accept=".csv" />
        <input class={BUTTON_STYLES} type="submit" />
      </form>
      <ExampleTable />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          if (!e.target) return;
          const files: FileList = e.target.elements.pdfs.files;
          const names = [];
          // Loop through each file and push the name into the names array
          const EXTENSION_LENGTH = 4;
          for (let i = 0; i < files.length; i++) {
            const name = files[i].name;
            names.push(name.substring(0, name.length - EXTENSION_LENGTH));
          }
          console.log(names);
          const books: InitBook[] = names.map((n) => {
            const b: InitBook = {
              title: n,
              pages: 0,
              author: "",
              description: "",
              coverUrl: "",
              uploaderId: "",
            };
            return b;
          });
          things.value = books;
        }}
        encType="multipart/form-data"
        class="m-2 p-2 border border-solid border-2 flex flex-row"
      >
        <label for="pdfs">Upload pdf files, we'll read the names</label>
        <input type="file" name="pdfs" multiple accept=".pdf" />
        <button class={BUTTON_STYLES}>
          <input type="submit" />
        </button>
      </form>

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
        <table class="overflow-scroll">
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
