export type SlideData = {
  color: string;
  text: string;
  url: string;
};

export type SlideProps = {
  class?: string;
  key?: number;
  data: SlideData;
};

export const Slide = (props: SlideProps) => {
  const { key, data } = props;
  const { color, text, url } = data;
  if (props.class === undefined) {
    props.class = "";
  }
  return (
    <div
      key={key}
      class={`${props.class} ${color} h-fit w-full text-center text-black p-5 rounded-xl flex flex-row`}
    >
      <img height={768} width={512} src={url} class="rounded" />
      <h2 class="text-xl bold m-2 p-2">
        {text}
      </h2>
    </div>
  );
};
