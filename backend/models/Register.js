
'user strict';
var sql = require('../config/db.js');
console.log('register module is running');
//User object constructor
//INSERT INTO `subscription` (`id`, `email`, `status`, `time`) VALUES (NULL, 'abc@gmail.com', '0', current_timestamp());


var Register = function(register){
    this.register = register;
};

Register.findAll=function findAll(data,result){
  console.log('list all pages data');
      return new Promise( ( resolve, reject ) => {
      sql.query("Select * from registerdata  ",function (err, res) {             
        if(err) {
            console.log("error register model: ", err);
            return reject( err );
        }
        else{
            
           return resolve(res);
        }
    }); 
      });  
      
    },

    Register.findOne=function findOne(userdata, result){
      console.log(userdata.id);
          return new Promise( ( resolve, reject ) => {
          sql.query("Select * from registerdata where id = ? ", userdata.id, function (err, res) {             
            if(err) {
                console.log("error user model: ", err);
                return reject( err );
            }
            else{
                
               return resolve(res);
            }
        }); 
          });  
          
        },


        Register.update = function update(register) {
          return new Promise((resolve, reject) => {
            const { id, 
              firstname,
              lastname,
              company,
              email,
              phone,
              website,
              location,
              interestArea,
              message } = register;
            const values = [ firstname,
              lastname,
              company,
              email,
              phone,
              website,
              location,
              interestArea,
              message , id];
        
            sql.query("UPDATE registerdata SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ?, website = ?, location = ?, interestArea=?, message = ?, datetime = current_timestamp() WHERE id = ?", values, function (err, res) {
              if (err) {
                console.error("Error in register.update: ", err);
                return reject(err);
              } else {
              
                return resolve(res);
              }
            });
          });
        },
        


        Register.findById=function findAll(data,result){
      console.log('list all pages data');
          return new Promise( ( resolve, reject ) => {
          sql.query("Select * from pages  ",function (err, res) {             
            if(err) {
                console.log("error pages model: ", err);
                return reject( err );
            }
            else{
                
               return resolve(res);
            }
        }); 
          });  
          
        },

  
  
    

//INSERT INTO `pages` (`id`, `pageTitle`, `banner_text`, `content-section`, `content-section2`, `content-section3`, `content-section-4`, `content-section5`, `status`, `datetime`) VALUES (NULL, 'page titl', 'banner text', 'content text', 'content text2', 'content 3', 'content 4', 'content5', '0', current_timestamp());
Register.save= function save(register, result){
    return new Promise( ( resolve, reject ) => {
   let al=sql.query("INSERT INTO registerdata(firstname,lastname,company,email,phone,website,location,interestArea,message,datetime) VALUES(?,?,?,?,?,?,?,?,?,current_timestamp())", Object.values(register), function (err, res) {
console.log(al);
        if(err) {
       // console.log("error: ", err);
        return reject( err );
        }
        else{
       // console.log('ajajaja');
        //console.log(res.insertId);
        return resolve(res.insertId);
        
        }
        });  
    } );    
       // console.log('gjgjgjg');
       // console.log(abc);
    
  },
 


  Register.Add=function AddPost(id, result){
        return new Promise( ( resolve, reject ) => {
        sql.query("Select * from profile where user_id = ? ", id, function (err, res) {             
          if(err) {
              console.log("error Profile model: ", err);
              return reject( err );
          }
          else{
              
             return resolve(res);
          }
      }); 
        });  
        
      }

      module.exports = Register;