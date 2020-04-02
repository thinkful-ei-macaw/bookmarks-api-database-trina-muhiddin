const express = require('express');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger');
const uuid = require('uuid/v4');
const validUrl = require('valid-url');
const BookmarksService = require('./bookmarks-service');

bookmarkRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const db = req.app.get('db');
    BookmarksService.getAllBookmarks(db)
      .then(bookmarks => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description = '', rating } = req.body;

    for (const field of ['title', 'url', 'rating']) {
      if (!req.body[field]) {
        logger.error(`'${field}' is required`);
        return res.status(400).send('Invalid data');
      }
    }
    if(!Number.isInteger(rating) || rating < 1 || rating > 5) {
      logger.error(`'${rating}' is invalid`);
      return res.status(400).send('Rating should be an integer between 1 and 5');
    }
   
    if(!validUrl.isUri(url)){
      logger.error(`'${url}' is invalid`);
      return res.status(400).send('url must be a valid url');
    }

    const id = uuid();
    const bookmark = {
      id: uuid(),
      title,
      url,
      description,
      rating
    };

    store.bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmark/${id}`)
      .json({ id });
  });

bookmarkRouter
  .route('/bookmarks/:bookmark_id')
  .get((req, res, next) => {
    const db = req.app.get('db');
    const { bookmark_id } = req.params;
    BookmarksService.getById(db, bookmark_id)
      .then(bookmark => {
        res.json(bookmark);
        if (!bookmark) {
          logger.error(`Oops we lost ${bookmark_id}. Maybe it doesn't exist?`);
          return res.status(404).send('Bookmark Not Found');
        }
      });    
  })
  .delete((req, res) => {
    const { bookmark_id } = req.params;
    const bookmarkIndex = store.bookmarks.findIndex(
      mark => mark.id === bookmark_id
    );

    if (bookmarkIndex === -1) {
      logger.error(`Oops we lost ${bookmark_id}. Maybe it doesn't exist?`);
      return res.status(404).send('Bookmark Not Found');
    }

    store.bookmarks.splice(bookmarkIndex, 1);

    logger.info(`${bookmark_id} deleted.`);
    res.status(204).end();
  });

module.exports = bookmarkRouter;
