
'user strict';
var sql = require('../config/db.js');

var Subscription = function(subscription){
    this.subscription = subscription;
};

Subscription.findAll=function findAll(userdata,result){
  return new Promise( ( resolve, reject ) => {
  sql.query("Select * from subscription  ",function (err, res) {             
    if(err) {
        console.log("error user model: ", err);
        return reject( err );
    }
    else{
       return resolve(res);
    }
}); 
});  
};    

Subscription.findById = function(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM subscription WHERE id = ?", [id], function(err, res) {
      if (err) {
        console.log("error Subscription model: ", err);
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
};

Subscription.findOne = function(userdata) {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM subscription WHERE email = ?", [userdata.email], function(err, res) {
      if (err) {
        console.log("error subscription model: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

Subscription.save= function save(newUser, result){
    return new Promise( ( resolve, reject ) => {
   sql.query("INSERT INTO subscription(email,status,time) VALUES(?,?,current_timestamp())", Object.values(newUser), function (err, res) {

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
    
}

Subscription.update = function(user) {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE subscription SET email = ?, status = ? WHERE id = ?",
      [user.email,user.status, user.id],
      function(err, res) {
        if (err) {
          console.log("error updating subscription: ", err);
          reject(err);
        } else {
          console.log("Subscription updated successfully");
          resolve(res);
        }
      }
    );
  });
};


Subscription.delete = function(id) {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM subscription WHERE id = ?", [id], function(err, res) {
      if (err) {
        console.log("error subscription model: ", err);
        reject(err);
      } else {
        resolve(res.affectedRows > 0); // Resolves true if a row was affected (user deleted), false otherwise
      }
    });
  });
};

 

module.exports = Subscription;