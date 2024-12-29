const jwt = require("jsonwebtoken")

const verfiyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: "Authorization header is missing!" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token is missing!" });
    }

    jwt.verify(token, "secret-key", (err, result) => {
        if (!err) {
            req.userID = result.userID
            next()
        }
        else {
            return res.status(401).json({ message: "Invalid token!" })
        }
    })
}

module.exports = verfiyToken