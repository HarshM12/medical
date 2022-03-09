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
    }
});

const AppointmentData = mongoose.model('APPOINTMNET_tbls',Appointment)


module.exports = AppointmentData;