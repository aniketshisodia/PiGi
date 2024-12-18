const express = require('express');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.static('public'));

app.use(express.json()); // For parsing JSON request body
app.use(express.urlencoded({ extended: true })); // For parsing form submissions


// app.route('/').get((req, res) => {
//     // res.send('Server is runnning !');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use('/api/v1/users', userRouter);

// start the server
module.exports = app;