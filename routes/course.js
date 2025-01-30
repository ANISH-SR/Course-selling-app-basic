const { Router } = require("express");

const courseRouter = Router();


courseRouter.post("/purchase", (req,res)=>{
    res.json({
        message: "Purchase courses from here!!"
    })
})

courseRouter.get("/preview", (req,res)=>{
    res.json({
        message: "Preview here"
    })
})

module.exports = {
    courseRouter
}