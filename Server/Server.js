const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname).replace("server", "build")));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname).replace("server", "build/index.html"));
});
const PORT = 4000 || process.env.PORT

app.listen(PORT, () => {
    console.log('Nodejs server is running on ', PORT)
});