// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Cult, getAllCults } from "../../utils/db/db_cult.ts";
import { State } from "../_middleware.ts";

interface CultsPageData extends State {
  cults: Cult[];
}

export const handler: Handlers<CultsPageData, State> = {
  async GET(_req, ctx) {
    const cults = await getAllCults();
    return ctx.render({ ...ctx.state, cults });
  },
};

export default function CultsPage(props: PageProps<CultsPageData>) {
  const cults = props.data.cults;
  return (
    <>
      <Head title="cults list" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>any</strong>
          </h1>
        </div>
        <div>
          <h2>number of cults</h2>
          {cults.length > 0 ? cults.length : "no cults available"}
        </div>
      </Layout>
    </>
  );
}
