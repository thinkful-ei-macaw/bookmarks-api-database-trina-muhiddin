const uuid = require('uuid/v4');
const makeBookmarks = () => [
  { 
    id: 1,
    title: 'Google',
    url: 'https://google.com',
    description: 'A search engine.',
    rating: 4
  },
  { 
    id: 2,
    title: 'Thinkful',
    url: 'https://thinkful.com',
    description: 'Online coding bootcamp.',
    rating: 5
  },
  { 
    id: 3,
    title: 'Ebay',
    url: 'https://ebay.com',
    description: 'Buy sell trade.',
    rating: 4
  }
];

module.exports = { makeBookmarks };