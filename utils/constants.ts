// Copyright 2023 the Deno authors. All rights reserved. MIT license.
export const SITE_NAME = "lit tracker";
export const SITE_DESCRIPTION = "Track your reading lists.";
export const REDIRECT_PATH_AFTER_LOGIN = "/";

/**
 * These are base styles for some elements. This approach is chosen as it avoids more complex alternatives:
 * 1. Writing custom classes in Tailwind CSS (see https://tailwindcss.com/docs/reusing-styles#compared-to-css-abstractions)
 * 2. Writing custom components which offer no additional funtionality beyond styling
 */
export const BUTTON_STYLES =
  "px-4 py-2 bg-secondary1 hover:bg-secondary1_button text-bone  text-lg rounded-lg  border-pink-700 hover:text-dark_bone transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const SMALL_BUTTON_STYLES =
  "px-4 py-2 bg-secondary1 hover:bg-secondary1_button text-bone rounded-lg  border-pink-700 hover:text-dark_bone transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const INPUT_STYLES =
  "px-4 py-2 bg-accent2 rounded rounded-lg outline-none w-full border-1 border-gray-300 hover:border-black transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const NOTICE_STYLES =
  "px-4 py-2 rounded-lg bg-yellow-100 text-primary1";
export const SITE_WIDTH_STYLES = "mx-auto max-w-7xl w-full";

export const PREMIUM_LISTS_LIMIT = 10;
export const DEFAULT_LISTS_LIMIT = 5;
export const MAX_LIST_LENGTH = 10;

export const DEFAULT_IMG = "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";
export const DEFAULT_AUTHOR = 'Anon';
  "px-4 py-2 bg-primary text-white text-lg rounded-lg border-1 border-primary transition duration-300 disabled:(opacity-50 cursor-not-allowed) hover:(bg-transparent text-primary)";
export const SITE_BAR_STYLES = "flex justify-between p-4 gap-4";
export const NAV_STYLES =
  "flex flex-wrap justify-start gap-x-8 gap-y-4 items-center justify-between h-full";
export const LINK_STYLES =
  "text-gray-500 transition duration-300 hover:text-black dark:hover:text-white";
