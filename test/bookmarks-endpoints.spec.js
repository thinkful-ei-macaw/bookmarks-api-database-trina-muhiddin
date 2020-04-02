const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeBookmarks } = require('../src/fixture');

describe('Bookmarks Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('bookmarks_api').truncate());

  context('Given there are bookmarks in the database', () => {
    const testBookmarks = makeBookmarks();
    beforeEach('insert bookmarks', () => {
      return db
        .into('bookmarks_api')
        .insert(testBookmarks);
    });

    it('GET /bookmarks responds with 200 and all of the bookmarks', () => {
      return supertest(app)
        .get('/bookmarks')
        .expect(200);
    });
  });
});