const mysql = require('mysql');

// Connection Pool
const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
//view Users
exports.view = (req, res) => {

    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
            // When done with the connection, realease it
            connection.release();

            if (!err) {
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
            } else {
                console.log(err);
            }

        });
    });
}

// Find user by Search
exports.find = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId)

        let searchTerm = req.body.search;

        // User the connection
        connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, realease it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }

        });
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId)

        let searchTerm = req.body.search;

        // User the connection
        connection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            // When done with the connection, realease it
            connection.release();
            if (!err) {
                res.render('add-user', { alert: 'User added successfully' });
            } else {
                console.log(err);
            }
        });
    });
}

// Edit User
exports.edit = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId)


        // User the connection
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, realease it
            connection.release();
            if (!err) {
                res.render('edit-user', { rows });
            } else {
                console.log(err);
            }

        });
    });
}

// Update User
exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId);
        // User the connection
        connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            // When done with the connection, realease it
            connection.release();
            if (!err) {

                db.getConnection((err, connection) => {
                    if (err) throw err; //not connected!
                    console.log('DataBase Connected ad ID ' + connection.threadId)

                    // User the connection
                    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                        // When done with the connection, realease it
                        connection.release();
                        if (!err) {
                            res.render('edit-user', { rows, alert: `${first_name} has been updated` });
                        } else {
                            console.log(err);
                        }

                    });
                });

            } else {
                console.log(err);
            }

        });
    });
}

// Delete User
exports.delete = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId)


        // User the connection
        connection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
            // When done with the connection, realease it
            connection.release();
            if (!err) {
                let removedUser = encodeURIComponent('User successfully removed.');
                res.redirect('/?removed' + removedUser);
            } else {
                console.log(err);
            }

        });
    });
}

//view Users
exports.viewAll = (req, res) => {

    db.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log('DataBase Connected ad ID ' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, realease it
            connection.release();

            if (!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }

        });
    });
}

