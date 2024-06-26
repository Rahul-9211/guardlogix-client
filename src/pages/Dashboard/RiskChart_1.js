import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts"

const RiskChart_1 = (props) => {



  const userID = localStorage.getItem("userID");
  const orgID = localStorage.getItem("orgID");
  const exposedCredentials = 165112129704651
  const exposedSubdomains = 165112129704687
  const exposedWHOIS = 165112129704697
  const exposedDNS = 165112129704677
  const exposedPorts = 165112129704796
  const exposedReverseDNS = 165112129704189
  const exposedReverseIP = 165112129704642
  var l = 0
  var k = 0

  const [critical, setCritical] = useState(0);
  const [High, setHigh] = useState(0);
  const [Medium, setMedium] = useState(0);
  const [Low, setLow] = useState(0);
  const [Informational, setInformational] = useState(0);
  const [expCredential, setexpCredential] = useState([]);
  const [expSubdomains, setexpSubdomains] = useState([]);

  const [desiredDomainInfo, setdesiredDomainInfo] = useState([]);
  const [RegistrantValue, setRegistrantValue] = useState([]);
  const [TechnicalValue, setTechnicalValue] = useState([]);
  const [AdministrativeValue, setAdministrativeValue] = useState([]);
  const [setA, setsetA] = useState([]);
  const [setAAAA, setsetAAAA] = useState([]);
  const [setMX, setsetMX] = useState([]);
  const [setNS, setsetNS] = useState([]);
  const [setTXT, setsetTXT] = useState([]);
  const [expReverseDNS, setexpReverseDNS] = useState([]);
  const [expReverseIP, setexpReverseIP] = useState([]);
  const [portData, setportData] = useState([])
  const [overviewChartexpCredentials, setoverviewChartexpCredentials] = useState({})
  const [overviewChartexpSubdomains, setoverviewChartexpSubdomains] = useState({})
  const [overviewChartexpWHOIS, setoverviewChartexpWHOIS] = useState({})
  const [overviewChartexpDNS, setoverviewChartexpDNS] = useState({})
  const [overviewChartexpPorts, setoverviewChartexpPorts] = useState({})
  const [overviewChartexpReverseIP, setoverviewChartexpReverseIP] = useState({})
  const [overviewChartexpReverseDNS, setoverviewChartexpReverseDNS] = useState({})

  // States for Credentials 
  var [expCredentialCritical, setexpCredentialCritical] = useState(0)
  var [expCredentialHigh, setexpCredentialHigh] = useState(0)
  var [expCredentialMedium, setexpCredentialMedium] = useState(0)
  var [expCredentialLow, setexpCredentialLow] = useState(0)
  var [expCredentialInformational, setexpCredentialInformational] = useState(0)


  // States for Subdoamins 
  var [expSubdomainCritical, setexpSubdomainCritical] = useState(0)
  var [expSubdomainHigh, setexpSubdomainHigh] = useState(0)
  var [expSubdomainMedium, setexpSubdomainMedium] = useState(0)
  var [expSubdomainLow, setexpSubdomainLow] = useState(0)
  var [expSubdomainInformational, setexpSubdomainInformational] = useState(0)


  // States for WHOIS 
  var [expWHOISCritical, setexpWHOISCritical] = useState(0)
  var [expWHOISHigh, setexpWHOISHigh] = useState(0)
  var [expWHOISMedium, setexpWHOISMedium] = useState(0)
  var [expWHOISLow, setexpWHOISLow] = useState(0)
  var [expWHOISInformational, setexpWHOISInformational] = useState(0)


  // States for Ports 
  var [expPortsCritical, setexpPortsCritical] = useState(0)
  var [expPortsHigh, setexpPortsHigh] = useState(0)
  var [expPortsMedium, setexpPortsMedium] = useState(0)
  var [expPortsLow, setexpPortsLow] = useState(0)
  var [expPortsInformational, setexpPortsInformational] = useState(0)


  // States for DNS 
  var [expDNSCritical, setexpDNSCritical] = useState(0)
  var [expDNSHigh, setexpDNSHigh] = useState(0)
  var [expDNSMedium, setexpDNSMedium] = useState(0)
  var [expDNSLow, setexpDNSLow] = useState(0)
  var [expDNSInformational, setexpDNSInformational] = useState(0)



  // States for ReverseIP 
  var [expReverseIPCritical, setexpReverseIPCritical] = useState(0)
  var [expReverseIPHigh, setexpReverseIPHigh] = useState(0)
  var [expReverseIPMedium, setexpReverseIPMedium] = useState(0)
  var [expReverseIPLow, setexpReverseIPLow] = useState(0)
  var [expReverseIPInformational, setexpReverseIPInformational] = useState(0)


  // States for ReverseDNS
  var [expReverseDNSCritical, setexpReverseDNSCritical] = useState(0)
  var [expReverseDNSHigh, setexpReverseDNSHigh] = useState(0)
  var [expReverseDNSMedium, setexpReverseDNSMedium] = useState(0)
  var [expReverseDNSLow, setexpReverseDNSLow] = useState(0)
  var [expReverseDNSInformational, setexpReverseDNSInformational] = useState(0)


  useEffect(() => {

    async function getRiskCalculated() {
      const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}riskcalculator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          orgID,
          exposedCredentials,
          exposedSubdomains,
          exposedWHOIS,
          exposedDNS,
          exposedPorts,
          exposedReverseDNS,
          exposedReverseIP
        }),
      });
      const data = await response.json();
      // console.log("riskCalculated value chart", data.data)


      setCritical(data.data.riskScore.Critical)
      setHigh(data.data.riskScore.High)
      setMedium(data.data.riskScore.Medium)
      setLow(data.data.riskScore.Low)
      setInformational(data.data.riskScore.Informational)

      if (data.data.exposedCredentials) {
        setexpCredential(data.data.exposedCredentials.Data)
        for (var i = 0; i < data.data.exposedCredentials.Data.length; i++) {
          var temp = data.data.exposedCredentials.Data[i];

          if (temp.Risk === "Critical") {
            setexpCredentialCritical(++expCredentialCritical);
          }
          else if (temp.Risk === "High") {
            setexpCredentialHigh(++expCredentialHigh)
          }
          else if (temp.Risk === "Medium") {
            setexpCredentialMedium(++expCredentialMedium)
          }
          else if (temp.Risk === "Low") {
            setexpCredentialLow(++expCredentialLow)
          }
          else if (temp.Risk === "Informational") {
            setexpCredentialInformational(++expCredentialInformational)
          }
        }

      }
      if (data.data.exposedSubdomains) {
        for (var i = 0; i < data.data.exposedSubdomains.Data.length; i++) {
          var temp = data.data.exposedSubdomains.Data[i];

          if (temp.Risk === "Critical") {
            setexpSubdomainCritical(++expSubdomainCritical);
          }
          else if (temp.Risk === "High") {
            setexpSubdomainHigh(++expSubdomainHigh)
          }
          else if (temp.Risk === "Medium") {
            setexpSubdomainMedium(++expSubdomainMedium)
          }
          else if (temp.Risk === "Low") {
            setexpSubdomainLow(++expSubdomainLow)
          }
          else if (temp.Risk === "Informational") {
            setexpSubdomainInformational(++expSubdomainInformational)
          }
        }
      }
      if (data.data.exposedWHOIS) {
        for (var i = 0; i < data.data.exposedWHOIS.Data.length; i++) {
          var temp = data.data.exposedWHOIS.Data[i];

          if (temp.Risk === "Critical") {
            setexpWHOISCritical(++expWHOISCritical);
          }
          else if (temp.Risk === "High") {
            setexpWHOISHigh(++expWHOISHigh)
          }
          else if (temp.Risk === "Medium") {
            setexpWHOISMedium(++expWHOISMedium)
          }
          else if (temp.Risk === "Low") {
            setexpWHOISLow(++expWHOISLow)
          }
          else if (temp.Risk === "Informational") {
            setexpWHOISInformational(++expWHOISInformational)
          }
        }
      }
      if (data.data.exposedDNS) {
        for (var i = 0; i < data.data.exposedDNS.Data.length; i++) {
          var temp = data.data.exposedDNS.Data[i];
          for (var j = 0; j < temp.A.length; j++) {


            if (temp.A[j].Risk === "Critical") {
              setexpDNSCritical(++expDNSCritical);
            }
            else if (temp.A[j].Risk === "High") {
              setexpDNSHigh(++expDNSHigh)
            }
            else if (temp.A[j].Risk === "Medium") {
              setexpDNSMedium(++expDNSMedium)
            }
            else if (temp.A[j].Risk === "Low") {
              setexpDNSLow(++expDNSLow)
            }
            else if (temp.A[j].Risk === "Informational") {
              setexpDNSInformational(++expDNSInformational)
            }
          }

          for (var j = 0; j < temp.AAAA.length; j++) {

            if (temp.AAAA[j].Risk === "Critical") {
              setexpDNSCritical(++expDNSCritical);
            }
            else if (temp.AAAA[j].Risk === "High") {
              setexpDNSHigh(++expDNSHigh)
            }
            else if (temp.AAAA[j].Risk === "Medium") {
              setexpDNSMedium(++expDNSMedium)
            }
            else if (temp.AAAA[j].Risk === "Low") {
              setexpDNSLow(++expDNSLow)
            }
            else if (temp.AAAA[j].Risk === "Informational") {
              setexpDNSInformational(++expDNSInformational)
            }
          }

          for (var j = 0; j < temp.MX.length; j++) {

            if (temp.MX[j].Risk === "Critical") {
              setexpDNSCritical(++expDNSCritical);
            }
            else if (temp.MX[j].Risk === "High") {
              setexpDNSHigh(++expDNSHigh)
            }
            else if (temp.MX[j].Risk === "Medium") {
              setexpDNSMedium(++expDNSMedium)
            }
            else if (temp.MX[j].Risk === "Low") {
              setexpDNSLow(++expDNSLow)
            }
            else if (temp.MX[j].Risk === "Informational") {
              setexpDNSInformational(++expDNSInformational)
            }
          }

          for (var j = 0; j < temp.NS.length; j++) {
            if (temp.NS[j].Risk === "Critical") {
              setexpDNSCritical(++expDNSCritical);
            }
            else if (temp.NS[j].Risk === "High") {
              setexpDNSHigh(++expDNSHigh)
            }
            else if (temp.NS[j].Risk === "Medium") {
              setexpDNSMedium(++expDNSMedium)
            }
            else if (temp.NS[j].Risk === "Low") {
              setexpDNSLow(++expDNSLow)
            }
            else if (temp.NS[j].Risk === "Informational") {
              setexpDNSInformational(++expDNSInformational)
            }
          }

          for (var j = 0; j < temp.TXT.length; j++) {

            if (temp.TXT[j].Risk === "Critical") {
              setexpDNSCritical(++expDNSCritical);
            }
            else if (temp.TXT[j].Risk === "High") {
              setexpDNSHigh(++expDNSHigh)
            }
            else if (temp.TXT[j].Risk === "Medium") {
              setexpDNSMedium(++expDNSMedium)
            }
            else if (temp.TXT[j].Risk === "Low") {
              setexpDNSLow(++expDNSLow)
            }
            else if (temp.TXT[j].Risk === "Informational") {
              setexpDNSInformational(++expDNSInformational)
            }
          }

        }

      }
      if (data.data.exposedPorts) {
        for (var i = 0; i < data.data.exposedPorts.Data.length; i++) {
          for (var j = 0; j < data.data.exposedPorts.Data[i].Ports.length; j++) {
            var temp = data.data.exposedPorts.Data[i].Ports[j];
            if (temp.Risk === "Critical") {
              setexpPortsCritical(++expPortsCritical);
            }
            else if (temp.Risk === "High") {
              setexpPortsHigh(++expPortsHigh)
            }
            else if (temp.Risk === "Medium") {
              setexpPortsMedium(++expPortsMedium)
            }
            else if (temp.Risk === "Low") {
              setexpPortsLow(++expPortsLow)
            }
            else if (temp.Risk === "Informational") {
              setexpPortsInformational(++expPortsInformational)
            }
          }
        }
      }
      if (data.data.exposedReverseDNS) {
        for (var i = 0; i < data.data.exposedReverseDNS.Data.length; i++) {
          var temp = data.data.exposedReverseDNS.Data[i];

          if (temp.Risk === "Critical") {
            setexpReverseDNSCritical(++expReverseDNSCritical);
          }
          else if (temp.Risk === "High") {
            setexpReverseDNSHigh(++expReverseDNSHigh)
          }
          else if (temp.Risk === "Medium") {
            setexpReverseDNSMedium(++expReverseDNSMedium)
          }
          else if (temp.Risk === "Low") {
            setexpReverseDNSLow(++expReverseDNSLow)
          }
          else if (temp.Risk === "Informational") {
            setexpReverseDNSInformational(++expReverseDNSInformational)
          }
        }
      }
      if (data.data.exposedReverseIP) {
        for (var i = 0; i < data.data.exposedReverseIP.Data.length; i++) {
          for (var j = 0; j < data.data.exposedReverseIP.Data[i].Domains.length; j++) {
            var temp = data.data.exposedReverseIP.Data[i].Domains[j];
            if (temp.Risk === "Critical") {
              setexpReverseIPCritical(++expReverseIPCritical);
            }
            else if (temp.Risk === "High") {
              setexpReverseIPHigh(++expReverseIPHigh)
            }
            else if (temp.Risk === "Medium") {
              setexpReverseIPMedium(++expReverseIPMedium)
            }
            else if (temp.Risk === "Low") {
              setexpReverseIPLow(++expReverseIPLow)
            }
            else if (temp.Risk === "Informational") {
              setexpReverseIPInformational(++expReverseIPInformational)
            }
          }
        }
      }
      // setexpPorts(data.data.exposedPorts.Data)
      // console.log(data.data.exposedReverseDNS.Data)




      // console.log("tempDataPorts", tempDataPorts)
      // setTimeout(() => {
      //   setportData(tempDataPorts);
      // }, 2000);

      // console.log("tempDataReverseDNS", tempDataReverseDNS)
      // setTimeout(() => {
      //   setexpReverseIP(tempDataReverseDNS);
      // }, 2000);


      setseries([{
        name: 'Critical',
        data: [expCredentialCritical, expSubdomainCritical, expWHOISCritical, expDNSCritical, expPortsCritical, expReverseDNSCritical, expReverseIPCritical]
      }, {
        name: 'High',
        data: [expCredentialHigh, expSubdomainHigh, expWHOISHigh, expDNSHigh, expPortsHigh, expReverseDNSHigh, expReverseIPHigh]
      }, {
        name: 'Medium',
        data: [expCredentialMedium, expSubdomainMedium, expWHOISMedium, expDNSMedium, expPortsMedium, expReverseDNSMedium, expReverseIPMedium]
      }, {
        name: 'Low',
        data: [expCredentialLow, expSubdomainLow, expWHOISLow, expDNSLow, expPortsLow, expReverseDNSLow, expReverseIPLow]
      }, {
        name: 'Informational',
        data: [expCredentialInformational, expSubdomainInformational, expWHOISInformational, expDNSInformational, expPortsInformational, expReverseDNSInformational, expReverseIPInformational]
      }])

      // overviewChartData ---------->
    }
    getRiskCalculated();
    // getRiskCalculated();
    // api to get risk calculated 
  }, [])


  const barchartColors = ["#780000", "#dc0000", "#5156be", "#02a499", "#38a4f8"];
  const options = {
    chart: {

      type: 'bar',
      height: 500,
      stacked: true,
      toolbar: {
        show: true
      },
    },
    plotOptions: {
      bar: {
        // columnWidth: '10%',
        horizontal: true,
        // rowWidth : "10px"
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
      show: true,
    },
    // yaxis: {
    //     labels: {
    //         formatter: function (y) {
    //             return y.toFixed(0) + "%";
    //         }
    //     }
    // },
    xaxis: {
      categories: [' Credentials', ' Subdomains', ' WHOIS', ' DNS', ' Ports', ' ReverseDNS', ' ReverseIP '],
      labels: {
        rotate: -90
      }
    }
  };

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
  return (

    <>

      <ReactApexChart
        options={options}
        series={series}
        // series = {[{
        //     name: 'Critical',
        //     data: [props.overviewChartexpCredentials.Critical,props.overviewChartexpSubdomains.Critical ,props.overviewChartexpWHOIS.Critical,props.overviewChartexpDNS.Critical,props.overviewChartexpPorts.Critical,props.overviewChartexpReverseDNS.Critical,props.overviewChartexpReverseIP.Critical,]
        // }, {
        //     name: 'High',
        //     data: [props.overviewChartexpCredentials.High,props.overviewChartexpSubdomains.High ,props.overviewChartexpWHOIS.High,props.overviewChartexpDNS.High,props.overviewChartexpPorts.High,props.overviewChartexpReverseDNS.High,props.overviewChartexpReverseIP.High,]
        // }, {
        //     name: 'Medium',
        //     data: [props.overviewChartexpCredentials.Medium,props.overviewChartexpSubdomains.Medium ,props.overviewChartexpWHOIS.Medium,props.overviewChartexpDNS.Medium,props.overviewChartexpPorts.Medium,props.overviewChartexpReverseDNS.Medium,props.overviewChartexpReverseIP.Medium,]
        // }, {
        //     name: 'Low',
        //     data: [props.overviewChartexpCredentials.Low,props.overviewChartexpSubdomains.Low ,props.overviewChartexpWHOIS.Low,props.overviewChartexpDNS.Low,props.overviewChartexpPorts.Low,props.overviewChartexpReverseDNS.Low,props.overviewChartexpReverseIP.Low,]
        // }, {
        //     name: 'Informational',
        //     data: [props.overviewChartexpCredentials.Informational,props.overviewChartexpSubdomains.Informational ,props.overviewChartexpWHOIS.Informational,props.overviewChartexpDNS.Informational,props.overviewChartexpPorts.Informational,props.overviewChartexpReverseDNS.Informational,props.overviewChartexpReverseIP.Informational,]
        // },]}
        type="bar"
        className="apex-charts"
      />
    </>
  );
}

export default RiskChart_1;