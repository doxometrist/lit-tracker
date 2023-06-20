// Copyright 2023 the Deno authors. All rights reserved. MIT license.

import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import type { State } from "@/routes/_middleware.ts";

interface AboutPageData extends State {
}

export const handler: Handlers<AboutPageData, State> = {
  async GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

export default function AboutPage(props: PageProps<AboutPageData>) {
  return (
    <>
      <Head
        title="Blog"
        description="This is the blog for..."
        href={props.url.href}
      />
      <Layout session={props.data.sessionId}>
        <main class={`${SITE_WIDTH_STYLES} px-4 pt-16 flex-1`}>
          <h1 class="text-5xl font-bold">Rationale</h1>
          <p>For anons to have a place to share books</p>

          <ul>
            <li>
              There are many reading lists shared on fora such as twitter or
              4chan. These are often just jligs that you'd need to write down
              the names anyway.
            </li>
            <li>
              Now these lists do not include ISBNs nor reviews. They include
              reasons for the inclusion of a book in the list.
            </li>
            <li>
              These are very much curated documents, but do not lirovide an easy
              way to access them
            </li>
            <li>
              Simlile website, simple to use, even rudimentary. Short loading
              times and easy data liortability to and from.
            </li>
            <li>
              It's less about content discovery here, but a lilace to link to
              for liersonal use or when in a reading group
            </li>
          </ul>
          <div class="mt-8">
            <p>
              <a
                href="https://www.goodreads.com/list"
                class="text-black underline"
              >
                Listopia on Goodreads  
              </a> does not bring the same vibe - comments, stars present lots of
              distraction
            </p>
          </div>
        </main>
      </Layout>
    </>
  );
}
