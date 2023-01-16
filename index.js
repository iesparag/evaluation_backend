const express = require("express");
const { connection } = require("./config/db")
const { userRouter } = require("./routes/users.route")
const { postRouter } = require("./routes/posts.route")
const {authentication} = require("./middleware/Authentication.middleware")
require('dotenv').config()
var cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)

app.use(authentication)
app.use("/posts",postRouter)

app.get('/', (req, res) => {
      res.send('Hello World');
});


app.listen(process.env.PORT,async () => {
    try {
        await connection
        // console.log(process.env.PORT)
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    } catch (err) {
        console.log(err);
        
    }
})