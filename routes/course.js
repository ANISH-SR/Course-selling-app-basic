const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { PurchasesModel, CoursesModel } = require("../config/db");

const courseRouter = Router();


courseRouter.post("/purchase", userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;
    //check if user has actually paid the price
    await PurchasesModel.create({
        userId,
        courseId
    })
    
    res.json({
        message: "You hve bought the course successfully!!"
    })
})

courseRouter.get("/preview",async (req,res)=>{
    const courses = await CoursesModel.find({});
    
    res.json({
        courses
    })
})

module.exports = {
    courseRouter
}