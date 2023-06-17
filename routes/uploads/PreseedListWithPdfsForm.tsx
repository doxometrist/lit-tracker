import type { PageProps } from "$fresh/server.ts";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { redirect } from "@/utils/http.ts";
import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";
import { TmpBook } from "@/utils/db_interfaces.ts";
import { saveTmpBook } from "@/utils/new-db.ts";
import { ListCreationPage } from "./index.tsx";

export function PreseedListWithPdfsForm(props: PageProps<ListCreationPage>) {
  // todo that should receive all bookname objects
  const onSubmit = (req, ctx) => {
    console.log("req:", req);
    const m = await multiParser(req);
    console.log("m:", m);
    const files: Record<string, FormFile[] | FormFile> | undefined = m?.files;
    if (!files) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    // console.log("files: ", files);
    const items: FormFile[] = files["files"] as FormFile[];
    items.forEach((i) => {
      console.log(i.filename, i.size);
    });
    const tmp: TmpBook[] = items.map((t) => {
      return { name: t.filename, size: t.size.valueOf() };
    });
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    console.log("tmp on creation: ", tmp);
    tmp.forEach((t) => saveTmpBook(t, user!.id));

    return redirect("/uploads/structured");
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <label for="files">Upload files, we'll read the name</label>
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
      <input type="file" name="files" multiple />
      <button class={BUTTON_STYLES}>
        <input type="submit" />
      </button>
    </form>
  );
}
