require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();
// mongoose.connect(
//   "mongodb+srv://omnistack:omnistack@cluster0-l6do1.mongodb.net/omnistack8?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true
//   }
// );

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
