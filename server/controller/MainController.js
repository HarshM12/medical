require('../model/Doctor_categoray');
require('../model/DoctorSchema');
require('../model/Appointment')
require("../model/blog");
require("../model/contact")
require('../db/conn');

const schema_list = {
    doctor: "DoctorSchema",
    appointment: "Appointment",
    patient: "userSchema",
    blog: "blog",
    Degree: "Degree",
    category: "Doctor_categoray",
    contact: "contact"
};
const express = require('express')
const app = express();

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
}))

function get_output(req, res, resource) {
    console.log("Resourcs:" + resource);
    switch (resource) {
        case "appointment":
            const user = req.session.user_details
            let query = req.query;
            model = get_model(resource);
            if (user.role == "Doctor") {
                query.doctor = user.id
                model.find(query).populate('doctor').populate('patient').exec(function (err, story) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(story[0]));
                    res.send(story);
                });
            }
            if (user.role == "Patient") {
                query.patient = user.id;
                model.find(query).populate('doctor').populate('patient').exec(function (err, story) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(story[0]));
                    res.send(story);
                });
            }
            if (user.role == "Admin") {
                model.find(query).populate('doctor').populate('patient').exec(function (err, story) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(story[0]));
                    res.send(story);
                });
            }
            break;

        case "doctor":
            if (req.params.id) {
                const user = req.session.user_details;
                let query = req.query;
                model = get_model(resource);
                if (user.role == "Doctor") {
                    query._id = user.id
                    model.findOne(query).populate('category').
                        exec(function (err, result) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(result));
                            res.send(result);
                        });
                } else {
                    console.log("else");
                    model.findOne(query).populate('category').
                        exec(function (err, result) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(result));
                            res.send(result);
                        });
                }
            } else {
                const user = req.session.user_details;
                if (!user || (user && user.role != "Doctor")) {
                    model = get_model(resource);
                    model.find(req.query).populate('category').
                        exec(function (err, result) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(result));
                            res.send(result);
                        });
                }
            }
            break;

        case "patient":
            if (req.params.id) {
                const user = req.session.user_details;
                let query = req.query;
                model = get_model(resource);
                if (user.role == "Patient") {
                    query._id = user.id
                    model.findOne(query).
                        exec(function (err, result) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(result));
                            res.send(result);
                        });
                } else {
                    console.log("else");
                    model.findOne(query).
                        exec(function (err, result) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(result));
                            res.send(result);
                        });
                }
            } else {
                const user = req.session.user_details;
                if (!user || (user && user.role != "Patient")) {
                    model = get_model(resource);
                    model.find(req.query).
                        exec(function (err, result) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(result));
                            res.send(result);
                        });
                }
            }
            break;

        case "blog":
            //    const blog = req.session.user_details;
            const b_query = req.query;
            console.log("000000000444444444444444444440")
            console.log(b_query);
            model = get_model(resource);
            if (resource) {
                console.log("Blog...");
                model = get_model(resource);
                model.find(req.query).populate('doctor').
                    exec(function (err, result) {
                        // if (err) return handleError(err);
                        console.log(JSON.stringify(result));
                        res.send(result);
                    });
            } else {
                console.log("default...");
                model = get_model(resource);
                model.find(req.query).populate('doctor').
                    exec(function (err, result) {
                        // if (err) return handleError(err);
                        console.log(JSON.stringify(result));
                        res.send(result);
                    });
            }

            break;

        case "contact":
            console.log("contact...");
            model = get_model(resource);
            model.find({}).
                exec(function (err, result) {
                    // if (err) return handleError(err);
                    console.log(JSON.stringify(result));
                    res.send(result);
                });
            break;

        default:
            console.log("default...");
            model = get_model(resource);
            model.find(req.query).
                exec(function (err, result) {
                    // if (err) return handleError(err);
                    console.log(JSON.stringify(result));
                    res.send(result);
                });
            break;
    }
}

function get_model(resource) {
    return require(`../model/${schema_list[resource]}`);
}

