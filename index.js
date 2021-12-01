const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app).listen(3000,'45.117.80.126')
const configDB = require('./db');
const {Server} = require('socket.io')
const io = new Server(server)
const moment = require('moment')

var db = configDB.database



app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(3000, () => {
    console.log('Đợi tí xem sao')
})

io.on('connection', (socket) => {
    getData().then(res=> {
        io.emit('list-old',res);
    });

    socket.on('on-chat', data => {
        io.emit('user-chat',data);
        insertData(data);
    })
})
function insertData(data){
    var sql = "INSERT INTO messages (message,name,created_at,updated_at) VALUES ?";
    var timeNow = moment().format('YYYY-MM-DD H:mm:ss').toString();
    var value = [
        [data.message,data.message,timeNow,timeNow]
    ];
    db.query(sql, [value], function(err, rows){                                                
        console.log(rows);
    });
}

function getData(){
    return new Promise(function(resolve, reject){
        var sql = "SELECT * FROM messages";
        db.query(sql, function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        })
    })
} 