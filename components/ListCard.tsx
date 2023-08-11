// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { User } from "@/utils/db.ts";
import { Book, ReadingList } from "../utils/db_interfaces.ts";

export function pluralize(unit: number, label: string) {
  return unit === 1 ? `${unit} ${label}` : `${unit} ${label}s`;
}

/** @todo Replace with https://deno.land/std@0.184.0/datetime/mod.ts?s=difference */
export function timeAgo(time: number | Date) {
  const between = (Date.now() - Number(time)) / 1000;
  if (between < 3600) return pluralize(~~(between / 60), "minute");
  if (between < 86400) return pluralize(~~(between / 3600), "hour");
  return pluralize(~~(between / 86400), "day");
}

export interface ListCardProps {
  list: ReadingList;
  user: User | null;
  followed: boolean;
  booksNumber: number;
}

const defaultBackgroundImage =
  "https://image.lexica.art/full_jpg/dc405187-a365-4a8a-b76f-5743bf72e88f";
export default function ListCard(props: ListCardProps) {
  return (
    <div class="p-2 m-2 flex gap-2 bg-primary2 text-gray-500">
      <div>
        <img
          src={props.list.backgroundImageUrl === "" ||
              props.list.backgroundImageUrl === undefined
            ? defaultBackgroundImage
            : props.list.backgroundImageUrl}
          width={200}
          height={200}
        />
      </div>
      <div>
        <span class="mr-2">
          <a
            class="text-black hover:underline"
            href={`/lists/${props.list.id}`}
          >
            {props.list.title}
          </a>
        </span>
        <h3>Books number: {props.booksNumber}</h3>
        <p>
          {props.user && props.user.login}{" "}
          {props.user?.isSubscribed && <span title="Premium user">🦕{" "}
          </span>}
          {timeAgo(new Date(props.list.createdAt))} ago
        </p>
      </div>
    </div>
  );
}
