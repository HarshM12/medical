const mongoose = require("mongoose");

const Degree = new mongoose.Schema({
    id:{
        type: Number
    },
    degree_name: {
        type: String,
        required: true
    },
    d_id: {
        type: Number,
        required: true
    },
    d_degree_image: {
        type: Buffer,
        required: true
    }
});

const DegreeData = mongoose.model('Doctor_Degree_tbl',Degree)

module.exports = DegreeData;