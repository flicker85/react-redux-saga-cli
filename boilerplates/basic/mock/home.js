let Mock = require("mockjs");

let table = Mock.mock({
  "data|5-10": [
    {
      "id|+1": 1,
      "name": '@cname',
      "age": '@integer(10, 50)',
      "address": '@province'
    }
  ]
});

module.exports = {
  table: table.data
}