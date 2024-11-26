const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({

    cName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    projectId:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    pLevel:{
        type:String,
        required:true
    },
    sDate:{
        type:String,
        required:true
    },
    eDate:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
    },

    
    //calculation part (project progress calculation)
    t1:{
        type:String,
    },
    t2:{
        type:String,
    },
    t3:{
        type:String,
    },
    t4:{
        type:String,
    },
    t5:{
        type:String,
    },
    progress:{
        type:String,
        default: "Status Pending",
    },

});

module.exports = mongoose.model('projects',projectsSchema);