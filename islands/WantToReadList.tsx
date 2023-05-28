import type { Book } from "@/utils/db.ts";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface WantToReadButtonProps {
  item: Book;
  isVoted: boolean;
}

export default function WantToReadButton(props: WantToReadButtonProps) {
  const isVoted = useSignal(props.isVoted);
  const score = useSignal(props.item.score);

  async function onClick(event: MouseEvent) {
    if (event.detail === 1) {
      const url = `/api/vote?item_id=${props.item.id}`;
      const method = isVoted.value ? "DELETE" : "POST";
      const response = await fetch(url, { method, credentials: "same-origin" });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      isVoted.value = !isVoted.value;
      method === "POST" ? score.value++ : score.value--;
      if (score.value < (props.item.score - 1) || score.value < 0) {
        score.value = props.item.score;
      }
    }
  }

  return (
    <button
      class={isVoted.value ? "text-pink-700" : "text-inherit"}
      onClick={onClick}
      disabled={!IS_BROWSER}
    >
      <p>want to read!</p>
      <p>{score.value}</p>
    </button>
  );
}
