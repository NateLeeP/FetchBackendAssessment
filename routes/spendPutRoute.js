const transactions = require('./memory.js');

const pointsTaken = (transaction, transactionIndex) => {
  // Helper function for determining how many points can be taken from transaction
  // Must satsify rule: Cannot take points that would cause a negative balance down the line.

  // if transaction points are negative, return 0. Cannot extract any points from negative
  if (transaction['points'] <= 0) {
    return 0;
  }
  // find cumulative min from this transaction.
  var cumulativeTotal = transaction['points']
  var cumulativeMin = transaction['points'] // inital min is transaction points. Cannot take more than this from transaction.
  // cumulative total to track, update cumulative min when it hits a low point

  // loop through transactions occuring after current transaction

  for (var i = transactionIndex + 1; i < transactions.length; i++) {
    if (transaction['payer'] === transactions[i]['payer']) {
      cumulativeTotal += transactions[i]['points'];
      if (cumulativeTotal < cumulativeMin) {
        cumulativeMin = cumulativeTotal
      }
    }
  }


  return cumulativeMin;
}


// spend points route
module.exports = (req, res) => {
  // points needed
  var {points} = req.body
  // track who is giving up points
  var payerPointsTaken = {}
  // sort transactions by time stamp
  transactions.sort((a, b) => (a.timestamp - b.timestamp))
  var index = 0;
  // Loop through transactions. For each, find out how many points can be taken
  while (points > 0 && index < transactions.length) {
      // subtract points available from transaction total
      var ptsAvailable = pointsTaken(transactions[index], index)
      if (ptsAvailable > points) {
        // If more points available than needed
        ptsAvailable = points;
      }
      points -= ptsAvailable;
      if (ptsAvailable > 0) {
        // If take more than 0 points, keep track in "payerPointsTaken" object
        if (payerPointsTaken[transactions[index]['payer']]) {
          payerPointsTaken[transactions[index]['payer']] -= ptsAvailable;
        } else {
          payerPointsTaken[transactions[index]['payer']] = ptsAvailable * (-1);
        }
        // subtract from transaction in memory

        transactions[index]['points'] -= ptsAvailable;
      }
      index++;

  }
  if (points > 0) {
    // Handle case where not enough points are available
    res.status(200).send("Not enough points available for transaction!")
  }
  res.status(200).send(payerPointsTaken)
}

