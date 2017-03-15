const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080

// example input: 'en-DE,de-DE;q=0.8,de;q=0.6,tr-TR;q=0.4,tr;q=0.2,en-US;q=0.2,en;q=0.2'
function getFirstLanguageFrom(acceptLanguageHeader) {
    var result = false

    if ( acceptLanguageHeader ) {
        // split string on each semi colon ';'
        var strSplit = acceptLanguageHeader.split(';')
        // we need the right most part
        strSplit = strSplit[0]

        result = strSplit.trim()
        // check if there is more than one language defined
        if ( strSplit.split(',').length > 1 )
            result = strSplit.split(',')[0].trim()
    }

    return result.trim()
}

// example input: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36'
function getSoftwareFrom(userAgentRequestHeader) {
    var result = false

    if ( userAgentRequestHeader ) {
        // split string on each empty space
        var openParenthesisIndex = userAgentRequestHeader.indexOf('(')
        var closeParenthesisIndex = userAgentRequestHeader.indexOf(')')
        var result = userAgentRequestHeader.slice(openParenthesisIndex + 1, closeParenthesisIndex)
    }

    return result
}

app.all('/', function(request, response) {
    response.sendFile( path.join(__dirname + '/views/index.html') )
})

app.all('/api', function(request, response) {
    response.sendFile( path.join(__dirname + '/views/index.html') )
})

app.get('/api/whoami', function(request, response) {
    var requestIp = request.get('x-forwarded-for')
    var requestLang = request.get('accept-language')
    var requestSoftware = request.get('user-agent')

    var result = {
        ipaddress: requestIp,
        language: getFirstLanguageFrom(requestLang),
        software: getSoftwareFrom(requestSoftware)
    }

    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify( result ) )
})

app.listen(port)