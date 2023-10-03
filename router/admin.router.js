import express from 'express'
import AdminController from '../controller/admin.controller.js'
import { deptValidateRequest } from '../middleware/vDept.middleware.js'
import { posValidateRequest } from '../middleware/vPos.middleware.js'
import validateAdmin from '../middleware/vAdmin.middleware.js'
import { empEditValidateRequest } from '../middleware/vEmpEdit.middleware.js' 
import {checkData} from '../middleware/vGetSignUp.middleware.js'
import {validateEmp} from '../middleware/vUserId.middleware.js'
const router = express.Router()
const adminController = new AdminController()
router.get('/department', validateAdmin, (req, res) => {
    adminController.getDepartment(req,res)
})
router.post('/department', validateAdmin, deptValidateRequest, (req, res) => {
    adminController.postDepartment(req,res)
})
router.get('/position', validateAdmin, (req, res) => {
    adminController.getPosition(req,res)
})
router.post('/position', validateAdmin, posValidateRequest, (req, res) => {
    adminController.postPosition(req,res)
})
router.get('/getPositions', (req, res) => {
    adminController.getPositions(req,res)
})
router.get('/employee', validateAdmin, (req, res) => {
    adminController.getAddEmployee(req,res)
})
router.get('/employees', validateAdmin, (req, res) => {
    adminController.viewEmployees(req,res)
})
router.get('/editemployee', validateAdmin, validateEmp, checkData, (req, res) => {
    adminController.getEditEmployee(req,res)
})
router.post('/editemployee', validateAdmin, empEditValidateRequest, (req, res) => {
    adminController.postEditEmployee(req,res)
})
router.get('/deleteemployee', validateAdmin, validateEmp, (req, res) => {
    adminController.deleteEmployee(req,res)
})
router.use('/',(req, res) => {
    res.send("Invalid route")
})
export default router 