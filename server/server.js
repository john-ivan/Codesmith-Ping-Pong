const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

const playerController = require('./PlayerController');
const Player = require('./PlayerModel');

mongoose.connect('mongodb://cs-ping-pong-roster');
mongoose.connection.once('open', (err) => {
  if (err) throw err;
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const playerRouter = express.Router(); // Will I use this?

app.get('/', (req, res) => {
  res.set({
    'Content-Type': 'text/html; charset=UTF-8' });
  res.status(200);
  res.end(fs.readFileSync(__dirname + '/index.html'));
});

app.post('/', playerController.createPlayer);

app.post('/:name', playerController.updatePlayer)

// Delete a player from the database
// localhost://3001/player/"name"
// playerRouter.delete('/:name', playerController.deletePlayer);

app.use('/player', playerRouter);

app.use(cors());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: 'oCq4PIZ6dZUyGVHWR-AaD6Sr0MzGwXXLcDtsMJsOU2U1vWJ_fLdSCSueaMFbQ_1Q',
  audience: 'mvkhO3zHQdyTSncKbpqGcYoJljpGxGgN'
});

let contacts;
Player.find({}, (err, data) => {
  contacts = data;
});

app.get('/api/contacts', (req, res) => {
  const allContacts = contacts.map(contact => {
    return { _id: contact._id, name: contact.name}
  });
  res.json(allContacts);
});

app.get('/api/contacts/:_id', authCheck, (req, res) => {
  res.json(contacts.filter(contact => contact._id === parseInt(req.params._id)));
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
