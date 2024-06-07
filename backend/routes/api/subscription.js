const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
//express router validator
const { check, validationResult } = require('express-validator');
const Subscription = require('../../models/Subscription');


router.post('/list',auth,async(req,res)=>{
   
  try{
    let payload = await Subscription.findAll();
  
  
    res.json({payload});

       // res.send('user register');
}catch (err) {
    res.status(500).send('Server error');
  }

   

});



router.post('/subscriptionSave', [
  check('email', 'Please include a valid email').isEmail()
],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(201).json({ errors: errors.array() });
  }

  const { email,status=1 } = req.body;

      try{
          //console.log(req.body);
          let subscription = await Subscription.findOne({ email });
          if (subscription && subscription.length) {
              return res
                .status(201)
                .json({ error:'subscription already exists' });
            }

              
              subscription = {
                  email,
                  status
                };
              
                subscription.status = '1';
             // console.log(user);
           let subscription_id=  await Subscription.save(subscription);
            //console.log('asasasa'+user_id);
           const payload = {
            subscription: {
                id: subscription_id
              }
            };
      

            res.json({success:'Subscribed successfully',payload});
            

             // res.send('user register');
      }catch (err) {
          console.error(err.message);
          res.status(201).send('Server error');
        }

});

router.post('/save',auth, [
  check('email', 'Please include a valid email').isEmail()
],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email,status } = req.body;

      try{
          let subscription = await Subscription.findOne({ email });
          if (subscription && subscription.length) {
              return res.status(201).json({ error: 'Subscription already exists' });
            }
            
            subscription = {
                  email,
                  status
                };
           let subscription_id=  await Subscription.save(subscription);
           
           const payload = {
              subscription: {
                id: subscription_id
              }
            };
      
            return res.status(201).json({ success: 'Subscription added successfully',payload });

      }catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
          
        }

});

router.get('/:id', auth, async (req, res) => {
  try {
    const data = await Subscription.findById(req.params.id);
    if (!data || data.length === 0) {
      return res.status(201).json({ status: false, error: 'Subscription not found' });
    }
    
    res.json({ data });
  } catch (err) {
    console.error(err.message);
    return res.status(201).json({ status: false, error: 'Server Error' });
  }
});


router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { email,status } = req.body;

  try {
    let data = await Subscription.findById(id);

    if (!data || data.length === 0) {
      return res.status(201).json({ error: 'Subscription not found' });
    }

    // Update user data
    data.email = email;
    data.status = status;
  
    await Subscription.update(data);

    res.json({ success: 'Subscription updated successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(201).json({ error: 'Server error' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Subscription.delete(id);
    if (deleted) {
      return res.json({ status: true, success: 'Subscription deleted successfully' });
    } else {
      return res.status(201).json({ status: false, error: 'Subscription not found' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(201).json({ status: false, error: 'Server Error' });
  }
});




module.exports = router;