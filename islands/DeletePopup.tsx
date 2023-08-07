
import { BUTTON_STYLES } from "@/utils/constants.ts";
import type { User } from "@/utils/db.ts";
import { useSignal } from "@preact/signals";
import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/edit.tsx";
import { Book, InitBook } from "../utils/db_interfaces.ts";

export interface DeletePopupProps {
  callback: function;
}

export default function DeletePopup(
  { callback }: DeletePopupProps,
) {
  const open = useSignal(false);

  function onClick(event: MouseEvent) {
    console.log("clicked button to open a form");
    if (event.detail === 1) {
      open.value = !open.value;
      const dialog = document.querySelector(
        "dialog",
      ) as HTMLDialogElement;
      if (!dialog) {
        console.error("no dialog");
        return;
      }
      dialog.showModal(); // Opens a non-modal dialog
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log("clicked");
    callback();
    const dialog = document.querySelector(
      "#edit-book-dialog",
    ) as HTMLDialogElement;
    if (!dialog) {
      console.error("no dialog");
      return;
    }
    dialog.close(); 
  }

  return (
    <div>
      <button
        onClick={onClick}
        class={BUTTON_STYLES}
      >
        <p>
          Edit <IconEdit />
        </p>
      </button>
      <dialog id="edit-book-dialog">
        <form
          method="post"
          class="bg-red-400 w-40 h-40"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            name="name"
            value={book.title}
          />
          <label for="name">Input title</label>
          <button
            class={`${BUTTON_STYLES}  text-center mt-8`}
            type="submit"
            formMethod="dialog"
          >
            Cancel
          </button>
          <button
            class={`${BUTTON_STYLES} text-center mt-8`}
            type="submit"
          >
            Confirm deletion
          </button>
        </form>
      </dialog>
    </div>
  );
}








