const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 8080

app.get('/', function(request, response) {
    response.sendFile( path.join(__dirname + '/index.html') )
})

app.get('/api', function(request, response) {
    response.sendFile( path.join(__dirname + '/api-list.html') )
})

app.get('/api/whoami', function(request, response) {
    let result = {
        ipaddress: '',
        language: '',
        browser: '',
        os: ''
    }

    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify( result ) )
})

app.listen(port)