import {Schema, model} from 'mongoose';

const ProductDetails = new Schema({
    itemName:{ type:String,required:true,unique:true}, 
    category:{type:String,required:true}, 
    Qty:{type:Number,required:true},
    price:{type:Number,required:true},
});

const Product = model ('Products',ProductDetails);

export {Product}