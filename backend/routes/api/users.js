const express=require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');


//express router validator
const { check, validationResult } = require('express-validator');

//user model  call 
const User = require('../../models/User');


// @route    POST api/users
// @desc     Register user
// @access   Public

router.get('/',(req,res)=>res.send('user route'));

router.get('/checkuserdata',async(req,res)=>{
   
  try{
    let payload = await User.findAll();
  
  
    res.json({payload});

       // res.send('user register');
}catch (err) {
    res.status(500).send('Server error');
  }

   

});

router.post('/userlist',auth,async(req,res)=>{
   
  try{
    let payload = await User.findAll();
  
  
    res.json({payload});

       // res.send('user register');
}catch (err) {
    res.status(500).send('Server error');
  }

   

});

router.post('/register', [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,status=1 } = req.body;

        try{
            let user = await User.findOne({ email });
          
            if (user && user.length) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: 'User already exists' }] });
              }

                const salt = await bcrypt.genSalt(10);
                user = {
                    name,
                    email,
                    password,
                    status
                  };
                user.password = await bcrypt.hash(password, salt);
                user.status = '1';
             let user_id=  await User.save(user);
              //console.log('asasasa'+user_id);
             const payload = {
                user: {
                  id: user_id
                }
              };
        
              jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                  if (err) throw err;
                  res.json({payload,token });
                }
              );

               // res.send('user register');
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }

});

// @route   DELETE api/users/:id
// @desc    Delete a user by ID
// @access  Private (requires authentication)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.delete(userId);
    if (deleted) {
      return res.json({ status: true, success: 'User deleted successfully' });
    } else {
      return res.status(201).json({ status: false, error: 'User not found' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(201).json({ status: false, error: 'Server Error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.length === 0) {
      return res.status(201).json({ status: false, error: 'User not found' });
    }
    
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    return res.status(201).json({ status: false, error: 'Server Error' });
  }
});



router.post('/save-user',auth, [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password,status } = req.body;

      try{
          let user = await User.findOne({ email });
        
          if (user && user.length) {
              return res.status(201).json({ error: 'User already exists' });
            }

              const salt = await bcrypt.genSalt(10);
              user = {
                  name,
                  email,
                  password,
                  status
                };
              user.password = await bcrypt.hash(password, salt);
             // console.log(user);
           let user_id=  await User.save(user);
            //console.log('asasasa'+user_id);
           const payload = {
              user: {
                id: user_id
              }
            };
      
            return res.status(201).json({ success: 'User added successfully' });

             // res.send('user register');
      }catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
          
        }

});


// @route   PUT api/users/:id
// @desc    Update a user by ID
// @access  Private (requires authentication)
router.put('/:id', auth, async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, status } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user || user.length === 0) {
      return res.status(201).json({ error: 'User not found' });
    }

    // Update user data
    user.name = name;
    user.email = email;
    user.status = status;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await User.update(user);

    res.json({ success: 'User updated successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(201).json({ error: 'Server error' });
  }
});



// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public



router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 3 or more characters'
  ).isLength({ min: 3 })
],async(req,res)=>{
   
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

      try{
          let user = await User.findOne({ email });
       // console.log(user);
          if (user.length==0) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'User not found' }] });
            }else{
             //console.log(user[0].id);
             bcrypt.compare(password, user[0].password).then(isMatch => {
              if (isMatch) {
                const payload = { id: user[0].id, name: user[0].name }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                  payload,
                  config.get('jwtSecret'),
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      userdata:payload,
                      token: token
                    });
                  }
                );
              }else{
                
                return res
                .status(400)
                .json({ errors: [{ msg: 'Password not mactched'}] });
              }

            });

          }
            // Check Password
    
             // res.send('user register');
      }catch (err) {
          console.error(err.message);
          res.status(500).send('Server error in login process');
        }

});


module.exports = router;