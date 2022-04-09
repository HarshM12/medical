require('../model/Doctor_categoray');
require('../model/DoctorSchema');
require('../model/Appointment')
require("../model/blog");
require('../db/conn');
const moment = require("moment");

const schema_list = {
    doctor: "DoctorSchema",
    appointment: "Appointment",
    patient: "userSchema",
    blog: "blog",
    Degree: "Degree",
    category: "Doctor_categoray"
};
const express = require('express')
const app = express();
const router = express.Router();

const session = require('express-session');
const { resolveContent } = require('nodemailer/lib/shared');
const MemoryStore = require('memorystore')(session)

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'keyboard cat'
}));

router.get('/dashboard/get_patient_by_month', (req, res) => {
    console.log("log====");
    patient = require(`../model/${schema_list['patient']}`);
    patient.aggregate([{
        $group: {
            // Group by both month and year of the sale
            _id: {
                month: { $month: "$created_at" },
                year: { $year: "$created_at" },
            },
            // Count the no of sales
            count: {
                $sum: 1
            }
        }
    },
    ]).exec(function (err, result) {
        console.log(result);
        res.send(result);
    });
});


router.get('/dashboard/get_doctor_by_month', (req, res) => {
    console.log("log====");
    patient = require(`../model/${schema_list['doctor']}`);
    patient.aggregate([{
        $group: {
            // Group by both month and year of the sale
            _id: {
                month: { $month: "$created_at" },
                year: { $year: "$created_at" },
            },
            // Count the no of sales
            count: {
                $sum: 1
            }
        }
    },
    ]).exec(function (err, result) {
        console.log(result);
        res.send(result);
    });
});

router.get('/dashboard/get_total_doctor',(req,res)=>{
    console.log("Total Doctor")
    doctor = require(`../model/${schema_list['doctor']}`);
    doctor.count({}, function(error, numOfDocs){
        if(error) return callback(error);
        let result = JSON.stringify(numOfDocs)
        console.log(result)
        res.send(result)
    });
})

router.get('/dashboard/get_total_payment',(req,res)=>{
    console.log("Total Appointment")
    appointment = require(`../model/${schema_list['appointment']}`);
    appointment.count({}, function(error, numOfDocs){
        if(error) return callback(error);
        let result = numOfDocs * 200
        console.log(result)
        res.send(JSON.stringify(result))
    });
})

router.get('/dashboard/get_total_patient',(req,res)=>{
    console.log("Total Doctor")
    patient = require(`../model/${schema_list['patient']}`);
    patient.count({}, function(error, numOfDocs){
        if(error) return callback(error);
        let result = JSON.stringify(numOfDocs)
        console.log(result)
        res.send(result)
    });
});

router.get('/dashboard/get_appointment_slot',(req,res)=>{
    console.log("get appointment");
    appointment = require(`../model/${schema_list['appointment']}`);
    appointment.aggregate([{
        $group: {
            // Group by both month and year of the sale
            _id:"$slot",            
            // Count the no of sales
            count: {
                $sum: 1
            }
        }
    },
    ]).exec(function (err, result) {
        res.send(result);
    });
});

router.get('/dashboard/get_appointment_by_doctors',(req,res)=>{
    console.log("get appointment");
    appointment = require(`../model/${schema_list['appointment']}`);
    doctor = require(`../model/${schema_list['doctor']}`);
    let data_list = [];
    doctor.find({}).exec(async function(err, result) {
        // let data = JSON.parse(JSON.stringify(result));
        await result.forEach(async doctor => {
            console.log("Doctor:" + doctor._id);
            await appointment.find({doctor: doctor._id}).exec(async function(err, total){
                let data = JSON.parse(JSON.stringify(doctor));
                data.total_appointment = total.length;
                console.log("id:" + doctor._id);
                console.log("Doctor:" + total.length);
                data_list.push(data);
                console.log("len:" + data_list.length);
                if(result.length == data_list.length){
                    res.send(data_list);
                }
            })      
            // res.send({});
        });
        // res.send(data)
    });
});

router.get('/get_booked_slots',(req,res)=>{
    appointment = require(`../model/${schema_list['appointment']}`);
    console.log(req.query);
    appointment.find({date: req.query.appointment_date}).exec(function (err, result) {
        let slot_list  = [];
        result.forEach(element => {
            slot_list.push(element.slot);
        });
        res.send(slot_list);
    });
});


module.exports = router;