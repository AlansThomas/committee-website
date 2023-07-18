const mongoose = require('mongoose')
const glimpseSchema = mongoose.Schema({

GlimpsesPath: {
    type: String,
    
},
Status: {
    type: Number,
   
},

})
module.exports = mongoose.model("glimpses", glimpseSchema)