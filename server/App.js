const dotenv = require("dotenv")
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
dotenv.config({ path: './config.env' });
const MainController = require('./controller/MainController');
const DashboardController = require("./controller/DashboardController");

const router = require("./router/auth");
require('./db/conn');

app.use(session({
  secret: 'Your_Secret_Key',
  resave: false,
  saveUninitialized: false
}));
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

// const PatientData = require('./model/User')

// app.use(require('./router/crud_api'));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controller/DashboardController'));


app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World from a server')
});
app.set('view engine', 'ejs');
app.get('/About', (req, res) => {
  console.log("about us");
  req.session.viewcount += 1;
  res.send({ viewcount: req.session.viewcount })
});
app.get('/blog', (req, res) => {
  res.send('Hello World from a Blog')
});
app.get('/Contact', (req, res) => {
  res.send('Hello World from a Contact')
});
app.get('/Register', (req, res) => {
  res.send('Hello World from a register')
});
app.get('/DoctorRegister', (req, res) => {
  res.send('Hello World from a DoctorRegister')
});
app.get('/PatientRegister', (req, res) => {
  res.send('Hello World from a PatientRagister')
});
app.get('/Login', (req, res) => {
  res.send('Hello World from a Login')
});
app.get('/Logout', (req, res) => {
  res.send('Hello World from a Login')
});
app.get('/Admin', (req, res) => {
  res.send('Hello World from a Admin')
});
app.get('/PatientRegister', (req, res) => {
  res.send('Hello World from a Patient')
});


app.use(function (req, res, next) {
  console.log('----------------');
  var resources = ['doctor', 'patient', 'appointment', "blog", "Degree", "category"];
  console.log(`Request from '${req.path}'`)
  resources.forEach(resource => {
    app.get(`/${resource}`, function (req, res) {
      console.log("Method: index");
      MainController.index(req, res, resource);
    });
    app.post(`/${resource}/create`, function (req, res) {
      console.log("Method: create");
      console.log("----------------------")
      console.log(resource);
      MainController.create(req, res, resource);
    });
    app.get(`/${resource}/:id`, function (req, res) {
      console.log("Method: Show");
      console.log(resource);
      MainController.show(req, res, resource);
    });
    app.patch(`/${resource}/:id`, function (req, res) {
      console.log("Method: update");
      console.log(resource);
      MainController.update(req, res, resource);
    });
    app.delete(`/${resource}/:id`, function (req, res) {
      console.log("Method: Delete");
      console.log(resource);
      MainController.destroy(req, res, resource);
    });

    app.get('/zoom_signature', function (req, res) {
      const KJUR = require('jsrsasign')

      const iat = Math.round(new Date().getTime() / 1000)
      const exp = iat + 60 * 60 * 2

      const oHeader = { alg: 'HS256', typ: 'JWT' }

      const oPayload = {
        app_key: process.env.ZOOM_VIDEO_SDK_KEY,
        tpc: req.body.sessionName,
        role_type: req.body.role,
        user_identity: req.body.userIdentity,
        session_key: req.body.sessionKey,
        iat: iat,
        exp: exp
      }

      const sHeader = JSON.stringify(oHeader)
      const sPayload = JSON.stringify(oPayload)
      const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_VIDEO_SDK_SECRET)

      res.json({
        signature: signature
      })
    });

    app.get('/create_zoom_meeting', function (req, res) {
      var request = require('request');
      var data = {
        "topic": "TOPIC",
        "type": "2",
        "duration": "30",
        "start_time": "2020-09-16T11:00:00",
        "timezone": "Asia/Tokyo",
        "password": "123456",
        "agenda": "AGENDA"
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
        console.log(error, response.body);
        res.send(response.body);
        return;
      });
    });

  })
  next()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
