const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Blog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    // doctor:{
    //     type:Schema.Types.ObjectId, 
    //     ref:'doctor_registration_tbls'
    // }, 
});

const BlogData = mongoose.model('blog_table',Blog)

module.exports = BlogData;