import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { getReadingListsByUserId } from "@/utils/new-db.ts";
import UploadWrapper from "../../islands/Wrapper.tsx";

export interface ListCreationPage extends State {
  user: User | null;
  filenames: string[];
  ownLists: ReadingList[];
  // temporary: TmpBook[];
}

export const handler: Handlers<ListCreationPage, State> = {
  async GET(req, ctx) {
    console.log("context in uploads:", ctx);
    // const readFiles = ctx.params.files;
    // console.log(readFiles);

    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    const filenames: string[] = [];
    const ownLists = await getReadingListsByUserId(user.id);
    // const temporary = await getTmpBooksById(user.id);
    // return ctx.render({ ...ctx.state, user, filenames, ownLists, temporary });
    return ctx.render({ ...ctx.state, user, filenames, ownLists });
  },
  // async POST(req, ctx) {
  //   // from here on there is the thing
  //   const listId = m?.fields["list"];
  //   const books: InitBook[] = [];
  //   if (!listId) {
  //     await req.body?.cancel();
  //     return new Response(null, { status: 406 });
  //   }
  //   books.forEach(async (b) => {
  //     const id = await createBook(b);
  //     await addBookToList(id, listId, user!.id);
  //   });
  //   return redirect("/uploads");
  // },
};

export default function ListCreationPage(props: PageProps<ListCreationPage>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Create a new list</strong>
          </h1>
          <UploadWrapper ownLists={props.data.ownLists} />
        </div>
      </Layout>
    </>
  );
}
