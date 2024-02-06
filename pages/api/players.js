import mongoose from 'mongoose';

// Connect to MongoDB using environment variable
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  score: Number
});

const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, age, country, score } = req.body;
      const player = new Player({ name, age, country, score });
      await player.save();
      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const players = await Player.find().sort({ score: -1 }).limit(10); // Get top 10 players by score
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
