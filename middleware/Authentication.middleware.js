var jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

    const token = req.headers.token

    try {
        if (token) {
            const decoded = jwt.verify(token, 'parag');
            if (decoded) {
                const userID = decoded.userID;
                // console.log(userID)
                req.body.userID = userID;
                // console.log(req.body)
                next();

            } else {
                res.send("login first")
            }
        } else {
            res.send("login first")
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

module.exports = {
    authentication
};