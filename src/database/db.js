
// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// iniciar o objeto de bd
const db = new sqlite3.Database("./src/database/database.db");

// Com apenas as 2 linhas acima somos capazes de criar o nosso banco de dados

// utilizar o obj de bd para as operacoes
db.serialize( () => {

    /*
    // 1.criar uma tabela com comandos sql
    db.run( `
        create table if not exists places (
            id integer primary key autoincrement
            , image text
            , name text
            , address text
            , address2 text
            , state text
            , city text
            , items text
        );
    ` );
    */

    // 2.inserir dados da tabela

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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80"
        , "Colectoria"
        , "Guilherme Gemballa, Jardim América"
        , "N. 260"
        , "Santa Catarina"
        , "Rio do Sul"
        , "Resíduos eletrônicos, Lâmpadas"
    ];

                                             
    const values2 = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        , "Papersider"
        , "Guilherme Gemballa, Jardim América"
        , "N. 261"
        , "Santa Catarina"
        , "Rio do Sul"
        , "Resíduos eletrônicos, Lâmpadas"
    ];

    function afterInsertData(err) {
        if( err ) {
            return console.log(err);
        } 

        console.log( "cadastrado com sucesso ");
        console.log( this);
    }

    // passar function por referência
    //db.run( query, values, afterInsertData );
    // db.run( query, values2, afterInsertData );


    // 3.consultar os dados da tabela
    db.all( `select * from places`, function(err, rows) {
        if( err ) {
            return console.log(err);
        } 

        console.log( rows );
    })

    // 4.deletar um dado da tabela
    // db.run( `delete from places where id = ?`, [1], function(err) {
    //     if( err ) {
    //         return console.log(err);
    //     } 

    //     console.log( "registro apagado" );
    // } );
        

} );

module.exports = db;