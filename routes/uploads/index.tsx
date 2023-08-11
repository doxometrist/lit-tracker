import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import UploadWrapper from "@/islands/UploadWrapper.tsx";
import { State } from "@/routes/_middleware.ts";
import { DEFAULT_IMG } from "@/utils/constants.ts";
import { getUserBySession, User } from "@/utils/db.ts";
import { InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import {
  addBookToList,
  createBook,
  getReadingListsByUserId,
} from "@/utils/new-db.ts";
import { range } from "@/utils/range.ts";

export interface ListCreationPage extends State {
  user: User | null;
  filenames: string[];
  ownLists: ReadingList[];
}

export const handler: Handlers<ListCreationPage, State> = {
  async GET(req, ctx) {
    console.log("context in uploads:", ctx);

    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySession(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    const filenames: string[] = [];
    const ownLists = await getReadingListsByUserId(user.id);
    return ctx.render({ ...ctx.state, user, filenames, ownLists });
  },

  async POST(req, ctx) {
    if (!ctx.state.sessionId) {
      await req.body?.cancel();
      console.log("returning 401");
      return new Response(null, { status: 401 });
    }

    const form = await req.formData();
    const listId: FormDataEntryValue | null = form.get("list");

    console.log("form:", form);
    if (typeof listId !== "string") {
      return new Response(null, { status: 400 });
    }

    const user = await getUserBySession(ctx.state.sessionId);

    if (!user) return new Response(null, { status: 400 });
//todo parametrize
    const numArr = range(0, 10);
    numArr.forEach(async (n) => {
      const pages = form.get(`pages-${n}`);
      const title = form.get(`title-${n}`) as string;
      if (title && title !== "") {
        const newBook: InitBook = {
          title,
          pages: pages ? parseInt(pages as string) : 0,
          author: form.get(`author-${n}`) as string ?? "",
          description: form.get(`description-${n}`) as string ?? "",
          coverUrl: form.get(`coverUrl-${n}`) as string ?? DEFAULT_IMG,
          uploaderId: user.id,
        };
        const id = await createBook(newBook);
        addBookToList(id, listId, user.id);
      }
    });

    return redirect(`/lists/${listId}`);
  },
};

export default function ListCreationPage(props: PageProps<ListCreationPage>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <main>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Create a new list</strong>
          </h1>
          <UploadWrapper ownLists={props.data.ownLists} />
        </div>
      </main>
    </>
  );
}
