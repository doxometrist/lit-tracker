import { BUTTON_STYLES } from "@/utils/constants.ts";

export interface PreseedListWithPdfFormProps {
  callback: (things: string[]) => void;
}

export default function PreseedListWithPdfsForm(
  props: PreseedListWithPdfFormProps,
) {
  // todo that should receive all bookname objects
  // todo add dialog
  const onSubmit = (e) => {
    // todo read the stuffs
    // todo run them with the callback
    const names: string[] = [];
    props.callback(names);
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <label for="files">Upload files, we'll read the name</label>
      <input type="file" name="files" multiple />
      <button class={BUTTON_STYLES}>
        <input type="submit" />
      </button>
    </form>
  );
}
