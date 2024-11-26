const mongoose = require('mongoose');

const departmentsSchema = new mongoose.Schema({

    dCategory:{
        type:String,
        required:true
    },
    dName:{
        type:String,
        required:true
    },
    dEmail:{
        type:String,
        required:true
    },
    dTeams:{
        type:String,
        required:true
    },
    hName:{
        type:String,
        required:true

    },
    hEmail:{
        type:String,
        required:true
    },
    hNo:{
        type:String,
        required:true
    },
    uDate:{
        type:String,
        required:true
    },


    //calculation part (Employee Count calculation)


    permanent:{
        type:String,
    },
    contract:{
        type:String,
    },
    interns:{
        type:String,
    },
    total:{
        type:String,
        default: "N/A",
    },
});



module.exports = mongoose.model('departments',departmentsSchema);