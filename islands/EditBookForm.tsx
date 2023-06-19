import { BUTTON_STYLES } from "@/utils/constants.ts";
import type { User } from "@/utils/db.ts";
import { useSignal } from "@preact/signals";
import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/edit.tsx";
import { InitBook } from "../utils/db_interfaces.ts";

export interface EditBookFormProps {
  user: User;
  startingBookValues: InitBook;
}

export default function EditBookForm(props: EditBookFormProps) {
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

  function submitHandler() {
    // todo make a patch request here to the API, not to the post page, I think
    const dialog = document.querySelector(
      "#edit-book-dialog",
    ) as HTMLDialogElement;
    if (!dialog) {
      console.error("no dialog");
      return;
    }
    dialog.close(); // Opens a non-modal dialog
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
            value={props.startingBookValues.title}
          />
          <label for="name">Input title</label>

          <input
            type="text"
            name="author"
            value={props.startingBookValues.author}
          />
          <label for="author">Input author</label>

          <input
            type="number"
            name="pages"
            value={props.startingBookValues.pages}
          />
          <label for="pages">Input pages</label>

          <input
            type="text"
            name="description"
            value={props.startingBookValues.description}
          />
          <label for="description">Input description</label>

          <input
            type="link"
            name="coverUrl"
            value={props.startingBookValues.coverUrl}
          />
          <label for="coverUrl">Input cover URL</label>

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
            Submit
          </button>
        </form>
      </dialog>
    </div>
  );
}
