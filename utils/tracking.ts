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

