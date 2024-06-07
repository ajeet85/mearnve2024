const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
//express router validator
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');


const multer = require('multer');
const path = require('path');
const { register } = require('module');
const Register = require('../../models/Register');



// @route    POST api/post
// @desc     Register user
// @access   Public


// Set storage engine for multer
const storage = multer.diskStorage({
  //destination: '../../client/public/', // Specify the directory where uploaded files will be stored ../../client/public/images
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image'); // 'image' is the name attribute of the file input in the form


// Check file type
function checkFileType(file, cb){
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images only!');
  }
}





router.get('/',(req,res)=>res.send('post route'));


router.post('/registerlist',auth,async(req,res)=>{
   
  try{
    //console.log(req.body);
    let data = await Register.findAll();
  
  
    res.json(data);

       // res.send('user register');
}catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

   

});



router.post('/editRegister/:postId', [
  upload, // Include multer middleware for file upload
  check('firstname', 'firstname is required').not().isEmpty(),
],async(req,res)=>{
   
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname,lastname,company,email,phone,website,location,interestArea,message } = req.body;
  const postId = req.params.postId;
      try{
         
          let post = await Register.findOne({ id:postId });
      
         
        
          if (post !== null && Object.keys(post).length !== 0) {
            // Post found, return success response
             let register = {
              id:postId,
              firstname,
              lastname,
              company,
              email,
              phone,
              website,
              location,
              interestArea,
              message
            };
            
            console.log(register);
       let post_id=  await Register.update(register);
        //console.log('asasasa'+user_id);        
        return res.status(200).json({ sucess: 'Post Updated Sucessfully number',data:register});
          } else {
            // Post not found, return error response
            return res.status(404).json({ errors: 'Post not found'});
          }

             // res.send('user register');
      }catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }

});


router.post('/registerSave', [
    check('firstName', 'firstName is required').not().isEmpty(),
  ],async(req,res)=>{
     console.log(req.body);
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      return res.status(400).json({ errors: errors.array() });
    }

   // console.log(req.body);
   // console.log(req.file.filename);
   // return res.status(400).json({ errors:'check karo' });
  
    const { firstName,lastName,company,email,phone,website,location,interestArea,message } = req.body;
  
        try{
            //console.log(req.body);
           // let post = await Post.findOne({ email });
          
           // if (post && post.length) {
             //   return res
              //    .status(400)
             //     .json({ errors: [{ msg: 'post already exists' }] });
             // }
  
               //,,,,,,,,  
               let registerdata = {
                    firstName,
                    lastName,
                    company,
                    email,
                    phone,
                    website,
                    location,
                    interestArea,
                    message
                  };
                 
              
                 
                  //return res.status(400).json({ errors:post});
                console.log(registerdata);
             let post_id=  await Register.save(registerdata);
              //console.log('asasasa'+user_id);
             const payload = {
            
                  post_id: post_id
        
              };

              let addRegister = {
                  id: post_id,
                  firstName,
                    lastName,
                    company,
                    email,
                    phone,
                    website,
                    location,
                    interestArea,
                    message
              };
        
  
              res.json(addRegister);
              
  
               // res.send('user register');
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
  
  });






module.exports = router;