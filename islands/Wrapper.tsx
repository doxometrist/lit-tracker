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
import { useSignal } from "https://esm.sh/v122/@preact/signals@1.1.3/X-ZS8q/dist/signals.js";

function range(start: number, end: number, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}

async function readForm(req, ctx) {
  if (!ctx.state.sessionId) {
    await req.body?.cancel();
    return new Response(null, { status: 401 });
  }

  const form = await req.formData();
  const title = form.get("title");
  const url = form.get("url");

  if (typeof title !== "string" || typeof url !== "string") {
    return new Response(null, { status: 400 });
  }

  try {
    // Throws if an invalid URL
    new URL(url);
  } catch {
    return new Response(null, { status: 400 });
  }

  const user = await getUserBySessionId(ctx.state.sessionId);

  if (!user) return new Response(null, { status: 400 });
  // todo add uploader data
  // todo add list description fields like in the regular form, or choose to which form these are added

  const initBooks: InitBook[] = [];
  // todo move this to a separaate place, one function to parse the full object starting from the pdf upload
  initBooks.forEach(async (book, index) => {
    await createBook(book);
  });

  return redirect(`/lists/some-new-list-id}`);
}

interface UploadWrapperProps {
  ownLists: ReadingList[];
}

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

export default function UploadWrapper(props: UploadWrapperProps) {
  // const things = useSignal<InitBook[]>([]);
  // const callback = (newThings: InitBook[]) => {
  //   things.value = newThings;
  // };

  const numArr = range(0, MAX_LIST_LENGTH);
  const onSubmit = (e) => {
    // todo read the stuffs
    // todo run them with the callback
    const names: string[] = [];
  };

  const finalSubmit = () => {
    // here needs to upload initbooks and thing to the API
  };

  // const openCsv = useSignal(false);

  function csvClickHandler(event: MouseEvent) {
    console.log("clicked button to open a form");
    if (event.detail === 1) {
      // openCsv.value = !openCsv.value;
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
        onClick={csvClickHandler}
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
      {/* here the button to upload csv */}
      {/* <PreseedListWithCsvForm callback={callback} ownLists={props.ownLists} /> */}
      {/* here the button to upload pdf */}
      {/* <PreseedListWithPdfsForm ownLists={props.data.ownLists} /> */}
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label for="files">Upload files, we'll read the name</label>
        <input type="file" name="files" multiple />
        <button class={BUTTON_STYLES}>
          <input type="submit" />
        </button>
      </form>
      {/* <ExampleTable /> */}
      {/* here the main table */}
      {
        /* <ListCreationTableForm
        ownLists={props.ownLists}
        // temporary={things}
        temporary={[]}
      /> */
      }

      <form method="POST">
        <label for="list">here select to which list does it belong</label>
        <select id="list" name="list" required multiple>
          {props.ownLists.map((list, i) => {
            return (
              <option key={`option-${i}`} value={list.id}>
                {list.title}
              </option>
            );
          })}
        </select>
        <table>
          <tr>
            <th>Number</th>
            <th>Author</th>
            <th>Description</th>
            <th>Title</th>
            <th>Cover url link</th>
          </tr>

          {numArr.map((n) => {
            return (
              <tr>
                <td>{n + 1}</td>
                <td>
                  <input type="text" name={`author-${n}`} />
                </td>
                <td>
                  <input type="text" name={`description-${n}`} />
                </td>
                <td>
                  <input
                    type="text"
                    name={`title-${n}`}
                    value={n < tmp.length ? tmp[n].name : ""}
                  />
                </td>
                <td>
                  <input type="link" name={`link-${n}`} />
                </td>
              </tr>
            );
          })}
          <button class={` m-2 p-2 ${BUTTON_STYLES}`}>
            <input type="submit" />
          </button>
        </table>
      </form>
    </div>
  );
}
