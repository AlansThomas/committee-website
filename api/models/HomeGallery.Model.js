const mongoose = require('mongoose')
const gallerySchema = mongoose.Schema({

ImagePath: {
    type: String,
    
},
Status: {
    type: Number,
   
},

})
module.exports = mongoose.model("gallery", gallerySchema)