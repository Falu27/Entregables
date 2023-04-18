import http from 'http';


const server = http.createServer((request, response)=>{
    response.end('Bienvenido a BackEnd. Port 3001')
})

server.listen(3001,()=>{
    //Que quieres que haga en cuanto comience a escuhar?
    console.log('Server listening on PORT 3001');
})