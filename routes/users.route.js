const express = require('express');
const userRouter = express.Router()
const { UserModel } = require("../model/users.model.js");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;
        const data = await UserModel.find({ email: email })
        if (data.length > 0) {
            res.send("user already registered.enter different email")
        } else {
            bcrypt.hash(password, 2, async (err, hash_password) => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    const newUser = new UserModel({
                        name: name,
                        email: email,
                        gender: gender,
                        password: hash_password
                    })
                    await newUser.save()
                    res.send("user registered successfully")
                      
                }
    // Store hash in your password DB.
});
        }
        
    } catch (err) {
        res.send(err)
    }
    
})





userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email: email })
        console.log(user)
        const hash_password = user[0].password

        if (user.length > 0) {
            bcrypt.compare(password, hash_password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'parag');
                    res.send({"msg":"loginSuccesfull","token":token})
                } else {
                    res.send("invalid credentials")
                 }
            })
        } else {
            res.send("invalid credentials")
        }
        
    } catch (err) {
        res.send(err.message)
    }
} )




module.exports = {
    userRouter
};