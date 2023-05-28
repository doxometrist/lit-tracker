// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { Options } from "$fresh/plugins/twindv1.ts";
import { defineConfig, Preset } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import * as colors from "twind-preset-tailwind-colors";

/** @todo Remove the need for type-assertions */
export default {
  selfURL: import.meta.url,
  // <BaseTheme, Preset<any>[]>
  ...defineConfig({
    presets: [
      presetAutoPrefix() as Preset,
      presetTailWind({
        colors: {
          // This line is required. Otherwise, if removed, the values of other colors with be removed.
          ...colors,
          // Modify primary and secondary colors according to your color-scheme
          primary: "#282828",
          secondary: "#800000",
          // from chat
          primary1: '#282828', // dark charcoal
          primary2: '#483C32', // dark wood
          secondary1: '#800000', // deep maroon
          secondary2: '#3B4421', // dark olive green
          accent1: '#D4AF37', // antique gold
          accent2: '#F2E9E4' // cream
        },
        // deno-lint-ignore no-explicit-any
      }) as Preset<any>,
    ],
  }),
} as Options;
