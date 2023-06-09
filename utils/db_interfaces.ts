
export interface InitBook {
  title: string,
  pages: number,
  author: string,
  description: string,
  coverUrl: string
  uploaderId: string,
}

export interface Book extends InitBook {
  id: string,
}
// finishedUserIds: string[], // there'll be 0 or 1 whether like

export interface InitReadingList {
  creatorId: string,
  description: string,
  title: string,
  backgroundImageUrl: string,
}

// maybe 0 for nothing, 1 want, 2 now, 3 finished 
export interface ReadingList extends InitReadingList {
  id: string,
  createdAt: Date,
}

export interface Tag {
  id: string;
}

export interface BookToListMapping {
  bookId: string;
  listId: string;
}

export interface TmpBook {
  name: string,
  size: number,
  id?: string
}

export interface BookReadData {
  start: Date,
  finish: Date | null
}