// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import {
  ACTIVE_LINK_STYLES,
  LINK_STYLES,
  NAV_STYLES,
  SITE_BAR_STYLES,
  SITE_NAME,
} from "@/utils/constants.ts";
import { Discord, GitHub, Rss } from "./Icons.tsx";
import { getToggledStyles } from "@/utils/display.ts";

export default function Footer(props: { url: URL }) {
  return (
    <footer
      class={`${SITE_BAR_STYLES} flex-col md:flex-row mt-8`}
    >
      <p>© {SITE_NAME}</p>
      <nav class={NAV_STYLES}>
        <a
          href="/blog"
          class={getToggledStyles(
            LINK_STYLES,
            ACTIVE_LINK_STYLES,
            props.url.pathname === "/blog",
          )}
        >
          Blog
        </a>
        <a href="/feed" aria-label="Deno Hunt RSS Feed" class={LINK_STYLES}>
          <Rss class="h-6 w-6" />
        </a>
        <a
          href="https://github.com/doxometrist/lit-tracker"
          target="_blank"
          aria-label="Lit tracker repo on GitHub"
          class={LINK_STYLES}
        >
          <GitHub class="h-6 w-6" />
        </a>
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
 <span>
          <script
            type="text/javascript"
            src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
            data-name="bmc-button"
            data-slug="doxometrist"
            data-color="#800000"
            data-emoji="📖"
            data-font="Cookie"
            data-text="Buy me a book"
            data-outline-color="#ffffff"
            data-font-color="#ffffff"
            data-coffee-color="#FFDD00"
          >
          </script>
        </span>
 <span>
          <a
            href="https://twitter.com/doxometrist?ref_src=twsrc%5Etfw"
            class="twitter-follow-button"
            data-show-count="true"
          >
            Follow @doxometrist
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          >
          </script>
        </span>
      </nav>
    </footer>
  );
}
