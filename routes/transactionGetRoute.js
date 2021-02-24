const transactions = require('./memory.js');

module.exports = (req, res) => {
  res.status(200).send(transactions);
}

