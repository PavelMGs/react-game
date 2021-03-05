const db = require('../db');
const ObjectId = require('mongodb').ObjectID;

exports.all =  (cd) => {
    db.get().collection('scores').find().toArray((err, docs) => {
        cd(err, docs)
    })
}

exports.findById = (id, cb) => {
    db.get().collection('scores').findOne({_id: ObjectId(id)}, (err, doc) => {
        cb(err, doc)
    })
} 

exports.create = (score, cb) => {
    
    db.get().collection('scores').insert(score, (err, result) => {
        cb(err, result)
    })
}

exports.update = (id, newData, cb) => {
    db.get().collection('scores').update(
        { _id: ObjectId(id) },
        newData,
        (err, result) => {
            
            cb(err, result)
        }
    )
}

exports.delete = (id, cb) => {
    db.get().collection('scores').deleteOne(
        { _id: ObjectId(id) },
        function (err, result) {
            cb(err, result);
        }
    )
}














// const { Schema, model } = require("mongoose");

// const Score = new Schema({
//     name: {type: String, required: true, unique: false},
//     score: {type: Number, required: true, unique: false},
//     size: {type: String, required: true, unique: false},
//     speed: {type: String, required: true, unique: false},
//     walls: {type: Boolean, required: true, unique: false},
// });

// const Scores = new Schema({
//     scores: [Score],
//     accessLink: {type: String},
//     path: {type: String, default: ''}
// })

// model.exports = model('Scores', Scores);