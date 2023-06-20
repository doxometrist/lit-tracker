// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import IconTrashXFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash-x-filled.tsx";
import { BUTTON_STYLES } from "../utils/constants.ts";

export interface DeleteListProps {
  list: ReadingList;
}

export default function DeleteListButton(props: DeleteListProps) {
  async function deleteList(event: MouseEvent) {
    if (event.detail === 1) {
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
  }

  return (
    <button
      class={`text-inherit ${BUTTON_STYLES}`}
      onClick={deleteList}
    >
      <span class="text-bone">
        Delete <IconTrashXFilled />
      </span>
    </button>
  );
}
