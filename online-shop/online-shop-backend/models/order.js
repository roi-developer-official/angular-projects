const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    userId:{
        type: schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    products:{
        type: [{
            _id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }],
        default: [],
    },
    totalPrice:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},{timestamps: true});


module.exports = mongoose.model('Order', orderSchema);