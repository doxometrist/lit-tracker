import { Component, h } from "preact";
import { useState } from "preact/hooks";
import { Slide, SlideData } from "@/components/Slide.tsx";
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-right.tsx";
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-left.tsx";

const SLIDE_DATA: SlideData[] = [
  {
    color: "bg-secondary",
    text: "Join the library...",
    url:
      "https://image.lexica.art/full_jpg/200ef043-2215-4fd7-9f93-2f28787b1479",
  },

  {
    color: "bg-secondary",
    text: "Join the library...",
    url:
      "https://image.lexica.art/full_jpg/35cf1c34-5fcb-45a0-a3a1-b19d4284d395",
  },
  // {
  //   color: "bg-yellow-300",
  //   text: "slide two",
  //   url: asset("/illustration/lemon-squash.svg"),
  // },
];

export default function Carousel(
  props: { externalImages: SlideData[]; showNavigation: boolean },
) {
  const images = SLIDE_DATA;

  const NAVIGATION_COLOR = `hover:text-gray-300 text-bone`;
  const CHEVRON_STYLE =
    `absolute z-30 w-10 h-10 ${NAVIGATION_COLOR} cursor-pointer`;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    let index = currentIndex;
    const length = images.length;
    if (index === length - 1) index = -1;

    setCurrentIndex(index + 1);
  };

  const goToPrevSlide = () => {
    let index = currentIndex;
    const length = images.length;
    if (index < 1) index = length;

    setCurrentIndex(index - 1);
  };

  const DotsNavigation = () => (
    <div
      class={"slide_nav z-30 w-full absolute bottom-0 flex justify-center cursor-pointer rounded"}
    >
      {SLIDE_DATA.map((_item, idx) => {
        return (
          <div
            class={`px-1 ${NAVIGATION_COLOR}`}
            onClick={() => {
              setCurrentIndex(idx);
            }}
            key={idx}
          >
            {idx === currentIndex ? <>●</> : <>○</>}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      class={`slideshow relative flex-1 flex-end p-0 overflow-hidden ${""}`}
    >
      <IconCircleChevronsLeft
        class={`left-0 ${CHEVRON_STYLE}`}
        style="top: calc(50% - 20px)"
        onClick={goToPrevSlide}
      />
      <IconCircleChevronsRight
        class={`right-0 ${CHEVRON_STYLE}`}
        style="top: calc(50% - 20px)"
        onClick={goToNextSlide}
      />
      <Slide data={images[currentIndex]} key={currentIndex} class="" />
      {props.showNavigation && <DotsNavigation />}
    </div>
  );
}
