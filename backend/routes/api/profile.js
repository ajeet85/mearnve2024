const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
//express router validator
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route    GET api/profile/userdata
// @desc     Get current users profile
// @access   Private
router.get('/userdata', auth, async (req, res) => {
  try {
   /* const profile = await Profile.findProfile({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );*/

    const profile = await Profile.findProfile(req.user.id);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboarddata', async (req, res) => {
  try {
   /* const profile = await Profile.findProfile({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );*/

    const profile = await Profile.findalldata();

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/',(req,res)=>res.send('profile route'));

module.exports = router;