async function send_email(appointment) {
    console.log(appointment)
    const nodemailer = require("nodemailer");

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
            user: "harshmaniya811@gmail.com", // generated ethereal user
            pass: "harsh@1234", // generated ethereal password
        },
    });
    console.log("-------------------------")
    let doctor;
    let data = get_model("doctor");
    await data.find({ _id: appointment.doctor }).
        exec(function (err, result) {
            console.log("Data:");
            console.log(JSON.stringify(result));
            doctor = result[0];
            // send mail with defined transport object
            const slots = [
                {
                    "index": 1,
                    "start_time": "9 : 00",
                    "end_time": "9 : 30"
                },
                {
                    "index": 2,
                    "start_time": "9 : 30",
                    "end_time": "10 : 00"
                },
                {
                    "index": 3,
                    "start_time": "10 : 00",
                    "end_time": "10 : 30"
                },
                {
                    "index": 4,
                    "start_time": "10 : 30",
                    "end_time": "11 : 00"
                },
                {
                    "index": 5,
                    "start_time": "11 : 00",
                    "end_time": "11 : 30"
                },
                {
                    "index": 6,
                    "start_time": "11 : 30",
                    "end_time": "12 : 00"
                },
                {
                    "index": 7,
                    "start_time": "12 : 00",
                    "end_time": "12 : 30"
                },
                {
                    "index": 8,
                    "start_time": "12 : 30",
                    "end_time": "1 : 00"
                },
                {
                    "index": 9,
                    "start_time": "1 : 00",
                    "end_time": "1 : 30"
                },
                {
                    "index": 10,
                    "start_time": "1 : 30",
                    "end_time": "2 : 00"
                },
                {
                    "index": 11,
                    "start_time": "2 : 00",
                    "end_time": "2 : 30"
                },
                {
                    "index": 12,
                    "start_time": "2 : 30",
                    "end_time": "3 : 00"
                },
                {
                    "index": 13,
                    "start_time": "3 : 00",
                    "end_time": "3 : 30"
                },
                {
                    "index": 14,
                    "start_time": "3 : 30",
                    "end_time": "4 : 00"
                },
                {
                    "index": 15,
                    "start_time": "4 : 00",
                    "end_time": "4 : 30"
                },
                {
                    "index": 16,
                    "start_time": "4 : 30",
                    "end_time": "5 : 00"
                }
            ];
            let slot_time = slots[appointment.slot - 1];
            let info = transporter.sendMail({
                from: 'harshmaniya811@gmail.com', // sender address
                to: doctor.email, // list of receivers
                subject: "You have new Appointment", // Subject line
                text: "Hello", // plain text body
                html: `<html>
                         <body>  
                            <h2>You Have New Appointment </h2>
                            <hr/>
                            <h2>Appointment Date: ${appointment.date}</h2>
                            <h2>Appointment Time: ${slot_time.start_time} - ${slot_time.end_time}</h2>
                            <h4>Please Below Link To Join Session</h4>
                            <h4>${appointment.zoom_meeting_url}</h4>
                        </body>
                       </html>`, // html body
            });
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    let patient_data;
    let patient_email = get_model("patient");
    await patient_email.find({ _id: appointment.patient }).
        exec(function (err, result) {
            const slots = [
                {
                    "index": 1,
                    "start_time": "9 : 00",
                    "end_time": "9 : 30"
                },
                {
                    "index": 2,
                    "start_time": "9 : 30",
                    "end_time": "10 : 00"
                },
                {
                    "index": 3,
                    "start_time": "10 : 00",
                    "end_time": "10 : 30"
                },
                {
                    "index": 4,
                    "start_time": "10 : 30",
                    "end_time": "11 : 00"
                },
                {
                    "index": 5,
                    "start_time": "11 : 00",
                    "end_time": "11 : 30"
                },
                {
                    "index": 6,
                    "start_time": "11 : 30",
                    "end_time": "12 : 00"
                },
                {
                    "index": 7,
                    "start_time": "12 : 00",
                    "end_time": "12 : 30"
                },
                {
                    "index": 8,
                    "start_time": "12 : 30",
                    "end_time": "1 : 00"
                },
                {
                    "index": 9,
                    "start_time": "1 : 00",
                    "end_time": "1 : 30"
                },
                {
                    "index": 10,
                    "start_time": "1 : 30",
                    "end_time": "2 : 00"
                },
                {
                    "index": 11,
                    "start_time": "2 : 00",
                    "end_time": "2 : 30"
                },
                {
                    "index": 12,
                    "start_time": "2 : 30",
                    "end_time": "3 : 00"
                },
                {
                    "index": 13,
                    "start_time": "3 : 00",
                    "end_time": "3 : 30"
                },
                {
                    "index": 14,
                    "start_time": "3 : 30",
                    "end_time": "4 : 00"
                },
                {
                    "index": 15,
                    "start_time": "4 : 00",
                    "end_time": "4 : 30"
                },
                {
                    "index": 16,
                    "start_time": "4 : 30",
                    "end_time": "5 : 00"
                }
            ];
            let slot_time = slots[appointment.slot - 1];
            console.log("Data:");
            console.log(JSON.stringify(result));
            patient_data = result[0];
            // send mail with defined transport object
            let info = transporter.sendMail({
                from: 'harshmaniya811@gmail.com', // sender address
                to: patient_data.email, // list of receivers
                subject: "You have new Appointment", // Subject line
                text: "Harsh MAniya", // plain text body
                html: `<html>
                        <body>  
                        <h1>You Have Book Appointment Sccessfully</h1>
                        <hr/>
                        <h2>Appointment Date: ${appointment.date}</h2>
                        <h2>Appointment Time: ${slot_time.start_time} - ${slot_time.end_time}</h2>
                        <h4>Please Below Link To Join Session</h4>
                        <h4>${appointment.zoom_meeting_url}</h4>
                        </body>
                        </html>`, // html body
            });
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
}

function create_zoom_meeting(appointment) {
    return new Promise(function (resolve, reject) {
        var request = require('request');
        var slots = [
            {
                "index": 1,
                "hours": "9",
                "minute": "0"
            },
            {
                "index": 2,
                "hours": "9",
                "minute": "3"
            },
            {
                "index": 3,
                "hours": "10",
                "minute": "00"
            },
            {
                "index": 4,
                "hours": "10",
                "minute": "30"
            },
            {
                "index": 5,
                "hours": "11",
                "minute": "00"
            },
            {
                "index": 6,
                "hours": "11",
                "minute": "30"
            },
            {
                "index": 7,
                "hours": "12",
                "minute": "00"
            },
            {
                "index": 8,
                "hours": "12",
                "minute": "30"
            },
            {
                "index": 9,
                "hours": "1",
                "minute": "00"
            },
            {
                "index": 10,
                "hours": "1",
                "minute": "30"
            },
            {
                "index": 11,
                "hours": "2",
                "minute": "00"
            },
            {
                "index": 12,
                "hours": "2",
                "minute": "30"
            },
            {
                "index": 13,
                "hours": "3",
                "minute": "00"
            },
            {
                "index": 14,
                "hours": "3",
                "minute": "30"
            },
            {
                "index": 15,
                "hours": "4",
                "minute": "00"
            },
            {
                "index": 16,
                "hours": "4",
                "minute": "30"
            }
        ];
        let meeting_time = new Date(new Date(new Date(appointment.date).setHours(slots[appointment.slot - 1].hours, slots[appointment.slot - 1].minute, 0)).getTime())
        console.log("meeting:" + meeting_time);
        var data = {
            "topic": "appointment",
            "type": "2",
            "duration": "30", // appoitnment duration
            "hours": meeting_time.toISOString(), // set appointment time
            "timezone": "Asia/Tokyo",
        };
        var clientServerOptions = {
            uri: 'https://api.zoom.us/v2/users/me/meetings',
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                bearer: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9GX2pWOWxrUlVpeEROTmVRU1dsUmciLCJleHAiOjE3MTA2MDI4MjAsImlhdCI6MTY0NzQzOTExOH0.JIhYk_J80Hn1p_9tmJOgfnow9DqFPG41uB3bJbWDAU4"
            }
        }
        request(clientServerOptions, function (error, response) {
            var data = JSON.parse(response.body);
            resolve(data.join_url);
        });
    })
}

exports.index = async function (req, res, resource) {
    console.log("index");
    console.log("Session:" + JSON.stringify(req.session));
    get_output(req, res, resource);
};

exports.create = async function (req, res, resource) {
    model = get_model(resource);
    let data = req.body
    if (resource == "appointment") {
        if (data.mode == "online") {
            let url = await create_zoom_meeting(data);
            data.zoom_meeting_url = url;
        }
        send_email(data);
    }
    model = new model(data);
    console.log(model);
    result = await model.save();
    if (result) {
        console.log(JSON.stringify(model));
    } else {
        console.log("Error...");
    }
    res.send(model);
};

exports.show = function (req, res, resource) {
    model = get_model(resource);
    get_output(req, res, resource);
};

exports.update = function (req, res, resource) {
    model = get_model(resource);
    console.log(req.body);
    model.updateOne({ _id: req.params.id }, req.body, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send({ status: true });
        }
    })
};

exports.destroy = function (req, res, resource) {
    model = get_model(resource);
    console.log(req.params);
    model.remove({ _id: req.params.id }, function (err, result) {
        console.log(result);
    });

    res.send('NOT IMPLEMENTED: Site destroy Page');
};

