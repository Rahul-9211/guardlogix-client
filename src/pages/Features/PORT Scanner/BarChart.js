import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts"

const BarChart = () => {
    const [barChartData, setbarChartData] = useState({})
    const [mainData, setmainData] = useState([])
    const [criticalData, setCriticalData] = useState([])
    const [HighData, setHighData] = useState([])
    const [MediumData, setMediumData] = useState([])
    const [LowData, setLowData] = useState([])
    const [InformationalData, setInformationalData] = useState([])
    useEffect(() => {

        //Api to get BAR chart data 
        async function getBarChartData() {
            const featureIDForServer = 165112129704796;
            const orgID = localStorage.getItem("orgID");
            const response = await fetch(
                `${process.env.REACT_APP_DEFAULTPATH}getbarchartdata`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        featureName: "ExposedDNS",
                        orgID: orgID,
                        featureID: featureIDForServer
                    }),
                }
            );

            const data = await response.json();
            // console.log("bar Chart Data ", data)

            var ArrayToBePassed = {
            }

            var tempCatData = {
                categories: [],
                Data: [[], [], [], [], []]

            }
            var barCharttempArray = {
                Critical: 0,
                High: 0,
                Medium: 0,
                Low: 0,
                Informational: 0,
                DateTime: null
            }
            for (var i = 0; i < data.data.length; i++) {
                // var preTemp = data.data[i].Data;
                // console.log("dataasdas", data.data)
                for (var j = 0; j < data.data[i].Data.length; j++) {
                    var tempDate= data.data[i];
                    // console.log("data" , data.data[i])
                    tempCatData.categories[i] = tempDate.DateTime
                    // console.log("length", data.data[i].Data[j].A)
                    for (var k = 0; k < data.data[i].Data[j].Ports.length; k++) {
                        var temp = data.data[i].Data[j].Ports[k];

                        if (temp.Risk === "Critical") {
                            // console.log(temp.Risk)
                            barCharttempArray.Critical = barCharttempArray.Critical + 1
                            // console.log("data " , StateoverviewChartData.exposedPorts)
                        }
                        else if (temp.Risk === "High") {
                            barCharttempArray.High = barCharttempArray.High + 1
                        }
                        else if (temp.Risk === "Medium") {
                            barCharttempArray.Medium = barCharttempArray.Medium + 1
                        }
                        else if (temp.Risk === "Low") {
                            barCharttempArray.Low = barCharttempArray.Low + 1
                        }
                        else if (temp.Risk === "Informational") {
                            barCharttempArray.Informational = barCharttempArray.Informational + 1
                        }
                    }


                }
                tempCatData.Data[0][i] = barCharttempArray.Critical
                tempCatData.Data[1][i] = barCharttempArray.High
                tempCatData.Data[2][i] = barCharttempArray.Medium
                tempCatData.Data[3][i] = barCharttempArray.Low
                tempCatData.Data[4][i] = barCharttempArray.Informational

                barCharttempArray = {
                    Critical: 0,
                    High: 0,
                    Medium: 0,
                    Low: 0,
                    Informational: 0,
                    DateTime: null
                }

            }
            // setoverviewChartexpCredentials(barCharttempArray)
            setbarChartData(tempCatData);
            // setmainCat(tempCatData.categories)
            setoptions({
                chart: {
                    type: 'bar',
                    height: 300,
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                },
                plotOptions: {
                    bar: {
                        columnWidth: '20%',
                    },
                },
                colors: barchartColors,
                fill: {
                    opacity: 1
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    show: false,
                },
                yaxis: {
                    labels: {
                        formatter: function (y) {
                            return y.toFixed(0) + "%";
                        }
                    }
                },
                xaxis: {
                    categories: tempCatData.categories,
                    labels: {
                        rotate: -180
                    }
                }
            })
            setseries([{
                name: 'Critical',
                data: tempCatData.Data[0]
            }, {
                name: 'High',
                data: tempCatData.Data[1]
            }, {
                name: 'Medium',
                data: tempCatData.Data[2]
            }, {
                name: 'Low',
                data: tempCatData.Data[3]
            }, {
                name: 'Informational',
                data: tempCatData.Data[4]
            }])
        }
        getBarChartData();

    }, [])
    // console.log("setbarChart data", barChartData)
    // const cat = function(){
    //     var temp = []
    //     for(var i= 0 ; i< props.data ; i++){
    //         temp[i] = props.data.TaskID
    //     }
    //     console.log(temp)
    //     return temp;
    // }
    // console.log("maincat", mainCat)
    const barchartColors = ["#780000", "#dc0000", "#f8b425", "#02a499", "#38a4f8"];
    const [series, setseries] = useState([{
        name: 'Critical',
        data: []
    }, {
        name: 'High',
        data: []
    }, {
        name: 'Medium',
        data: []
    }, {
        name: 'Low',
        data: []
    }, {
        name: 'Informational',
        data: []
    }])
    const [options, setoptions] = useState({
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '20%',
            },
        },
        colors: barchartColors,
        fill: {
            opacity: 1
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        yaxis: {
            labels: {
                formatter: function (y) {
                    return y.toFixed(0);
                }
            }
        },
        xaxis: {
            categories: [],
            labels: {
                rotate: -180
            }
        }
    })
    // async function setData() {
    //     console.log("props.categories", props
    //         .categories)
    //     setoptions({
    //         chart: {
    //             type: 'bar',
    //             height: 300,
    //             stacked: true,
    //             toolbar: {
    //                 show: false
    //             },
    //         },
    //         plotOptions: {
    //             bar: {
    //                 columnWidth: '20%',
    //             },
    //         },
    //         colors: barchartColors,
    //         fill: {
    //             opacity: 1
    //         },
    //         dataLabels: {
    //             enabled: false,
    //         },
    //         legend: {
    //             show: false,
    //         },
    //         yaxis: {
    //             labels: {
    //                 formatter: function (y) {
    //                     return y.toFixed(0) + "%";
    //                 }
    //             }
    //         },
    //         xaxis: {
    //             categories: props.categories,
    //             labels: {
    //                 rotate: -180
    //             }
    //         }
    //     })
    // }
    return (
        <>
            {/* {console.log("props", props.data)} */}
            <ReactApexChart
                options={options}
                series={series}
                // series={[{
                //     name: 'Critical',
                //     data: criticalData
                // }, {
                //     name: 'High',
                //     data: HighData
                // }, {
                //     name: 'Medium',
                //     data: MediumData
                // }, {
                //     name: 'Low',
                //     data: LowData
                // }, {
                //     name: 'Informational',
                //     data: InformationalData
                // }]}
                height="300"
                type="bar"
                className="apex-charts"
            /></>
    );
}

export default BarChart;