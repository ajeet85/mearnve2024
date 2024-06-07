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


router.post('/findOneByTitle', async(req, res) => {
  const { menu } = req.body;
  try {
    const postData = await Post.findOneByTitle({ menu });

    if (postData && postData.length > 0) {
      return res.status(200).json(postData[0]);
    } else {
      return res.status(404).json({ errors: 'Post not found' });
    }
  } catch (err) {
 
    res.status(500).send('Server error');
  }
});

router.post('/pageslist',async(req,res)=>{
   
  try{
    //console.log(req.body);
    let data = await Post.findAll();
  
  
    res.json(data);

       // res.send('user register');
}catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

   

});



router.post('/editPost/:postId', [
  upload, // Include multer middleware for file upload
  check('pageTitle', 'pageTitle is required').not().isEmpty(),
],async(req,res)=>{
   
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }

  const { menu,pageTitle,banner_text,content_section,content_section2,content_section3,content_section4,content_section5,status=1 } = req.body;
  const postId = req.params.postId;
      try{
         
          let post = await Post.findOne({ id:postId });
         
           let image = '';
          if (post !== null && Object.keys(post).length !== 0) {
            // Post found, return success response
             let posts = {
              id:postId,
              menu,
              pageTitle,
              banner_text,
              content_section,
              content_section2,
              content_section3,
              content_section4,
              content_section5
            };
            
            if (req.file) {
              posts.image = req.file.filename; // Save the filename of the uploaded image
              //console.log('yes');
             // console.log(req.file.filename)
            } else {
              posts.image =req.body.image[1];
             // console.log(req.body);
             // console.log('no');
            }
           
            posts.status = '1';

            let postData=  await Post.update(posts);
              //console.log('asasasa'+user_id);        
            return res.status(200).json({ status: postData.status,message: postData.message,data:posts});
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


router.post('/postSave', [
  upload, // Include multer middleware for file upload
    check('pageTitle', 'pageTitle is required').not().isEmpty(),
  ],async(req,res)=>{
     console.log(req.body);
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      return res.status(400).json({ errors: errors.array() });
    }

   // console.log(req.body);
   // console.log(req.file.filename);
   // return res.status(400).json({ errors:'check karo' });
  
    const { menu,pageTitle,banner_text,content_section,content_section2,content_section3,content_section4,content_section5,status=1 } = req.body;
  
        try{
            //console.log(req.body);
           // let post = await Post.findOne({ email });
          
           // if (post && post.length) {
             //   return res
              //    .status(400)
             //     .json({ errors: [{ msg: 'post already exists' }] });
             // }
  
                
               let post = {
                    menu,
                    pageTitle,
                    banner_text,
                    content_section,
                    content_section2,
                    content_section3,
                    content_section4,
                    content_section5
                  };
                  post.status = '1';
                 
                  if (req.file) {
                    post.image = req.file.filename; // Save the filename of the uploaded image
                  }else{
                    post.image = null;
                  }
              
                 
             let postData=  await Post.save(post);
             const payload = {
            
                  post_id: postData.insertId
        
              };

              let addedpost = {
                  id: postData.insertId,
                  menu,
                pageTitle,
                banner_text,
                content_section,
                content_section2,
                content_section3,
                content_section4,
                content_section5
              };
        
  
              return res.status(200).json({ status: postData.status,message: postData.message,data:addedpost});
              
  
               // res.send('user register');
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
  
  });




  router.delete('/:postId', async(req, res) => {
    const postId = req.params.postId;

    try {
        // Check if the post exists
        let post = await Post.findOne({ id: postId });
        if (post !== null && Object.keys(post).length !== 0) {
            // Post found, delete the post
            await Post.delete(postId);

            return res.status(200).json({ success: 'Post deleted successfully' });
        } else {
            // Post not found, return error response
            return res.status(404).json({ errors: 'Post not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;