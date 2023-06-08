import { BUTTON_STYLES } from "@/utils/constants.ts";
import { Book, ReadingList } from "@/utils/db_interfaces.ts";
import { uploadJsonToIpfs } from "@/utils/ipfs_facade.ts";

interface IpfsUploadButtonProps {
  list: ReadingList;
  books: Book[];
}

export default function IpfsUploadButton({ list, books }: IpfsUploadButtonProps) {
  return (
    <button
      class={`${BUTTON_STYLES}`}
      onClick={() => {
        const item = {
          books,
          list,
        };
        const itemJson: string = JSON.stringify(item);
        console.log("uploaded json", itemJson);
        uploadJsonToIpfs(itemJson);
        // todo that needs to go through the API, not here
        // todo add local backend indication that it's backed up. also move this to api shared class
      }}
    >
      Save to IPFS
    </button>
  );
}
