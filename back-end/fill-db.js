const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt-node');
const config = require('./config/development');

const dbURI = `mongodb://${config.DB_HOST}:${config.DB_PORT}/`;

MongoClient.connect(dbURI, function(err, db) {
    if (err) throw err;

    let dbo = db.db(config.DB_NAME);

    dbo.collection("users").insertOne({
        firstName: 'Abdellwahed',
        lastName: 'Abbad',
        email: 'abdellwahed.abbad@gmail.com',
        password: crypt('password'),
        createdAt: new Date,
        updatedAt: new Date
    }, function(err, res) {
        if (err) throw err;
        console.log("1 user inserted");
        db.close();
    });
});

function crypt(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}