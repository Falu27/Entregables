import fs from 'fs';


class ProductManager {


    constructor(ruta){
        this.index = 0
        this.products = []
        this.path = ruta;
        fs.writeFileSync(this.path, JSON.stringify(this.products, null , "\t") )
    }

    getProducts=()=>{
        if(fs.existsSync(this.path)){
        const listProducts = fs.readFileSync(this.path, 'utf8')
        const products = JSON.parse(listProducts)
        return products;
    }else{
        return[];
    }
    }
    

    addProduct=({title, description, price, thumbnail, code , stock})=>{
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields are required.")
            return null;
        }

        this.index++
        const id = this.index
        const product ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
        }

        this.products.push(product)
        fs.writeFileSync(this.path, JSON.stringify(this.products, null , '\t') )
    }

    getProductById = (id)=>{
        const list = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const search = list.find(product=>product.id === id)
        search === undefined ? console.log('Object id:'+id+ ' no exist') : console.log(`The object with id:${id} is: ${JSON.stringify(search, null, '\t')}`);//Lo paso a string para que no me tire [Object Object]
    }
     
    getUpdateProduct = (id, key, val)=>{
        const indexProd = this.products.findIndex(prod=>prod.id === id);
        if(indexProd != -1){
            this.products[indexProd][key] = val;
            
            const data= this.path;
            fs.writeFileSync(data, JSON.stringify(this.products, null, '\t'));

            return console.log(`The product whit id:${id} has been updated`);
        }else{
            return console.log('The product does not exist')
        }

    }
    
    
    deleteProduct= (id) =>{
        const listProducts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const deleteList = listProducts.findIndex(item=> item.id === id)
        listProducts.splice(deleteList, 1);
        const recharge = JSON.stringify(listProducts, null, '\t');
        fs.writeFileSync(this.path, recharge)
        
    }

}


//...............................................

ProductManager = new ProductManager('./files/Products.json')

const product1 ={
        title: "TV 50 Smart",
        description: "Loren bla bla bla",
        price: 80000,
        thumbnail:"./img...",
        code: 10,
        stock: 6

}

const product2 ={
    title: "Tablet Mox",
    description: "Loren bla bla bla",
    price: 30000,
    thumbnail:"./img...",
    code: 20,
    stock: 10

}

const product3 ={
    title: "Xiaomi Note 12",
    description: "Loren bla bla bla",
    price: 125000,
    thumbnail:"./img...",
    code: 30,
    stock: 8

}

const product4 ={
    title: 'Samsung Tab S6',
    description: 'Tablet 10". 4GB Ram. 64Gb Memory',
    price: 180000,
    thumbnail: './...',
    code: 140,
    stock:8
}

const product5 ={
    title: 'Asus IdeaPad',
    description: 'Notebook". 16GB Ram. 512GB Memory',
    price: 580000,
    thumbnail: './...',
    code: 50,
    stock:4
}

//Agregando Productos - addProduct
ProductManager.addProduct(product1);
ProductManager.addProduct(product2);
ProductManager.addProduct(product3);
ProductManager.addProduct(product4);
ProductManager.addProduct(product5);

//Buscar producto por ID y devolver en Objeto- getProductById
ProductManager.getProductById(2); //Buscar el producto ID2 y mostrarlo
ProductManager.getProductById(7); //Este producto no existe.

//Modificar un producto - updateProduct

ProductManager.getUpdateProduct(1, "title", 'Smart TV 55');

//Eliminar producto por ID
//ProductManager.deleteProduct(3);


//Devolver los porductos del Archivo - getProduct
console.log(ProductManager.getProducts());

export default ProductManager;

