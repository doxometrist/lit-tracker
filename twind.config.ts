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
      /**
       * Note: `presetAutoprefix()` was removed as it seemed to make no visual or functional difference to the website.
       * If styling issues re-occur in the future, try adding `presetAutoprefix()` back here.
       * @see {@link https://github.com/denoland/saaskit/pull/282}
       */
      presetTailWind({
        colors: {
          // This line is required. Otherwise, if removed, the values of other colors with be removed.
          ...colors,
          // Modify primary and secondary colors according to your color-scheme
          primary1: '#282828', // dark charcoal
          primary2: '#483C32', // dark wood
          secondary1: '#800000', // deep maroon
          secondary1_button: '#9A3333',// lighter maroon
          secondary2: '#3B4421', // dark olive green
          accent1: '#D4AF37', // antique gold
          accent2: '#F2E9E4', // cream
          bone: '#E4DECD', // bone for text
          dark_bone: '#B8A58D'
        },
        // deno-lint-ignore no-explicit-any
      }) as Preset<any>,
    ],
  }),
} as Options;
