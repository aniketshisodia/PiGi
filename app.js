const express = require('express');
const userRouter = require('./routes/userRoutes');
const pgRouter = require('./routes/pgRoutes');
const app = express();

app.use(express.static('public'));

app.use(express.json()); // For parsing JSON request body
app.use(express.urlencoded({ extended: true })); // For parsing form submissions


// app.route('/').get((req, res) => {
//     // res.send('Server is runnning !');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Use User routes
app.use('/api/v1/users', userRouter);
// Use PG routes
app.use('/api/v1/pg', pgRouter);
// start the server
module.exports = app;