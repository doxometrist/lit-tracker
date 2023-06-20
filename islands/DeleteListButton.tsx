// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import IconTrashXFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash-x-filled.tsx";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import { useSignal } from "@preact/signals";

export interface DeleteListProps {
  list: ReadingList;
}

export default function DeleteListButton(props: DeleteListProps) {
  const open = useSignal(false);

  async function deleteList() {
    const url = `/api/list?list_id=${props.list.id}`;
    const method = "DELETE";
    const response = await fetch(url, { method, credentials: "same-origin" });

    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    if (response.status === 204) {
      window.location.href = "/my-lists";
      return;
    }
  }

  function onClick(e: MouseEvent) {
    if (e.detail == 1) toggle();
  }

  function toggle() {
    const dialog = document.querySelector(
      "#delete-list-dialog",
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

  return (
    <>
      <button
        class={`text-inherit ${BUTTON_STYLES}`}
        onClick={onClick}
      >
        <span class="text-bone">
          Delete <IconTrashXFilled />
        </span>
      </button>

      <dialog id="delete-list-dialog">
        <form
          onSubmit={(e) => e.preventDefault()}
        >
          <h2>Are you sure you want to delete this list?</h2>
          <button
            class={BUTTON_STYLES}
            onClick={(e) => {
              const dialog = document.querySelector(
                "#delete-list-dialog",
              ) as HTMLDialogElement;
              dialog.close();
            }}
          >
            Cancel
          </button>
          <button
            class={BUTTON_STYLES}
            onClick={(e) => {
              deleteList();
              const dialog = document.querySelector(
                "#delete-list-dialog",
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
