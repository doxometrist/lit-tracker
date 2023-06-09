// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { User } from "@/utils/db.ts";
import { Book } from "@/utils/db_interfaces.ts";
import { BUTTON_STYLES, SMALL_BUTTON_STYLES } from "../utils/constants.ts";

export interface BookCardProps {
  book: Book;
  user: User | null;
}
const MAX_IMAGE_HEIGHT = 180;
const MAX_IMAGE_WIDTH = 180;
const ARCHIVE_ROOT = "https://www.annas-archive.org/search?q=";

function getArchiveLink(title: string): string {
  const newStr = title.replace(/\s/g, "+");
  return ARCHIVE_ROOT.concat(newStr);
}

export default function BookCard(props: BookCardProps) {
  const archiveLink = getArchiveLink(props.book.title);
  return (
    <div class="p-2 m-2 bg-primary2 rounded-lg flex flex-col gap-2 text-gray-500 ">
      <img
        src={props.book.coverUrl}
        height={MAX_IMAGE_HEIGHT}
        width={MAX_IMAGE_WIDTH}
      />
      <span class="mr-2">
        <a
          class="text-black hover:underline"
          href={`/books/${props.book.id}`}
        >
          {props.book.title} by {props.book.author}
        </a>
      </span>
      <div class="min-w-20 flex flex-row ">
        <span class="m-2 p-2">pages:{"  "}{props.book.pages}</span>
        <button class={`${SMALL_BUTTON_STYLES} m-2 p-2`}>
          <a href={archiveLink} class="text-bone underline">
            <img
              src="https://www.annas-archive.org/favicon.ico"
              height={20}
              width={20}
            />
            Find it online...
          </a>
        </button>
      </div>
    </div>
  );
}
