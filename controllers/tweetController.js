const Tweet = require('../models/Tweet');

// GET
const getTweets = async (req, res) => {
  const tweets = await Tweet.find().sort({ createdAt: -1 });
  res.json(tweets);
};

// POST
const createTweet = async (req, res) => {
  const { user, content, userId } = req.body;

  if (!user || !content || !userId)
    return res.status(400).json({ error: "Champs manquants" });

  const newTweet = await Tweet.create({ user, content, userId });

  res.status(201).json(newTweet);
};


// DELETE
const deleteTweet = async (req, res) => {
  const tweet = await Tweet.findByIdAndDelete(req.params.id);
  if (!tweet) return res.status(404).json({ error: "Tweet introuvable" });
  res.json({ message: "Tweet supprimé" });
};

// PUT
const updateTweet = async (req, res) => {
  const tweet = await Tweet.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true }
  );
  if (!tweet) return res.status(404).json({ error: "Tweet introuvable" });
  res.json(tweet);
};

const getTweetsByUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID utilisateur manquant" });
  }

  try {
    const tweets = await Tweet.find({ userId: id }).sort({ createdAt: -1 });
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};


module.exports = { getTweets, createTweet, deleteTweet, updateTweet, getTweetsByUser };
