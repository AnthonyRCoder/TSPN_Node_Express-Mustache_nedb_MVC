const ItemDAO = require('../models/itemModel.js');
const userDao = require("../models/userModel.js");

const db = new ItemDAO();
db.init();


exports.show_about = function (req, res) {
  res.render("about", {
    title: "The Scottish Pantry Network",
    
});
};

exports.show_contact = function (req, res) {
  res.render("contact", {
    title: "The Scottish Pantry Network",
});
};

exports.show_login = function (req, res) {
    res.render("user/login", {
      title: "The Scottish Pantry Network",
      
  });
  };

exports.handle_login = function (req, res) {
// res.redirect("/new");
res.render("addItem", {
    title: "The Scottish Pantry Network",
    user: "user"
});
};

exports.browseItems = function (req, res) {
    db.getAllFoods()
      .then((list) => {
        const unselectedItems = list.filter(list => !list.selected);
        res.render("browseItems", {
          title: "The Scottish Pantry Network",
          items: unselectedItems,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };

  exports.loggedIn_landing = function (req, res) {
    db.getAllFoods()
      .then((list) => {
        const unselectedItems = list.filter(list => !list.selected);
        res.render("browseItems", {
          title: "The Scottish Pantry Network",
          user: "user",
          items: unselectedItems,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };

  exports.show_new_foods = function (req, res) {
    res.render("addItem", {
      title: "The Scottish Pantry Network",
      user: "user",
    });
  };

  exports.post_new_food = function (req, res) {
    console.log("processing post-new_food controller");
    db.addFood(req.body.productName, req.body.author, req.body.type, 
        req.body.expirationDate, req.body.availability, req.body.imageURL,
         req.body.pantry, req.body.price, req.body.usable, req.body.selected);
    res.redirect("/loggedIn");
  };

  exports.show_user_foods = function (req, res) {
    let user = req.params.author;
    db.getFoodsByUser(user)
      .then((items) => {
        res.render("addItem", {
          title: "The Scottish Pantry Network",
          user: "user",
          items: items,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  };

  exports.show_admin = function (req, res) {
    // Fetch all users
    userDao.getAllUsers()
      .then((userList) => {
        // Fetch all unselected items
        return db.getAllFoods()
          .then((itemList) => {
            const unselectedItems = itemList.filter(item => !item.selected);
            // Render the admin view with user list and unselected items
            res.render("admin", {
              title: 'Admin dashboard',
              user: "admin",
              users: userList,
              items: unselectedItems // Pass unselected items to the view if needed
            });
          });
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
        res.status(500).send("Internal Server Error");
      });
  };
  

     exports.admin_add_new_user=function(req, res){
       res.render('addUser',{ user:"admin"})
     }

     exports.admin_post_new_user = function (req, res) {
       const user = req.body.username;
       const password = req.body.pass;
       const role = req.body.role;
     
       if (!user || !password) {
         res.send(401, "no user or no password");
         return;
       }
       userDao.lookup(user, function (err, u) {
         if (u) {
           res.send(401, "User exists:", user);
           return;
         }
         userDao.create(user, password,role);
       });
       res.render("userAdded")
      };

     // Controller function to handle DELETE requests to delete a user
exports.deleteUser = function(req, res) {
  const userId = req.params.userId; // Extract user ID from request parameters

  // Call deleteUserById method to delete the user by ID
  userDao.deleteUserById(userId)
      .then((numRemoved) => {
          if (numRemoved > 0) {
              res.redirect('/admin'); // Redirect if user was deleted
          } else {
              // User with the given ID not found
              res.status(404).send('User not found');
          }
      })
      .catch((err) => {
          // Handle errors
          console.error('Error deleting user:', err);
          res.status(500).send('Error deleting user');
      });
};

exports.deleteItem = function(req, res) {
  const item = req.params.itemId; // Extract user ID from request parameters
  // Call deleteUserById method to delete the user by ID
  db. deleteItemById(item)
      .then((numRemoved) => {
          if (numRemoved > 0) {
              res.redirect('/admin'); // Redirect if user was deleted
          } else {
              // User with the given ID not found
              res.status(404).send('Item not found');
          }
      })
      .catch((err) => {
          // Handle errors
          console.error('Error deleting user:', err);
          res.status(500).send('Error deleting user');
      });
};
  
  exports.show_select_foods = function (req, res) {
    let item = req.params.itemId;
    console.log('filter')
    db.getFoodsById(item)
      .then((items) => {
        const unselectedItems = items.filter(item => !item.selected);
        res.render("browseItems", {
          title: "The Scottish Pantry Network",
          item: "_id",
          items: unselectedItems,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  };

 // Assuming you have a route handler for handling the POST request to select an item
exports.selectItem = function(req, res) {
  let itemId = req.params.itemId;
  // Assuming you have a function to update the selected status of the item in the database
  db.updateSelectedItem(itemId)
      .then(() => {
          // Redirect to the page displaying the list of items
          res.redirect('/loggedIn');
      })
      .catch((err) => {
          console.log("Error selecting item: ", err);
          res.status(500).send("Error selecting item");
      });
};





exports.show_register_page = function (req, res) {
    res.render("user/register", {
      title: "The Scottish Pantry Network",
      
  });
  };
  
  exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    const role = req.body.role;
  
    if (!user || !password) {
      res.send(401, "no user or no password");
      return;
    }
    userDao.lookup(user, function (err, u) {
      if (u) {
        res.send(401, "User exists:", user);
        return;
      }
      userDao.create(user, password,role);
      res.redirect("/login");
    });
  };
 
  
  exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
  };
  
