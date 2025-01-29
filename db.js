const mongoose = require("mongoose");
mongoose.connect("")
const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: string, unique: true},
    password: string,
    name: string
});

const Courses = new Schema({
    
});

const UserModel = mongoose.model("user", User);
const TodoModel = mongoose.model("courses", Courses);

module.exports = {
    UserModel,
    TodoModel,
}