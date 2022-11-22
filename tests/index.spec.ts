import 'mocha';
import { assert, expect } from 'chai';
import path from 'path'
// In case we need to mock external api calls
import nock from 'nock'
// In case we need to stub functions
// import sinon from 'sinon'


import { books, book, bookChapters, booksWithChapters } from '../src/index';
import npmPackage from '../src/index';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.isObject(npmPackage);
  });

  it('should have a books property', () => {
    assert.property(npmPackage, 'books');
  });

  it('should have a book property', () => {
    assert.property(npmPackage, 'book');
  });

  it('should have a bookChapters property', () => {
    assert.property(npmPackage, 'bookChapters');
  });

  it('should have a booksWithChapters property', () => {
    assert.property(npmPackage, 'booksWithChapters');
  });
});

describe('Books Function', () => {
  before(() => {
    nock.back.fixtures = path.join(`${__dirname}`, 'fixtures');
  });

  after(async () => {
    nock.restore();
  });

  beforeEach(() => {
    nock.back.setMode('record');
  });

  afterEach(async () => {
    nock.back.setMode('wild');
    nock.cleanAll();
  });

  it('should be a function', () => {
    assert.isFunction(books);
  });

  it('should return a list of books', async () => {
    const { nockDone } = await nock.back("books.json");

    const booksResponse = await books();
    assert.equal(booksResponse.docs.length, 3);
    expect(booksResponse.docs[0]).to.have.keys(['_id', 'name']);
    expect(booksResponse.docs[0]).to.have.keys(['_id', 'name']);
    expect(booksResponse.docs[0]).to.have.keys(['_id', 'name']);

    nockDone();
  });
});

describe('Book Function', () => {
  before(() => {
    nock.back.fixtures = path.join(`${__dirname}`, 'fixtures');
  });

  after(async () => {
    nock.restore();
  });

  beforeEach(() => {
    nock.back.setMode('record');
  });

  afterEach(async () => {
    nock.back.setMode('wild');
    nock.cleanAll();
  });

  it('should be a function', () => {
    assert.isFunction(book);
  });

  it('should return a book', async () => {
    const { nockDone } = await nock.back("book.json");

    const bookId = '5cf5805fb53e011a64671582'
    const bookResponse = await book(bookId);
    expect(bookResponse.docs[0]).to.have.keys(['_id', 'name']);

    nockDone();
  });
});

describe('Book Chapters', () => {
  before(() => {
    nock.back.fixtures = path.join(`${__dirname}`, 'fixtures');
  });

  after(async () => {
    nock.restore();
  });

  beforeEach(() => {
    nock.back.setMode('record');
  });

  afterEach(async () => {
    nock.back.setMode('wild');
    nock.cleanAll();
  });

  it('should be a function', () => {
    assert.isFunction(bookChapters);
  });

  it('should return the chapters of a book', async () => {
    const { nockDone } = await nock.back("book_chapters.json");

    const bookId = '5cf5805fb53e011a64671582'
    const bookChaptersResponse = await bookChapters(bookId);
    assert.equal(bookChaptersResponse.docs.length, 22);
    expect(bookChaptersResponse.docs[0]).to.have.keys(['_id', 'chapterName']);
    expect(bookChaptersResponse.docs[0]).to.have.keys(['_id', 'chapterName']);
    expect(bookChaptersResponse.docs[0]).to.have.keys(['_id', 'chapterName']);

    nockDone();
  });
});

describe('Books with Chapters Function', () => {
  before(() => {
    nock.back.fixtures = path.join(`${__dirname}`, 'fixtures');
  });

  after(async () => {
    nock.restore();
  });

  beforeEach(() => {
    nock.back.setMode('record');
  });

  afterEach(async () => {
    nock.back.setMode('wild');
    nock.cleanAll();
  });

  it('should be a function', () => {
    assert.isFunction(booksWithChapters);
  });

  it('should return a list of books with its chapters', async () => {
    const { nockDone } = await nock.back("books_with_chapters.json");

    const booksWithChaptersResponse = await booksWithChapters();
    assert.equal(booksWithChaptersResponse.docs.length, 3);
    expect(booksWithChaptersResponse.docs[0]).to.have.keys(['_id', 'name', 'chapters']);
    expect(booksWithChaptersResponse.docs[0]).to.have.keys(['_id', 'name', 'chapters']);
    expect(booksWithChaptersResponse.docs[0]).to.have.keys(['_id', 'name', 'chapters']);

    nockDone();
  });
});