const express=require('express');
const router= express.Router();
const auth =require('../../middleware/auth');
//user model  call 
const User = require('../../models/User');

// @route    POST api/auth
// @desc     Register user
// @access   Public

router.get('/', auth, async (req, res) => {
    try {
        // console.log(req);
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;