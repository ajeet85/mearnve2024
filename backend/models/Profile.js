
'user strict';
var sql = require('../config/db.js');
console.log('profile module is running');
//User object constructor
var Profile = function(profile){
    this.profile = profile;
};


Profile.findalldata = function findalldata() {
    return new Promise((resolve, reject) => {
        let allData = {};
        let allDataGraph = {};

        const query1 = new Promise((resolve, reject) => {
            sql.query("SELECT count(*) AS total_user FROM user", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_user): ", err);
                    return reject(err);
                }
                resolve(result[0].total_user);
            });
        });

        const query1_1 = new Promise((resolve, reject) => {
            sql.query("SELECT COUNT(*) AS total_user, MONTH(date) AS month FROM user GROUP BY MONTH(date)", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_user): ", err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        const query2 = new Promise((resolve, reject) => {
            sql.query("SELECT count(*) AS total_call_request FROM callbackdata", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_call_request): ", err);
                    return reject(err);
                }
                resolve(result[0].total_call_request);
            });
        });

        const query2_2 = new Promise((resolve, reject) => {
            sql.query("SELECT COUNT(*) AS total_call_request, MONTH(datetime) AS month FROM callbackdata GROUP BY MONTH(datetime)", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_call_request): ", err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        const query3 = new Promise((resolve, reject) => {
            sql.query("SELECT count(*) AS total_register FROM registerdata", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_register): ", err);
                    return reject(err);
                }
                resolve(result[0].total_register);
            });
        });

        const query3_3 = new Promise((resolve, reject) => {
            sql.query("SELECT COUNT(*) AS total_register, MONTH(datetime) AS month FROM registerdata GROUP BY MONTH(datetime)", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_register): ", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
        const query4 = new Promise((resolve, reject) => {
            sql.query("SELECT count(*) AS total_subscription FROM subscription", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_subscription): ", err);
                    return reject(err);
                }
                resolve(result[0].total_subscription);
            });
        });

        const query4_4 = new Promise((resolve, reject) => {
            sql.query("SELECT COUNT(*) AS total_subscription, MONTH(time) AS month FROM subscription GROUP BY MONTH(time)", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_subscription): ", err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        const query5 = new Promise((resolve, reject) => {
            sql.query("SELECT count(*) AS total_pages FROM pages", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_pages): ", err);
                    return reject(err);
                }
                resolve(result[0].total_pages);
            });
        });

        const query5_5 = new Promise((resolve, reject) => {
            sql.query("SELECT COUNT(*) AS total_pages, MONTH(datetime) AS month FROM pages GROUP BY MONTH(datetime)", (err, result) => {
                if (err) {
                    console.log("Error in Profile model (total_pages): ", err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        Promise.all([query1, query2, query3, query4, query5,query1_1,query2_2,query3_3,query4_4,query5_5]).then(results => {
            allData.total_user = results[0];
            allData.total_call_request = results[1];
            allData.total_register = results[2];
            allData.total_subscription = results[3];
            allData.total_pages = results[4];

            allDataGraph.total_user_by_month = results[5];
            allDataGraph.total_call_request_by_month = results[6];
            allDataGraph.total_register_by_month = results[7];
            allDataGraph.total_subscription_by_month = results[8];
            allDataGraph.total_pages_by_month = results[9];
            
            
            

            resolve({ countdata: allData,countGraph: allDataGraph });

        }).catch(err => {
            reject(err);
        });
    });
};





Profile.findProfile=function findProfile(id, result){
    console.log('asasas'+id);
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

      module.exports = Profile;