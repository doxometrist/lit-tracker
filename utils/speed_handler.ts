import { Book } from "@/utils/db_interfaces.ts";

interface UserSpeedProfile {
  wordsPerMinute: number,
  hoursPerWeek: number,
}



const averageWordsPerPage = 250;

export function getPagesPerWeek(profile: UserSpeedProfile): number {
  return Math.ceil(profile.wordsPerMinute * 60 * profile.hoursPerWeek / averageWordsPerPage);
}

export function getBookReadingTimeInWeeks(profile: UserSpeedProfile, book: Book): number {
  const pages = book.pages;
  const speed = getPagesPerWeek(profile);
  return Math.ceil(pages / speed);
}

// todo add the async function only using user id and list id, then calling this
export function getListReadingTimeInWeeks(profile: UserSpeedProfile, books: Book[]): number {
  const totalPages: number = books.reduce((prev, curr) => prev + curr.pages, 0);
  const speed = getPagesPerWeek(profile);
  return Math.ceil(totalPages / speed);
}

interface FinishRecord {
  start: Date,
  finish: Date,
  bookId: string,
}

// todo function to update user speed speed profile, then predict a trend. only hours per week should change fr
