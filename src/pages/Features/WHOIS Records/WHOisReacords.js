import React, { useState, useEffect } from "react";
// import "react-table/react-table.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import { AiOutlinePlus } from "react-icons/ai";
import classnames from "classnames";
import {
  Badge,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Modal,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  Button,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";

import MetaTags from "react-meta-tags";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
//import images
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import BarChart from "./BarChart";
import CountUp from "react-countup";
import ScoreCard from "./ScoreCard";

const WHOisRecords = () => {
  //   console.log("token", localStorage.getItem("123"));
  const userID = localStorage.getItem("userID");
  const orgID = localStorage.getItem("orgID");
  const token = localStorage.getItem("token");

  const [apiData, setapiData] = useState([]);
  const [ScanProfileId, setScanProfileId] = useState("");

  const [productData, setProductData] = useState([]);
  const [featureNameID, setfeatureNameID] = useState("");

  const [RegistrantValue, setRegistrantValue] = useState({});
  const [AdministrativeValue, setAdministrativeValue] = useState([]);
  const [TechnicalValue, setTechnicalValue] = useState([]);
  const [desiredDomainInfo, setDesiredDomainInfo] = useState([]);

  const [modal_standard, setmodal_standard] = useState(false);
  const [modal_standard2, setmodal_standard2] = useState(false);
  const [modal_standard3, setmodal_standard3] = useState(false);


  // Colored card variables to save state and value 
  var [criticalCardPrice, setcriticalCardPrice] = useState(0)
  var [highCardPrice, sethighCardPrice] = useState(0)
  var [mediumCardPrice, setmediumCardPrice] = useState(0)
  var [lowCardPrice, setlowCardPrice] = useState(0)
  var [informationalCardPrice, setinformationalCardPrice] = useState(0)


  var [mainprint, setmainprint] = useState()
  const [Checks, setChecks] = useState([]); 
  const [cardData, setcardData] = useState([])

  const [updateStringValue, setupdateStringValue] = useState();
  const [riskValue, setriskValue] = useState();
  const [stringID, setstringID] = useState();

  const [RiskColor, setRiskColor] = useState();

  var mainData = [];
  // var RegistrantValue = [];

  var DomainInfo = [];
  var tempRegistrant = [];

  var riskArrforForm = [
    " ",
    "Critical",
    "High",
    "Medium",
    "Low",
    "Informational",
  ];


  var tempoverviewChartexpCredentials = [{
    id: 1,
    title: "Critical",
    background: "#780000",
    price: criticalCardPrice,
    rank: "+$20.9k",
    isDoller: true,
    postFix: "",
    statusColor: "success",
    series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
  }, {
    id: 2,
    title: "High",
    background: "#dc0000",
    price: highCardPrice,
    rank: "+$20.9k",
    isDoller: true,
    postFix: "",
    statusColor: "success",
    series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
  }, {
    id: 3,
    title: "Medium",
    background: "#f8b425",
    price: mediumCardPrice,
    rank: "+$20.9k",
    isDoller: true,
    postFix: "",
    statusColor: "success",
    series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
  }, {
    id: 4,
    title: "Low",
    background: "#02a499",
    price: lowCardPrice,
    rank: "+$20.9k",
    isDoller: true,
    postFix: "",
    statusColor: "success",
    series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
  }, {
    id: 5,
    title: "Informational",
    background: "#38a4f8",
    price: informationalCardPrice,
    rank: "+$20.9k",
    isDoller: true,
    postFix: "",
    statusColor: "success",
    series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
  }]

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
    }else{
      // console.log("auth done", data)
    }
      getWhoIsRecordData();
    },  []);
    
  async function getWhoIsRecordData(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const taskName = "ExposedWHOIS";
    const featureIDForServer = 165112129704697;
    const response = await fetch(
      `${process.env.REACT_APP_DEFAULTPATH}taskData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          orgID,
          featureIDForServer,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      // console.log("response", data);
      // mainData = await data.data[0].data.entries;
      mainData = await data.data.Data[0];

      var tempData = data.data.Data;

      for (var i = 0; i < tempData.length; i++) {
        var temp = tempData[i];
        if (temp.Risk === "Critical") {
          // console.log("critical", criticalCardPrice)
          setcriticalCardPrice(++criticalCardPrice)
          // console.log("data " , StateoverviewChartData.exposedPorts)
        }
        else if (temp.Risk === "High") {
          // console.log("high", highCardPrice)
          sethighCardPrice(++highCardPrice)
        }
        else if (temp.Risk === "Medium") {
          // console.log("medium", mediumCardPrice)
          setmediumCardPrice(++mediumCardPrice)
        }
        else if (temp.Risk === "Low") {
          // console.log("low", lowCardPrice)
          setlowCardPrice(++lowCardPrice)
        }
        else if (temp.Risk === "Informational") {
          // console.log("informational", informationalCardPrice)
          setinformationalCardPrice(++informationalCardPrice)
        }
      }
      // setmainprint(mainData.Risk)
      // setcardData(tempoverviewChartexpCredentials)
      

      DomainInfo = {
        Domain: mainData.Domain,
        Registrar_Email: mainData.Registrar_Details.Registrar_Email,
        Registrar_Name: mainData.Registrar_Details.Registrar_Name,
        Registrar_Organization:
          mainData.Registrar_Details.Registrar_Organization,
        Registrar_WHOIS_Server:
          mainData.Registrar_Details.Registrar_WHOIS_Server,
        Registrar_IANA_ID: mainData.Registrar_Details.Registrar_IANA_ID,
        Registrar_URL: mainData.Registrar_Details.Registrar_URL,
        Registrar_Email: mainData.Registrar_Details.Registrar_Email,
        Registrar_Phone: mainData.Registrar_Details.Registrar_Phone,
        Created_On: mainData.Registrar_Details.Created_On,
        Expires_On: mainData.Registrar_Details.Expires_On,
        Updated_On: mainData.Registrar_Details.Updated_On,
      };
      setDesiredDomainInfo(DomainInfo);
      // console.log("desired Data ", desiredDomainInfo);

      // Settting up value of Registrant Contact
      tempRegistrant = mainData.Registrant_Contacts[0];
      setRegistrantValue(tempRegistrant);

      // Settting up value of Administrative Contact
      var tempAdministrative = mainData.Admin_Contacts[0];
      setAdministrativeValue(tempAdministrative)

      // Settting up value of technical Contact
      var tempTechnical = mainData.Technical_Contacts[0];
      setTechnicalValue(tempTechnical);

    } else {
      // alert("data retreival error");
    }
  }


  //APi to delete the string of PORT Scan
  async function updateString(
    string,
    id,
    riskValue,
    index,
    stringID,
    taskType
  ) {
    const response = await fetch(
      `${process.env.REACT_APP_DEFAULTPATH}updatestring`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stringID: stringID,
          string: string,
          id: id,
          riskValue: riskValue,
          index: index,
          taskType: taskType,
        }),
      }
    );
    const data = await response.json();
    // console.log("response after string deleted", data);
    if (data.status === "ok") {
      getScanProfileString();
    }
  }
  //APi to delete the string of PORT Scan

  // Api to hit backend for getting the port scan data
  async function getScanProfileString(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const featureIDForServer = 165112129704697;
    const taskName = "ExposedSubdomains";
    const response = await fetch(
      `${process.env.REACT_APP_DEFAULTPATH}updatesubdomaintable`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          orgID,
          featureIDForServer,
        }),
      }
    );
    const data = await response.json();
    const tempArr = [];
    if (data.data) {
      console.log("response scan", data);
      // console.log("feature", data.featureNameID);
      // const tempNameID = `${data.featureNameID[0].FeatureName}-${data.featureNameID[0].FeatureID}`;
      // console.log(tempNameID)
      // setfeatureNameID(tempNameID);
      const Checks = await data.data.Checks;
      // console.log("checks", Checks)
      setChecks(Checks);
      // setUsers(Checks);
      const tempScanPRofileID = await data.data.ScanProfileID;
      setScanProfileId(tempScanPRofileID);
      //  console.log("ScanProfileId",ScanProfileId)
      // mainData = await data.data[0].Data;
      // console.log("checks", Checks)
      for (let index = 0; index < Checks.length; index++) {
        var str = Checks[index].Keyword;
        if (str.match(desiredDomainInfo.Domain)) {
          setRiskColor(Checks[index].Risk);
          break;
        }
      }
      // setstringContainer(tempArr);
      // setstringContainer(tempstringContainer);
      // setProductData(mainData);
      // console.log("maindata", mainData);
      // console.log("product", productData);
    }
  }

  var i = 0;
  function tog_standard() {
    setmodal_standard(!modal_standard);
    // removeBodyCss()
  }
  function tog_standard2() {
    setmodal_standard2(!modal_standard2);
    // removeBodyCss()
  }
  function tog_standard3() {
    setmodal_standard3(!modal_standard3);
    // removeBodyCss()
  }
  const [activeTab, setactiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  function changeRiskValue(e) {
    // if ((e.targer.value) === "Critical") {
    //   setRiskColor("riskColorSolidRed");
    // }
    console.log("risk value ", e.target.value);
    if (e.target.value === "Medium") {
      setRiskColor("setOrange");
    }
    if (e.target.value === "Critical") {
      setRiskColor("riskColorRed");
    }
    if (e.target.value === "Low") {
      setRiskColor("setYellow");
    }
    if (e.target.value === "High") {
      setRiskColor("setGreen");
    }
    if (e.target.value === "Informational") {
      setRiskColor("setGrey");
    }

    setriskValue(e.target.value);
  }


  return (
    <React.Fragment>
      <div className="userProfile credentialBreachProfile">
        <MetaTags>
          <title>Exposed WHOIS | GuardLogiX</title>
        </MetaTags>
        <Row>
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="WHOIS Record"
            breadcrumbFeature="WHOIS Record "
          />
        </Row>


        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <Row>

                  <Col xl={2} md={6}>
                    <div id="invested-overview" className="apex-charts">
                      <ScoreCard />
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-4 text-center">
                      <h5 className="card-title me-2 w-100 text-center">Risk : Low</h5>

                    </div>
                  </Col>
                  {(tempoverviewChartexpCredentials || []).map((widget, key) => (
                    <Col xl={2} md={6} key={key}>
                      <Card className="card-h-100">
                        <CardBody className="" style={{ background: `${widget.background}` }}>
                          <Row className="align-items-center">
                            <Col xs={12}>
                              <span className="text-muted mb-3 lh-1 d-block textWhiteCard" style={{ fontSize: "21px", fontWeight: "800" }}>
                                {widget.title}
                              </span>
                              <h3 className=" text-white text-center" style={{ fontSize: "70px", marginTop: "27px" }}>
                                {widget.isDoller === true ? "" : ""}
                                <span className="counter-value">
                                  <CountUp
                                    start={0}
                                    end={widget.price}
                                    duration={1}
                                  />
                                  {widget.postFix}
                                </span>
                              </h3>
                            </Col>
                            {/* <Col xs={6}>
            <ReactApexChart
              options={options}
              series={[{ data: [...widget["series"]] }]}
              type="line"
              className="apex-charts"
              dir="ltr"
            />
          </Col> */}
                          </Row>
                          {/* <div className="text-nowrap">
          <span
            className={
              "badge badge-soft-" +
              widget.statusColor +
              " text-" +
              widget.statusColor
            }
          >
            {widget.rank}
          </span>
          <span className="ms-1 text-muted font-size-13 textWhiteCard" >
            Since last week
          </span>
        </div> */}
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row>   <Col xl={12} className="mb-4">
                  <div >
                    <BarChart />
                  </div>

                </Col></Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Exposed WHOIS
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "2",
                      })}
                      onClick={() => {
                        toggle("2");
                        getScanProfileString();
                      }}
                    >
                      Scan Profile
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="p-3 text-muted">
                  <TabPane tabId="1">
                    <Row>
                      <Row className="content">
                        <Col
                          lg={4}
                          md={5}
                          className="col-xxl-9 userData credentialData"
                        >
                          <div className="auth-full-page-content whoIsRecordTable d-flex p-sm-5 p-4">
                            <div className="w-100">
                              <div className="d-flex flex-column">
                                <div className="  text-center">
                                  <Link
                                    to="/dashboard"
                                    className="d-flex justify-content-start auth-logo p-3 bg-light"
                                  ><h4>Domain Information
                                    &nbsp;
                                    &nbsp;
                                      { }
                                      {(() => {
                                        if (mainprint === "High") {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-danger  "
                                            >
                                              High
                                            </Badge>
                                          );
                                        } else if (
                                          mainprint === "Informational"
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
                                          mainprint === "Critical"
                                        ) {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-danger  "
                                            >
                                              Critical
                                            </Badge>
                                          );
                                        } else if (
                                          mainprint === "Medium"
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
                                      })()}</h4></Link>
                                </div>

                                {/* <h5 className="mb-0">Domain Information</h5> */}
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col
                          lg={4}
                          md={5}
                          className="col-xxl-9 userData credentialData"
                        >
                          <div className="auth-full-page-content whoIsRecordTable d-flex p-sm-5 p-4">
                            <div className="w-100">
                              <div className="d-flex flex-column">
                                <div className="  text-center">
                                  <Link
                                    to="/dashboard"
                                    className=" bg-light d-flex justify-content-start auth-logo p-3"
                                  ><h4>Contact Information
                                    &nbsp;
                                    &nbsp;
                                      {(() => {
                                        if (mainprint === "High") {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-danger"
                                            >
                                              High
                                            </Badge>
                                          );
                                        } else if (
                                          mainprint === "Informational"
                                        ) {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-info"
                                            >
                                              Informational
                                            </Badge>
                                          );
                                        } else if (
                                          mainprint === "Critical"
                                        ) {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-danger"
                                            >
                                              Critical
                                            </Badge>
                                          );
                                        } else if (
                                          mainprint === "Medium"
                                        ) {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-warning"
                                            >
                                              Medium
                                            </Badge>
                                          );
                                        } else {
                                          return (
                                            <Badge
                                              pill
                                              className="me-2 bg-success"
                                            >
                                              Low
                                            </Badge>
                                          );
                                        }
                                      })()}</h4></Link>
                                </div>
                                <h5 className="p-3 border-bottom">Registrant Contact</h5>
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

                                <h5 className="p-3 border-bottom">Administrative Contact</h5>
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

                                <h5 className="p-3 border-bottom">Technical Contact </h5>
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
                              </div>
                            </div>
                          </div>
                        </Col>

                      </Row>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="4">
                        <Col lg={12}>
                          <Card>
                            <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                                ExposedWHOIS - 165112129704697
                              </div>
                              <div className="mt-4 mt-md-0 ">
                                <div
                                  className="form-check form-switch form-switch-lg mb-3 "
                                  dir="ltr"
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                  />
                                </div>
                              </div>
                            </h5>
                            <CardBody className="subdomainPortScanCardBody">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">String</th>
                                    <th scope="col">Risk</th>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Checks.map((data, index) => {
                                    i = index;
                                    // setriskValue(data.Risk)
                                    // console.log("data ");
                                    // setriskState(data.Risk);
                                    // console.log("ScanProfileId", ScanProfileId);
                                    const changeRiskState = () => {
                                      setriskValue();
                                      // console.log("result.value");
                                    };
                                    // console.log("apan data", data);

                                    var riskArr = [
                                      "Critical",
                                      "High",
                                      "Medium",
                                      "Low",
                                      "Informational",
                                    ];
                                    riskArr.forEach(function (element, index) {
                                      if (element === data.Risk) {
                                        riskArr.splice(index, 1);
                                      }
                                    });

                                    // if(data.Risk === "High"){
                                    //   setRiskColor("setGreen")
                                    // }
                                    // else if(data.Risk === "Medium"){
                                    //   setRiskColor("setYellow")
                                    // }
                                    // else if(data.Risk === "Critical"){
                                    //   setRiskColor("setRed")
                                    // }
                                    // else if(data.Risk === "Low"){
                                    //   setRiskColor("setGrey")
                                    // }
                                    // else if(data.Risk === "Informational"){
                                    //   setRiskColor("setOrange")
                                    // }
                                    return (
                                      <>
                                        <tr key={index}>
                                          <th>{data.Keyword}</th>
                                          <th style={{ display: "none" }}>
                                            {data.ID}
                                          </th>

                                          <td>
                                            <div className="risk">
                                              <select
                                                name="cars"
                                                // id="risk"
                                                id={RiskColor}
                                                class="form-select"
                                                onChange={(e) => {
                                                  changeRiskValue(e);
                                                }}
                                              >
                                                <option value="intial">
                                                  {data.Risk}
                                                </option>
                                                {riskArr.map((risk) => {
                                                  return (
                                                    <option value={risk}>
                                                      {risk}
                                                    </option>
                                                  );
                                                })}
                                              </select>
                                            </div>
                                          </td>
                                          <td classnames="d-flex flex-row-reverse">
                                            <div
                                              className="btn-group btn-group-sm mt-2 "
                                              role="group"
                                              aria-label="Basic example"
                                            >
                                              <button
                                                type="submit"
                                                className="btn btn-soft-primary waves-effect waves-light mrRight"
                                                onClick={() => {
                                                  tog_standard3();
                                                  setupdateStringValue(
                                                    data.Keyword
                                                  );
                                                  setstringID(data.ID);
                                                }}
                                              >
                                                Save
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-soft-danger waves-effect waves-ligh"
                                                onClick={() => {
                                                  tog_standard();
                                                  setupdateStringValue(
                                                    data.Keyword
                                                  );
                                                  setstringID(data.ID);
                                                }}
                                                data-toggle="modal"
                                                data-target="#myModal"
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          </td>
                                        </tr>

                                        <Modal
                                          isOpen={modal_standard}
                                          toggle={() => {
                                            tog_standard();
                                          }}
                                        >
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title mt-0"
                                              id="myModalLabel"
                                            >
                                              Status
                                            </h5>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setmodal_standard(false);
                                              }}
                                              className="close"
                                              data-dismiss="modal"
                                              aria-label="Close"
                                            >
                                              <span aria-hidden="true">
                                                &times;
                                              </span>
                                            </button>
                                          </div>
                                          <div className="modal-body">
                                            <p>
                                              Are you sure you want to delete
                                              &nbsp;
                                              <strong>
                                                {updateStringValue}
                                              </strong>
                                              ?
                                            </p>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                tog_standard();
                                                setmodal_standard(false);
                                              }}
                                              className="btn btn-warning "
                                              data-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-danger "
                                              onClick={() => {
                                                updateString(
                                                  updateStringValue,
                                                  ScanProfileId,
                                                  riskValue,
                                                  i,
                                                  stringID,
                                                  "delete"
                                                );

                                                setmodal_standard(false);
                                              }}
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </Modal>

                                        <Modal
                                          isOpen={modal_standard3}
                                          toggle={() => {
                                            tog_standard3();
                                          }}
                                        >
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title mt-0"
                                              id="myModalLabel"
                                            >
                                              Status
                                            </h5>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setmodal_standard3(false);
                                              }}
                                              className="close"
                                              data-dismiss="modal"
                                              aria-label="Close"
                                            >
                                              <span aria-hidden="true">
                                                &times;
                                              </span>
                                            </button>
                                          </div>
                                          <div className="modal-body">
                                            <p>
                                              Are you sure you want to Save Risk
                                              ?
                                            </p>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                tog_standard3();
                                                setmodal_standard3(false);
                                              }}
                                              className="btn btn-warning "
                                              data-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-danger "
                                              onClick={() => {
                                                updateString(
                                                  updateStringValue,
                                                  ScanProfileId,
                                                  riskValue,
                                                  index,
                                                  stringID,
                                                  "updateRisk"
                                                );

                                                setmodal_standard3(false);
                                              }}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Modal>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </CardBody>
                            <div className="card-footer bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                              <div
                                className="btn-group btn-group-md mt-2"
                                role="group"
                                aria-label="Basic example"
                              ></div>
                              <div
                                className="btn-group btn-group-sm mt-2"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button
                                  type="button"
                                  className="btn btn-primary mr-2"
                                  onClick={() => {
                                    tog_standard2();
                                  }}
                                  data-toggle="modal"
                                  data-target="#myModal"
                                >
                                  <AiOutlinePlus className="icon" /> &nbsp; ADD
                                </button>
                              </div>

                              {/* Add button modal  */}
                              <Modal
                                isOpen={modal_standard2}
                                toggle={() => {
                                  tog_standard2();
                                }}
                              >
                                <div className="modal-header">
                                  <h5
                                    className="modal-title mt-0"
                                    id="myModalLabel"
                                  >
                                    Status
                                  </h5>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setmodal_standard2(false);
                                    }}
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <AvForm className="addUserForm">
                                  <div className="string">
                                    <label htmlFor="lname">String</label>
                                    <input
                                      name="lastName"
                                      className="form-control"
                                      placeholder="Enter String"
                                      type="name"
                                      required
                                      id="validationTooltip01"
                                      onChange={(event) => {
                                        setupdateStringValue(
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="addRisk">
                                    <label htmlFor="risk"> Select Risk</label>

                                    <div className="risk">
                                      <select
                                        name="cars"
                                        id="risk"
                                        class="form-select"
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                          changeRiskValue(e);
                                        }}
                                      >
                                        {riskArrforForm.map((risk, index) => {
                                          // console.log("date risk ", risk, index);
                                          return (
                                            <option value={risk}>{risk}</option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                </AvForm>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      tog_standard2();
                                    }}
                                    className="btn btn-secondary "
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary "
                                    onClick={() => {
                                      const generatedId = Math.floor(
                                        1000000000 + Math.random() * 10000000000
                                      );

                                      updateString(
                                        updateStringValue,
                                        ScanProfileId,
                                        riskValue,
                                        6,
                                        generatedId,
                                        "addString"
                                      );

                                      setmodal_standard2(false);
                                    }}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </Modal>
                            </div>
                          </Card>
                        </Col>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default WHOisRecords;
