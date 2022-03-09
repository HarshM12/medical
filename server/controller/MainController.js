require('../model/Doctor_categoray');
require('../model/DoctorSchema');
require('../model/Appointment')
require('../db/conn');
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

const session = require('express-session')
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
            if(user.role=="Doctor"){
                query.doctor = user.id
                model.find(query).populate('doctor').populate('patient').exec(function (err, story) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(story[0]));
                    res.send(story);
                });
            }
            if(user.role=="Patient"){
                query.patient = user.id;
                model.find(query).populate('doctor').populate('patient').exec(function (err, story) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(story[0]));
                    res.send(story);
                });
            }
            if(user.role == "Admin"){
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
                if(user.role=="Doctor"){
                    query._id = user.id
                    model.findOne(query).populate('category').
                    exec(function (err, result) {
                        if (err) return console.log(err);
                        console.log(JSON.stringify(result));
                        res.send(result);
                    });
                }else{
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
                if(!user || (user && user.role!="Doctor")){
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
exports.index = async function (req, res, resource) {
    console.log("index");
    console.log("Session:" + JSON.stringify(req.session));
    get_output(req, res, resource);
};

exports.create = async function (req, res, resource) {
    model = get_model(resource);
    console.log(req.body)
    model = new model(req.body);
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

