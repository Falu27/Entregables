import fs from 'fs';
export default class ProductManager {


    constructor(ruta){
        this.index = 0;
        this.products = [];
        this.path = ruta;
    }
    //Simplificamos el guardar
    writeFile = ()=>{
        try{
        const save = JSON.stringify(this.products, null, "\t" );
        fs.writeFileSync(this.path, save)
    }
    catch(error){
        console.log('Save Error!!')
    }
    }
    
    getProducts=()=>{
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        return this.products
    }
    /* getProducts=()=>{
        if(fs.existsSync(this.path)){
        const listProducts = fs.readFileSync(this.path, 'utf8')
        const products = JSON.parse(listProducts)
        return products;
    }else{
        return[];
    }
    }
    */

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
        this.writeFile()
    }

    getProductById = (id)=>{
        const list = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const search = list.find(product=>product.id === id)
        search === undefined ? console.log('Object id:'+id+ ' no exist') : console.log(`The object with id:${id} is: ${JSON.stringify(search, null, '\t')}`);
        return search
        //Lo paso a string para que no me tire [Object Object]
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

const Pmanager = new ProductManager('../files/Products.json')

/*Esto no se utiliza para proximas entregas-----------------
Los productos ya se cargaron

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
    description: 'Notebook. 16GB Ram. 512GB Memory',
    price: 580000,
    thumbnail: './...',
    code: 50,
    stock:4
}

const product6 ={
    title: 'Lenovo Pad',
    description: 'Tablet Slim". 4GB Ram. 64GB Memory',
    price: 80000,
    thumbnail: './...',
    code: 60,
    stock:5
}

const product7 ={
    title: 'TV OLED 55',
    description: 'TV 55". OLED. Slim',
    price: 180000,
    thumbnail: './...',
    code: 70,
    stock:4
}

const product8 ={
    title: 'Xiaomi Speak',
    description: 'Parlante Xiaomi 10W. ',
    price: 10000,
    thumbnail: './...',
    code: 80,
    stock:12
}

const product9 ={
    title: 'Iphone',
    description: 'Iphone 8. 128GB. Repair',
    price: 40000,
    thumbnail: './...',
    code: 90,
    stock:1
}

const product10 ={
    title: 'Monitor LG',
    description: 'Monitor 29". UltraWide. IPS',
    price: 50000,
    thumbnail: './...',
    code: 100,
    stock:7
}

//Agregando Productos - addProduct
ProductManager.addProduct(product1);
ProductManager.addProduct(product2);
ProductManager.addProduct(product3);
ProductManager.addProduct(product4);
ProductManager.addProduct(product5);
ProductManager.addProduct(product6);
ProductManager.addProduct(product7);
ProductManager.addProduct(product8);
ProductManager.addProduct(product9);
ProductManager.addProduct(product10);



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

*/