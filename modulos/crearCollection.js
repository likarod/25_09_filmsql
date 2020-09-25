const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err,db){
    let myArgs = process.argv;
    let dbo = db.db("films");
    dbo.createCollection(myArgs, function(err, res){
        if(err) throw err;
        console.log("Colección creada");
        db.close;
    })
})