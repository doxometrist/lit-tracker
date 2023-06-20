import { BookReadData } from "./db_interfaces.ts";


export function startBook(bookId: string, userId: string) {
  const date = new Date();
  // todo post this to the kv
  const key = `user/${userId}/book/${bookId}/start/${date}`

}


export function finishBook(bookId: string, userId: string) {
  const date = new Date();
  const key = `user/${userId}/book/${bookId}/end/${date}`

}

export function listAllReadBooks() {
  // todo list all by the key
}