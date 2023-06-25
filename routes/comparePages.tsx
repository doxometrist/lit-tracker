import { Book } from "@/utils/db_interfaces.ts";

export function comparePages(a: Book, b: Book) {
  const x = Number(a.pages);
  const y = Number(b.pages);
  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  return 0;
}
