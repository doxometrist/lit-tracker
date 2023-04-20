// Copyright 2023 the Deno authors. All rights reserved. MIT license.
export const SITE_NAME = "Deno Hunt";
export const SITE_DESCRIPTION = "Discover new Deno projects. Share your own.";
export const REDIRECT_PATH_AFTER_LOGIN = "/";

export const STRIPE_PREMIUM_PLAN_PRICE_ID = "price_1MxmZBLtShjVFzl88qok3U5D";

/**
 * These are base styles for some elements. This approach is chosen as it avoids more complex alternatives:
 * 1. Writing custom classes in Tailwind CSS (see https://tailwindcss.com/docs/reusing-styles#compared-to-css-abstractions)
 * 2. Writing custom components which offer no additional funtionality beyond styling
 */
export const BASE_BUTTON_STYLES =
  "px-4 py-2 bg-pink-700 hover:bg-white text-white hover:text-pink-700 text-lg rounded-lg border-2 border-pink-700 transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const BASE_INPUT_STYLES =
  "px-4 py-2 bg-white rounded rounded-lg outline-none w-full border-1 border-gray-300 hover:border-black transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const BASE_NOTICE_STYLES =
  "px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 mb-4";
export const BASE_SITE_WIDTH_STYLES = "mx-auto max-w-7xl w-full";
