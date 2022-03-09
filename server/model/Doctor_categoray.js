const mongoose = require("mongoose");

const category = new mongoose.Schema({
    id:{
        type: Number
    },
    name: {
        type: String,
        required: true
    }
});

const categoryData = mongoose.model('doctor_categoray_tbls',category)

module.exports = categoryData;