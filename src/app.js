import express from 'express';
import ProductManager from './managers/ProductManager.js';


const app = express();

app.get('/page1', (req, res)=>{
    res.send('<h1 style="color:pink" >Expres in page 1! </h1>')
})

app.get('/products', (req, res)=>{
    res.send("Products")
})


app.listen(8081, ()=>console.log('Listening on Port 8081'))