const mongoose = require('mongoose');
const schema = mongoose.Schema;
const obejctid = schema.ObjectId;


const userSchema = new schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    googleID: String,
    picture: String,
    accessToken: String,
    refreshToken: String,
    totalCategories: Array
})



const todoSchema = new schema({
    userId: obejctid,
    title: String,
    description: String,
    subtasks: String,
    priority: String,
    category: String,
    completed: Boolean,
    creationDate: String,
    endDate: String,
    
})



const user = mongoose.model('User', userSchema)
const todo = mongoose.model('Todo', todoSchema)



module.exports = {user, todo}