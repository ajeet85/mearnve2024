'user strict';
var sql = require('../config/db.js');


var Menu = function(menu){
    this.menu = menu;
};

Menu.findAll=function findAll(data,result){
      return new Promise( ( resolve, reject ) => {
          sql.query("Select * from menu  ",function (err, res) {             
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

 
    

      module.exports = Menu;