// routes/itemRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth =require('../auth/auth')

router.get('/login', itemController.show_login);
router.post('/login', auth.login, itemController.handle_login);
router.get('/', itemController.browseItems);
router.get('/new',auth.verify,itemController.show_new_foods);
router.post('/new', auth.verify, itemController.post_new_food);
router.get('/posts/:author', itemController.show_user_foods);
router.get('/posts/:itemId', itemController.show_select_foods);
router.post('/posts/:itemId/select', itemController.selectItem);
router.get('/register', itemController.show_register_page);
router.post('/register', itemController.post_new_user);
router.get("/loggedIn",auth.verify, itemController.loggedIn_landing);
router.get("/logout", itemController.logout);
router.get('/about', itemController.show_about);    
router.get('/contact', itemController.show_contact);
router.get("/admin",auth.verifyAdmin, itemController.show_admin);
router.get("/adminPostNewUser",auth.verifyAdmin, itemController.admin_add_new_user);
router.post("/adminPostNewUser",auth.verifyAdmin, itemController.admin_post_new_user);
router.post('/users/:userId/delete',auth.verifyAdmin, itemController.deleteUser);
router.post('/posts/:itemId/delete',auth.verifyAdmin, itemController.deleteItem);




router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

module.exports = router;
