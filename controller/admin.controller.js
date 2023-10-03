import Dept from '../model/department.js'
import Position from '../model/position.js'
import User from '../model/user.js'
export default class AdminController{
    constructor() {
        
    }
    getDepartment(req, res) {
        res.render('./admin/add_department', {
            title: "Add Department",
            menuPartial:"_admin_menu"
        })
    }
    async postDepartment(req, res) {
        try {
            const department = await Dept.findOne({ 'dept_name': req.body.depName })

            if (!department) {
                await Dept.create({
                    dept_name:req.body.depName,
                    contact_no:req.body.contact,
                    dept_status:req.body.status
                })
                return res.status(200).json({
                    success: true,
                    message:"Department added successfully"
                })
            } 
            return res.status(409).json({
                success: false,
                error: 'Duplicate entry detected.'
            })
        } catch (err) {
            console.log("Error while adding the department", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async getPosition(req, res) {
        try {
            const department = await Dept.find({})
            return res.render('./admin/add_position', {
                title: 'Add Position',
                menuPartial: '_admin_menu',
                department:department
            })
        } catch (err) {
            console.log("Error while adding the position", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async postPosition(req, res) {
        try {
            const id = req.body.deptId
            const dept = await Dept.findOne({ _id: id })
            if (id.length < 24 || !dept) {
                return res.status(404).json({
                    error: "Invalid Department Name"
                })
            }
            const pos = await Position.findOne({ pos_name: req.body.posName, department:id })
            if (!pos) {
                const newPos = await Position.create({
                    pos_name: req.body.posName,
                    pos_status: req.body.status,
                    department:id
                })
                dept.positions.push(newPos)
                await dept.save()
                return res.status(200).json({
                    success: true,
                    message:"Position added successfully"
                })
            } else {
                return res.status(409).json({
                    success: false,
                    error: 'Duplicate entry detected.'
                })
            }
        } catch (err) {
            console.log("Error while adding the position", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async getPositions(req, res) {
        try {
            const id = req.query.departmentId
            const dept = await Dept.findById(id)
            if (dept) {
                const positions = await Position.find({ department: id })
                if (!positions || positions.length === 0) {
                    return res.status(404).json({error:"No positions available. Contact admin."})
                }
                return res.status(200).json(positions)
            } else {
                return res.status(400).json({ error:"No department found." })
            }
        } catch (err) {
            console.log("Error while getting the positions", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async getAddEmployee(req, res) {
        try {
            const department = await Dept.find()
            const position = await Position.find({ department: department[0]._id })
            return res.render('admin/add_employee', {
                title: 'Add employee',
                menuPartial: '_admin_menu',
                position: position,
                department: department
            })
        }catch (err) {
            console.log("Error while getting the add employee", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async getEditEmployee(req, res) {
        try {
            const department = await Dept.find()
            const position = await Position.find({ department: department[0]._id })
            const {userid} = req.query
            const user = await User.findById(userid).select(`-password`)
            if (!user) {
                return res.status(401)
                .send(`<script>
                alert('Invalid employee id');
                    window.location.href = '/admin/employees';
                    </script>`)
            }
            return res.render('./admin/edit_employee', {
                title: "Edit Employee",
                menuPartial: "_admin_menu",
                department: department,
                position:position,
                user: user
            })
        }catch (err) {
            console.log("Error while getting edit employee", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async viewEmployees(req, res) {
        try {
            const user = await User.find().select('-password')
            if (!user) {
                return res.status(401)
                .send(`<script>
                alert('No user found');
                    window.location.href = '/admin/timeline';
                    </script>`)
            }
            return res.render('./admin/view_employee', {
                title: "View Employee",
                menuPartial: "_admin_menu",
                user: user
            })
        }catch (err) {
            console.log("Error while getting employees", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async postEditEmployee(req, res) {
        try {
            const { id, fName, lName, contact, dob, gender, qualification } = req.body
            const user = User.findById(id)
            if (!user) {
                res.status(404).json({error:"Invalid user"})
            }
            await User.findByIdAndUpdate(id,
                {
                    first_name: fName,
                    last_name: lName,
                    contact_no: contact,
                    date_of_birth: dob,
                    gender: gender,
                    qualification:qualification
                })
            return res.status(200).json({
                success: true,
                message:"Employee updated successfully"
            })
        } catch (err) {
            console.log("Error while updating the user", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async deleteEmployee(req, res) {
        try {
            const { userid } = req.query
            await User.findByIdAndDelete(userid)
            res.status(200).send(`<script>alert("User deleted successfully.")
            window.location.href = '/admin/employees'
            </script>`)
        } catch (err) {
            console.log("Error while deleting employee", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
    async toggleRights(req, res) {
        try {
            const { status, userid } = req.query
            let updateStatus = "employee"
            if (status === "admin") {
                updateStatus = "employee"
            } else if (status === "employee") {
                updateStatus = "admin"
            }
            await User.findByIdAndUpdate(userid, { account_type: updateStatus })
            return res.status(200).send(`<script>alert("Rights updated successfully."); 
            window.location.href = '/admin/employees'
            </script>`)
        }catch (err) {
            console.log("Error while toggling the rights", err)
            res.status(500).send(`alert("Internal server error."); 
            </script>)`)
        }
    }
}