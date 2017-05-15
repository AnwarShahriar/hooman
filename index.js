var express = require('express')
var crypto = require('crypto')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

var humans = []

app.get('/humans', function (req, res) {
    res.json(humans)
})

app.get('/humans/:id', function (req, res) {
    var result = humans.find(human => human.id === req.params.id)
    if (result) {
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

var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Listening to port ' + port)
})