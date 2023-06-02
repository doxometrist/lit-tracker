// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { User } from "@/utils/db.ts";
import { Book } from "@/utils/db_interfaces.ts";

export interface BookCardProps {
  book: Book;
  user: User | null;
}
const MAX_IMAGE_HEIGHT = 80;
const MAX_IMAGE_WIDTH = 80;

export default function BookCard(props: BookCardProps) {
  return (
    <div class="py-2 flex gap-2 text-gray-500">
      <div>
        <span class="mr-2">
          <a
            class="text-black hover:underline"
            href={`/books/${props.book.id}`}
          >
            {props.book.title}
          </a>
        </span>
        <img
          src={props.book.coverUrl}
          height={MAX_IMAGE_HEIGHT}
          width={MAX_IMAGE_WIDTH}
        />
      </div>
    </div>
  );
}
