// To implement user specific features

import jwt from "jsonwebtoken"
const validateAdmin = (req, res, next) => {
    // 1. Read token
    const token = req.cookies.jwt
    // If no token then send invalid token
    if (!token) {
        return res.status(401)
            .send(`<script>
                alert('Unauthorized request are not allowed');
                    window.location.href = '/signIn';
                    </script>`)
    }
    // If token then check validity
    try {
        const payloadjwt = jwt.verify(token, process.env.JWT_SECRET)
        if (!(payloadjwt.userType === "admin")) {
            return res.status(401)
                .send(`<script>
                alert('Unauthorized request are not allowed');
                    window.location.href = '/employee/home';
                    </script>`)
        }
        req.userID = payloadjwt.userId
        req.email = payloadjwt.userEmail
    } catch (err) {
        // else return error
        console.log('JWT middleware:',err)
        return res.status(401)
                .send(`<script>
                alert('Unauthorized request are not allowed');
                    window.location.href = '/signIn';
                    </script>`)
    }
    // If valid call next
    next()
}

export default validateAdmin