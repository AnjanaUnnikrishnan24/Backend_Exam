import express,{json} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Routes from './Routes/Routes.js';
dotenv.config();

const app = express();

app.use(json());

app.use('/', Routes);

mongoose.connect('mongodb://localhost:27017/Inventory').then(()=>{
    console.log("Mongodb connected to Invetory management Store Successfully");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
})

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
})