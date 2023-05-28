import { IS_BROWSER } from "$fresh/runtime.ts";
import type { User } from "@/utils/db.ts";
import { useSignal } from "@preact/signals";
import { BUTTON_STYLES } from "../utils/constants.ts";
import { useRef } from "https://esm.sh/v118/preact@10.13.2/hooks/src/index.js";

export interface OpenFormButtonProps {
  user: User;
}

export default function OpenFormButton(props: OpenFormButtonProps) {
  const open = useSignal(false);
  const dialog = document.querySelector("new-persona-dialog");
  function onClick(event: MouseEvent) {
    if (event.detail === 1) {
      open.value = !open.value;
      // const url = `/api/vote?item_id=${props.user.id}`;
      // const method = "POST";
      // const response = await fetch(url, { method, credentials: "same-origin" });
      // dialog?.show();

      // if (response.status === 401) {
      //   window.location.href = "/login";
      //   return;
      // }
    }
  }

  return (
    <div>
      <button
        onClick={onClick}
        disabled={!IS_BROWSER}
        class={BUTTON_STYLES}
      >
        <p>Make a new Persona</p>
      </button>
      <dialog id="new-persona-dialog">
        <form
          method="post"
          class="bg-red-400 w-40 h-40"
          // onSubmit={(e) => {
          //   console.log(e);
          // }}
        >
          <input type="text" name="name" />
          <label for="name">Input name</label>

          <input type="text" name="description" />
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
