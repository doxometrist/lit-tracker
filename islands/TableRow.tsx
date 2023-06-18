import { InitBook } from "@/utils/db_interfaces.ts";
import { Signal } from "https://esm.sh/v122/@preact/signals-core@1.2.3/X-ZS8q/dist/signals-core.js";

interface RowProps {
  n: number;
  things: Signal<InitBook[]>;
}

export default function TableRow({ n, things }: RowProps) {
  return (
    <tr>
      <td>{n + 1}</td>
      <td>
        <input
          type="text"
          name={`author-${n}`}
          value={n < things.value.length ? things.value[n].author : ""}
        />
      </td>
      <td>
        <input
          type="text"
          name={`description-${n}`}
          value={n < things.value.length ? things.value[n].description : ""}
        />
      </td>
      <td>
        <input
          type="text"
          name={`title-${n}`}
          value={n < things.value.length ? things.value[n].title : ""}
        />
      </td>
      <td>
        <input
          type="link"
          name={`link-${n}`}
          value={n < things.value.length ? things.value[n].coverUrl : ""}
        />
      </td>
    </tr>
  );
}
