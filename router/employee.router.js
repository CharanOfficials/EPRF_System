import express from 'express'
import EmployeeController from '../controller/employee.controller.js'
const router = express.Router()
const employeeController = new EmployeeController()
router.get('/', (req, res) => {
    employeeController.sigIn(req,res)
})
router.get('/', (req, res) => {
    employeeController.getHome(req,res)
})
router.use('/', (req, res) => {
    res.status(500).json({error:"Invalid Request."})
})
export default router