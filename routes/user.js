// IMPORT EXPRESS AND PATH
const express = require('express');


//IMPORT CONTROLLERS 
const userController = require('../controllers/user');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR USERS 
router.get('',userController.useraddblogPage);

router.post('/post-blog',userController.userpostBlog)
router.post('/post-comment/:BlogId',userController.userpostComment);
router.post('/delete-comment/:dID',userController.deleteComment);

router.get('/get-blogs',userController.getallBlogs);
router.get('/get-commentsbyId/:BlogId',userController.getblogComments);


module.exports = router;

