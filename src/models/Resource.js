const mongoose = require('mongoose');

const resourceSchema  = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required:true,
    },
    title: {
        type:String,
        required:true
    },
    type:{
        type:String ,
        enum: ['pdf', 'video','link', 'image'],
        required:true
        
    }, 
    url:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

const Resource = mongoose.model("Resource", resourceSchema);
module.exports={Resource};