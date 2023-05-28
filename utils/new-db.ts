import { kv } from "./db.ts";
import { Book, InitBook, ReadingList } from "./db_interfaces.ts";


export async function getReadingListsByUserId(userId: string, options?: Deno.KvListOptions): Promise<ReadingList[]> {
  const iter = await kv.list<ReadingList>({ prefix: ["lists_by_user", userId] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  return items;
}


export async function createReadingList(initList: InitBook) {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["lists", id];
    const itemsByUserKey = ["lists_by_user", initList.creatorId, id];
    const list: ReadingList = {
      ...initList,
      id,
      createdAt: new Date(),
      bookIds: [],
      likedUserIds: []
    };

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .check({ key: itemsByUserKey, versionstamp: null })
      .set(itemKey, list)
      .set(itemsByUserKey, list)
      .commit();

    return list;
  }
}


export async function createBook(initBook: InitBook) {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["books", id];
    const itemsByUserKey = ["books_by_user", initBook.creatorId, id];
    const book: Book = {
      ...initBook,
      id,
      finishedUserIds: []
    };

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .check({ key: itemsByUserKey, versionstamp: null })
      .set(itemKey, book)
      .set(itemsByUserKey, book)
      .commit();

    return book;
  }
}

export async function getAllReadingLists(options?: Deno.KvListOptions) {
  const iter = await kv.list<ReadingList>({ prefix: ["lists"] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  return items;
}

export async function addBookToList(bookId: string, listId: string) {
  let res = { ok: false };
  while (!res.ok) {
    const listKey = ['lists', listId, 'book_ids', bookId];
    res = await kv.atomic().check({ key: listKey, versionstamp: null }).set(listKey, 1).commit();
    return 1;
  }
}

export async function removeBookFromList(bookId: string, listId: string) {
  let res = { ok: false };
  while (!res.ok) {
    const listKey = ['lists', listId, 'book_ids', bookId];
    res = await kv.atomic().check({ key: listKey, versionstamp: null }).set(listKey, 0).commit();
    return 1;
  }
}

