require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { UserModel, AdminModel } = require("./config/db");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    await mongoose.connect(process.env.URI);    
    app.listen(process.env.PORT);
}

main();