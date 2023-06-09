import { BUTTON_STYLES } from "@/utils/constants.ts";

interface ListIpfsUploadButtonProps {
  listId: string;
}

export default function ListIpfsUploadButton(
  { listId }: ListIpfsUploadButtonProps,
) {
  const clickHandler = async () => {
    console.log("clicked");
    const url = `/api/list?list_id=${listId}?action=ipfs-upload`;
    const method = "POST";
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
    <button class={`${BUTTON_STYLES}`} onClick={clickHandler}>
      Save to IPFS
    </button>
  );
}
