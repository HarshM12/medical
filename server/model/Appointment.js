const { text } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new mongoose.Schema({
    id:{
        type: Number
    },
    patient:{
        type:Schema.Types.ObjectId, 
        ref:'patient_registration_tbls'
    },
    doctor:{
        type:Schema.Types.ObjectId, 
        ref:'doctor_registration_tbls'
    },
    date: {
        type: String,
        // required:true
    },
    slot:{
        type: Number,
        // required: true
    },
    mode: {
        type: String,
        // required:true
    },
    symptoms: {
        type: String,
        // required: true
    },
    zoom_meeting_url : {
        type : String
    },
    created_at:{
        type: Date,
        default: new Date()
    }
});

const AppointmentData = mongoose.model('APPOINTMNET_tbls',Appointment)


module.exports = AppointmentData;