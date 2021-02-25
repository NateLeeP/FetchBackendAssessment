const express = require('express');
const app = express();
const router = require('./routes/router.js');
const PORT = 3000

// add a transaction
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`)
})

module.exports = app;