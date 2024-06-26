import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"

class Doughnut extends Component {
  getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["Critical", "High", "Medium", "Low", "Informational"],
        textStyle: {
          color: ["#74788d"],
        },
      },
      color:["#780000", "#dc0000", "#f8b425", "#02a499", "#38a4f8"],
      series: [
        {
          name: "Risk Value",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: this.props.critical, name: "Critical" },
            { value:this.props.High, name: "High" },
            { value: this.props.Medium, name: "Medium" },
            { value:this.props.Low, name: "Low" },
            { value:this.props.Informational, name: "Informational"  },
          ],
        },
      ],
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "350px" }} option={this.getOption()} />
      </React.Fragment>
    )
  }
}
export default Doughnut
