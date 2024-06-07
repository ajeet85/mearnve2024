const express = require('express');
const router = express.Router();
//express router validator
const Menu = require('../../models/Menu');



router.get('/',async(req,res)=>{
   
  try{
    //console.log(req.body);
    let data = await Menu.findAll();
  
  
    res.json(data);

       // res.send('user register');
}catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

   

});




module.exports = router;