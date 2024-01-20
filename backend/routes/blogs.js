const express = require('express');
const router = express.Router();
const {getAllBlogs, addBlog} = require('../controllers/blogs');

router.route('/').get(getAllBlogs).post(addBlog);

module.exports = router;