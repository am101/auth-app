const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

const URL = process.env.MONGO_URL;
mongoose.connect(
	URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	console.log('successfully connected to database')
);

//getting all routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

//middlewares
app.use(express.json());

//setting all middlewares
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);


const PORT = process.env.PORT;
app.listen(PORT, console.log(`server started on port ${PORT}`));
