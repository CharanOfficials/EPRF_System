import express from 'express'
import UserController from '../controller/user.controller.js'
import adminRouter from './admin.router.js'
import employeeRouter from './employee.router.js'
import {loginValidateRequest} from '../middleware/vSignIn.middleware.js'
import { signUpValidateRequest } from '../middleware/vSignUp.middleware.js'
import { checkData } from '../middleware/vGetSignUp.middleware.js'
import {resetValidateRequest} from '../middleware/vResetPass.middleware.js'
const router = express.Router()
const userController = new UserController()

router.get('/signIn', (req, res) =>{
    userController.getSignIn(req, res)
})
router.post('/signIn', loginValidateRequest, (req, res) =>{
    userController.postSignIn(req, res)
})
router.get('/signUp',checkData, (req, res) =>{
    userController.getSignUp(req, res)
})
router.post('/signUp', signUpValidateRequest, (req, res) =>{
    userController.postSignUp(req, res)
})
router.get('/forgotPassword', (req, res) =>{
    userController.getResetPassword(req, res)
})
router.post('/forgotPassword', resetValidateRequest, (req, res) =>{
    userController.postResetPassword(req, res)
})
router.get('/logout', (req, res) =>{
    userController.postLogout(req, res)
})
router.use('/admin', adminRouter)
router.use('/employee', employeeRouter)
router.get('/', (req, res) => {
    res.send("Welcome home")
})
router.use('/', (req, res) => {
    res.send("This page doen't exist")
})
export default router