const BookmarksService = {
  getAllBookmarks(knex) {
    return knex.select('*').from('bookmarks_api');
  },

  insertBookmark(knex, newBookmark) {
    return knex
      .insert(newBookmark)
      .into('bookmarks_api')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from('bookmarks_api').select('*').where('id', id).first();
  },

  deleteBookmark(knex, id) {
    return knex('bookmarks_api')
      .where({id})
      .delete();
  },

  updateBookmark(knex, id, newBookmarkFields) {
    return knex('bookmarks')
      .where({id})
      .update(newBookmarkFields);
  }
};

module.exports = BookmarksService;