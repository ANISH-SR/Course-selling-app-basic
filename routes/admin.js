require('dotenv').config();
const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const { AdminModel, CoursesModel } = require("../config/db");
const { adminMiddleware } = require('../middleware/admin');

adminRouter.post("/signup", async (req,res)=>{
    const { email, password, firstName, lastName } = req.body;

    const requiredBody = z.object({
        email: z.string().email().min(3).max(30),
        password: z.string().min(3).max(100),
        firstName: z.string(),
        lastName: z.string()
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
            password: hashedpassword,
            firstName: firstName,
            lastName: lastName
        })
    }
    catch(e){
        errorThrown = true;
        res.json({
            message: "admin already exists"
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
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({
        email: email
    });

    if(!admin){
        res.status(403).json({
            message: "admin doesn't exist"
        })
        return
    }

    const passmatch = await bcrypt.compare(password, admin.password);

    if(passmatch){
        const token = jwt.sign({
            id: admin._id.toString()  
        }, process.env.ADMIN_JWT_SECRET);
        res.json({
            token: token,
            message: "You are signed in!"
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.post("/", adminMiddleware, async(req, res)=>{
    const adminId = req.userId;
    const {title, description, imageUrl, price} = req.body;

    const course = await CoursesModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/", (req, res)=>{

})

adminRouter.get("/bulk", (req, res)=>{

});


module.exports = {
    adminRouter
}