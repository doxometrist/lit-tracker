import type { PageProps } from "$fresh/server.ts";
import { InitBook, TmpBook } from "@/utils/db_interfaces.ts";
import { BUTTON_STYLES, MAX_LIST_LENGTH } from "../../../utils/constants.ts";
import { getUserBySessionId } from "../../utils/db.ts";
import { redirect } from "../../utils/http.ts";
import { createBook } from "../../utils/new-db.ts";

function range(start: number, end: number, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}

function readForm(req, ctx) {
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

export function ListCreationTableForm(
  props: PageProps<StructuredUploadPage>,
  numArr: number[],
  tmp: TmpBook[],
) {
  const numArr = range(0, MAX_LIST_LENGTH);
  const tmp = props.data.temporary;
  console.log("tmp:", tmp);
  return (
    <form method="POST">
      <label for="list">here select to which list does it belong</label>
      <select id="list" name="list" required multiple>
        {props.data.ownLists.map((list, i) => {
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
              <td>{n}</td>
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
  );
}
