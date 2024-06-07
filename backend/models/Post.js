
'user strict';
var sql = require('../config/db.js');


var Post = function(post){
    this.post = post;
};

Post.findAll=function findAll(data,result){
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

    Post.findOne=function findOne(userdata, result){
          return new Promise( ( resolve, reject ) => {
          sql.query("Select * from pages where id = ? ", userdata.id, function (err, res) {             
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

    Post.findOneByTitle=function findOne(userdata, result){
      return new Promise( ( resolve, reject ) => {
      sql.query("Select * from pages where menu = ? ", userdata.menu, function (err, res) {             
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


Post.update = function update(post) {
  return new Promise((resolve, reject) => {
      // Check if the menu value already exists
      sql.query("SELECT COUNT(*) AS count FROM pages WHERE menu = ? AND id <> ?", [post.menu, post.id], function (err, res) {
          if (err) {
              console.error("Error checking menu existence: ", err);
              return reject(err);
          }

          if (res[0].count > 0) {
              // Menu value already exists for another record, reject with an error
              return resolve({ status: false, message: "Menu value already exists for another record" });
          } else {
              // Menu value doesn't exist for another record, proceed with the update
              const { id, menu, pageTitle, banner_text, content_section, content_section2, content_section3, content_section4, content_section5, image, status } = post;
              const values = [menu, pageTitle, banner_text, content_section, content_section2, content_section3, content_section4, content_section5, image, status, id];
              sql.query("UPDATE pages SET menu = ?, pageTitle = ?, banner_text = ?, content_section = ?, content_section2 = ?, content_section3 = ?, content_section4 = ?, content_section5 = ?, image = ?,status = ?, datetime = current_timestamp() WHERE id = ?", values, function (err, res) {
                  if (err) {
                      console.error("Error in Post.update: ", err);
                      return reject(err);
                  } else {
                      return resolve({ status: true, message: "Updated Successfully" });
                  }
              });
          }
      });
  });
};

        


    Post.findById=function findAll(data,result){
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
Post.save = function save(post, result) {
  return new Promise((resolve, reject) => {
      // Check if the menu value already exists
      sql.query("SELECT COUNT(*) AS count FROM pages WHERE menu = ?", post.menu, function (err, res) {
          if (err) {
              console.error("Error checking menu existence: ", err);
              return reject(err);
          }

          if (res[0].count > 0) {
              // Menu value already exists, reject with an error
              return resolve({ status: false, message: "Menu already exists" });
          } else {
              // Menu value doesn't exist, proceed with the insert
              sql.query("INSERT INTO pages(menu,pageTitle,banner_text,content_section,content_section2,content_section3,content_section4,content_section5,status,image,datetime) VALUES(?,?,?,?,?,?,?,?,?,?,current_timestamp())", Object.values(post), function (err, res) {
                  if (err) {
                      console.error("Error inserting post: ", err);
                      return reject(err);
                  } else {
                      return resolve({ status: true, message: "Page Created Successfully",postData:res });
                  }
              });
          }
      });
  });
};



Post.Add=function AddPost(id, result){
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

      Post.delete = function deletePost(id) {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM pages WHERE id = ?", id, function (err, res) {
                if (err) {
                    console.error("Error in Post.delete: ", err);
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        });
    };
    

      module.exports = Post;