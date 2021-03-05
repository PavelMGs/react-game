const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb')

let state = {
    db: null,
}

exports.connect = (url, done) => {
    if(state.db) {
        return done();
    }

    mongodb.connect(url, (err, data) => {
        if (err) {
            return done(err);
        }

        state.db = data.db('myapi');
        done();
    })
}

exports.get = function() {
    return state.db;
}