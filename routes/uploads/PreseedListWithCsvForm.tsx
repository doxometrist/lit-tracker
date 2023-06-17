import type { PageProps } from "$fresh/server.ts";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import {
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

function parseCsv() {
  if (!ctx.state.sessionId) {
    await req.body?.cancel();
    return new Response(null, { status: 401 });
  }
  let user: User | null = null;
  if (ctx.state.sessionId) {
    user = await getUserBySessionId(ctx.state.sessionId!) as User;
  }
  if (!user) {
    await req.body?.cancel();
    return new Response(null, { status: 401 });
  }

  const m = await multiParser(req);
  console.log(m?.fields);
  console.log(m);
  const files: Record<string, FormFile | FormFile[]> | undefined = m?.files;
  if (!files) {
    await req.body?.cancel();
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
  const final = objectIntoRepresentation(parsed, user.id);

  const listId = m?.fields["list"];
  if (!listId) {
    await req.body?.cancel();
    return new Response(null, { status: 406 });
  }
  final.books.forEach(async (b) => {
    const id = await createBook(b);
    await addBookToList(id, listId, user!.id);
  });
  return redirect("/uploads/csv");
}

export function PreseedListWithCsvForm(props: {}) {
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
  return (
    <div>
      <button
        onClick={onClick}
        class={BUTTON_STYLES}
      >
        <p>
          Edit <IconEdit />
        </p>
      </button>
      <dialog id="edit-list-dialog">
        <form method="post" encType="multipart/form-data">
          <label for="list">here select to which list does it belong</label>
          <select id="list" name="list" required multiple>
            {/* {props.data.ownLists.map((list, i) => {
              return (
                <option key={`option-${i}`} value={list.id}>
                  {list.title}
                </option>
              );
            })} */}
          </select>
          <label for="csv">Put CSV of a list here</label>
          <input type="file" name="csv" accept=".csv" />
          <input class={BUTTON_STYLES} type="submit" />
        </form>
      </dialog>
    </div>
  );
}
