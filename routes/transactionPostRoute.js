
const transactions = require('./memory.js');


module.exports = (req, res) => {
  var {payer, points, date} = req.body;

  var newTransactions = {payer, points, date}
  transactions.push(newTransactions);

  res.status(201).send('Ok')
}