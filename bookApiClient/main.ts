import {BookResponse} from './BookResponse.ts';

type BookRecord={
  isbn:string, 
  presenceRationale:string,
  averagePages:number,
}

type BookDisplayed= {
record:BookRecord,
// todo add here the properties from fetching, such as description
}
// reading list can be kept as it is


export async function getWork(id:string):WorkResponse{

  const response = await fetch( `https://openlibrary.org/works/${id}.json`
, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Basic ${auth}`,
    },
 //   body: object,
  });
  const data = await response.json();
  console.log(data);
}


export async function getBook(id:string):BookResponse{

  const response = await fetch( `https://openlibrary.org/books/${id}.json`
, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Basic ${auth}`,
    },
 //   body: object,
  });
  const data = await response.json();
  console.log(data);
}

const testId ="OL45804W";
getBook(testId);

const t2 ="OL45804W/editions";
getWork(t2);

