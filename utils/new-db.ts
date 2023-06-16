import { kv } from "@/utils/db.ts";
import { Book, BookToListMapping, InitBook, InitReadingList, ReadingList, TmpBook } from "./db_interfaces.ts";
import { DEFAULT_AUTHOR, DEFAULT_IMG } from "./constants.ts";

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

export async function getBooksByReadingListId(listId: string, options?: Deno.KvListOptions): Promise<Book[]> {
  // console.log('list id: ', listId);
  if (listId === undefined) return [];
  const bookIdsIter = await kv.list<string>({ prefix: ['list_to_book', listId] })

  const bookIds: string[] = [];
  for await (const res of bookIdsIter) bookIds.push(res.key.at(-1).toString());

  const unfilteredBooks: (Book | null)[] = await Promise.all(bookIds.map(async id => await getBookById(id)));
  const books: Book[] = unfilteredBooks.filter(b => b !== null) as Book[];

  return books;
}

export async function getReadingListByid(listId: string): Promise<ReadingList | null> {
  const res = await kv.get<ReadingList>(["lists", listId]);
  return res.value;
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
      likedUserIds: []
    };
    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .check({ key: itemsByUserKey, versionstamp: null })
      .set(itemKey, list)
      .set(itemsByUserKey, list)
      .commit();
  }
  return 1;
}

export async function createBook(initBook: InitBook): Promise<string> {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["books", id];
    const book: Book = {
      ...initBook,
      author: initBook.author === "" ? DEFAULT_AUTHOR : initBook.author,
      coverUrl: initBook.coverUrl === "" ? DEFAULT_IMG : initBook.coverUrl,
      id,
      finishedUserIds: [],
    };
    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, book)
      .commit();
    return id;
  }
}

export async function getBookById(bookId: string): Promise<Book | null> {
  const res = await kv.get<Book>(["books", bookId]);
  return res.value;
}

export async function getAllReadingLists(options?: Deno.KvListOptions): Promise<ReadingList[]> {
  const iter = await kv.list<ReadingList>({ prefix: ["lists"] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  return items;
}

export async function addBookToList(bookId: string, listId: string, userId: string) {
  console.log('adding book to list: ', bookId, listId, userId);

  const list: ReadingList | null = await getReadingListByid(listId);
  if (!list) {
    throw Error(`list with id: ${listId} does not exist`)
  }

  if (list.creatorId !== userId) {
    throw Error(`list with id: ${listId} does not belong to user: ${userId}`)
  }
  let res: Deno.KvCommitResult | Deno.KvCommitError = { ok: false };
  // const mapping: BookToListMapping = {
  //   bookId,
  //   listId
  // };
  while (!res.ok) {
    const bookKey = ["book_to_list", bookId, listId];
    const listKey = ["list_to_book", listId, bookId];

    res = await kv.atomic()
      .check({ key: bookKey, versionstamp: null })
      .check({ key: listKey, versionstamp: null })
      .set(bookKey, 1)
      .set(listKey, 1)
      .commit();

    console.log('res: ', res);
  }
  return res;
}

export async function updateList(listId: string, newList: ReadingList, userId: string) {
  let res: Deno.KvCommitResult | Deno.KvCommitError = { ok: false };
  console.log('updating the list: ', listId, 'with new list object: ', newList);
  while (!res.ok) {
    const itemKey = ["lists", listId];
    const itemsByUserKey = ["lists_by_user", userId, listId];
    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .check({ key: itemsByUserKey, versionstamp: null })
      .set(itemKey, newList)
      .set(itemsByUserKey, newList)
      .commit();

    // console.log('res: ', res);
  }
  return res;
}

export async function updateBook(bookId: string, newBook: InitBook, userId: string) {
  let res: Deno.KvCommitResult | Deno.KvCommitError = { ok: false };
  while (!res.ok) {
    const itemKey = ["books", bookId];
    console.log('updating the list: ', bookId, 'with new list object: ', newBook);
    // todo need to outline more of the CRUD operation
    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, newBook)
      .commit();
    console.log('res: ', res);
  }
  return res;
}

export async function removeBookFromList(bookId: string, listId: string) {
  let res = { ok: false };
  while (!res.ok) {

    const bookKey = ["book_to_list", bookId, listId];
    const listKey = ["list_to_book", listId, bookId];

    res = await kv.atomic()
      .check({ key: bookKey, versionstamp: null })
      .check({ key: listKey, versionstamp: null })
      .delete(bookKey)
      .delete(listKey)
      .commit();

    res = await kv.atomic().check({ key: listKey, versionstamp: null }).set(listKey, 0).commit();
  }
  return 1;
}


export async function deleteList(userId: string, listId: string) {
  const itemKey = ["lists", listId];
  const itemsByUserKey = ["lists_by_user", userId, listId];
  const [
    itemRes,
    byUserRes,
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

  const mappingKey = ["list_to_book", listId];
  const [mappingRes] = await kv.getMany<string[]>([mappingKey]);
  const mapping = await kv.atomic()
    .check(mappingRes)
    .delete(mappingKey)
    .commit();

  if (!mapping.ok) {
    throw mapping
  }
}



export async function deleteBook(bookId: string, userId: string) {
  const book = await getBookById(bookId);
  if (userId !== book?.uploaderId) {
    throw 404
  }

  const basicKey = ["books", bookId];
  const [itemRes] = await kv.getMany<ReadingList[]>([basicKey,]);
  const res = await kv.atomic()
    .check(itemRes)
    .delete(basicKey)
    .commit();

  if (!res.ok) {
    throw res;
  }

  const mappingKey = ["book_to_list", bookId];
  const [mappingRes] = await kv.getMany<string[]>([mappingKey]);
  const mapping = await kv.atomic()
    .check(mappingRes)
    .delete(mappingKey)
    .commit();

  if (!mapping.ok) {
    throw mapping
  }
}

export async function massUpload(initList: InitReadingList, books: InitBook[], userId: string) {
  createReadingList(initList);
  const listId = "1";
  // todo need to have the right id from that
  books.forEach(async (book, index) => {
    const id = await createBook(book)
    addBookToList(id, listId, userId)
  });
  return 1;
}

export async function saveTmpBook(shortform: TmpBook, userId: string): Promise<string> {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["tmp_book", userId];
    shortform.id = id;
    console.log(`thing: ${shortform.name}, key: ${itemKey}`)
    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .set(itemKey, shortform)
      .commit();
    return id;
  }
}


export async function resetTmpBooksByUserId(userId: string): Promise<string> {
  let res = { ok: false };
  while (!res.ok) {
    const itemKey = ["tmp_book", userId];
    res = await kv.atomic()
      .check({ key: itemKey, versionstamp: null })
      .delete(itemKey)
      .commit();
    return id;
  }
}

export async function getTmpBooksById(userId: string, options?: Deno.KvListOptions): Promise<TmpBook[]> {
  const iter = await kv.list<TmpBook>({ prefix: ["tmp_book", userId] }, options);
  const items = [];
  for await (const res of iter) items.push(res.value);
  console.log('list items from by user: ', items);
  return items;
}
