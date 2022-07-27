const mysql = require('mysql');

const Connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'bootcamp',
    multipleStatements: true
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
Connect.connect((err) => {     
    if (err) throw err
    console.log('DB Connected');
});

module.exports = Connect;