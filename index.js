// var http = require('http')

//   http.createServer((req,res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<center><h1>Tu vieja...</h1></center><br> <center><h1>Tu vieja2...</h1></center>');
//   }).listen(8080)

// var objeto = {
//         color: "cyan",
//         height: 1.61,
//         bloodType: "O+",
// }

// http.createServer((req,res)=>{
//     res.writeHead(200, "application/json");
//     res.end("Hello world");
//   }).listen(8080)

//Importaciones
const express = require('express')
const app = express()
const cors = require('cors')

//puerto
app.set("port", process.env.PORT || 3003)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Rutas
app.use(require("./routes/routes"))


//ejecucion del servidor
app.get('/', function(req, res){
        res.send("Hello")
})

app.listen(app.get("port"))

//Producción
module.exports = app