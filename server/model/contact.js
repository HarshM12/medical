const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contact = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    subject:{
        type:String,
        // required:true
    },
    message:{
        type: String,
        // required:true
    },
    created_at:{
        type: Date,
        default: new Date()
    },
});

const contactData = mongoose.model('contact',contact)

module.exports = contactData;