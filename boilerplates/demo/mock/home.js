let Mock = require("mockjs");

let chart = Mock.mock({
  legend: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
  series: [
    {
      type: 'line',
      name: '邮件营销',
      "data|20": ['@integer(0, 200)']
    }, {
      type: 'line',
      name: '联盟广告',
      "data|20": ['@integer(0, 200)']
    }, {
      type: 'line',
      name: '视频广告',
      "data|20": ['@integer(0, 200)']
    }, {
      type: 'line',
      name: '直接访问',
      "data|20": ['@integer(0, 200)']
    }, {
      type: 'line',
      name: '搜索引擎',
      "data|20": ['@integer(0, 200)']
    }
  ],
  "xAxis|20": ['@now("HH:mm:ss")']
});

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
  chart,
  table: table.data
}