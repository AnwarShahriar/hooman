var express = require('express')
var app = express()

var humans = []

app.get('/humans', function (req, res) {
    res.json(humans)
})

var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Listening to port ' + port)
})