const express = require('express');
const path = require('path');
const app = require('./app');

app.listen(8000, () => {
    console.log('Server  is runnning at port 8000 ');
});