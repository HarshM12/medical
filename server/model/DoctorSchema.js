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
        maxlength:10,
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
    role: {
        type: String
    },
    status:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: new Date()
    },
    profile_url:{
        type: String,
        default: "https://res.cloudinary.com/dz4wlcxs5/image/upload/v1648735723/dev_img/user_profile_rwys5u.png"
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