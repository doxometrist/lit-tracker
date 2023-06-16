import { BUTTON_STYLES } from "@/utils/constants.ts";
import { getIpfsAddress } from "@/utils/ipfs_facade.ts";

export default function IpfsOpenButton(props: { url: URL }) {
  console.log(props.url);
  console.log("href:", props.url.href);
  return (
    <button
      class={`${BUTTON_STYLES}`}
    >
      <a href={props.url as string}>
        See it on IPFS!
      </a>
    </button>
  );
}
