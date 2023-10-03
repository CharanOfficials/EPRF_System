import User from "../model/user.js"
import Feedback from '../model/feedback.js'
import Performance from "../model/performance.js"
export default class EmployeeController{
    async getFeedback(req, res) {
        try {
            const { userid, perf_id } = req.query
            const performance = await Performance.findById(perf_id)
            if (performance.feedback) {
                return res.status(200).send(`<script>alert("Feedback already submitted")
                window.location.href = "/employee/performances"
                </script>`)
            }
            const user = await User.findById(userid)
                .populate({ path: 'department', select: 'dept_name' })
                .populate({ path: 'position', select: 'pos_name' });
            return res.render('./employee/performances', {
                title: "Add Feedback",
                menuPartial: "_employee_menu",
                user: user,
                performances:performance
            })
        } catch (err) {
            console.log("Error while toggling the rights", err)
            return res.status(500).send(`<script>alert("Internal server error.")
            window.location.href = '/employee/performances'
            </script>`)
        }
    }
    async postFeedback(req, res) {
        try {
            const posted_by_user = req.userID
            const f_review = req.body.f_review.trim()
            const {userid, perf_id} = req.body
            const status = "active"
            if (f_review.length === 0) {
                return res.status(400).json({error:"Invalid data."})
            }
            const user = await User.findById(userid)
            const performance = await Performance.findById(perf_id)
            if (!performance) {
                return req.status(400).json("Invalid Feedback.")
            }
            const feed = await Feedback.create({
                content: f_review,
                performance:perf_id,
                status: status,
                posted_by_user: posted_by_user,
                posted_for_user: userid
            })
            performance.feedback = feed
            await performance.save()
            if (feed) {
                return res.status(200).json({success:true, message:"Feedback added successfully."})
            }
        }catch (err) {
            console.log("Error while submitting the feedback.", err)
            return res.status(500).json({error:"Internal server error"})
        }
    }
}