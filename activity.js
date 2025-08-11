const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');

// POST bulk activities
router.post('/', auth, async (req,res)=>{
  const activities = (req.body.activities || []).map(a => ({
    user: req.userId,
    url: a.url,
    domain: a.domain,
    title: a.title,
    startTime: a.startTime,
    endTime: a.endTime,
    durationSeconds: a.durationSeconds
  }));
  try{
    await Activity.insertMany(activities);
    res.send({saved: activities.length});
  }catch(err){
    console.error(err);
    res.status(500).send({error:'save failed'});
  }
});

module.exports = router;
