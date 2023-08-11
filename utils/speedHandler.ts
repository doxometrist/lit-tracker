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

// todo function to update user speed speed profile, then predict a trend. only hours per week should change fro
//
//
//

const AGI_DATE = new Date("31.12.2032");
export function timToAgi():number{
  const now = new Date();
  return now - AGI_DATE;

}

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


// structure user/userid/book/isbn/{
// start_date
// end_date

// todo for the data to be derived in the right format need the graph api actually

type BookReadEvent = {
  pages: number;
  days: number;
};

const computeReadingSpeed = (events: BookReadEvent[]): { mean: number; stdDev: number } => {
  const totalSpeeds = 0;
  for (const event of events) {
    totalSpeeds += event.pages / event.days;
  }

  const meanSpeed = totalSpeeds / events.length;

  const variance = 0;
  for (const event of events) {
    const speed = event.pages / event.days;
    variance += (speed - meanSpeed) ** 2;
  }

  const stdDev = Math.sqrt(variance / events.length);

  return { mean: meanSpeed, stdDev: stdDev };
};

const predictReadingTime = (bookPages: number, events: BookReadEvent[]): { minDays: number; likelyDays: number; maxDays: number } => {
  const { mean, stdDev } = computeReadingSpeed(events);

  // We use 1 standard deviation for our prediction range as an example, but you can adjust this.
  return {
    minDays: bookPages / (mean + stdDev),
    likelyDays: bookPages / mean,
    maxDays: bookPages / (mean - stdDev)
  };
};

// Example usage
const readingEvents: BookReadEvent[] = [
  // ... Your array of 10 reading events ...
];

const prediction = predictReadingTime(300, readingEvents);  // Predicting for a 300-page book.
console.log(`You'll likely finish in ${prediction.likelyDays} days. It could be as quick as ${prediction.minDays} days or as long as ${prediction.maxDays} days.`);

