var express = require('express')
var crypto = require('crypto')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

var humans = []

app.get('/humans', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=31557600');
    res.json(humans)
})

app.get('/humans/:id', function (req, res) {
    var result = humans.find(human => human.id === req.params.id)
    if (result) {
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        return res.send(result)
    }
    res.status(404).send({
        error: "Human not found"
    })
})

app.post('/humans', function (req, res) {
    var human = req.body
    if (!human.name) {
        return res.status(400).send({
            error: "Name of the human is not provided"
        })
    }
    var id = crypto.randomBytes(20).toString('hex')
    var human = {
        id: id,
        name: human.name
    }
    humans.push(human)
    res.json(human)
})

app.put('/humans/:id', function (req, res) {
    if (!req.body.name) {
        return res.status(400).send({
            error: "Name of the human is not provided"
        })
    }

    var result = humans.find(human => human.id === req.params.id)
    if (result) {
        result.name = req.body.name
        return res.send(result)
    }
    res.json(result)
})

var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Listening to port ' + port)
})