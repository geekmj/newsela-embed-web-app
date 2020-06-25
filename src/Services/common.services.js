module.exports = {
    logError : logError
}

function logError (error, info){
    console.log('Error logged', error, info)
    //Hit api to log error on server
}