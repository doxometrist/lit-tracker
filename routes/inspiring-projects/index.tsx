import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import type { State } from "@/routes/_middleware.ts";

interface InspiringProjectsPageData extends State {
}

interface Link {
  url: string;
  description: string;
}

const links: Link[] = [
  {
    url: "https://www.fellowshipofthelink.org/",
    description:
      "A group working on collaborative memory and information commons",
  },
  {
    url: "https://anagora.org/index",
    description: "Digital resource pooling platform",
  },
];

function LinkCard(props: { link: Link }) {
  return (
    <div>
      <span>
        <a class="underline" href={props.link.url}>{props.link.url}</a> - {props.link.description}
      </span>
    </div>
  );
}
export const handler: Handlers<InspiringProjectsPageData, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

export default function BlogPage(props: PageProps<InspiringProjectsPageData>) {
  return (
    <>
      <Head
        title="Blog"
        description="This is the blog for..."
        href={props.url.href}
      />
      <Layout session={props.data.sessionId}>
        <main class={`${SITE_WIDTH_STYLES} px-4 pt-16 flex-1`}>
          <h1 class="text-5xl font-bold">Inspiring projects</h1>
          <div class="mt-8">
            {links.map((l) => <LinkCard link={l} />)}
          </div>
        </main>
      </Layout>
    </>
  );
}
