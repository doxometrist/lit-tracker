import ListCreationTableForm from "@/islands/ListCreationTableForm.tsx";
import PreseedListWithCsvForm from "@/islands/PreseedListWithCsvForm.tsx";
import { ExampleTable } from "@/routes/uploads/ExampleTable.tsx";
import { InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import { useSignal } from "https://esm.sh/v122/@preact/signals@1.1.3/X-ZS8q/dist/signals.js";

export interface UploadWrapperProps {
  ownLists: ReadingList[];
}

export default function UploadWrapper(props: UploadWrapperProps) {
  const things = useSignal<InitBook[]>([]);
  // const callback = (newThings: InitBook[]) => {
  //   things.value = newThings;
  // };

  return (
    <div>
      {/* here the button to upload csv */}
      {/* <PreseedListWithCsvForm callback={callback} ownLists={props.ownLists} /> */}
      {/* here the button to upload pdf */}
      {/* <PreseedListWithPdfsForm ownLists={props.data.ownLists} /> */}
      {/* <ExampleTable /> */}
      {/* here the main table */}
      <ListCreationTableForm
        ownLists={props.ownLists}
        temporary={things}
      />
    </div>
  );
}
