import { IS_BROWSER } from "$fresh/runtime.ts";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import type { User } from "@/utils/db.ts";
import { useSignal } from "@preact/signals";
import { InitReadingList, ReadingList } from "@/utils/db_interfaces.ts";
import IconEdit from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/edit.tsx";

export interface EditListFormProps {
  list: ReadingList;
}

export default function EditListForm(props: EditListFormProps) {
  const open = useSignal(false);
  function onOuterButtonClick(event: MouseEvent) {
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

  const submitHandler = async () => {
    console.log("clicked");
    const listId = props.list.id;
    const url = `/api/list?list_id=${listId}`;
    const method = "PATCH";
    const response = await fetch(url, { method, credentials: "same-origin" });
    console.log(`sending request to upload to ipfs the list: ${listId}`);

    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    if (response.status === 204) {
      window.location.href = `/lists/${listId}`;
      return;
    }
  };

  return (
    <div>
      <button
        onClick={onOuterButtonClick}
        class={BUTTON_STYLES}
      >
        <p>
          Edit <IconEdit />
        </p>
      </button>
      <dialog id="edit-list-dialog">
        <form
          // method="patch"
          class="bg-red-400 w-40 h-40"
          // formAction={"/api/list"}
          onSubmit={submitHandler}
        >
          <input
            type="text"
            name="name"
            value={props.list.title}
          />
          <label for="name">Input name</label>

          <input
            type="text"
            name="description"
            value={props.list.description}
          />
          <label for="description">Input description</label>

          <button
            class={`${BUTTON_STYLES}  text-center mt-8`}
            type="cancel"
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
