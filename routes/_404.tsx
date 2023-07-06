// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import Logo from "@/components/Logo.tsx";
import { Head } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import { SITE_WIDTH_STYLES } from "../utils/constants.ts";

export default function NotFoundPage() {
  return (
    <>
      <Head title="Page not found" href={props.url.href} />
      <div
        class={`h-screen flex flex-col bg-accent2 justify-center ${SITE_WIDTH_STYLES} p-4 text-center space-y-4`}
      >
        <Logo />
        <h1 class="text-4xl inline-block font-bold">Lost in a liberary? Good it's not the Library of Babel</h1>
        <p class="text-xl text-blue-900">
          <a href="/">Return home</a>
        </p>
      </div>
    </>
  );
}
