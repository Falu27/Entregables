import express from 'express';
import ProductManager from './managers/ProductManager.js';

const app = express();
const productManager = new ProductManager('src/files/Products.json');


app.get('/page', async (req, res)=>{
    response.send('<h1 style="color:pink"> Bienvenido al Servidor!!! </h1>')
})


//Filtrar limite de productos  ?limit=
app.get('/products', async (req, res)=>{
    try {
        const limit = parseInt(req.query.limit)
        const products = productManager.getProducts();
        const productLimit = limit ? products.slice(0, limit) : products;
        res.json(productLimit)

    } catch (error) {
        console.log(error)
        res.status(501).send('Products not found')
    }
})


//Obtener producto por ID
app.get('/products/:id', async(req, res) =>{
    try {
        const id = req.params.id
        const search = await productManager.getProductById(id)
        if(!search){
            res.status(404).send(`Products ${id} Not found`)
            return;
        }
        res.send(search);

    } 
    catch (error){
            console.log(error)
        res.status(404).send('Search not found')
        }
})


app.listen(8081, ()=>console.log('Listening on Port 8081'))