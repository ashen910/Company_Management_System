const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    empId:{
        type:String,
        required:true
    },
    joinDate:{
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    
    //calculation part (EMP perfoamance calculation)
    monthRating:{
        type:String,
    },
    overallRating:{
        type:String,
        default:"0",
    },
    overallmonths:{
        type:String,
    },
    performance:{
        type:String,
        default: "Not Assigned",
    },

});

module.exports = mongoose.model('employees',employeeSchema);