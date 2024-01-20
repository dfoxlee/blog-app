const blogSchema = require("../models/Blog");
const { v4: uuidv4 } = require('uuid');

const getAllBlogs = async (req, res) => {
   const blogs = await blogSchema.find().exec();
   
   res.status(200).json({
      error: false,
      msg: "all blogs",
      blogs: blogs,
   });
};

const addBlog = async (req, res) => {
   const blog = req.body.blog;
   const userEmail = req.body.userEmail;
   const username = req.body.username;
   const userId = req.body.userId;
   const newBlog = {
      blogId: uuidv4(),
      userEmail: userEmail,
      username: username,
      userId: userId,
      blog: blog,
      postDate: new Date().toISOString(),
      likes: 0
   }

   const blogCreated = await blogSchema.create(newBlog);

   res.status(200).json({
      error: false,
      msg: "blog created",
      blog: blogCreated,
   });
};

module.exports = { getAllBlogs, addBlog };
