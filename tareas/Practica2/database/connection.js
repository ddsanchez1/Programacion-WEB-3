const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tienda_db"
});

connection.connect((error) =>  {
    if(error){
        console.error("Error de conexion a database: ", error);
        return;
    }
    console.log("Base de datos conectada");
});

module.exports = connection;