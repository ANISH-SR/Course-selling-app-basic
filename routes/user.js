require('dotenv').config();
const { Router } = require("express");
const { z } = require("zod");
const { UserModel, PurchasesModel, AdminModel } = require("../config/db");
const { userMiddleware } = require('../middleware/user');
const userRouter = Router();

userRouter.post("/signup", async (req,res)=>{
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
        });
    }

    const hashedpassword = await bcrypt.hash( password , 5);

    let errorthrown = false;

    try{
     await UserModel.create({
        email: email,
        password: hashedpassword,
        firstName: firstName,
        lastName: lastName
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
    res.json({
        message: "You are signed up"
    })
})

userRouter.post("/signin", async (req,res)=>{

    const { email, password } = req.body;
    const user = await AdminModel.findOne({
        email
    })

    if(!user){
        res.status(403).json({
            message: "User doesn't exist"
        })
    }

    const passmatch = await bcrypt.compare(password, user.password);

    if(passmatch){
        const token = jwt.sign({
            id: user._id.toString()  
        }, process.env.JWT_SECRET);
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

userRouter.get("/purchases", userMiddleware, async (req, res)=>{
    //to see all of the purchases
    const userId = req.userId;
    
    const purchases = await PurchasesModel.find({
        userId,
    })

    const coursesData = await CoursesModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter
}