import { kv } from "./db.ts";
import { Book, InitBook, InitReadingList, ReadingList } from "./db_interfaces.ts";

export async function getReadingListsByUserId(userId: string, options?: Deno.KvListOptions): Promise<ReadingList[]> {
  const iter = await kv.list<ReadingList>({ prefix: ["lists_by_user", userId] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  // console.log('list items from by user: ', items);
  return items;
}

export async function getAllBooks(options?: Deno.KvListOptions): Promise<Book[]> {
  const iter = await kv.list<Book>({ prefix: ["books"] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  return items;
}

export async function getBooksByReadingListId(id: string, options?: Deno.KvListOptions): Promise<Book[]> {
  const listIter = await kv.list<string>({ prefix: ["lists", id, 'book_ids'] }, options);
  const booksIter = await kv.list<Book>({ prefix: ['books', id] })
  const wantedBookIds: string[] = [];
  for await (const res of listIter) {
    wantedBookIds.push(res.value);
  }
  const books: Book[] = [];
  for await (const res of booksIter) {
    if (wantedBookIds.includes(res.value.id)) {
      books.push(res.value)
    }
  };
  return books;
}


export async function getReadingListByid(listId: string): Promise<ReadingList | null> {
  const res = await kv.get<ReadingList>(["lists", listId]);
  return res.value;

  // const items = [];
  // for await (const res of res) items.push(res.value);
  // console.log('list items: ', items)
  // return items;
}

export async function createReadingList(initList: InitReadingList) {
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


export async function createBook(initBook: InitBook): Promise<Book> {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["books", id];
    const book: Book = {
      ...initBook,
      id,
      finishedUserIds: [],
    };

    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, book)
      .commit();

    return book;
  }
}

export async function getAllReadingLists(options?: Deno.KvListOptions): Promise<ReadingList[]> {
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



export async function deleteList(userId: string, listId: string) {
  const itemKey = ["lists", listId];
  const itemsByUserKey = ["lists_by_user", userId, listId];

  const [
    itemRes,
    byUserRes
  ] = await kv.getMany<ReadingList[]>([
    itemKey,
    itemsByUserKey
  ]);

  const res = await kv.atomic()
    .check(itemRes)
    .check(byUserRes)
    .delete(itemKey)
    .delete(itemsByUserKey)
    .commit();

  if (!res.ok) {
    throw res;
  }
}
