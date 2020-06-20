
const express = require("express");
const server = express();

// Aula 5- 0:50:38
// pegar o banco de dados
const db = require( "./database/db" );

// Aula5 - 1:27:15 : Configurar o uso de req.body
server.use(express.urlencoded({ extended: true }));

// configurar o express para enxergar o conteudo da pasta Public
server.use(express.static("public"));

// utilizando template engine
// para criar html dinamico
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", { 
                        express: server
                        , noCache: true });

// configurar caminhos da minha aplicacao
// pagina inicial
// req: requisicao
// res: respostas

// server.get("/", function( req, res ) {})
server.get("/", ( req, res ) => {
    // res.send("hello world");
    // res.sendFile(__dirname + "/views/index.html" );
    // Aula 4 1:03:21 - após a configuraçao do nunjucks
    // Aula 4 1:06:52 - passando parametro para a pag html
    return res.render("index.html", {title: " -- Título recebido pelo nunjucks"} );
})

server.get("/create-point", ( req, res ) => {

    // Aula5-1:11:54 . Alterar o server.js para receber os dados vindos da create-point.html
    // req.query: Query string da nossa url
    console.log(req.query);


    // res.send("hello world");
    // res.sendFile(__dirname + "/views/create-point.html" );˚
    // Aula 4 1:03:31 após a configuracao do nunjucks

    // return res.render("create-point.html", {saved: true} );
    return res.render("create-point.html");
})

// Aula5 - 1:21:05 método post
// server.post("/create-point", )
server.post("/savepoint", (req,res) => {
    // req.body: o corpo do nosso form
    //console.log(req.body);

    // inserir  dados no banco
    // copiar do ./src/database/db.js

    const query = ` insert into places 
                    (   image
                        , name
                        , address
                        , address2
                        , state
                        , city
                        , items
                    )   values ( ?, ?, ?, ?, ?, ?, ?);
                    `;
                                             
    const values = [
        req.body.image
        , req.body.name
        , req.body.address
        , req.body.address2
        , req.body.state
        , req.body.city
        , req.body.items
    ];

    function afterInsertData(err) {
        if( err ) {
            console.log(err);
            return res.send( "Erro no cadastro ");
        } 

        console.log( "cadastrado com sucesso ");
        console.log( this);

        // Aula5 - 1:34:14 o fdp muda toda hora 
        // return res.send("ok");

        return res.render("create-point.html", {saved: true});
    }

    // passar function por referência
    db.run( query, values, afterInsertData );
    
    // Aula5 - 1:31:22 : Retornar ok somente após fazer o cadastro 
    // transferida para a function afterInsertData
    // return res.send("ok");
}) 


server.get("/search-results", ( req, res ) => {

    // Aula5 - 1:49:10 
    const search = req.query.search;

    if( search == "") {
        //
        return res.render("search-results.html", {total: 0} ); 
    } 


    // pegar os dados
    db.all( `select * from places where city like '%${search}%'`, function(err, rows) {
        if( err ) {
            return console.log(err);
        } 
        const total = rows.length;
        // Estou enviando places para a pag search-results
        return res.render("search-results.html", {places: rows, total: total} );   
    })

    // res.send("hello world");
    // res.sendFile(__dirname + "/views/search-results.html" );
    // Aula5-0:55:54 {places: rows} transferi o return para dentro
    // do db.all
    // return res.render("search-results.html", {places: rows} );
    
})

// ligar o servidor
server.listen(3000);

