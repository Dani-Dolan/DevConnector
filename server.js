const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');


const app = express();

//db config
const db = require("./config/keys").mongoURI;

//connect to mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected Successful"))
  .catch((err) => console.log(err));

app.get("/", (_req, res) => res.send("Hello World!"));

//user routes 
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
