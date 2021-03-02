const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const db = require('./db');
const scoresController = require('./controllers/scores')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let scores = [
    {
        name: 'Snake Warrior',
        speed: 'medium',
        size: 'medium',
        walls: 'false',
        score: 15
    },
    {
        name: 'Peaceful Snake',
        speed: 'fast',
        size: 'small',
        walls: 'true',
        score: 22
    },
    {
        name: 'Spy Snake',
        speed: 'fast',
        size: 'large',
        walls: 'false',
        score: 19
    }
]

app.get('/', (req, res) => {
    res.send('Hello API');
})

app.get('/scores', scoresController.all)

app.get('/scores/:id', scoresController.findById);

app.post('/scores', scoresController.create)

app.put('/scores/:id', scoresController.update)

app.delete('/scores/:id', scoresController.delete)




db.connect('mongodb://localhost:27017/myapi', (err) => {
    if(err) {
        return console.log(err);
    }
    app.listen(3012, () => {
        console.log('API started');
    })
}) 
