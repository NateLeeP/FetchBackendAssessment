
const transactions = require('./memory.js');


module.exports = (req, res) => {
  var {payer, points, date, time} = req.body;
  var timestamp = date + 'T' + time + ':00Z'
  var newTransactions = {payer, points, timestamp: new Date(timestamp)}
  transactions.push(newTransactions);

  res.status(201).send('Ok')
}