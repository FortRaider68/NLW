const Express = require("express")
const server = Express();

const db = require('./database/db')

const Nunjucks = require('nunjucks')
Nunjucks.configure('backend/views',{
    express:server,
    noCache:true
})

server.use(Express.static("public"))

server.use(Express.urlencoded({extended:true}))

server.get('/',(req,res)=>{
    res.render(__dirname+"/views/index.html")
})


server.get('/create-point',(req,res)=>{
    console.log(req.query)
    res.render(__dirname+"/views/create-point.html")
})

server.post('/savepoint',(req,res)=>{
    const {image,name,address,address2,state,city,itens} = req.body
        console.log(req.body)
        const query = `
        INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        itens
    ) VALUES (
        ?,?,?,?,?,?,?
    );
`
    const values = [
        image,
        name,
        address,
        address2,
        state,
        city,
        itens
    ]

    function afterInsertData(err){
        if(err){
            return res.send("Erro no Cadastro")
        }
        return res.render(__dirname+"/views/create-point.html",{saved:true})

    }

    db.run(query,values,afterInsertData)
})

server.get('/search',(req,res)=>{

    const Search = req.query.search;

    if(Search == ""){
        res.render(__dirname+"/views/Search.html",{places:0})
    }
    
    db.all(`SELECT * FROM places WHERE city LIKE '%${Search}%'`,function(err,rows){
        if (err){
            return err
        }
        res.render(__dirname+"/views/Search.html",{places:rows})
        
    })

   
})
server.listen(3000)