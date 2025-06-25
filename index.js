const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // 
const authRoutes = require("./routes/auth");
dotenv.config();

const tweetRoutes = require('./routes/tweets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // ✅ Autorise les appels depuis ton frontend
app.use(express.json());
app.use('/api/tweets', tweetRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ Erreur MongoDB :', err));
