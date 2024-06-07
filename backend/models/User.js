'use strict';
var sql = require('../config/db.js');
console.log('user module is running');

var User = {};

User.findAll=function findAll(userdata,result){
      return new Promise( ( resolve, reject ) => {
      sql.query("Select * from user  ",function (err, res) {             
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

User.findOne = function(userdata) {
  console.log(userdata.email);
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM user WHERE email = ?", [userdata.email], function(err, res) {
      if (err) {
        console.log("error user model: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

User.find = function() {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM user", function(err, res) {
      if (err) {
        console.log("error user model: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

User.findById = function(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM user WHERE id = ?", [id], function(err, res) {
      if (err) {
        console.log("error user model: ", err);
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
};

User.save = function(newUser) {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO user(name, email, password, status) VALUES(?,?,?,?)", [newUser.name, newUser.email, newUser.password, newUser.status], function(err, res) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        resolve(res.insertId);
      }
    });
  });
};

User.update = function(user) {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE user SET name = ?, email = ?, password = ?, status = ? WHERE id = ?",
      [user.name, user.email, user.password, user.status, user.id],
      function(err, res) {
        if (err) {
          console.log("error updating user: ", err);
          reject(err);
        } else {
          console.log("User updated successfully");
          resolve(res);
        }
      }
    );
  });
};


User.delete = function(id) {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM user WHERE id = ?", [id], function(err, res) {
      if (err) {
        console.log("error user model: ", err);
        reject(err);
      } else {
        resolve(res.affectedRows > 0); // Resolves true if a row was affected (user deleted), false otherwise
      }
    });
  });
};


module.exports = User;
