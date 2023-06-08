// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import IconTrashXFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash-x-filled.tsx";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Book } from "@/utils/db_interfaces.ts";
import { redirect } from "../utils/http.ts";

export interface DeleteButtonProps {
  book: Book;
}

export default function DeleteBookButton(props: DeleteButtonProps) {
  async function onClick(event: MouseEvent) {
    if (event.detail === 1) {
      const url = `/api/book?book_id=${props.book.id}`;
      const method = "DELETE";
      const response = await fetch(url, { method, credentials: "same-origin" });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (response.status === 204) {
        window.location.href = "/uploaded-by-me-books";
        return;
      }
    }
  }

  return (
    <button
      class={"text-inherit"}
      onClick={onClick}
      disabled={!IS_BROWSER}
    >
      <IconTrashXFilled />
    </button>
  );
}
