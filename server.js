const express = require('express')
const connectDB = require("./config/connectDB")

const app = express();


const User = require("./models/User");



require("dotenv").config({path:"./config/.env"});


app.use(express.json());

connectDB();
//get all users
app.get("/api/users", (req, res)=>{
    User.find().then(users => res.send ({ msg: "get users", users}))
    .catch((err)=> res.send({msg: "err",err}));
});

app.get("/api/users/:userID", (req , res)=>{
    const userID =red.params.userID;
    User.findById(userID)
    .then((user)=>{
        res.send({ msg :"get user by id", user});

    })
    .catch((err)=> {
        res.send({ msg :"err",err});
    });
});


app.post("/api/add_user", (req, res)=>{
    const{name, lastname,email,phone}=req.body;
    const newUser = new User({name, lastname,email,phone});
    newUser
    .save()
    .then ((user)=> res.send ({ msg:"user added with success",user}))
    .catch((err)=>res.send({ msg:"err" , err}));

});



app.put('/api/users/:userID',(req , res)=>{
    const id = req.params.userID;
    User.findByIdAndUpdate(id,{...req.body},{new: true}).then((user)=>{
        res.send({msg:"user updated", user})})
        .catch((err)=>res.send({msg:"err",err}));
});




app.delete("/api/users/:userID",(req, res)=>{
    const id= req.params.userID;
    user.findByIdAndDelete(id).then((user)=>res.send({msg:"user deleted",user}))
    .catch((err)=> res.status(400).send)({msg :'err',err});

});







const port = 5000;
app.listen(port ,()=> {
    console.log(`The server is runnig on port ${port}`)
});