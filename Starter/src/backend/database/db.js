const SQlite = require('sqlite3').verbose()

const db = new SQlite.Database("./backend/database/database.js")


module.exports = db;
// db.serialize(()=>{
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             itens TEXT
//         );
//     `)
    
//     const query = `
//     INSERT INTO places(
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         itens
//     ) VALUES (
//         ?,?,?,?,?,?,?
//     );
// `
//     const values = [
//         "http://localhost:3000/img/recycle-bins.jpg",
//         "Colectoria",
//         "Guilherme Gembala, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio Do Sul",
//         "Resíduos Eletrônicos e Lâmpadas"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return err
//         }
//         console.log('Cadastrado Com Sucesso')
//         console.log(this)
//     }

//     db.run(query,values,afterInsertData)

//     db.all(`SELECT * FROM places`,function(err,rows){
//         if (err)
//             return err

//         console.log('Aqui estão seus registros')
//         console.log(rows)
//     })

    // db.run(`DELETE FROM places WHERE id = ?`,[1],function(err){
    //     if (err)
    //         return err
        
    //     console.log('Deletado com sucesso')
    // })
// })