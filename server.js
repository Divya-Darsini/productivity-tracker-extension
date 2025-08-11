require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activity');
const prefRoutes = require('./routes/preferences');
const reportRoutes = require('./routes/reports');

const app = express();
app.use(cors()); // in prod, restrict origin
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/preferences', prefRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> app.listen(PORT, ()=>console.log('Server running', PORT)))
  .catch(err => console.error('mongo err', err));
