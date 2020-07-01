const express = require('express')
const path = require('path')
const app = express()
const os = require('os')

app.use(express.static(path.join(__dirname).replace("server", "build")));

const PORT = 4000 || process.env.PORT

app.get('/check', (req, res) => {

    let cpus = os.cpus()
    let totalMem = os.totalmem()
    let freeMem = os.freemem()
    let resObj = {
        status: 'running...',
        cpus: cpus[0],
        totalMem,
        freeMem
    }

    res.json({
        success: true,
        data: resObj
    })

    // res.status(404).send('something wrong')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname).replace("server", "build/index.html"));
});

app.listen(PORT, () => {
    console.log('Nodejs server is running on ', PORT)
});
 