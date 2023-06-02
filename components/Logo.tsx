// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { JSX } from "preact";
import { SITE_NAME } from "@/utils/constants.ts";

export default function Logo(props: JSX.HTMLAttributes<HTMLImageElement>) {
  const height: number = props.height as unknown as number ?? 96;
  const width = 3.5 * height;

  return (
    <img
      {...props}
      height={height}
      width={width}
      src="/logo.png"
      alt={`${SITE_NAME} logo`}
      class={`h-[${height}px] w-[${width}px] mx-auto ${props.class ?? ""} border border-1 border-accent1`}
    />
  );
}
