import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-right.tsx";
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-left.tsx";
import { Slide, SlideData } from "@/components/Slide.tsx";

const SLIDE_DATA: SlideData[] = [
  {
    color: "bg-accent1",
    text: "Join the library...",
    url:
      "https://image.lexica.art/full_jpg/200ef043-2215-4fd7-9f93-2f28787b1479",
  },

  {
    color: "bg-accent2",
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

type CarouselProps = {
  showNavigation?: boolean;
  interval?: number;
  currentSlide?: number;
  automatic?: boolean;
  class?: string;
};

const Carousel = (props: CarouselProps) => {
  const NAVIGATION_COLOR = `hover:text-gray-300 text-bone`;
  const CHEVRON_STYLE =
    `absolute z-30 w-10 h-10 ${NAVIGATION_COLOR} cursor-pointer`;
  const SHOW_NAVIGATION = props.showNavigation === false ? false : true;
  const SLIDE_INTERVAL = props.interval ? props.interval : 3500;
  const currentSlide = useSignal(props.currentSlide ? props.currentSlide : 0);
  const automatic = useSignal(props.automatic === false ? false : true);
  const slideshowRef = useRef<HTMLDivElement>(null);

  const slideClasses = (idx = 0) => {
    let outgoingSlide = currentSlide.value - 1;
    let incomingSlide = currentSlide.value + 1;
    if (outgoingSlide === -1) outgoingSlide = SLIDE_DATA.length - 1;
    if (incomingSlide === SLIDE_DATA.length) incomingSlide = 0;
    // console.log(outgoingSlide, currentSlide.value, incomingSlide)
    const TRANSITION_CLASS = () => {
      if (currentSlide.value === idx) return "translate-x-0 z-20";
      if (incomingSlide === idx) return "translate-x-full z-10";
      if (outgoingSlide === idx) return "-translate-x-full z-10";
      return "translate-x-full";
    };
    return tw`slide absolute top-0 left-0 transition-all ease-in-out duration-700 transform ${TRANSITION_CLASS}`;
  };

  const nextSlide = () => {
    if (SLIDE_DATA.length === currentSlide.value + 1) {
      currentSlide.value = 0;
    } else {
      currentSlide.value++;
    }
  };

  const previousSlide = () => {
    if (currentSlide.value === 0) {
      currentSlide.value = SLIDE_DATA.length - 1;
    } else {
      currentSlide.value--;
    }
  };

  const chevronClick = (doCallback = () => {}) => {
    if (automatic.value) automatic.value = false;
    return doCallback();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (automatic.value) nextSlide();
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const ArrowKeyNavigation = () => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (automatic.value) automatic.value = false;
      switch (event.code) {
        case "ArrowLeft":
          event.preventDefault();
          previousSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextSlide();
          break;
        default:
          break;
      }
    };
    slideshowRef.current?.addEventListener("keydown", keydownHandler);
    return () =>
      slideshowRef.current?.removeEventListener("keydown", keydownHandler);
  };
  useEffect(ArrowKeyNavigation, []);

  const goToSlide = (slide_index = 0) => {
    if (automatic.value) automatic.value = false;
    currentSlide.value = slide_index;
  };

  const DotsNavigation = () => (
    <div
      class={"slide_nav z-30 w-full absolute bottom-0 flex justify-center cursor-pointer"}
    >
      {SLIDE_DATA.map((_item, idx) => {
        return (
          <div
            class={`px-1 ${NAVIGATION_COLOR}`}
            onClick={() => {
              goToSlide(idx);
            }}
            key={idx}
          >
            {idx === currentSlide.value ? <>●</> : <>○</>}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      ref={slideshowRef}
      class={`slideshow relative flex-1 flex-end p-0 overflow-hidden ${
        props.class !== undefined ? props.class : ""
      }`}
      tabIndex={0}
    >
      <IconCircleChevronsLeft
        class={`left-0 ${CHEVRON_STYLE}`}
        style="top: calc(50% - 20px)"
        onClick={() => chevronClick(previousSlide)}
      />
      <IconCircleChevronsRight
        class={`right-0 ${CHEVRON_STYLE}`}
        style="top: calc(50% - 20px)"
        onClick={() => chevronClick(nextSlide)}
      />
      {SLIDE_DATA.map((item, idx) => (
        <Slide
          data={item}
          key={idx}
          class={slideClasses(idx)}
        />
      ))}
      {SHOW_NAVIGATION &&
        <DotsNavigation />}
      <Slide
        data={SLIDE_DATA[0]}
        class="opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default Carousel;
