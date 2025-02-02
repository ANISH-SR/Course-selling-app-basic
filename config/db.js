const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const Admin = new Schema({
    id: ObjectId,
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const Purchases = new Schema({
    id: ObjectId,
    courseId: ObjectId,
    userId: ObjectId
});


const Courses = new Schema({
   title:  String,
   description: String,
   price: Number,
   imageUrl: String,
   creatorId: ObjectId 
});

const UserModel = mongoose.model("user", User);
const CoursesModel = mongoose.model("courses", Courses);
const AdminModel = mongoose.model("admin", Admin);
const PurchasesModel = mongoose.model("purchases", Purchases);

module.exports = {
    UserModel,
    CoursesModel,
    AdminModel,
    PurchasesModel
}