import {Router} from 'express';
import { Product } from '../Models/Product.js';

const Routes = Router();

Routes.post('/addItems',async(req,res)=>{
    try {
        const {ItemName, Category, Quantity, Price} = req.body;
        console.log(ItemName)
        const existingItem = await Product.findOne({itemName:ItemName});
        if(existingItem){
            res.status(401).json({Message:"Item already exist in the Inventory"});
        }
        else{
            const newItem = Product ({
                itemName:ItemName,
                category:Category,
                Qty: Quantity,
                price: Price
            });
            await newItem.save();
            console.log("Item added sucessfully")
            res.status(200).json({Message:"Item added successfully"});
        }
    } catch {
        res.status(500).json({Message:"Internal server error"});
    }
});

Routes.put('/updateItems',async(req,res)=>{
    try {
        const { ItemName, Category, Quantity, Price } = req.body;
        const result = await Product.findOne({itemName:ItemName})
        console.log(result);
        
        if(result){
            result.itemName=ItemName;
            result.category=Category;
            result.Qty = Quantity;
            result.price=Price;
            
            await result.save();
            res.status(201).send("Item updated successfully")
        }else{
            res.status(401).send("Item doesn't exist")
        }  
    }catch{
        res.status(500).send("Internal Server Error" );
    }
})

Routes.get('/displayAllItems', async (req,res)=>{
    try {
        const allProducts = await Product.find();
        console.log(allProducts);
        res.status(200).json(allProducts);
    } catch  {
        res.status(500).json({message:"Internal Server Error"});
    }
});


Routes.delete('/deleteItems',async(req,res)=>{
    try{
        const { ItemName } = req.body 
        const result = await Product.findOne({itemName:ItemName})
        if(result){
            await Product.findOneAndDelete({itemName:ItemName});
            res.status(200).json({msg:"Item deleted successfully"});
        }else{
            res.status(404).json({msg:"Item not found"});
        }
    }catch{
        res.status(500).json({msg:"Internal server error"});
    }
});

Routes.get('/filterItems',async(req,res)=>{
    try {
        const {Category}= req.body;
        const result = await Product.find({category:Category});
        console.log(result);
        res.status(200).json(result);
    } catch {
        res.status(500).json({msg:"Internal server error"});
    }
})

Routes.get('/filterByPrice',async(req,res)=>{
    try{
        const { price1,price2 } = req.body;
        const result = await Product.find({price:price1} && {price:price2});
        console.log(result);
        res.status(200).json(result);
    }catch{
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default Routes

