import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Container, CardHeader, Table, Badge, Button, Spinner, InputGroup } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// Charts
import Gauge from "../AllCharts/echart/gaugechart"
import Line from "../AllCharts/echart/linechart"
import LineBar from "../AllCharts/echart/linebarchart"
import Doughnut from "../AllCharts/echart/doughnutchart"
import Scatter from "../AllCharts/echart/scatterchart"
import Bubble from "../AllCharts/echart/bubblechart"
import Candlestick from "../AllCharts/echart/candlestickchart"
import ReactSpeedometer from "react-d3-speedometer";
import RiskChart_1 from './RiskChart_1';

//Import Icons
import FeatherIcon from "feather-icons-react";
import ReactLoading from 'react-loading';
import RiskChart_2 from "./RiskChart_2";
import ScoreCard from "./ScoreCard";
import Score from "react-score-indicator"
import ReactStoreIndicator from "react-score-indicator"

import img from "../../assets/images/brands/dropbox.png"
import GaugeChart from 'react-gauge-chart'
import axios from "axios";

const Dashboard2 = () => {




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
  const [exposedDNSInfo, setexposedDNSInfo] = useState([]);
  const [setA, setsetA] = useState([]);
  const [setAAAA, setsetAAAA] = useState([]);
  const [setMX, setsetMX] = useState([]);
  const [setNS, setsetNS] = useState([]);
  const [setTXT, setsetTXT] = useState([]);
  // const [expPorts, setexpPorts] = useState([]);
  const [expReverseDNS, setexpReverseDNS] = useState([]);
  const [expReverseIP, setexpReverseIP] = useState([]);
  const [expPorts, setexpPorts] = useState([])
  const [orgAsset, setorgAsset] = useState()
  const [orgAsset_IP, setorgAsset_IP] = useState([])
  const [orgAsset_Domain, setorgAsset_Domain] = useState([])
  const [orgAsset_MobileApplication, setorgAsset_MobileApplication] = useState([])
  const [orgAsset_Subdomain, setorgAsset_Subdomain] = useState([])
  const [siteTitle, setsiteTitle] = useState()
  const [loading, setloading] = useState(false)
  const [condition, setcondition] = useState(true)
  const token = localStorage.getItem("token");


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




  // toggler for refresh on Overall organization severity
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

  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}jwtauth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token
      }),
    })
    const data = await response.json()
    if (!data.status) {
      window.location.href = "/login";
    }
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

    if (data.data.orgAsset) {
      setorgAsset(data.data.orgAsset.Asset)
      setorgAsset_Domain(data.data.orgAsset.Domain)
      setorgAsset_IP(data.data.orgAsset.IP)
      setorgAsset_Subdomain(data.data.orgAsset.Subdomain)
      setorgAsset_MobileApplication(data.data.orgAsset.MobileApplication)
      // setsiteTitle(data.data.orgAsset.Asset[0].Value)
      // if(!data.data.orgAsset.Asset[0].Value){}
    }

    if (data.data.exposedCredentials) {
      setexpCredential(data.data.exposedCredentials.Data)
    }
    if (data.data.exposedSubdomains) {
      setexpSubdomains(data.data.exposedSubdomains.Data)
    }
    if (data.data.exposedPorts) {
      // setmainportData(data.data.exposedPorts.Data)
      var tempDataForPorts = []
      for (var i = 0; i < data.data.exposedPorts.Data.length; i++) {
        for (var j = 0; j < data.data.exposedPorts.Data[i].Ports.length; j++) {
          var temp = data.data.exposedPorts.Data[i].Ports[j];

          tempDataForPorts[k] = {
            ID: data.data.exposedPorts.Data[i].ID,
            IP: data.data.exposedPorts.Data[i].IP,
            Port: temp.Port,
            Service: temp.Service,
            Risk: temp.Risk
          }
          k++;
        }
      }
      setexpPorts(tempDataForPorts)
    }
    // setexpSubdomains(data.data.exposedSubdomains.Data)
    if (data.data.exposedWHOIS) {
      setdesiredDomainInfo(data.data.exposedWHOIS.Data[0])
      setRegistrantValue(data.data.exposedWHOIS.Data[0].Registrant_Contacts[0])
      setAdministrativeValue(data.data.exposedWHOIS.Data[0].Admin_Contacts[0])
      setTechnicalValue(data.data.exposedWHOIS.Data[0].Technical_Contacts[0])
    }

    if (data.data.exposedDNS) {
      setexposedDNSInfo(data.data.exposedDNS.Data)
      setsetA(data.data.exposedDNS.Data[0].A)
      setsetAAAA(data.data.exposedDNS.Data[0].AAAA)
      setsetMX(data.data.exposedDNS.Data[0].MX)
      setsetNS(data.data.exposedDNS.Data[0].NS)
      setsetTXT(data.data.exposedDNS.Data[0].TXT)
    }

    if (data.data.exposedReverseDNS) {
      setexpReverseDNS(data.data.exposedReverseDNS.Data)
    }
    if (data.data.exposedReverseIP) {
      // console.log("reverseIP ", data.data.exposedReverseIP)
      // setexpReverseIP(data.data.exposedReverseIP.Data)  
      // setmainportData(data.data.exposedReverseIP.Data)
      var tempDataForDomains = []
      for (var i = 0; i < data.data.exposedReverseIP.Data.length; i++) {
        for (var j = 0; j < data.data.exposedReverseIP.Data[i].Domains.length; j++) {
          var temp = data.data.exposedReverseIP.Data[i].Domains[j];

          tempDataForDomains[l] = {
            ID: data.data.exposedReverseIP.Data[i].ID,
            IP: data.data.exposedReverseIP.Data[i].IP,
            Domain: temp.Domain,
            Risk: temp.Risk
          }
          l++;
        }
      }
      setexpReverseIP(tempDataForDomains)
    }

  }

  // function to get maximum value for severity chart
  // function maxof(Critical, High , Medium , Low , Information){
  //   console.log("max",Math.max(Critical, High , Medium , Low , Information) )
  //   return Math.max(Critical, High , Medium , Low , Information)
  // }



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
            {/* <Button onClick={() => {
                        console.log("u just clicked")
                        axios.post(`${process.env.REACT_APP_DEFAULTPATH}saveAssetList`, { name: "name" }).then((res) => {
                            console.log("res", res)
                        }).catch((err) => {
                            console.error(err)
                        })
                        

                        // fetch(`${process.env.REACT_APP_DEFAULTPATH}saveAssetList`, {
                        //     method: "POST",
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //     },
                        //     body:new FormData(document.getElementById("form"))
                        // }).then((res) => {
                        //     console.log("res", res)
                        // }).catch((err) => {
                        //     console.error(err)
                        // })

                    }}>test</Button> */}


            <Col xl="4">

              <Card style={{ height: "400px", minHeight: "459px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Site Information</CardTitle>
                </CardHeader>

                {/* {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()} */}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :

                  <CardBody style={{ height: "387px" }}>

                    <div id="invested-overview" className="apex-charts">
                      <div className="siteInfo">
                        <div className="mainHeader">
                          <div className="logo">
                            {/* <FeatherIcon icon="anchor" />
           im */}
                            <img src={img} />
                          </div>
                          <div className="title">
                            www.{siteTitle}
                          </div>
                        </div>
                        <div className="header">
                          <div className="heading">
                            Title
                          </div>
                          <div className="title">
                            www.{siteTitle}
                          </div>
                        </div>
                        <div className="header">
                          <div className="heading">
                            HTTP Status
                          </div>
                          <div className="title">
                            302
                          </div>
                        </div>
                        <div className="header">
                          <div className="heading">
                            URL
                          </div>
                          <div className="title text-primary cursor-pointer">
                            www.{siteTitle}
                          </div>
                        </div>
                      </div>
                    </div>

                  </CardBody>
                }
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle className="fw-bold">Overall Organization Score</CardTitle>
                </CardHeader>
                <CardBody style={{ height: "387px" }} className="d-flex justify-content-center align-items-center flex-column">

                  <div id="invested-overview" className="apex-charts">
                    <ScoreCard />
                    {/* <ReactStoreIndicator 
                      value={2}
                      maxValue={10}
                      borderWidth={0}
                      maxAngle={240}
                      rotation={90}
                      lineGap={1}
                      lineWidth={40}
                      
                      stepcolors={[
                        "#d12000",
                        "#ed8d00",
                        "#f1bc00",
                        "#84c42b",
                        "#d12000",
                        "#ed8d00",
                        "#f1bc00",
                        "#84c42b",
                        "#53b83a",
                        "#53b83a",
                        
                      ]}
                    /> */}
                  </div>
                  <div className="d-flex flex-wrap align-items-center mb-4 text-center">
                    {/* <h5 className="card-title me-2 w-100 text-center">Risk : Low</h5> */}

                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <CardTitle className="fw-bold">Overall Organization Severity</CardTitle>
                  <div>
                    <div className="btnContainer">


                      <button
                        onClick={() => { toggleLoader() }}
                        className="d-flex btn-primary btn-sm justify-content-center align-items-center mb-0 cursor-pointer border-none w-100"
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
                <CardBody style={{ height: "383px", width: "100%" }}>
                  <div id="line-chart" className="e-chart d-flex justify-content-center align-items-center w-80 mt-3">

                    <ReactSpeedometer
                      className=""
                      forceRender={true}
                      // customSegmentStops={[0, critical, critical+High, critical+High+Medium, critical+High+ Medium+Low,  critical+High +Medium+Low+ Informational]}
                      // customSegmentStops={[0, critical, critical+High, critical+High+Medium, critical+High+ Medium+Low, critical+High +Medium+Low+ Informational]}
                      segmentColors={["#780000", "#dc0000", "#f8b425", "#02a499", "#38a4f8"]}
                      customSegmentLabels={[{ text: `Critical ${critical}`, color: "white" }, { text: `High ${High}`, color: "white" }, { text: `Medium ${Medium}`, color: "white" }, { text: `Low ${Low}`, color: "white" }, { text: `Info. ${Informational}`, color: "white" }]}
                      value={() => { return Math.max(critical, High, Medium, Low, Informational) }}
                      segments={5}
                      labelFontSize="12"
                      // fluidWidth={true}
                      // width={480}
                      // height={352}

                      minValue={10}
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
          </Row>

          <Row>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <CardTitle className="fw-bold">Risk Chart-1</CardTitle>
                </CardHeader >
                <CardBody style={{ height: "387px" }}>
                  <div id="pie-chart" className="e-chart">
                    <RiskChart_2 critical={critical}
                      High={High}
                      Medium={Medium}
                      Low={Low}
                      Informational={Informational}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card style={{ minHeight: "459px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Risk Chart-2</CardTitle>
                </CardHeader>
                <CardBody style={{ height: "" }} className="">

                  <div id="market-overview" className="apex-charts">
                    <RiskChart_1 />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">

              <Card style={{ height: "400px", minHeight: "459px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Organization Asset</CardTitle>
                </CardHeader>

                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> : <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
                  <Table bordered  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orgAsset_Domain.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.Type}</td>
                              <td>{value.Value}</td>
                              <td>  <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                {value.Status}
                              </Badge></td>


                            </tr>
                          )
                        })
                      }
                      {
                        orgAsset_IP.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.Type}</td>
                              <td>{value.Value}</td>
                              <td>  <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                {value.Status}
                              </Badge></td>


                            </tr>
                          )
                        })
                      }
                      {orgAsset_MobileApplication.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{value.ID}</td>
                            <td>{value.Type}</td>
                            <td>{value.Value}</td>
                            <td>  <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                              {value.Status}
                            </Badge></td>


                          </tr>
                        )
                      })
                      }
                      {
                        orgAsset_Subdomain.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.ID}</td>
                              <td>{value.Type}</td>
                              <td>{value.Value}</td>
                              <td>  <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                {value.Status}
                              </Badge></td>


                            </tr>
                          )
                        })
                      }






                      {/* {(expCredential || []).map((value, index) => {
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
                                } 
                              })()}
                            </tr>)
                        }

                      })} */}
                    </tbody>
                  </Table>
                </CardBody>}
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl="4">

              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed Credentials</CardTitle>
                </CardHeader>

                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> : <CardBody style={{ overflow: "auto", padding: "0px" }} className="widgets">
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
                              } else if (value.Risk === "Low") {
                                return (
                                  <td>
                                    <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                      {value.Risk}
                                    </Badge></td>
                                )
                              } else if (value.Risk === "Medium") {
                                return (
                                  <td>
                                    <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                      {value.Risk}
                                    </Badge></td>
                                )
                              } else if (value.Risk === "Informational") {
                                return (
                                  <td>
                                    <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                      {value.Risk}
                                    </Badge></td>
                                )
                              }
                            })()}
                          </tr>
                        )
                      })}

                      {/* {(expCredential || []).map((value, index) => {
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
                  } 
                })()}
              </tr>)
          }

        })} */}
                    </tbody>
                  </Table>
                </CardBody>}
              </Card>
            </Col>
            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold" >Top Risk of  Exposed Subdomains</CardTitle>
                </CardHeader>

                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :
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
                          if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                  } else if (value.Risk === "Low") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Medium") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Informational") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  }
                                })()}
                              </tr>)
                          }

                        })}
                      </tbody>
                    </Table>
                  </CardBody>}

              </Card>
            </Col>
            <Col xl="4">

              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed WHOIS</CardTitle>
                </CardHeader>
                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :




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
                            } else if (
                              desiredDomainInfo.Risk === "Low"
                            ) {
                              return (
                                <Badge
                                  pill
                                  className="me-2 bg-success  "
                                >
                                  Low
                                </Badge>
                              );
                            }
                            else {
                              return (
                                <></>
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
                              {/* {console.log("desired data", desiredDomainInfo)} */}
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
                  </CardBody>}
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl="4">

              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed DNS</CardTitle>
                </CardHeader>
                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :



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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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
                        <CardTitle >CNAME</CardTitle>
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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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
                        <CardTitle >SOA</CardTitle>
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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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
                              if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                      } else if (value.Risk === "Low") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Medium") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                              {value.Risk}
                                            </Badge></td>
                                        )
                                      } else if (value.Risk === "Informational") {
                                        return (
                                          <td>
                                            <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                              {value.Risk}
                                            </Badge></td>
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

                  </CardBody>}

              </Card>
            </Col>
            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed Ports</CardTitle>
                </CardHeader>


                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :
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


                        {(expPorts || []).map((value, index) => {
                          // console.log("port value", value)

                          if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                  } else if (value.Risk === "Low") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Medium") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Informational") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  }
                                })()}
                              </tr>)
                          }

                        })}
                      </tbody>
                    </Table>
                  </CardBody>}

              </Card>
            </Col>
            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of  Exposed ReverseDNS</CardTitle>
                </CardHeader>
                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :


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
                          if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                  } else if (value.Risk === "Low") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Medium") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Informational") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  }
                                })()}
                              </tr>)
                          }

                        })}
                      </tbody>
                    </Table>
                  </CardBody>}


              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl="4">
              <Card style={{ height: "400px" }}>
                <CardHeader>
                  <CardTitle className="fw-bold">Top Risk of Exposed ReverseIP</CardTitle>
                </CardHeader>

                {(() => {
                  setTimeout(() => {
                    setcondition(false)
                  }, 4000);
                })()}

                {condition ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <ReactLoading type={"bubbles"} color={"#dc0000"} height={100} width={100} /></div> :

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

                          if (value.Risk === "High" || value.Risk === "Critical" || value.Risk === "Medium" || value.Risk === "Low" || value.Risk === "Informational") {
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
                                  } else if (value.Risk === "Low") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#02a499" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Medium") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#f8b425" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  } else if (value.Risk === "Informational") {
                                    return (
                                      <td>
                                        <Badge pill className="badge-soft ms-1" style={{ background: "#38a4f8" }}>
                                          {value.Risk}
                                        </Badge></td>
                                    )
                                  }
                                })()}
                              </tr>)
                          }

                        })}
                      </tbody>
                    </Table>
                  </CardBody>}

              </Card>
            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard2
