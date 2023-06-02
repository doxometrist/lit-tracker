
export interface InitBook {
  title: string,
  pages: number,
  author: string,
  description: string,
  uploaderId: string,
  coverUrl: string
}

export interface Book extends InitBook {
  id: string,
  finishedUserIds: string[], // there'll be 0 or 1 whether like
  // image: ImageData,
}

export interface InitReadingList {
  creatorId: string,
  description: string,
  title: string,
  backgroundImageUrl: string, 
}

// maybe 0 for nothing, 1 want, 2 now, 3 finished 
export interface ReadingList extends InitReadingList {
  id: string,
  likedUserIds: string[],
  createdAt: Date,
}

export interface Tag {
  id: string;
}

export interface BookToListMapping {
  bookId: string;
  listId: string;
}

