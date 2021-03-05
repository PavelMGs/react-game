const Router = require("express");
const Scores = require("../models/scores");
const router = new Router();


router.post('/set', async (req, res) => {
    try {

        const { scores } = req.body;

        const scoresRes = new Scores({scores});
        await scoresRes.save();
        return res.json({message: "Scores setted"})
    
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})
module.exports = router;    