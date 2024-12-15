const express = require('express');
const app = express();

app.use(express.static('public'));

app.route('/').get((req, res) => {
    // res.send('Server is runnning !');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start the server
module.exports = app;