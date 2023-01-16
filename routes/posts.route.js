const express = require('express');
const postRouter = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { PostModel } = require("../model/post.model")

postRouter.get("/", async (req, res) => {
    // let {device} = req.query
    
    const userID_MR = req.body.userID;
    const data = await PostModel.find({ userID: userID_MR })
    // const query = await PostModel.find({device: device})
    try {
       if (data) {
        res.send(data);
        }
        else {
        res.send({"msg":"not authorised"})
    }
    } catch (err) {
        res.send({"msg":"not authorised"})
    }
})


postRouter.post("/create", async (req, res) => {
    const payload = req.body;
    console.log(payload)
    try {
        const newPost = new PostModel(payload)
        await newPost.save()
                res.send("post added successfully") 
        
    } catch (err) {
         res.send({"msg":"not authorised"})
    }
})


postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id
    let data = await PostModel.findOne({ _id: id })
    const userID_MR = req.body.userID;
    const userID_in_data = data.userID

    try {

        if (userID_MR !== userID_in_data) {
         res.send({"msg":"not authorised"})
           
        } else {
            await PostModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("post updated successfully")
                    
       }
        
    } catch (err) {
         res.send({"msg":"not authorised"})
    }
})



postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    let data = await PostModel.findOne({ _id: id })
    const userID_MR = req.body.userID;
    const userID_in_data = data.userID

    try {

        if (userID_MR !== userID_in_data) {
         res.send({"msg":"not authorised"})
           
        } else {
            await PostModel.findByIdAndDelete({ "_id": id })
            res.send("post deleted successfully")
                    
       }
        
    } catch (err) {
         res.send({"msg":"not authorised"})
    }
})

module.exports = {
    postRouter
}
