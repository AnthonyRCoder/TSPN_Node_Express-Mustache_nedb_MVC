const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath.filename, autoload: true });
        } else {
            //in memory
            this.db = new Datastore();
        }
    }
    // for the demo the password is the bcrypt of the user name
    init() {
        
        return this;
    }

    create(username, password, role) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function (hash) {
          var entry = {
            user: username,
            password: hash,
            role: role,
          };
          that.db.insert(entry, function (err) {
            if (err) {
              console.log("Can't insert user: ", username);
            }
          });
        });
      }

    lookup(user, cb) {
        this.db.find({user: user}, function (err, foods) {
        if (err) {
            return cb(null, null);
        } else {
            if (foods.length == 0) {
                return cb(null, null);
            }
                return cb(null, foods[0]);
            }
        });
    }
    
    getAdminByRole(roleName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'role': roleName }, function(err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
        this.db.find({}, function (err, users) {
          if (err) {
            reject (err) ;
          } else {
            resolve(users);
            console.log("function getAllUsers() returns: ", users);
            
          }
        });
        });
      }

       // Method to delete a user by ID
    deleteUserById(userId) {
      return new Promise((resolve, reject) => {
          this.db.remove({ _id: userId }, {}, (err, numRemoved) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(numRemoved);
              }
          });
      });
  }
     
}
const dao = new UserDAO({ filename: "users.db", autoload: true });
dao.init();

module.exports = dao;