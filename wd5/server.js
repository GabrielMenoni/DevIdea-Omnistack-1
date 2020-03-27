//usei o express para criar e configurar meu servidor

const express = require("express")
const server = express()

const db = require("./db")

// const ideias = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a odio aut recusandae praesentium, mollitia libero",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729025.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a odio aut recusandae praesentium, mollitia libero",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a odio aut recusandae praesentium, mollitia libero",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaokê",
//         category: "Diversão em família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a odio aut recusandae praesentium, mollitia libero",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//         title: "Pintura",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a odio aut recusandae praesentium, mollitia libero",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//         title: "Recorte",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a odio aut recusandae praesentium, mollitia libero",
//         url: "https://rocketseat.com.br"
//     }

// ]

//configurar arquivos estáticos(css,javascript,imagens)
server.use(express.static("Public"))

// Habilitar uso do rec.body
server.use(express.urlencoded({ extended: true}))

//config do nunjucks
nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: true, //bolean

})

//criei uma rota /
//e capturo o pedido do cliente para responder
server.get("/" , function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS")
        }

        const ReversedIdeias = [...rows].reverse()

    let LastIdeias = []
    for (let ideia of ReversedIdeias) {
        if(LastIdeias.length < 2){
            LastIdeias.push(ideia)
        }
    }

    

    return res.render("index.html",{ideias : LastIdeias})

    })
      

})

server.get("/ideias.html", function(req, res){


    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS")
        }
        const ReversedIdeias = [...rows].reverse()
    
        return res.render("ideias.html", {ideias: ReversedIdeias})
    })

})

server.post("/", function(req, res){
    //Inserir dados na tabela
 const query = `
 INSERT INTO ideas(
   image,
   title,
   category,
   description,
   link

 ) VALUES(?,?,?,?,?);`

 const values = [
     req.body.image,
     req.body.title,
     req.body.category,
     req.body.description,
     req.body.link
 ]

 db.run(query, values, function(err) {
    if(err) {
        console.log(err)
        return res.send("ERRO NO BANCO DE DADOS")
    }

    return res.redirect("/ideias.html")
 })
})


//liguei o servidor na porta 3000
server.listen(3000)