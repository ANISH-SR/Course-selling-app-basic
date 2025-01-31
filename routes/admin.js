const { Router } = require("express");
const { z } = require("zod");
const adminRouter = Router();
const { AdminModel } = require("../config/db");

adminRouter.post("/signup", async (req,res)=>{
    // const email = req.body.email;
    // const password = req.body.password;
    // const name = req.body.name;

    // const requiredBody = z.object({
    //     email: z.string().email().min(3).max(30),
    //     password: z.string().min(3).max(100),
    //     name: z.string().min(3).max(30)
    // });

    // const parsedwithSuccess = requiredBody.safeParse(req.body);

    // if(!parsedwithSuccess.success){
    //     res.json({
    //         message: "Incorrect format",
    //         error: parsedwithSuccess.error
    //     });
    // }

    // const hashedpassword = await bcrypt.hash( password , 5);

    // let errorthrown = false;

    // try{
    //  await UserModel.create({
    //     email: email,
    //     password: hashedpassword,
    //     name: name
    // });
    // }catch(e){
    //     errorthrown = true;
    //     res.json({
    //         message: "User already exists"
    //     })
    //     return
    // }
    // if(!errorthrown){
    //     res.json({
    //         message: "You are signed up!"
    //     })
    // }
    res.json({
        message: "You are signed up"
    })
})

adminRouter.post("/signin", (req,res)=>{
    // const email = req.body.email;
    // const password = req.body.password;
    // const name = req.body.name;

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