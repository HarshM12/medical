const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    doctor:{
        type:Schema.Types.ObjectId, 
        ref:'doctor_registration_tbls'
    },
});

const BlogData = mongoose.model('blog_tables',blog)

module.exports = BlogData;