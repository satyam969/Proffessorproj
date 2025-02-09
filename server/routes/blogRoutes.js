const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogpostcontroller'); 
const fileUpload = require('express-fileupload');



router.post('/', blogPostController.createBlogPost);
router.get('/', blogPostController.getBlogPosts);
router.get('/:id', blogPostController.getBlogPostById);
router.put('/:id', blogPostController.updateBlogPost);
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router;
