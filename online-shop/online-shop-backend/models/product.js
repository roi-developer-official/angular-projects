const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
      },
      name: {
        type:String,
        required:true
      },
      price:{
        type: Number,
        required:true
      },
      description:{
        type: String,
        required:true
      },
      imageUrl:{
        type: String,
        required:true
      },
      ingredients:[],
      categories:[],
      homeProd:Boolean
})

module.exports = mongoose.model('Product', productSchema)