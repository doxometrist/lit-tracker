import { IS_BROWSER } from "$fresh/runtime.ts";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import type { User } from "@/utils/db.ts";
import { useSignal } from "@preact/signals";
import { InitReadingList } from "../utils/db_interfaces.ts";
import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/edit.tsx";

export interface EditListFormProps {
  user: User;
  startingListValues: InitReadingList;
}

export default function EditListForm(props: EditListFormProps) {
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
      <dialog id="edit-list-dialog">
        <form
          method="post"
          class="bg-red-400 w-40 h-40"
          formAction={"/api/list"}
        >
          <input
            type="text"
            name="name"
            value={props.startingListValues.title}
          />
          <label for="name">Input name</label>

          <input
            type="text"
            name="description"
            value={props.startingListValues.description}
          />
          <label for="description">Input description</label>

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
            formMethod="dialog"
          >
            Submit
          </button>
        </form>
      </dialog>
    </div>
  );
}
