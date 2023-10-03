export default class EmployeeController{
    constructor() {
        
    }
    getDepartment(req, res) {
        res.render('./admin/add_department',{})
    }
}