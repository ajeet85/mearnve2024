
'user strict';
var sql = require('../config/db.js');
console.log('callrequest module is running');
//User object constructor
//INSERT INTO `subscription` (`id`, `email`, `status`, `time`) VALUES (NULL, 'abc@gmail.com', '0', current_timestamp());


var CallRequest = function(callrequest){
    this.callrequest = callrequest;
};

CallRequest.findAll=function findAll(data,result){
  console.log('list all pages data');
      return new Promise( ( resolve, reject ) => {
      sql.query("Select * from callbackdata  ",function (err, res) {             
        if(err) {
            console.log("error callrequest model: ", err);
            return reject( err );
        }
        else{
            
           return resolve(res);
        }
    }); 
      });  
      
    },

    CallRequest.findOne=function findOne(userdata, result){
      console.log(userdata.id);
          return new Promise( ( resolve, reject ) => {
          sql.query("Select * from callbackdata where id = ? ", userdata.id, function (err, res) {             
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


        CallRequest.update = function update(callrequest) {
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
              message } = callrequest;
            const values = [ firstname,
              lastname,
              company,
              email,
              phone,
              website,
              location,
              interestArea,
              message , id];
        
            sql.query("UPDATE callbackdata SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ?, website = ?, location = ?, interestArea=?, message = ?, datetime = current_timestamp() WHERE id = ?", values, function (err, res) {
              if (err) {
                console.error("Error in callrequest.update: ", err);
                return reject(err);
              } else {
              
                return resolve(res);
              }
            });
          });
        },
        


        CallRequest.findById=function findAll(data,result){
      console.log('list all pages data');
          return new Promise( ( resolve, reject ) => {
          sql.query("Select * from callbackdata  ",function (err, res) {             
            if(err) {
                console.log("error callbackdata model: ", err);
                return reject( err );
            }
            else{
                
               return resolve(res);
            }
        }); 
          });  
          
        },

  
  
    
//firstName,lastName,company,email,phone,country,message
//INSERT INTO `pages` (`id`, `pageTitle`, `banner_text`, `content-section`, `content-section2`, `content-section3`, `content-section-4`, `content-section5`, `status`, `datetime`) VALUES (NULL, 'page titl', 'banner text', 'content text', 'content text2', 'content 3', 'content 4', 'content5', '0', current_timestamp());
CallRequest.save= function save(callrequest, result){
    return new Promise( ( resolve, reject ) => {
   let al=sql.query("INSERT INTO callbackdata(firstName,lastName,company,email,phone,country,message,datetime) VALUES(?,?,?,?,?,?,?,current_timestamp())", Object.values(callrequest), function (err, res) {
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
 


  CallRequest.Add=function AddPost(id, result){
    console.log('asasas'+id);
        return new Promise( ( resolve, reject ) => {
        sql.query("Select * from callbackdata where user_id = ? ", id, function (err, res) {             
          if(err) {
              console.log("error callbackdata model: ", err);
              return reject( err );
          }
          else{
              
             return resolve(res);
          }
      }); 
        });  
        
      }

      module.exports = CallRequest;