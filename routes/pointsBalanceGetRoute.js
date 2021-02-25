const transactions = require('./memory.js');

module.exports = (req, res) => {
  // Route function responding with point balances for payers

  // point balance object
  balances = {};

  // loop through transactions, add points
  for (var i = 0; i < transactions.length; i++) {
    if (balances[transactions[i]['payer']]) {
      balances[transactions[i]['payer']] += transactions[i]['points']
    } else {
      balances[transactions[i]['payer']] = transactions[i]['points']
    }
  }

  res.status(200).send(balances)
}