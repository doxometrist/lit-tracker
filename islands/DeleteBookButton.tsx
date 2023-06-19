// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Book } from "@/utils/db_interfaces.ts";
import { useSignal } from "@preact/signals";
import IconTrashXFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash-x-filled.tsx";
import { BUTTON_STYLES } from "../utils/constants.ts";

export interface DeleteButtonProps {
  book: Book;
}

export default function DeleteBookButton(props: DeleteButtonProps) {
  const open = useSignal(false);

  function onClick(e: MouseEvent) {
    if (e.detail == 1) toggle();
  }

  function toggle() {
    const dialog = document.querySelector(
      "#delete-book-dialog",
    ) as HTMLDialogElement;

    dialog.addEventListener("click", (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });

    open.value ? dialog.close() : dialog.showModal();
    open.value = !open.value;
  }

  async function deleteBook() {
    const url = `/api/book?book_id=${props.book.id}`;
    const method = "DELETE";
    const response = await fetch(url, {
      method,
      credentials: "same-origin",
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    if (response.status === 204) {
      window.location.href = "/uploaded-by-me-books";
      return;
    }
  }

  return (
    <>
      <button
        onClick={onClick}
        disabled={!IS_BROWSER}
        class={BUTTON_STYLES}
      >
        <p>
          Delete <IconTrashXFilled />
        </p>
      </button>
      <dialog id="delete-book-dialog">
        <form
          onSubmit={(e) => e.preventDefault()}
        >
          <h2>Are you sure you want to delete this book?</h2>
          <button
            class={BUTTON_STYLES}
            onClick={(e) => {
              const dialog = document.querySelector(
                "#delete-book-dialog",
              ) as HTMLDialogElement;
              dialog.close();
            }}
          >
            Cancel
          </button>
          <button
            class={BUTTON_STYLES}
            onClick={(e) => {
              deleteBook();
              const dialog = document.querySelector(
                "#delete-book-dialog",
              ) as HTMLDialogElement;
              dialog.close();
            }}
          >
            Ok, delete
          </button>
        </form>
      </dialog>
    </>
  );
}
