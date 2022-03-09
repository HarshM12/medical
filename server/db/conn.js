const mongoose = require('mongoose')

const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("connection is succesfull");
    return true
  }).catch((err)=>{
    console.log(err);
    return false
  })
  