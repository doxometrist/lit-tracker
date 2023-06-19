import { BUTTON_STYLES } from "@/utils/constants.ts";
import { Book } from "@/utils/db_interfaces.ts";



function getCsvBlob(books: Book[]): Blob {
  const excludeKeys = ["id", "finishedUserIds", "uploaderId"];

  const replacer = (key: string, value: string) => value === null ? "" : value;
  const header = Object.keys(books[0]).filter((key) =>
    !excludeKeys.includes(key)
  );
  const csv: string[] = books.map((row) =>
    header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(
      ",",
    )
  );
  csv.unshift(header.join(","));
  const csvString = csv.join("\r\n");

  // Create a blob from the CSV string
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  return blob;
}

export default function DownloadCsvButton(
  props: { filename: string; books: Book[] },
) {
  const clickHandler = () => {
    // Create a link element
    const link = document.createElement("a");
    const blob = getCsvBlob(props.books);
    const url = URL.createObjectURL(blob);
    console.log("blob url: ", url);
    link.setAttribute("href", url);
    link.setAttribute("download", `${props.filename}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button class={BUTTON_STYLES} onClick={clickHandler}>
        Download CSV of books on this list!
      </button>
    </div>
  );
}
