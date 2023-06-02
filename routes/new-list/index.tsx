// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { BUTTON_STYLES, INPUT_STYLES } from "@/utils/constants.ts";
import { InitReadingList } from "../../utils/db_interfaces.ts";
import { getUserBySessionId, User } from "../../utils/db.ts";
import { State } from "../_middleware.ts";
import { createReadingList } from "../../utils/new-db.ts";

interface NewListPageData extends State {
  user: User;
}

function Form() {
  return (
    <form class=" space-y-2" method="post">
      <input
        class={INPUT_STYLES}
        type="text"
        name="title"
        required
        placeholder="Title"
      />
      <input
        class={INPUT_STYLES}
        type="text"
        name="description"
        required
        placeholder="Here goes your description"
      />
      <button class={`${BUTTON_STYLES} block w-full`} type="submit">
        Submit
      </button>
    </form>
  );
}

export const handler: Handlers<NewListPageData, State> = {
  async GET(_request, ctx) {
    const user = await getUserBySessionId(ctx.state.sessionId!) as User ;
    return ctx.render({ ...ctx.state, user });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const user = await getUserBySessionId(ctx.state.sessionId!) ;
    const list: InitReadingList = {
      creatorId: user!.id,
      description: form.get("description")?.toString() ?? "",
      title: form.get("title")?.toString() ?? "",
    };

    // Add email to list.
    const createResponse = await createReadingList(list);

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/my-lists");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function NewList(props: PageProps<NewListPageData>) {
  return (
    <>
      <Head title="any" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>any</strong>
          </h1>
          <Form />
        </div>
      </Layout>
    </>
  );
}
