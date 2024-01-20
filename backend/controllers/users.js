const userSchema = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const login = async (req, res) => {
   const userEmail = req.body.userEmail;
   const password = req.body.password;
   const token = uuidv4();
   const lastLogin = new Date().toISOString();

   const userExists = await userSchema.find({userEmail: userEmail}).exec();

   if(!userExists.length) return res.status(400).json({
      error: true,
      msg: 'user email does not exist'
   })

   const user = userExists[0];

   const passwordMatch = await bcrypt.compare(password, user.password);

   if(!passwordMatch) return res.status(400).json({
      error: true,
      msg: 'user email or password incorrect',
   })

   const userUpdated = await userSchema.updateMany({userId: user.userId}, {token: token, lastLogin: lastLogin});

   res.status(200).json({
      error: false,
      msg: 'user logged in',
      user: {
         userId: user.userId,
         username: user.username,
         userEmail: user.userEmail,
         token: token,
      }
   })
}

const signup = async (req, res) => {
   const user = {
      userId: uuidv4(),
      username: req.body.username,
      userEmail: req.body.userEmail,
      password: req.body.password,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      token: uuidv4(),
   }

   const userExists = await userSchema.find({userEmail: user.userEmail}).exec();

   if (userExists.length > 0) return res.status(400).json({
      error: true,
      msg: 'user already exists'
   });

   const encryptPassword = bcrypt.hash(user.password, saltRounds).then(function(hash) {
      // Store hash in your password DB.
      userSchema.create({
         ...user,
         password: hash,
      });
  });

   res.status(200).json({
      error: false,
      msg: 'user signed up',
      user: {
         userId: user.userId,
         username: user.username,
         userEmail: user.userEmail,
         token: user.token
      }
   })
}

const logout = async (req, res) => {
   const userId = req.body.userId;
   const token = req.body.token;
   
   const userExists = await userSchema.find({userId: userId}).exec();

   if (!userExists) return res.status(400).json({
      error: true,
      msg: 'unable to find user'
   });

   const user = userExists[0];
   console.log(user.token);

   if (token != user.token) return res.status(400).json({
      error: true,
      msg: 'invalid token'
   });

   const userUpdated = await userSchema.updateMany({userId: user.userId}, {token: ''});

   res.status(200).json({
      error: false,
      msg: 'user logged out',
   })
}

module.exports = {login, signup, logout}