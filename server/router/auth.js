// const e = require('express');
const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
require('../db/conn')
const User = require('../model/userSchema');
const Doctor = require('../model/DoctorSchema');
const BookAppointment = require('../model/Appointment');
const session = require('express-session')
const app = express()

const MemoryStore = require('memorystore')(session)

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'keyboard cat'
}))
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

router.get('/', (req, res) => {
    res.send(`hello Form Server HOme`);
});

router.post('/PatientRegister', async (req, res) => {

    const { fname, lname, date, gender, address, mobile, email, password, role } = req.body;

    if (!fname || !lname || !date || !gender || !address || !mobile || !email || !password || !role) {
        return res.status(422).json({ error: "Please fill the field Properly" });
    }
    try {
        const Userexist = await User.findOne({ email: email })
        if (Userexist) {
            return res.status(422).json({ error: "Email Allredy Exist" });
        }

        const user = new User({ fname, lname, date, gender, address, mobile, email, password, role })
        const UserRegister = await user.save();

        if (UserRegister) {
            console.log("user:" + user.email)
            res.status(201).json({ message: "User Register sucessfully" })
        }
        else {
            res.status(422).json({ message: "User Register Faild" })
        }
    } catch (err) {
        console.log(err);
    }
});

// DoctorRegister

router.post('/DoctorRegister', async (req, res) => {

    const { fname, lname, category, gender, date, file, Address, Mobileno, email, password, role } = req.body;

    if (!fname || !lname || !date || !gender || !Address || !Mobileno || !email || !password || !file || !category || !role) {
        return res.status(422).json({ error: "Please fill the field Properly" });
    }
    try {
        const Userexist = await Doctor.findOne({ email: email })
        if (Userexist) {
            return res.status(422).json({ error: "Email Allredy Exist" });
        }
        const user = new Doctor({ fname, lname, category, gender, date, file, Address, Mobileno, email, password, role })
        const DoctorRegister = await user.save();

        if (DoctorRegister) {
            res.status(201).json({ message: "User Register sucessfully" })
        }
        else {
            res.status(422).json({ message: "User Register Faild" })
        }
    } catch (err) {
        console.log(err);
    }
});

// Login Router

router.post('/Login', async (req, res) => {
    console.log("From login................");
    console.log(req.body);
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Please Filled Data" })
        }

        console.log("request:" + req.body);
        const PatientLogin = await User.findOne({ email: email });
        const DoctorLogin = await Doctor.findOne({ email: email });
        const user = DoctorLogin ? DoctorLogin : PatientLogin ? PatientLogin : "";
        if (user) {
            console.log("user...................");
            const user_login = await bcrypt.compare(password, user.password);
            if (!user_login) {
                res.status(400).json({ error: "Invalid Details" })
            } else {
                let data = {
                    role: user.role,
                    id: user.id,
                    full_name: user.fname + " " + user.lname 
                };
                console.log("data:" + data);
                req.session.user_details = data;
                console.log("----------------")
                console.log(req.session.user_details);
                console.log("----------------")
                res.json({ data: req.session.user_details });
            }
        }else{
            console.log("admin...................");
            if(email === "admin@email.com" && password === "admin"){
                let data = {
                    role: "Admin",
                };
                req.session.user_details = data;
                console.log('--------------------------------------')
                console.log(req.session.user_details);   
                console.log('--------------------------------------')
                res.json({ data: req.session.user_details });
            }else{
                res.status(400).json({ error: "Invalid Details" })
            }
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/Patientpanel', async (req, res) => {

    const { patientname, contact, doctor, time, mode, symptoms } = req.body

    // if (!patientname || !contact || !doctor || !time || !mode || !symptoms) {
    //     return res.status(400).json({ error: "Please Filled Data" })
    // }
    const Data = new BookAppointment({ patientname, contact, doctor, time, mode, symptoms })

    const Appointment = await Data.save();
    if (Appointment) {
        res.status(201).json({ message: "User Register sucessfully" })
        res.json({ dd: Appointment });
    }
    else {
        res.status(422).json({ message: "User Register Faild" })
    }
});



router.get('/Logout', async (req, res) => {
    if(delete req.session){
        console.log("User logged out.");
        res.json({
            data: true,
        });
    }else{
        res.json({
            data: false,
        });
    }
});

module.exports = router;