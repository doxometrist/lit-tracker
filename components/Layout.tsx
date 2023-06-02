// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { ComponentChild, ComponentChildren, JSX } from "preact";
import {
  BUTTON_STYLES,
  NOTICE_STYLES,
  SITE_NAME,
  SITE_WIDTH_STYLES,
} from "@/utils/constants.ts";
import Logo from "./Logo.tsx";

function Notice() {
  return (
    <div class={`${NOTICE_STYLES} rounded-none`}>
      <div class={`text-center px-4`}>
        Welcome! Checkout the{" "}
        <a
          href="https://github.com/doxometrist/lit-tracker"
          class="underline"
        >
          repo
        </a>.
      </div>
    </div>
  );
}

interface NavProps extends JSX.HTMLAttributes<HTMLElement> {
  active?: string;
  items: (JSX.HTMLAttributes<HTMLAnchorElement> & { inner: ComponentChild })[];
}

function Nav(props: NavProps) {
  return (
    <nav class="">
      <ul
        class={`flex gap-x-8 gap-y-2 items-center justify-between h-full ${
          props.class ?? ""
        }`}
      >
        {props.items.map((item) => (
          <li class="m-1 p-2 border-1 rounded bg-primary2  hover:border-solid border-color-secondary2">
            <a href={item.href} class="text-bone">{item.inner}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Header(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      class={`p-4 justify-between ${SITE_WIDTH_STYLES} flex z-10 ${
        props.class ?? ""
      } bg-primary1 rounded-xl`}
    >
      <a href="/">
        <Logo height={48} width={80} />
      </a>
      {props.children}
    </header>
  );
}

function Footer(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      {...props}
      class={`flex flex-col md:flex-row p-4 justify-between bg-primary1 gap-y-4 ${SITE_WIDTH_STYLES} ${
        props.class ?? ""
      }`}
    >
      <span>
        <strong class="text-bone">{SITE_NAME}</strong>
      </span>
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
      {props.children}
    </footer>
  );
}

interface LayoutProps {
  children: ComponentChildren;
  session?: string;
}

type NavItem = {
  href: string;
  inner: string | JSX.Element;
};

export default function Layout(props: LayoutProps) {
  const headerNavLoggedInItems: NavItem[] = [
    {
      href: "/uploaded-by-me-books",
      inner: "Manage uploaded books",
    },
    {
      href: "/my-lists",
      inner: "My lists",
    },
    {
      href: "/account",
      inner: "Account",
    },
  ];

  const headerNavGuestOnlyItems: NavItem[] = [{
    href: "/login",
    inner: <span>Login</span>,
  }];

  const headerNavBaseItems: NavItem[] = [
    {
      href: "/discover",
      inner: "Discover lists",
    },
    {
      href: "/books",
      inner: "Books",
    },
  ];

  const headerNavItems: NavItem[] = headerNavBaseItems.concat(
    props.session ? headerNavLoggedInItems : headerNavGuestOnlyItems,
  );

  const footerNavItems: NavItem[] = [
    {
      href: "/blog",
      inner: "Blog",
    },
    {
      href: "https://fresh.deno.dev",
      inner: (
        <img
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge.svg"
          alt="Made with Fresh"
        />
      ),
    },
  ];

  return (
    <div class="flex flex-col min-h-screen bg-accent2">
      {/* <Notice /> */}
      <Header>
        <Nav items={headerNavItems} />
      </Header>
      {props.children}
      <Footer>
        <Nav items={footerNavItems} />
      </Footer>
    </div>
  );
}
