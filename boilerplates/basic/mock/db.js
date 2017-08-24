let test = require('./test.js');
let { table: homeTable } = require('./home.js');

module.exports = function() {
  return {
    test,
    homeTable,
  }
}