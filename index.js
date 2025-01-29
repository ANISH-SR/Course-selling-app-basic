const express = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.connect("");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth"); 
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.post("/signup", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const requiredBody = z.object({
        email: z.string().email().min(3).max(30),
        password: z.string().min(3).max(100),
        name: z.string().min(3).max(30)
    });

    const parsedwithSuccess = requiredBody.safeParse(req.body);

    if(!parsedwithSuccess.success){
        res.json({
            message: "Incorrect format",
            error: parsedwithSuccess.error
        });
    }

    const hashedpassword = await bcrypt.hash( password , 5);

    let errorthrown = false;

    try{
     await UserModel.create({
        email: email,
        password: hashedpassword,
        name: name
    });
    }catch(e){
        errorthrown = true;
        res.json({
            message: "User already exists"
        })
        return
    }
    if(!errorthrown){
        res.json({
            message: "You are signed up!"
        })
    }

})

app.post("/signin", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


     
})

app.post("/purchases", (req,res)=>{

})

app.get("/courses", (req,res)=>{

})


app.listen(3000);