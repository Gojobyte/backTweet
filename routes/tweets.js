const express = require('express');
const router = express.Router();
const {
  getTweets,
  createTweet,
  deleteTweet,
  updateTweet,
  getTweetsByUser
} = require('../controllers/tweetController');

router.get('/', getTweets);
router.post('/', createTweet);
router.delete('/:id', deleteTweet);
router.put('/:id', updateTweet);
router.get('/user/:id', getTweetsByUser);


module.exports = router;
