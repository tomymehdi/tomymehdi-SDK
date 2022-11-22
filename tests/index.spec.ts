import 'mocha';
import { assert } from 'chai';

// In case we need to mock external api calls
import nock from 'nock'
// In case we need to stub functions
import sinon from 'sinon'


import { helloWorld, goodBye, externalRESTApi, externalRESTApi2 } from '../src/index';
import npmPackage from '../src/index';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.isObject(npmPackage);
  });

  it('should have a helloWorld property', () => {
    assert.property(npmPackage, 'helloWorld');
  });
});

describe('Hello World Function', () => {
  it('should be a function', () => {
    assert.isFunction(helloWorld);
  });

  it('should return the hello world message', () => {
    const expected = 'Hello World from my example modern npm package!';
    const actual = helloWorld();
    assert.equal(actual, expected);
  });
});

describe('Goodbye Function', () => {
  it('should be a function', () => {
    assert.isFunction(goodBye);
  });

  it('should return the goodbye message', () => {
    const expected = 'Goodbye from my example modern npm package!';
    const actual = goodBye();
    assert.equal(actual, expected);
  });
});

import path from 'path'
describe('External REST API Call', () => {
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
    assert.isFunction(externalRESTApi);
  });

  it('should return an id', async () => {
    const { nockDone } = await nock.back("search_for_project.json");
    
    const actual = await externalRESTApi();
    assert.equal(actual.status, 200);
    
    nockDone();
  });

  it('should return an doc', async () => {
    const { nockDone } = await nock.back("search_for_project2.json");

    const actual = await externalRESTApi2();
    assert.equal(actual.status, 200);

    nockDone();
  });


});
