const express = require ('express')
const userRouter = express.Router()
const {getUser, updateUser, deleteUser, getAlluser} = require('../controller/userController')
const {postsignup, loginUser, isAuthorised, protectRoute} = require('../controller/authController')

userRouter
 .route('/:id')
 .patch(updateUser)
 .delete(deleteUser)

userRouter
  .route('/signup')
  .post(postsignup)

userRouter 
  .route('/login')
  .post(loginUser)

userRouter.use(protectRoute)
userRouter
  .route('/userProfile')
  .get(getUser)


//Admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter
  .route('/AllUser')
  .get(getAlluser)


module.exports = userRouter
