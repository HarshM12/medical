const dotenv = require("dotenv")
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
dotenv.config({ path: './config.env' });
const MainController = require('./controller/MainController');
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
app.get('/Blog', (req, res) => {
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


// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// // Access the session as req.session
// app.get('/test', function(req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })

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

    app.get('/payment', function (req, res) {
      const https = require('https');
      /*
      * import checksum generation utility
      * You can get this utility from https://developer.paytm.com/docs/checksum/
      */
      const PaytmChecksum = require('./PaytmChecksum');

      var paytmParams = {};

      paytmParams.body = {
        "requestType": "Payment",
        "mid": "9761708ab53d4c92a80a8bf31ad0c2e2",
        "websiteName": "YOUR_WEBSITE_NAME",
        "orderId": "ORDERID_98765",
        "callbackUrl": "https://<callback URL to be used by merchant>",
        "txnAmount": {
          "value": "1.00",
          "currency": "INR",
        },
        "userInfo": {
          "custId": "CUST_001",
        },
      };

      /*
      * Generate checksum by parameters we have in body
      * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
      */
      PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "8w6FUajw1QPDQZegHlkmHKxvZPFCifZW").then(function (checksum) {

        paytmParams.head = {
          "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

          /* for Staging */
          hostname: 'securegw-stage.paytm.in',

          /* for Production */
          // hostname: 'securegw.paytm.in',

          port: 443,
          path: '/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
          }
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on('data', function (chunk) {
            response += chunk;
          });

          post_res.on('end', function () {
            console.log('Response: ', response);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });

    })
  })
  next()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
