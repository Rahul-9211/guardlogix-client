import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";
import classnames from "classnames";


import MetaTags from "react-meta-tags";

// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation";
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { WidgetsData } from "../../../common/data/dashboard";
import ReactApexChart from "react-apexcharts";
import CountUp from "react-countup";

import {
  Badge,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  Modal,
  CardHeader,
  CardTitle,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  Button,
} from "reactstrap";

//import images
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import ApexRadial from '../../Dashboard/ApexRadial';
import ScoreCard from "./ScoreCard";
import BarChart from "./BarChart";

// import { AvForm, AvField } from "availity-reactstrap-validation";
const CredentialBreach = () => {

  const [productData, setProductData] = useState([]);


  const [ScanProfileId, setScanProfileId] = useState("");  // used to set Port Scan Card ID 


  const [Checks, setChecks] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 
  // Modals to add update save the Port Scan String and Risk 
  const [modal_standard, setmodal_standard] = useState(false); // stored state for delete botton
  const [modal_standard2, setmodal_standard2] = useState(false); // stored state for Add botton
  const [modal_standard3, setmodal_standard3] = useState(false); // stored state for save botton
  const [modal_standard4, setmodal_standard4] = useState(false); // View More button Modal of ExposedCredentials

  const [modalPopupData, setmodalPopupData] = useState([]); // set data inside view more modal
  const [activeTab, setactiveTab] = useState("1"); // set state for tabContent Switch 


  const [updateStringValue, setupdateStringValue] = useState(); // state to store changes value of String or Port 
  const [riskValue, setriskValue] = useState(); // state to store the changes in Risk DropDown
  const [stringID, setstringID] = useState(); // state to store ID of each row inside Port Scan CArd 

  const [RiskColor, setRiskColor] = useState("riskColorRed"); // state to store color of risk 

  const [cardData, setcardData] = useState([])
  const [barChartData, setbarChartData] = useState({})

  var [criticalCardPrice, setcriticalCardPrice] = useState(0)
  var [highCardPrice, sethighCardPrice] = useState(0)
  var [mediumCardPrice, setmediumCardPrice] = useState(0)
  var [lowCardPrice, setlowCardPrice] = useState(0)
  var [informationalCardPrice, setinformationalCardPrice] = useState(0)

  // userID and organzation ID is set to access user from localStorage
  const userID = localStorage.getItem("userID");
  const orgID = localStorage.getItem("orgID");
  const token = localStorage.getItem("token");

  // options for color cards
  const options = {
    chart: {
      height: 50,
      type: "line",
      toolbar: { show: false },
    },
    colors: ["#5156be"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  // Columns of DataTable
  const columns = [
    {
      dataField: "ID",
      text: "ID",
      sort: true,
    },
    {
      dataField: "Email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "Username",
      text: "Username",
      sort: true,
    },
    {
      dataField: "Password",
      text: "Password",
      sort: true,
    },
    {
      dataField: "DatabaseName",
      text: "Database Name",
      sort: true,
    },
    {
      dataField: "Risk",
      text: "Risk",
      sort: true,
      formatter: (cellContent, productData) => (
        <>
          {(() => {
            if (productData.Risk === "High") {
              return (
                <Badge pill className="me-2 bg-danger   ">
                  High
                </Badge>
              );
            } else if (productData.Risk === "Informational") {
              return (
                <Badge pill className="me-2 bg-info ">
                  Informational
                </Badge>
              );
            } else if (productData.Risk === "Critical") {
              return (
                <Badge pill className="me-2 bg-danger ">
                  Critical
                </Badge>
              );
            } else if (productData.Risk === "Medium") {
              return (
                <Badge pill className="me-2 bg-warning ">
                  Medium
                </Badge>
              );
            } else {
              return (
                <Badge pill className="me-2 bg-success ">
                  Low
                </Badge>
              );
            }
          })()}
        </>
      ),
    },
    {
      dataField: "More",
      text: "More Details",
      sort: true,
      formatter: (cellContent, productData) => (
        <>
          <AvForm >
            {/* {console.log("after cliecekd", tempData[i].Phone)} */}
            <Button
              color="primary"
              onClick={() => {
                // console.log("productData", productData);
                tog_standard4();
                setmodalPopupData(productData)
              }}
            >
              View More
            </Button>
          </AvForm>
        </>
      ),
    },
  ];

  // Sorting of Data Table
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  // Page Options in Data Table 
  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };
  const { SearchBar } = Search; // Search Bar in Data TAble

  // array to get data in modal on add event of port Scan Card 
  var riskArrforForm = [
    " ",
    "Critical",
    "High",
    "Medium",
    "Low",
    "Informational",
  ];

  // Overview Colored chart Data 
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

  var desiredData = []; // temporary array to store data for UI state 

  // Funtion which runs on each reload 
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
    getCredentialBreachData();
  }, []);

  // ApI to hit Task Data 
  async function getCredentialBreachData(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const featureIDForServer = 165112129704651;
    const taskName = "ExposedCredentials";
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
      const tempData = await data.data.Data;
      // console.log("credential tempData", tempData);

      /// condition loop for desired data for table
      for (var i = 0; i < tempData.length; i++) {
        desiredData[i] = {
          ID: (function () {
            if (tempData[i].ID === "") return <>-</>;
            else {
              return tempData[i].ID;
            }
          })(),
          Email: (function () {
            if (tempData[i].Email === "") return <>-</>;
            else {
              return tempData[i].Email;
            }
          })(),
          Username: (function () {
            if (tempData[i].UserName === "") return <>-</>;
            else {
              return tempData[i].UserName;
            }
          })(),
          Password: (function () {
            if (tempData[i].Password === "") return <>-</>;
            else {
              return tempData[i].Password;
            }
          })(),
          DatabaseName: (function () {
            if (tempData[i].Databse_Name === "") return <>-</>;
            else {
              return tempData[i].Databse_Name;
            }
          })(),
          IP: (function () {
            if (tempData[i].IP === "") return <>-</>;
            else {
              return tempData[i].IP;
            }
          })(),
          Hashed_Password: (function () {
            if (tempData[i].Hashed_Password === "") return <>-</>;
            else {
              return tempData[i].Hashed_Password;
            }
          })(),
          Name: (function () {
            if (tempData[i].Name === "") return <>-</>;
            else {
              return tempData[i].Name;
            }
          })(),
          Address: (function () {
            if (tempData[i].Address === "") return <>-</>;
            else {
              return tempData[i].Address;
            }
          })(),
          Phone: (function () {
            if (tempData[i].Phone === "") return <>-</>;
            else {
              return tempData[i].Phone;
            }
          })(),
          Risk: (function () {
            if (tempData[i].Risk === "") return <>-</>;
            else {
              return tempData[i].Risk;
            }
          })(),
        };
      }
      // console.log("desired DAta", desiredData);
      setProductData(desiredData);


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
      setcardData(tempoverviewChartexpCredentials)
    } else {
      alert("data retreival error");
    }
  }

  // Api to hit backend for getting the port scan data From ScanProfile 
  async function getScanProfileString(event) {
    // event.preventDefault();
    console.log("process.env.REACT_APP_DEFAULTPATH", process.env.REACT_APP_DEFAULTPATH)
    const featureIDForServer = 165112129704651;
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
    // console.log("email-passs2")
    const data = await response.json();
    // console.log("data", data)
    const tempArr = [];
    if (data.data) {
      // console.log("response", data);
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
      // for (let index = 0; index < Checks.length; index++) {
      //   console.log("string", Checks[index]);
      //   const tempstringContainer = {
      //     String: Checks[index].String,
      //     Risk: Checks[index].Risk,
      //   };
      //   stringContainer[index] = tempstringContainer;
      // }
      // setstringContainer(tempArr);
      // setstringContainer(tempstringContainer);
      // setProductData(mainData);
      // console.log("maindata", mainData);
      // console.log("product", productData);
    }
  }

  //APi to Update the  PORT Scan Card
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


  // Toggle Funtions for modal 
  function tog_standard() {
    setmodal_standard(!modal_standard);
    // toggle modal delete 
  }
  function tog_standard2() {
    setmodal_standard2(!modal_standard2);
    // toggle for add button 
  }
  function tog_standard3() {
    setmodal_standard3(!modal_standard3);
    // toggle modal Save 
  }
  function tog_standard4() {
    setmodal_standard4(!modal_standard4);
    // toggle for view more button 
  }
  // Toggle to switch Tabs Between TabContent 
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };


  // Change color of Risk dropDown
  function changeRiskValue(e) {
    // if ((e.targer.value) === "Critical") {
    //   setRiskColor("riskColorSolidRed");
    // }
    // console.log("risk value ", e.target.value);
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
          <title>Exposed Credentials | GuardLogiX</title>
        </MetaTags>
        <Row>
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Credential Breach "
            breadcrumbFeature="Crendential Breach "
          />
        </Row>

        <Modal
          isOpen={modal_standard4}
          toggle={() => {
            tog_standard4();
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Exposed Details
            </h5>
            <button
              type="button"
              onClick={() => {
                setmodal_standard4(false);
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <table class="table">
              <thead>

              </thead>
              <tbody>
                <tr>

                  <th>ID</th>
                  {(() => {
                    if (modalPopupData.ID != null) {
                      return (
                        <td scope="row">{modalPopupData.ID}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr> <tr>
                  <th>IP</th>  {(() => {
                    if (modalPopupData.IP != null) {
                      return (
                        <td scope="row">{modalPopupData.IP}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr> <tr>
                  <th>DatabaseName</th>
                  {(() => {
                    if (modalPopupData.DatabaseName != null) {
                      return (
                        <td scope="row">{modalPopupData.DatabaseName}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr> <tr>
                  <th>Email</th>
                  {(() => {
                    if (modalPopupData.Email != null) {
                      return (
                        <td scope="row">{modalPopupData.Email}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr> <tr>
                  <th>Address</th>
                  {(() => {
                    if (modalPopupData.Address != null) {
                      return (
                        <td scope="row">{modalPopupData.Address}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr> <tr>
                  <th>UserName</th>
                  {(() => {
                    if (modalPopupData.Username != null) {
                      return (
                        <td scope="row">{modalPopupData.Username}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr><tr>
                  <th>Password</th>
                  {(() => {
                    if (modalPopupData.Password != null) {
                      return (
                        <td scope="row">{modalPopupData.Password}</td>
                      )
                    } else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}
                </tr>  <tr>
                  <th>Risk</th>
                  {(() => {
                    if (modalPopupData.Risk === "High") {
                      return (
                        <td>  <Badge pill className="me-2 bg-danger   ">
                          High
                        </Badge> </td>
                      );
                    } else if (modalPopupData.Risk === "Informational") {
                      return (
                        <td> <Badge pill className="me-2 bg-info ">
                          Informational
                        </Badge></td>
                      );
                    } else if (modalPopupData.Risk === "Critical") {
                      return (
                        <td> <Badge pill className="me-2 bg-danger ">
                          Critical
                        </Badge></td>
                      );
                    } else if (modalPopupData.Risk === "Medium") {
                      return (
                        <td><Badge pill className="me-2 bg-warning ">
                          Medium
                        </Badge></td>
                      );
                    } else if (modalPopupData.Risk === "Low") {
                      return (
                        <td> <Badge pill className="me-2 bg-success ">
                          Low
                        </Badge></td>
                      );
                    }
                    else {
                      return (
                        <td>-</td>
                      )
                    }
                  })()}

                </tr>
              </tbody>
            </table>

          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_standard4();
                setmodal_standard4(false);
              }}
              className="btn btn-warning "
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </Modal>
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
                <Row>

                  <Col xl={12} className="mb-4">
                    <div >
                      <BarChart data={barChartData} />
                    </div>

                  </Col>
                </Row></CardBody>
            </Card>

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
                      Exposed   Credentials
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
                          <div className="auth-full-page-content d-flex p-sm-5 p-4">
                            <div className="w-100">
                              <div className="d-flex flex-column">
                                <div className="  text-center">
                                  <Link
                                    to="/dashboard"
                                    className="d-block auth-logo"
                                  ></Link>
                                </div>
                                <div className="auth-content my-auto">
                                  <div className="mainTable">
                                    <CardBody>
                                      <PaginationProvider
                                        pagination={paginationFactory(
                                          pageOptions
                                        )}
                                        keyField="id"
                                      // columns={columns}
                                      // data={productData}
                                      >
                                        {({
                                          paginationProps,
                                          paginationTableProps,
                                        }) => (
                                          <ToolkitProvider
                                            keyField="id"
                                            columns={columns}
                                            data={productData}
                                            search
                                          >
                                            {(toolkitProps) => (
                                              <React.Fragment>
                                                <Row className="mb-2">
                                                  <Col>
                                                    <div className="search-box me-2 mb-2 d-flex justify-content-between">
                                                      <div className="d-inline">
                                                        <SizePerPageDropdownStandalone
                                                          {...paginationProps}
                                                        />
                                                      </div>
                                                      <div className="position-relative">
                                                        <SearchBar
                                                          {...toolkitProps.searchProps}
                                                        />
                                                        <i className="bx bx-search-alt search-icon" />
                                                      </div>
                                                    </div>
                                                  </Col>
                                                </Row>

                                                <Row>
                                                  <Col xl="12">
                                                    <div className="table-responsive">
                                                      <BootstrapTable
                                                        keyField={"id"}
                                                        responsive
                                                        bordered={false}
                                                        striped={false}
                                                        defaultSorted={
                                                          defaultSorted
                                                        }
                                                        classes={
                                                          "table align-middle table-nowrap"
                                                        }
                                                        headerWrapperClasses={
                                                          "thead-light"
                                                        }
                                                        {...toolkitProps.baseProps}
                                                        {...paginationTableProps}
                                                      />
                                                    </div>
                                                  </Col>
                                                </Row>

                                                <Row className="align-items-md-center mt-30">
                                                  <Col className="pagination pagination-rounded justify-content-end mb-2">
                                                    <PaginationListStandalone
                                                      {...paginationProps}
                                                    />
                                                  </Col>
                                                </Row>
                                              </React.Fragment>
                                            )}
                                          </ToolkitProvider>
                                        )}
                                      </PaginationProvider>
                                    </CardBody>
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
                                Exposed Credntials - 165112129704651
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
                                  {/* loop to print each row inside card Body */}
                                  {Checks.map((data, index) => {
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
                                    return (
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
                                        {/* modal to delete  */}
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
                                                  index,
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
                                      </tr>
                                    )
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

export default CredentialBreach;
