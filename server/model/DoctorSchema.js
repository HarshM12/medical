const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema;

const DoctorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required:true
    },
    Mobileno: {
        type: Number,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required:true
     },
    category:{
        type: Schema.Types.ObjectId, 
        ref: 'doctor_categoray_tbls'
    },
    file:{
        type:Buffer,
        required:true
    },
    p_img:{
        type:Buffer
    },
    role: {
        type: String
    },
    status:{
        type: Boolean,
        default: false
    }
});

DoctorSchema.pre('save', async function( next){
    console.log("inside The Doctor")
    if(this.isModified('password')){
            this.password= await bcrypt.hash(this.password,12);
    }
    next();
})

const DoctorData = mongoose.model('doctor_registration_tbls',DoctorSchema)


module.exports = DoctorData;