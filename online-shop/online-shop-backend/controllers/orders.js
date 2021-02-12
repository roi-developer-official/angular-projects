const Order = require('../models/order');
const jwt = require('jsonwebtoken');


function extractUserId(token){
    const decoded = jwt.decode(token);
    return decoded.userId;
}

exports.makeOrder = async (req,res,next)=>{
    const token = req.header("Authorization")
    const userId = extractUserId(token);
    const {phone, address,  products, totalPrice} = req.body;

    const createdOrder = await new Order({
        userId: userId,
        products: products,
        totalPrice: totalPrice,
        phone: phone,
        address: address
    }).save();

    if(!createdOrder){
        const error = new Error('אופס! משהו השתבש');
        error.code = 500;
        return next(error)
    }
    res.status(200).json({message: 'order created', orderId: createdOrder._id })
}

exports.getOrders = async(req,res,next)=>{
    const token = req.header('Authorization');
    const userId = extractUserId(token);
    const orders =  await Order.find({userId:userId}).populate('products._id').exec();
    const results = [];
 
    for(let order of orders){
        results.push({
            _id:order._id,
            products: order.products,
            date: order.createdAt,
            totalPrice:order.totalPrice
        })
    }
    res.status(200).send(results)
}


