let test = require('./test.js');
let { chart: homeChart, table: homeTable } = require('./home.js');
let { table: tableTable } = require('./table.js');

module.exports = function() {
  return {
    test,
    homeChart,
    homeTable,
    tableTable,
  }
}