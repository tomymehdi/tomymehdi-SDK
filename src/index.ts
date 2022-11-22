const axios = require('axios');

export async function books(): Promise<any> {
  const result = await axios.get('https://the-one-api.dev/v2/book');
  return result.data;
}

export async function book(id: String): Promise<any> {
  const result = await axios.get(`https://the-one-api.dev/v2/book/${id}`);
  return result.data;
}

export async function bookChapters(id: String): Promise<any> {
  const result = await axios.get(`https://the-one-api.dev/v2/book/${id}/chapter`);
  return result.data;
}

export async function booksWithChapters(): Promise<any> {
  const booksResult: any = await axios.get('https://the-one-api.dev/v2/book');
  // console.log('booksResult.data: ', booksResult.data)

  var booksChaptersPromises: any = [];
  booksResult.data.docs.forEach( async (elem: any) => {
    // console.log('elem._id: ', elem._id)
    booksChaptersPromises.push(axios.get(`https://the-one-api.dev/v2/book/${elem._id}/chapter`));
  })
  // console.log('booksChaptersPromises: ', booksChaptersPromises)

  const bookChapters: any = await Promise.all(booksChaptersPromises);
  // console.log('bookChapters: ', bookChapters)

  const resp = booksResult.data.docs.map( (elem: any, index: any) => {
    return {
      ...elem,
      chapters: bookChapters[index].data.docs
    }
  })
  // console.log('resp: ', resp)
  return { docs: resp }
}

export default {
  books,
  book,
  bookChapters,
  booksWithChapters,
};
