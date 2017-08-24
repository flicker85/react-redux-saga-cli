import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

// 使用PureComponent防止重复渲染导致Chart初始动画异常
class Chart extends PureComponent {
  getOption() {
    const { data } = this.props;
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        right: 15,
        data: data.legend
      },
      grid: {
        top: 30,
        left: 0,
        right: 0,
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          // boundaryGap: false,
          data: data.xAxis
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: data.series
    };

    return option;
  }
  
  render() {
    const { height, data } = this.props;
    return (
      <ReactEcharts
        style={ height ? { height } : null }
        option={ this.getOption() }
        theme='macarons'
        showLoading={ !Object.keys(data).length }
      />
    );
  }
}

export default Chart;