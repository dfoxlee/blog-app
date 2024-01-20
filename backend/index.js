const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/blogs', blogsRouter);

const start = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      app.listen(PORT, () =>
         console.log(`Server listening on http://localhost:${PORT}`)
      );
   } catch (error) {
      console.log(error);
   }
};

start();
