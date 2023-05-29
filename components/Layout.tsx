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
    <nav>
      <ul
        class={`flex gap-x-8 gap-y-2 items-center justify-between h-full ${
          props.class ?? ""
        }`}
      >
        {props.items.map((item) => (
          <li>
            <a href={item.href}>{item.inner}</a>
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
      }`}
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
      class={`flex flex-col md:flex-row p-4 justify-between gap-y-4 ${SITE_WIDTH_STYLES} ${
        props.class ?? ""
      }`}
    >
      <span>
        <strong>{SITE_NAME}</strong>
      </span>
      {props.children}
    </footer>
  );
}

interface LayoutProps {
  children: ComponentChildren;
  session?: string;
}

export default function Layout(props: LayoutProps) {
  const headerNavItems = [
    {
      href: "/discover",
      inner: "Discover",
    },
    {
      href: "/my-lists",
      inner: "My lists",
    },
    {
      href: "/new-book",
      inner: "New book",
    },
    {
      href: "/new-list",
      inner: "New list",
    },

    props.session
      ? {
        href: "/account",
        inner: "Account",
      }
      : {
        href: "/login",
        inner: "Login",
      },
    // {
    //   href: "/submit",
    //   inner: <span class={BUTTON_STYLES}>Submit</span>,
    // },
  ];

  const footerNavItems = [
    {
      href: "/blog",
      inner: "Blog",
    },
    {
      inner: "follow me on twitter!",
      href: "https://twitter.com/doxometrist",
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
    <div class="flex flex-col min-h-screen">
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
