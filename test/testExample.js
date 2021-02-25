const chai = require("chai");
const expect = chai.expect;
const app = require("../server.js")
const axios = require("axios");
const {isEqual} = require("lodash");

describe("Test example data returns expected results", () => {

  it("Should add to the transaction array", (done) => {
    var promiseArray = [axios.post('http://localhost:3000/transaction', {"payer":"DANNON", "points":1000, "date": "2020-11-02", "time": "14:00"}),
    axios.post('http://localhost:3000/transaction', {"payer":"UNILEVER", "points":200, "date":"2020-10-31", "time":"11:00"}),
    axios.post('http://localhost:3000/transaction', {"payer":"DANNON", "points":-200, "date":"2020-10-31", "time":"15:00"}),
    axios.post('http://localhost:3000/transaction', {"payer":"MILLER COORS", "points":10000, "date":"2020-11-01", "time":("14:00")}),
    axios.post('http://localhost:3000/transaction', {"payer":"DANNON", "points":300,"date":"2020-10-31", "time":"10:00"})]
    Promise.all(promiseArray)
    .then(() => {
      return axios.get('http://localhost:3000/transaction')
    })
    .then(({data}) => {
      expect(isEqual(data, [
        {"payer": "DANNON", "points":1000, "timestamp": "2020-11-02T14:00:00.000Z"},
        {"payer":"UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00.000Z"},
        {"payer":"DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00.000Z"},
        {"payer":"MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00.000Z"},
        {"payer": "DANNON", "points":300, "timestamp": "2020-10-31T10:00:00.000Z"}
      ])).to.equal(true);
      done();
    })
    .catch((err) => {
      console.log("Error!", err);
    })
  })
  it("Should return correct points balances before spend call", (done) => {
    axios.get('http://localhost:3000/balance')
    .then(({data}) => {
      expect(isEqual(data, {"DANNON": 1100, "MILLER COORS": 10000, "UNILEVER": 200})).to.equal(true);
      done();
    })
    .catch((err) => {
      console.log("ERROR!", err);
    })
  })
  it("Should return array of objects with payer + points spent when spent route called", (done) =>{
    axios.put('http://localhost:3000/spend', {'points': 5000})
    .then(({data}) => {
      expect(isEqual(data, [{"payer": "DANNON", "points":-100}, {"payer":"UNILEVER", "points":-200}, {"payer":"MILLER COORS", "points":-4700}])).to.equal(true);
      done();
    })
    .catch((err) => {
      console.log("ERROR!", err);
    })
  })
  it("Should return updated points balances after spend call", (done) => {
    axios.get('http://localhost:3000/balance')
    .then(({data}) => {
      expect(isEqual(data, {"DANNON": 1000, "UNILEVER": 0, "MILLER COORS": 5300})).to.equal(true);
      done();
    })
    .catch((err) => {
      console.log("ERROR!", err);
    })
  })
})