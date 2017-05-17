const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.connect('mongodb://localhost/cs-ping-pong-roster');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const playerSchema = new Schema({
  name: String,
  image: String,
  wins:  { type: Number, default: 0 },
  losses: { type: Number, default: 0 }
}, { collection: 'players' });

playerSchema.plugin(autoIncrement.plugin, 'Player');

const Player = connection.model('Player', playerSchema);
module.exports = Player;
