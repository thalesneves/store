const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'store'
});

connection.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('Database is connect Successfully');
    }
})

module.exports = connection;