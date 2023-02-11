import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import {  isAdmin, isAuth, generateToken } from '../utils/utils.js';
import bcrypt from 'bcryptjs'

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
        await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.json({ createdUsers });
  })
);

// @desc    Auth User & get token;
// @route   POST /users/login
// @access  Public
userRouter.post('/login', expressAsyncHandler(async (req,res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})


  if (user && (await bcrypt.compare(password, user.password)) ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

}))

// @desc    Register a new user;
// @route   POST /users/register
// @access  Public
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
  const {name, email, password} = req.body

  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name, email, password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

}))

// @desc    Get user by ID;
// @route   GET /users/id/:id
// @access  Private/Admin
userRouter.get('/id/:id', expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}))

// @desc    Get all Users;
// @route   GET /
// @access  Private/Admin
userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.json(users);
    })
  );



export default userRouter;