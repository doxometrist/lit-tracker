import type { PageProps } from "$fresh/server.ts";
import IconBookUpload from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book-upload.tsx";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import {
  CsvListRepresentation,
  objectIntoRepresentation,
  smartUint8ArrayToCSV,
} from "@/utils/csv_utils.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { redirect } from "@/utils/http.ts";
import { addBookToList, createBook } from "@/utils/new-db.ts";
import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";
import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/edit.tsx";
import { useSignal } from "https://esm.sh/v122/@preact/signals@1.1.3/X-ZS8q/deno/signals.mjs";
import { Book, InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import { JSX } from "preact/jsx-runtime";

async function parseCsv(oldFile) {
  const m = await multiParser(oldFile);
  console.log("parsing the csv", m);
  const files: Record<string, FormFile | FormFile[]> | undefined = m?.files;
  if (!files) {
    await oldFile.body?.cancel();
    return new Response(null, { status: 401 });
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

export interface PreseedListWithCsvFormProps {
  callback: (things: InitBook[]) => void;
  ownLists: ReadingList[];
}

export default function PreseedListWithCsvForm(
  props: PreseedListWithCsvFormProps,
) {
  const open = useSignal(false);
  function onClick(event: MouseEvent) {
    console.log("clicked button to open a form");
    if (event.detail === 1) {
      open.value = !open.value;
      const dialog = document.querySelector(
        "dialog",
      ) as HTMLDialogElement;
      if (!dialog) {
        console.error("no dialog");
        return;
      }
      dialog.showModal(); // Opens a non-modal dialog
    }
  }
  const submitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const file = e.target.elements.csv.files[0];
    const books: Book[] = parseCsv(file);
    props.callback(books);

    const dialog = document.querySelector(
      "dialog",
    ) as HTMLDialogElement;
    if (!dialog) {
      console.error("no dialog");
      return;
    }
    dialog.close(); // Opens a non-modal dialog
  };

  return (
    <div>
      <button
        onClick={onClick}
        class={BUTTON_STYLES}
      >
        <p>
          Upload <IconBookUpload />
        </p>
      </button>
      <dialog id="edit-list-dialog">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <label for="list">here select to which list does it belong</label>
          <select id="list" name="list" required multiple>
            {props.ownLists && props.ownLists.map((list, i) => {
              return (
                <option key={`option-${i}`} value={list.id}>
                  {list.title}
                </option>
              );
            })}
          </select>
          <label for="csv">Put CSV of a list here</label>
          <input type="file" name="csv" accept=".csv" />
          <input class={BUTTON_STYLES} type="submit" />
        </form>
      </dialog>
    </div>
  );
}
