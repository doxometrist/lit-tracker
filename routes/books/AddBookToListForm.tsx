import { BUTTON_STYLES } from "@/utils/constants.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { Book } from "../../utils/db_interfaces.ts";
import { getReadingListByid } from "../../utils/new-db.ts";

interface AddBookToListFormProps {
  ownLists: ReadingList[];
  book: Book;
}

export function AddBookToListForm({ ownLists, book }: AddBookToListFormProps) {
  async function sendToApi() {
    const url = `/api/book-list?book_id=${book.id}?list_id=${""}`;
    const method = "POST";
    const response = await fetch(url, {
      method,
      credentials: "same-origin",
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    if (response.status === 204) {
      window.location.href = "/uploaded-by-me-books";
      return;
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    const formData = new FormData(e.target); // e.target is the form itself
    const addToListId: string | undefined = formData.get("list")?.toString();
    console.log(formData);
    // const list = await getReadingListByid(addToListId);
    // if (user.id !== list?.creatorId) {
    //   throw Error(`wrong user`);
    // }
    // if (user.id !== list?.creatorId) {
    //   throw Error(`wrong user`);
    // }
    // todo here get new initbook from the previous formdata
    sendToApi();
    const dialog = document.querySelector(
      "#edit-book-dialog",
    ) as HTMLDialogElement;
    if (!dialog) {
      console.error("no dialog");
      return;
    }
    dialog.close(); // Opens a non-modal dialog
  };

  return (
    <form onSubmit={submitHandler}>
      <label for="list">
        here select to which list does it belong
      </label>
      <select id="list" name="list" required multiple>
        {ownLists.map((list, i) => {
          return (
            <option key={`option-${i}`} value={list.id}>
              {list.title}
            </option>
          );
        })}
      </select>
      <button
        class={`${BUTTON_STYLES} block w-40`}
        type="submit"
      >
        Add to the chosen lists
      </button>
    </form>
  );
}
