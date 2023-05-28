
export interface InitBook {
  title: string,
  pages: number,
  author: string,
  description: string,
}

export interface Book extends InitBook {
  id: string,
  finishedUserIds: string[], // there'll be 0 or 1 whether like
  // image: ImageData,
}

export interface InitBook {
  creatorId: string,
  description: string,
  title: string,
}

// maybe 0 for nothing, 1 want, 2 now, 3 finished 
export interface ReadingList extends InitBook {
  id: string,
  bookIds: string[],
  likedUserIds: string[],
  createdAt: Date,
}

export interface Tag {
  id: string;
  bookIds: string[],
  listIds: string[]
}
