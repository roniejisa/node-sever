var mysql = require('mysql');

var config = {
    connectionLimit : 10, // default = 10
    host: "localhost",
    user: "root",
    password: "",
    database: "node_chat_db"
};

module.exports = {
    database : mysql.createPool(config)
}