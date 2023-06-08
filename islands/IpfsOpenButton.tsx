import { BUTTON_STYLES } from "@/utils/constants.ts";
import { getIpfsAddress } from "@/utils/ipfs_facade.ts";

export default function IpfsOpenButton(props: { listId: string }) {
  const url = getIpfsAddress(props.listId);
  return (
    <button
      class={`${BUTTON_STYLES}`}
    >
      <a href={url}>
        See it on IPFS!
      </a>
    </button>
  );
}
