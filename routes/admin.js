require('dotenv').config();
const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const { AdminModel } = require("../config/db");

adminRouter.post("/signup", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const requiredBody = z.object({
        email: z.string().email().min(3).max(30),
        password: z.string().min(3).max(100),
    });
    const parsedwithSuccess = requiredBody.safeParse(req.body);
    if(!parsedwithSuccess.success){
        res.json({
            message: "Incorrect format",
            error: parsedwithSuccess.error
        })
    }
    const hashedpassword = await bcrypt.hash(password, 5);
    let errorThrown = false;
    try{
        await AdminModel.create({
            email: email,
            password: hashedpassword
        })
    }
    catch(e){
        errorThrown = true;
        res.json({
            message: "User already exists"
        })
        return
    }
    if(!errorThrown){
        res.json({
            message: "You are signed up!"
        })
    }

})

adminRouter.post("/signin", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const userfound = await AdminModel.findOne({
        email
    })

    if(!userfound){
        res.status(403).json({
            message: "User doesn't exist"
        })
    }

    const passmatch = await bcrypt.compare(password, userfound.password);

    if(passmatch){
        const token = jwt.sign({
            id: userfound._id.toString()  
        }, process.env.ADMIN_JWT_SECRET);
        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

    res.json({
        message: "You are signed in!"
    })
     
})

adminRouter.post("/", (req, res)=>{

})

adminRouter.put("/", (req, res)=>{

})

adminRouter.get("/bulk", (req, res)=>{

});


module.exports = {
    adminRouter
}