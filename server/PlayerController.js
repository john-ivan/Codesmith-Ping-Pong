const Player = require('./PlayerModel');

const PlayerController = {
  createPlayer(req, res) {
    if (req.body.image === '') req.body.image = 'https://goo.gl/07oEzJ'
    const player = new Player({
      'name': req.body.name,
      'image': req.body.image,
      'wins': req.body.wins,
      'losses': req.body.losses
    });
    player.save((err, data) => {
      if (err) {
        res.status(418);
        res.send(err);
      } else {
        res.send(JSON.stringify(data));
      }
    });
  },

  updatePlayer(req, res) {
    // console.log('in UpdatePlayer', req.body)
    Player.update({'name': req.body.name }, { $set: { 'wins': req.body.wins, 'losses': req.body.losses } }, (err) =>{
      if (err) throw err;
      res.sendStatus(200);
    })
  },

  // Delete a player from the database
  // The player's first name will be sent in the request parameter 'name'
  // This should send a success status code
  deletePlayer(req, res) {

  }
};

module.exports = PlayerController;
