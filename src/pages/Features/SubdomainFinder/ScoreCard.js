import React from 'react';
import ReactApexChart from "react-apexcharts"

const ScoreCard = () => {
    const radialchartColors = ["#5156be", "#34c38f"]
    const series = [98.42]
    const options = {
        chart: {
            height: 270,
            type: 'radialBar',
            offsetY: -10
        },
        plotOptions: {
            radialBar: {
                startAngle: -130,
                endAngle: 130,
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 10,
                        fontSize: '28px',
                        fontWeight: `900`,
                        color: "red",
                        formatter: function (val) {
                            return val  ;
                            // return "LOW"
                        }
                    }
                }
            }
        },
        colors: [radialchartColors[0]],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                gradientToColors: [radialchartColors[1]],
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [20, 60]
            },
        },
        stroke: {
            dashArray: 4,
        },
        legend: {
            show: false
        },
        labels: ['Series A'],
    };
    return (
        <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height="300"
            width="100%"
            className="apex-charts"
        />
    );
}

export default ScoreCard;