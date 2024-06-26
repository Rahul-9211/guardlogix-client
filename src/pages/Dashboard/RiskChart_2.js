import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"

class RiskChart_2 extends Component {
  
  getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["Critical", "High", "Medium", "Low", "Informational"],
        textStyle: {
          color: ["#74788d"],
        },
      },
      color:["#780000", "#dc0000", "#f8b425", "#02a499", "#38a4f8"],
      series: [
        {
          name: "Risk Level",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: this.props.critical, name: "Critical" },
            { value:this.props.High, name: "High" },
            { value: this.props.Medium, name: "Medium" },
            { value:this.props.Low, name: "Low" },
            { value:this.props.Informational, name: "Informational"  },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "350px" , minHeight:"350px" }} option={this.getOption()} />
      </React.Fragment>
    )
  }
}
export default RiskChart_2
