import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Container, CardHeader, Table, Badge, Button, Spinner } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// Charts
import Gauge from "../AllCharts/echart/gaugechart"
import Line from "../AllCharts/echart/linechart"
import LineBar from "../AllCharts/echart/linebarchart"
import Doughnut from "../AllCharts/echart/doughnutchart"
import Pie from "../AllCharts/echart/piechart"
import Scatter from "../AllCharts/echart/scatterchart"
import Bubble from "../AllCharts/echart/bubblechart"
import Candlestick from "../AllCharts/echart/candlestickchart"
import ReactSpeedometer from "react-d3-speedometer";
import OverviewCharts from '../Dashboard/OverviewCharts';

//Import Icons
import FeatherIcon from "feather-icons-react";
import ReactLoading from 'react-loading';

const Dashboard2 = () => {


  // userID and organzation ID is set to access user from localStorage
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


  var overviewChartData = {

    exposedCredentials: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    },

    exposedSubdomains: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    },

    exposedDNS: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    },

    exposedWHOIS: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    },

    exposedPorts: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    },

    exposedReverseDNS: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    },

    exposedReverseIP: {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
  }

  const [critical, setCritical] = useState();
  const [High, setHigh] = useState();
  const [Medium, setMedium] = useState();
  const [Low, setLow] = useState();
  const [Informational, setInformational] = useState();
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
  // const [expPorts, setexpPorts] = useState([]);
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
  const [loading, setloading] = useState(false)


  useEffect(() => {
    getRiskCalculated();
  }, [])

  // api to get risk calculated 
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
    console.log("riskCalculated value ", data.data)
    setCritical(data.data.riskScore.Critical)
    setHigh(data.data.riskScore.High)
    setMedium(data.data.riskScore.Medium)
    setLow(data.data.riskScore.Low)
    setInformational(data.data.riskScore.Informational)
    setTimeout(() => {
      setexpCredential(data.data.exposedCredentials.Data)
    }, 2000);
    setexpSubdomains(data.data.exposedSubdomains.Data)
    setdesiredDomainInfo(data.data.exposedWHOIS.Data[0])
    setRegistrantValue(data.data.exposedWHOIS.Data[0].Registrant_Contacts[0])
    setTechnicalValue(data.data.exposedWHOIS.Data[0].Technical_Contacts[0])
    setAdministrativeValue(data.data.exposedWHOIS.Data[0].Admin_Contacts[0])
    setsetA(data.data.exposedDNS.Data[0].A)
    setsetAAAA(data.data.exposedDNS.Data[0].AAAA)
    setsetMX(data.data.exposedDNS.Data[0].MX)
    setsetNS(data.data.exposedDNS.Data[0].NS)
    setsetTXT(data.data.exposedDNS.Data[0].TXT)
    // setexpPorts(data.data.exposedPorts.Data)
    setexpReverseDNS(data.data.exposedReverseDNS.Data)
    // console.log(data.data.exposedReverseDNS.Data)

    var tempoverviewChartexpCredentials = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    for (var i = 0; i < data.data.exposedCredentials.Data.length; i++) {
      var temp = data.data.exposedCredentials.Data[i];

      if (temp.Risk === "Critical") {
        console.log(temp.Risk)
        tempoverviewChartexpCredentials.Critical = tempoverviewChartexpCredentials.Critical + 1
        // console.log("data " , StateoverviewChartData.exposedPorts)
      }
      else if (temp.Risk === "High") {
        tempoverviewChartexpCredentials.High = tempoverviewChartexpCredentials.High + 1
      }
      else if (temp.Risk === "Medium") {
        tempoverviewChartexpCredentials.Medium = tempoverviewChartexpCredentials.Medium + 1
      }
      else if (temp.Risk === "Low") {
        tempoverviewChartexpCredentials.Low = tempoverviewChartexpCredentials.Low + 1
      }
      else if (temp.Risk === "Informational") {
        tempoverviewChartexpCredentials.Informational = tempoverviewChartexpCredentials.Informational + 1
      }
    }
    setoverviewChartexpCredentials(tempoverviewChartexpCredentials)


    var tempoverviewChartexpSubdomains = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    for (var i = 0; i < data.data.exposedSubdomains.Data.length; i++) {
      var temp = data.data.exposedSubdomains.Data[i];

      if (temp.Risk === "Critical") {
        console.log(temp.Risk)
        tempoverviewChartexpSubdomains.Critical = tempoverviewChartexpSubdomains.Critical + 1
        // console.log("data " , StateoverviewChartData.exposedPorts)
      }
      else if (temp.Risk === "High") {
        tempoverviewChartexpSubdomains.High = tempoverviewChartexpSubdomains.High + 1
      }
      else if (temp.Risk === "Medium") {
        tempoverviewChartexpSubdomains.Medium = tempoverviewChartexpSubdomains.Medium + 1
      }
      else if (temp.Risk === "Low") {
        tempoverviewChartexpSubdomains.Low = tempoverviewChartexpSubdomains.Low + 1
      }
      else if (temp.Risk === "Informational") {
        tempoverviewChartexpSubdomains.Informational = tempoverviewChartexpSubdomains.Informational + 1
      }
    }
    setoverviewChartexpSubdomains(tempoverviewChartexpSubdomains)


    var tempoverviewChartexpWHOIS = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    for (var i = 0; i < data.data.exposedWHOIS.Data.length; i++) {
      var temp = data.data.exposedWHOIS.Data[i];

      if (temp.Risk === "Critical") {
        console.log(temp.Risk)
        tempoverviewChartexpWHOIS.Critical = tempoverviewChartexpWHOIS.Critical + 1
        // console.log("data " , StateoverviewChartData.exposedPorts)
      }
      else if (temp.Risk === "High") {
        tempoverviewChartexpWHOIS.High = tempoverviewChartexpWHOIS.High + 1
      }
      else if (temp.Risk === "Medium") {
        tempoverviewChartexpWHOIS.Medium = tempoverviewChartexpWHOIS.Medium + 1
      }
      else if (temp.Risk === "Low") {
        tempoverviewChartexpWHOIS.Low = tempoverviewChartexpWHOIS.Low + 1
      }
      else if (temp.Risk === "Informational") {
        tempoverviewChartexpWHOIS.Informational = tempoverviewChartexpWHOIS.Informational + 1
      }
    }
    setoverviewChartexpWHOIS(tempoverviewChartexpWHOIS)

    var tempoverviewChartexpDNS = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    for (var i = 0; i < data.data.exposedDNS.Data.length; i++) {
      var temp = data.data.exposedDNS.Data[i];
      for (var j = 0; j < temp.A.length; j++) {

        if (temp.A[j].Risk === "Critical") {
          console.log(temp.A[j].Risk)
          tempoverviewChartexpDNS.Critical = tempoverviewChartexpDNS.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.A[j].Risk === "High") {
          tempoverviewChartexpDNS.High = tempoverviewChartexpDNS.High + 1
        }
        else if (temp.A[j].Risk === "Medium") {
          tempoverviewChartexpDNS.Medium = tempoverviewChartexpDNS.Medium + 1
        }
        else if (temp.A[j].Risk === "Low") {
          tempoverviewChartexpDNS.Low = tempoverviewChartexpDNS.Low + 1
        }
        else if (temp.A[j].Risk === "Informational") {
          tempoverviewChartexpDNS.Informational = tempoverviewChartexpDNS.Informational + 1
        }
      }

      for (var j = 0; j < temp.AAAA.length; j++) {

        if (temp.AAAA[j].Risk === "Critical") {
          console.log(temp.AAAA[j].Risk)
          tempoverviewChartexpDNS.Critical = tempoverviewChartexpDNS.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.AAAA[j].Risk === "High") {
          tempoverviewChartexpDNS.High = tempoverviewChartexpDNS.High + 1
        }
        else if (temp.AAAA[j].Risk === "Medium") {
          tempoverviewChartexpDNS.Medium = tempoverviewChartexpDNS.Medium + 1
        }
        else if (temp.AAAA[j].Risk === "Low") {
          tempoverviewChartexpDNS.Low = tempoverviewChartexpDNS.Low + 1
        }
        else if (temp.AAAA[j].Risk === "Informational") {
          tempoverviewChartexpDNS.Informational = tempoverviewChartexpDNS.Informational + 1
        }
      }

      for (var j = 0; j < temp.MX.length; j++) {

        if (temp.MX[j].Risk === "Critical") {
          console.log(temp.MX[j].Risk)
          tempoverviewChartexpDNS.Critical = tempoverviewChartexpDNS.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.MX[j].Risk === "High") {
          tempoverviewChartexpDNS.High = tempoverviewChartexpDNS.High + 1
        }
        else if (temp.MX[j].Risk === "Medium") {
          tempoverviewChartexpDNS.Medium = tempoverviewChartexpDNS.Medium + 1
        }
        else if (temp.MX[j].Risk === "Low") {
          tempoverviewChartexpDNS.Low = tempoverviewChartexpDNS.Low + 1
        }
        else if (temp.MX[j].Risk === "Informational") {
          tempoverviewChartexpDNS.Informational = tempoverviewChartexpDNS.Informational + 1
        }
      }

      for (var j = 0; j < temp.NS.length; j++) {

        if (temp.NS[j].Risk === "Critical") {
          console.log(temp.NS[j].Risk)
          tempoverviewChartexpDNS.Critical = tempoverviewChartexpDNS.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.NS[j].Risk === "High") {
          tempoverviewChartexpDNS.High = tempoverviewChartexpDNS.High + 1
        }
        else if (temp.NS[j].Risk === "Medium") {
          tempoverviewChartexpDNS.Medium = tempoverviewChartexpDNS.Medium + 1
        }
        else if (temp.NS[j].Risk === "Low") {
          tempoverviewChartexpDNS.Low = tempoverviewChartexpDNS.Low + 1
        }
        else if (temp.NS[j].Risk === "Informational") {
          tempoverviewChartexpDNS.Informational = tempoverviewChartexpDNS.Informational + 1
        }
      }

      for (var j = 0; j < temp.TXT.length; j++) {

        if (temp.TXT[j].Risk === "Critical") {
          console.log(temp.TXT[j].Risk)
          tempoverviewChartexpDNS.Critical = tempoverviewChartexpDNS.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.TXT[j].Risk === "High") {
          tempoverviewChartexpDNS.High = tempoverviewChartexpDNS.High + 1
        }
        else if (temp.TXT[j].Risk === "Medium") {
          tempoverviewChartexpDNS.Medium = tempoverviewChartexpDNS.Medium + 1
        }
        else if (temp.TXT[j].Risk === "Low") {
          tempoverviewChartexpDNS.Low = tempoverviewChartexpDNS.Low + 1
        }
        else if (temp.TXT[j].Risk === "Informational") {
          tempoverviewChartexpDNS.Informational = tempoverviewChartexpDNS.Informational + 1
        }
      }

    }
    setoverviewChartexpDNS(tempoverviewChartexpDNS)


    var tempoverviewChartexpReverseDNS = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    for (var i = 0; i < data.data.exposedReverseDNS.Data.length; i++) {
      var temp = data.data.exposedReverseDNS.Data[i];

      if (temp.Risk === "Critical") {
        console.log(temp.Risk)
        tempoverviewChartexpReverseDNS.Critical = tempoverviewChartexpReverseDNS.Critical + 1
        // console.log("data " , StateoverviewChartData.exposedPorts)
      }
      else if (temp.Risk === "High") {
        tempoverviewChartexpReverseDNS.High = tempoverviewChartexpReverseDNS.High + 1
      }
      else if (temp.Risk === "Medium") {
        tempoverviewChartexpReverseDNS.Medium = tempoverviewChartexpReverseDNS.Medium + 1
      }
      else if (temp.Risk === "Low") {
        tempoverviewChartexpReverseDNS.Low = tempoverviewChartexpReverseDNS.Low + 1
      }
      else if (temp.Risk === "Informational") {
        tempoverviewChartexpReverseDNS.Informational = tempoverviewChartexpReverseDNS.Informational + 1
      }
    }
    setoverviewChartexpReverseDNS(tempoverviewChartexpReverseDNS)

    const expPorts = data.data.exposedPorts.Data;
    // console.log("expPorts", expPorts)
    var tempoverviewChartexpPorts = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    var tempDataPorts = [];
    for (var i = 0; i < expPorts.length; i++) {
      for (var j = 0; j < expPorts[i].Ports.length; j++) {
        var temp = expPorts[i].Ports[j];
        tempDataPorts[k] = {
          ID: expPorts[i].ID,
          IP: expPorts[i].IP,
          Port: temp.Port,
          Service: temp.Service,
          Risk: temp.Risk
        }
        if (temp.Risk === "Critical") {
          console.log(temp.Risk)
          tempoverviewChartexpPorts.Critical = tempoverviewChartexpPorts.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.Risk === "High") {
          tempoverviewChartexpPorts.High = tempoverviewChartexpPorts.High + 1
        }
        else if (temp.Risk === "Medium") {
          tempoverviewChartexpPorts.Medium = tempoverviewChartexpPorts.Medium + 1
        }
        else if (temp.Risk === "Low") {
          tempoverviewChartexpPorts.Low = tempoverviewChartexpPorts.Low + 1
        }
        else if (temp.Risk === "Informational") {
          tempoverviewChartexpPorts.Informational = tempoverviewChartexpPorts.Informational + 1
        }
        k++;
      }
    }
    setoverviewChartexpPorts(tempoverviewChartexpPorts)
    // console.log("tempDataPorts", tempDataPorts)
    setportData(tempDataPorts);

    const expReverseIP = data.data.exposedReverseIP.Data;
    var tempDataReverseDNS = [];
    var tempoverviewChartexpReverseIP = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Informational: 0
    }
    for (var i = 0; i < expReverseIP.length; i++) {
      for (var j = 0; j < expReverseIP[i].Domains.length; j++) {
        var temp = expReverseIP[i].Domains[j];
        tempDataReverseDNS[l] = {
          ID: expReverseIP[i].ID,
          IP: expReverseIP[i].IP,
          Domain: temp.Domain,
          Risk: temp.Risk
        }
        if (temp.Risk === "Critical") {
          console.log(temp.Risk)
          tempoverviewChartexpReverseIP.Critical = tempoverviewChartexpReverseIP.Critical + 1
          // console.log("data " , StateoverviewChartData.exposedReverseIP)
        }
        else if (temp.Risk === "High") {
          tempoverviewChartexpReverseIP.High = tempoverviewChartexpReverseIP.High + 1
        }
        else if (temp.Risk === "Medium") {
          tempoverviewChartexpReverseIP.Medium = tempoverviewChartexpReverseIP.Medium + 1
        }
        else if (temp.Risk === "Low") {
          tempoverviewChartexpReverseIP.Low = tempoverviewChartexpReverseIP.Low + 1
        }
        else if (temp.Risk === "Informational") {
          tempoverviewChartexpReverseIP.Informational = tempoverviewChartexpReverseIP.Informational + 1
        }
        l++;
      }
    }
    setoverviewChartexpReverseIP(tempoverviewChartexpReverseIP)
    // console.log("tempDataReverseDNS", tempDataReverseDNS)
    setexpReverseIP(tempDataReverseDNS);

    // overviewChartData ---------->
  }
  const toggleLoader = () => {
    if (!loading) {
      setloading(true)
      setTimeout(() => {
        setloading(false)
      }, 2000);
    } else {
      setloading(false)
      setTimeout(() => {
        setloading(true)
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Risk Dashboard | GuardLogiX</title>
        </MetaTags>
        <Container fluid={true}>
          {/* Render Breadcrumb */}

          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Dashboard"
            breadcrumbFeature="Dashboard "
          />
          <Row>
            <Col xl="4">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <CardTitle className="fw-bold">Risk  Meter</CardTitle>
                  <div>
                    <div className="btnContainer">


                      <button
                        onClick={() => { toggleLoader() }}
                        className="d-flex btn-primary btn-sm justify-content-center align-items-center mb-0 cursor-pointer border-none"
                      // size="lg"
                      >  {loading ? (
                        <Spinner
                          style={{ height: "100%", width: "100%" }}
                          animation="border"
                          variant="danger"
                        />
                      ) : null}
                        {loading ? "Loading..." :
                          <FeatherIcon icon="refresh-ccw" />}
                      </button>
                    </div>
                  </div>

                </CardHeader>
                <CardBody>
                  <div id="line-chart" className="e-chart">

                    <ReactSpeedometer
                      forceRender={true}
                      // customSegmentStops={[0, critical, critical+High, critical+High+Medium, critical+High+ Medium+Low,  critical+High +Medium+Low+ Informational]}
                      // customSegmentStops={[0, critical, critical+High, critical+High+Medium, critical+High+ Medium+Low, critical+High +Medium+Low+ Informational]}
                      segmentColors={["#780000", "#dc0000", "#f8b425", "#02a499", "#38a4f8"]}
                      customSegmentLabels={[{ text: `Critical ${critical}`, color: "white" }, { text: `High ${High}`, color: "white" }, { text: `Medium ${Medium}`, color: "white" }, { text: `Low ${Low}`, color: "white" }, { text: `Informational ${Informational}`, color: "white" }]}
                      value={333}
                      segments={5}
                      width={500}
                      height={352}

                      minValue={0}
                      maxValue={critical + High + Medium + Low + Informational}
                      currentValueText="Risk Level"
                      needleColor="steelblue"
                      needleTransitionDuration={4000}
                      needleTransition="easeElastic"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>


            {/* <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle className="fw-bold">Risk Chart - 2</CardTitle>
                </CardHeader>
                <CardBody>
                  <div id="doughnut-chart" className="e-chart">
                    <Doughnut critical={critical}
                      High={High}
                      Medium={Medium}
                      Low={Low}
                      Informational={Informational} />
                  </div>
                </CardBody>
              </Card>
            </Col> */}
            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle className="fw-bold">Risk Chart-1</CardTitle>
                </CardHeader>
                <CardBody style={{ paddingBottom: "72px" }}>

                  <div id="market-overview" className="apex-charts">
                    <OverviewCharts overviewChartexpPorts={overviewChartexpPorts}
                      overviewChartexpReverseIP={overviewChartexpReverseIP}
                      overviewChartexpCredentials={overviewChartexpCredentials}
                      overviewChartexpSubdomains={overviewChartexpSubdomains}
                      overviewChartexpReverseDNS={overviewChartexpReverseDNS}
                      overviewChartexpWHOIS={overviewChartexpWHOIS}
                      overviewChartexpDNS={overviewChartexpDNS} />
                  </div>
                </CardBody>
              </Card>
            </Col>


            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle className="fw-bold">Risk Chart-2</CardTitle>
                </CardHeader>
                <CardBody>
                  <div id="pie-chart" className="e-chart">
                    <Pie critical={critical}
                      High={High}
                      Medium={Medium}
                      Low={Low}
                      Informational={Informational}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl="4">

              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed Credentials</CardTitle>
                </CardHeader>
                {/* {(expCredential === []) ?<ReactLoading type={"bar"} color={"black"} height={100} width={100} /> : <ReactLoading type={"bar"} color={"black"} height={100} width={100} /> } */}
                {(() => {
                  console.log("exp", expCredential)
                  if (expCredential.length <= 0) {
                    return (
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div>
                    )
                  }
                  else {
                    return (
                      // <ReactLoading type={"balls"} color={"black"} height={100} width={100} />
                      <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                        <Table bordered  >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Email</th>
                              <th>Risk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expCredential.map((value, index) => {
                              if (value.Risk === "High" || value.Risk === "Critical") {
                                return (

                                  <tr key={index}>
                                    <td>{value.ID}</td>
                                    <td>{value.Email}</td>

                                    {(() => {
                                      if (value.Risk === "Critical") {
                                        return (
                                          <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                            {value.Risk}
                                          </Badge></td>
                                        )
                                      } else if (value.Risk === "High") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else {
                                        return (
                                          <div>catch all</div>
                                        )
                                      }
                                    })()}
                                  </tr>)
                              }

                            })}
                          </tbody>
                        </Table>
                      </CardBody>
                    )
                  }
                })()}
              </Card>
            </Col>

            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold" >Top Risk of  Exposed Subdomains</CardTitle>
                </CardHeader>
                <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                  <Table bordered  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Subdomain</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expSubdomains.map((value, index) => {
                        if (value.Risk === "High" || value.Risk === "Critical") {
                          return (

                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.Subdomain}</td>

                              {(() => {
                                if (value.Risk === "Critical") {
                                  return (
                                    <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                      {value.Risk}
                                    </Badge></td>
                                  )
                                } else if (value.Risk === "High") {
                                  return (
                                    <td>
                                      <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                        {value.Risk}
                                      </Badge></td>
                                  )
                                } else {
                                  return (
                                    <div>catch all</div>
                                  )
                                }
                              })()}
                            </tr>)
                        }

                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed Ports</CardTitle>
                </CardHeader>
                <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                  <Table bordered  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>IP</th>
                        <th>Port</th>
                        <th>Service</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {console.log("portaFata", portData)} */}


                      {portData.map((value, index) => {

                        if (value.Risk === "High" || value.Risk === "Critical") {
                          return (

                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.IP}</td>
                              <td>{value.Port}</td>
                              <td>{value.Service}</td>

                              {(() => {
                                if (value.Risk === "Critical") {
                                  return (
                                    <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                      {value.Risk}
                                    </Badge></td>
                                  )
                                } else if (value.Risk === "High") {
                                  return (
                                    <td>
                                      <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                        {value.Risk}
                                      </Badge></td>
                                  )
                                } else {
                                  return (
                                    <div>catch all</div>
                                  )
                                }
                              })()}
                            </tr>)
                        }

                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of Exposed ReverseIP</CardTitle>
                </CardHeader>
                <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                  <Table bordered  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>IP</th>
                        <th>Domain</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {console.log("portaFata", portData)} */}


                      {expReverseIP.map((value, index) => {

                        if (value.Risk === "High" || value.Risk === "Critical") {
                          return (

                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.IP}</td>
                              <td>{value.Domain}</td>

                              {(() => {
                                if (value.Risk === "Critical") {
                                  return (
                                    <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                      {value.Risk}
                                    </Badge></td>
                                  )
                                } else if (value.Risk === "High") {
                                  return (
                                    <td>
                                      <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                        {value.Risk}
                                      </Badge></td>
                                  )
                                } else {
                                  return (
                                    <div>catch all</div>
                                  )
                                }
                              })()}
                            </tr>)
                        }

                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>


            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed ReverseDNS</CardTitle>
                </CardHeader>
                <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                  <Table bordered  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Domain</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>

                      {expReverseDNS.map((value, index) => {
                        if (value.Risk === "High" || value.Risk === "Critical") {
                          return (

                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.Domain}</td>

                              {(() => {
                                if (value.Risk === "Critical") {
                                  return (
                                    <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                      {value.Risk}
                                    </Badge></td>
                                  )
                                } else if (value.Risk === "High") {
                                  return (
                                    <td>
                                      <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                        {value.Risk}
                                      </Badge></td>
                                  )
                                } else {
                                  return (
                                    <div>catch all</div>
                                  )
                                }
                              })()}
                            </tr>)
                        }

                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col xl="4">

              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed DNS</CardTitle>
                </CardHeader>
                <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">

                  <Card style={{}}>
                    <CardHeader className="p-3">
                      <CardTitle >A </CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                      <Table
                        responsive
                        class="table "
                      >
                        <thead>
                          <tr>

                            <th>
                              ID
                            </th>
                            <th>Type</th>
                            <th>Data</th>
                            <th>Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {setA.map((value, index) => {
                            if (value.Risk === "High" || value.Risk === "Critical") {
                              return (

                                <tr key={index}>
                                  <td>{value.ID}</td>
                                  <td>{value.Type}</td>
                                  <td>{value.Data}</td>

                                  {(() => {
                                    if (value.Risk === "Critical") {
                                      return (
                                        <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                          {value.Risk}
                                        </Badge></td>
                                      )
                                    } else if (value.Risk === "High") {
                                      return (
                                        <td>
                                          <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                            {value.Risk}
                                          </Badge></td>
                                      )
                                    } else {
                                      return (
                                        <div>catch all</div>
                                      )
                                    }
                                  })()}
                                </tr>)
                            }

                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  <Card style={{}}>
                    <CardHeader className="p-3">
                      <CardTitle >AAAA</CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                      <Table
                        responsive
                        class="table "
                      >
                        <thead>
                          <tr>
                            <th>
                              ID
                            </th>
                            <th>Type</th>
                            <th>Data</th>
                            <th>Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {setAAAA.map((value, index) => {
                            if (value.Risk === "High" || value.Risk === "Critical") {
                              return (

                                <tr key={index}>
                                  <td>{value.ID}</td>
                                  <td>{value.Type}</td>
                                  <td>{value.Data}</td>

                                  {(() => {
                                    if (value.Risk === "Critical") {
                                      return (
                                        <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                          {value.Risk}
                                        </Badge></td>
                                      )
                                    } else if (value.Risk === "High") {
                                      return (
                                        <td>
                                          <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                            {value.Risk}
                                          </Badge></td>
                                      )
                                    } else {
                                      return (
                                        <div>catch all</div>
                                      )
                                    }
                                  })()}
                                </tr>)
                            }

                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  <Card style={{}}>
                    <CardHeader className="p-3">
                      <CardTitle >MX </CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                      <Table
                        responsive
                        class="table "
                      >
                        <thead>
                          <tr>

                            <th>
                              ID
                            </th>
                            <th>Type</th>
                            <th>Data</th>
                            <th>Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {setMX.map((value, index) => {
                            if (value.Risk === "High" || value.Risk === "Critical") {
                              return (

                                <tr key={index}>
                                  <td>{value.ID}</td>
                                  <td>{value.Type}</td>
                                  <td>{value.Data}</td>

                                  {(() => {
                                    if (value.Risk === "Critical") {
                                      return (
                                        <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                          {value.Risk}
                                        </Badge></td>
                                      )
                                    } else if (value.Risk === "High") {
                                      return (
                                        <td>
                                          <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                            {value.Risk}
                                          </Badge></td>
                                      )
                                    } else {
                                      return (
                                        <div>catch all</div>
                                      )
                                    }
                                  })()}
                                </tr>)
                            }

                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  <Card style={{}}>
                    <CardHeader className="p-3">
                      <CardTitle >NS </CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                      <Table
                        responsive
                        class="table "
                      >
                        <thead>
                          <tr>

                            <th>
                              ID
                            </th>
                            <th>Type</th>
                            <th>Data</th>
                            <th>Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {setNS.map((value, index) => {
                            if (value.Risk === "High" || value.Risk === "Critical") {
                              return (

                                <tr key={index}>
                                  <td>{value.ID}</td>
                                  <td>{value.Type}</td>
                                  <td>{value.Data}</td>

                                  {(() => {
                                    if (value.Risk === "Critical") {
                                      return (
                                        <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                          {value.Risk}
                                        </Badge></td>
                                      )
                                    } else if (value.Risk === "High") {
                                      return (
                                        <td>
                                          <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                            {value.Risk}
                                          </Badge></td>
                                      )
                                    } else {
                                      return (
                                        <div>catch all</div>
                                      )
                                    }
                                  })()}
                                </tr>)
                            }

                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  <Card style={{}}>
                    <CardHeader className="p-3">
                      <CardTitle >TXT</CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                      <Table
                        responsive
                        class="table "
                      >
                        <thead>
                          <tr>

                            <th>
                              ID
                            </th>
                            <th>Type</th>
                            <th>Data</th>
                            <th>Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {setTXT.map((value, index) => {
                            if (value.Risk === "High" || value.Risk === "Critical") {
                              return (

                                <tr key={index}>
                                  <td>{value.ID}</td>
                                  <td>{value.Type}</td>
                                  <td>{value.Data}</td>

                                  {(() => {
                                    if (value.Risk === "Critical") {
                                      return (
                                        <td>  <Badge pill className="me-2 " style={{ background: "#780000" }}>
                                          {value.Risk}
                                        </Badge></td>
                                      )
                                    } else if (value.Risk === "High") {
                                      return (
                                        <td>
                                          <Badge pill className="badge-soft ms-1" style={{ background: "#dc0000" }}>
                                            {value.Risk}
                                          </Badge></td>
                                      )
                                    } else {
                                      return (
                                        <div>catch all</div>
                                      )
                                    }
                                  })()}
                                </tr>)
                            }

                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>

                </CardBody>
              </Card>
            </Col>


          </Row>
          <Row>

            <Col xl="4">

              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed WHOIS</CardTitle>
                </CardHeader>
                <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">

                  <Card style={{}}>
                    <CardHeader className="p-3">
                      <CardTitle >Domain Information &nbsp;&nbsp;
                        {(() => {
                          if (desiredDomainInfo.Risk === "High") {
                            return (
                              <Badge
                                pill
                                className="me-2   "
                                style={{ background: "#780000" }}
                              >
                                High
                              </Badge>
                            );
                          } else if (
                            desiredDomainInfo.Risk === "Informational"
                          ) {
                            return (
                              <Badge
                                pill
                                className="me-2 bg-info  "

                              >
                                Informational
                              </Badge>
                            );
                          } else if (
                            desiredDomainInfo.Risk === "Critical"
                          ) {
                            return (
                              <Badge
                                pill
                                className="me-2   "
                                style={{ background: "#780000" }}
                              >
                                Critical
                              </Badge>
                            );
                          } else if (
                            desiredDomainInfo.Risk === "Medium"
                          ) {
                            return (
                              <Badge
                                pill
                                className="me-2 bg-warning "
                              >
                                Medium
                              </Badge>
                            );
                          } else {
                            return (
                              <Badge
                                pill
                                className="me-2 bg-success  "
                              >
                                Low
                              </Badge>
                            );
                          }
                        })()}
                      </CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">

                      <Table
                        hover
                        striped
                        responsive
                        class="table table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Domain </th>
                            {(() => {
                              if (
                                desiredDomainInfo.Domain != null
                              ) {
                                return (
                                  <td>
                                    {desiredDomainInfo.Domain}
                                  </td>
                                );
                              } else {
                                return <td> -</td>;
                              }
                            })()}
                          </tr>
                          <tr>
                            <th>Name </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Registrar_Name !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Registrar_Name
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>Organization </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Registrar_Organization !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Registrar_Organization
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>IANA ID </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Registrar_IANA_ID !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Registrar_IANA_ID
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>WHOIS Server </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Registrar_WHOIS_Server !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Registrar_WHOIS_Server
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>URL </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Registrar_URL !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Registrar_URL
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>Email </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Registrar_Email !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Registrar_Email
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>Phone </th>
                            {(() => {
                              if (
                                desiredDomainInfo.Registrar_Phone !=
                                null
                              ) {
                                return (
                                  <td>
                                    {
                                      desiredDomainInfo.Registrar_Phone
                                    }
                                  </td>
                                );
                              } else {
                                return <td> -</td>;
                              }
                            })()}
                          </tr>
                          <tr>
                            <th>Created On </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Created_On !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Created_On
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>Updated On </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Updated_On !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Updated_On
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <th>Expired On </th>
                            <td>
                              {(() => {
                                if (
                                  desiredDomainInfo.Expires_On !=
                                  null
                                ) {
                                  return (
                                    <td>
                                      {
                                        desiredDomainInfo.Expires_On
                                      }
                                    </td>
                                  );
                                } else {
                                  return <td> -</td>;
                                }
                              })()}
                            </td>
                          </tr>
                        </thead>
                      </Table>
                    </CardBody>
                  </Card>

                  <Card style={{}}>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">

                      <h6 className="p-3 border-bottom">Registrant Contact</h6>
                      <div className="auth-content my-auto">
                        <div className="text-center"></div>
                        <div className="mainTable">
                          <Table
                            hover
                            striped
                            responsive
                            class="table table-striped"
                          >
                            <thead>

                              <tr>
                                <th>Name </th>
                                {(() => {
                                  if (RegistrantValue.Name != null) {
                                    return (
                                      <td>{RegistrantValue.Name}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Organization </th>
                                {(() => {
                                  if (
                                    RegistrantValue.Organization !=
                                    null
                                  ) {
                                    return (
                                      <td>
                                        {RegistrantValue.Organization}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>City</th>
                                {(() => {
                                  if (RegistrantValue.City != null) {
                                    return (
                                      <td>{RegistrantValue.City}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>ZIP</th>
                                {(() => {
                                  if (RegistrantValue.ZIP != null) {
                                    return (
                                      <td>{RegistrantValue.ZIP}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>State </th>
                                {(() => {
                                  if (RegistrantValue.State != null) {
                                    return (
                                      <td>{RegistrantValue.State}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Country </th>
                                {(() => {
                                  if (
                                    RegistrantValue.Country != null
                                  ) {
                                    return (
                                      <td>
                                        {RegistrantValue.Country}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Email </th>
                                {(() => {
                                  if (RegistrantValue.Email != null) {
                                    return (
                                      <td>{RegistrantValue.Email}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Phone </th>
                                {(() => {
                                  if (RegistrantValue.Phone != null) {
                                    return (
                                      <td>{RegistrantValue.Phone}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Created On </th>
                                {(() => {
                                  if (
                                    RegistrantValue.Created_On != null
                                  ) {
                                    return (
                                      <td>
                                        {RegistrantValue.Created_On}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Updated On </th>
                                {(() => {
                                  if (
                                    RegistrantValue.Updated_On != null
                                  ) {
                                    return (
                                      <td>
                                        {RegistrantValue.Updated_On}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                            </thead>
                          </Table>
                        </div>
                      </div>


                      <h6 className="p-3 border-bottom">Administrative Contact</h6>
                      <div className="auth-content my-auto">
                        <div className="text-center"></div>
                        <div className="mainTable">
                          <Table
                            hover
                            striped
                            responsive
                            class="table table-striped"
                          >
                            <thead>
                              <tr>
                                <th>Name </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Name != null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.Name}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Organization </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Organization !=
                                    null
                                  ) {
                                    return (
                                      <td>
                                        {
                                          AdministrativeValue.Organization
                                        }
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>City</th>
                                {(() => {
                                  if (
                                    AdministrativeValue.City != null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.City}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>ZIP</th>
                                {(() => {
                                  if (
                                    AdministrativeValue.ZIP != null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.ZIP}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>State </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.State != null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.State}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Country </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Country !=
                                    null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.Country}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Email </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Email != null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.Email}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Phone </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Phone != null
                                  ) {
                                    return (
                                      <td>
                                        {AdministrativeValue.Phone}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Created On </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Created_On !=
                                    null
                                  ) {
                                    return (
                                      <td>
                                        {
                                          AdministrativeValue.Created_On
                                        }
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Updated On </th>
                                {(() => {
                                  if (
                                    AdministrativeValue.Updated_On !=
                                    null
                                  ) {
                                    return (
                                      <td>
                                        {
                                          AdministrativeValue.Updated_On
                                        }
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                            </thead>
                          </Table>
                        </div>
                      </div>

                      <h6 className="p-3 border-bottom">Technical Contact </h6>
                      <div className="auth-content my-auto">
                        <div className="text-center"></div>
                        <div className="mainTable">
                          <Table
                            hover
                            striped
                            responsive
                            class="table table-striped"
                          >
                            <thead>
                              <tr>
                                <th>Name </th>
                                {(() => {
                                  if (TechnicalValue.Name != null) {
                                    return (
                                      <td>{TechnicalValue.Name}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Organization </th>
                                {(() => {
                                  if (
                                    TechnicalValue.Organization !=
                                    null
                                  ) {
                                    return (
                                      <td>
                                        {TechnicalValue.Organization}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>City</th>
                                {(() => {
                                  if (TechnicalValue.City != null) {
                                    return (
                                      <td>{TechnicalValue.City}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>ZIP</th>
                                {(() => {
                                  if (TechnicalValue.ZIP != null) {
                                    return (
                                      <td>{TechnicalValue.ZIP}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>State </th>
                                {(() => {
                                  if (TechnicalValue.State != null) {
                                    return (
                                      <td>{TechnicalValue.State}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Country </th>
                                {(() => {
                                  if (
                                    TechnicalValue.Country != null
                                  ) {
                                    return (
                                      <td>
                                        {TechnicalValue.Country}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Email </th>
                                {(() => {
                                  if (TechnicalValue.Email != null) {
                                    return (
                                      <td>{TechnicalValue.Email}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Phone </th>
                                {(() => {
                                  if (TechnicalValue.Phone != null) {
                                    return (
                                      <td>{TechnicalValue.Phone}</td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Created On </th>
                                {(() => {
                                  if (
                                    TechnicalValue.Created_On != null
                                  ) {
                                    return (
                                      <td>
                                        {TechnicalValue.Created_On}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                              <tr>
                                <th>Updated On </th>
                                {(() => {
                                  if (
                                    TechnicalValue.Updated_On != null
                                  ) {
                                    return (
                                      <td>
                                        {TechnicalValue.Updated_On}
                                      </td>
                                    );
                                  } else {
                                    return <td> -</td>;
                                  }
                                })()}
                              </tr>
                            </thead>
                          </Table>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>

            <Col xl="6">
              <Card>
                <CardHeader>
                  <CardTitle>Bubble Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <div id="bubble-chart" className="e-chart">
                    <Bubble />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle>Candlestick Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <div id="candlestick-chart" className="e-chart">
                    <Candlestick />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle>Scatter Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <div id="scatter-chart" className="e-chart">
                    <Scatter />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle>Gauge Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <div id="gauge-chart" className="e-chart">
                    <Gauge />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard2
