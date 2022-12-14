const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');


const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

//db config
const db = require("./config/keys").mongoURI;

//connect to mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected Successful"))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);


app.get("/", (_req, res) => res.send("Hello World!"));

//user routes 
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
