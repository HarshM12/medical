const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator");


const userSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    file:{
        type: Buffer
    },
    created_at:{
        type: Date,
        default: new Date()
    }
});

userSchema.pre('save', async function (next) {
    console.log("inside")

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

const PatientData = mongoose.model('patient_registration_tbls', userSchema)


module.exports = PatientData;