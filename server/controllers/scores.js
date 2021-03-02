const { result } = require('lodash');
let Scores = require('../models/scores');

exports.all = (req, res) => {
    Scores.all((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(docs);
    }) 
}

exports.findById = (req, res) => {
    Scores.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(doc);
    })
}

exports.create = (req, res) => {
    const score = {
        name: req.body.name,
        speed: req.body.speed,
        size: req.body.size,
        walls: req.body.walls,
        score: req.body.score
    }

    Scores.create(score, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(score);
    })
}

exports.update = (req, res) => {
    Scores.update(req.params.id, { name: req.body.name}, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        };

        res.sendStatus(200);
    }) 
}

exports.delete = (req, res) => {
    Scores.delete(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}