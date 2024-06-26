import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardBody,
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
import { Link } from "react-router-dom";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import { AiOutlinePlus } from "react-icons/ai";
import classnames from "classnames";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { AvForm } from "availity-reactstrap-validation";

import MetaTags from "react-meta-tags";
import Pagination from "../CredentialBreach/Pagination";

//import images
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import BarChart from "./BarChart";
import CountUp from "react-countup";
import ScoreCard from "./ScoreCard";

const PortScan = () => {

  const { SearchBar } = Search;
  //   console.log("token", localStorage.getItem("123"));
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const orgID = localStorage.getItem("orgID");
  const [apiData, setapiData] = useState([]);
  const [productData, setProductData] = useState([]); // main array to show port scan Data

  const [featureNameID, setfeatureNameID] = useState("");

  const [ScanProfileId, setScanProfileId] = useState("");
  const [modal_standard, setmodal_standard] = useState(false); // stored state for delete botton
  const [modal_standard2, setmodal_standard2] = useState(false); // stored state for Add botton
  const [modal_standard3, setmodal_standard3] = useState(false); // stored state for Save botton
  const [modal_standard4, setmodal_standard4] = useState(false); // modal to show view more data
  const [modalPopupData, setmodalPopupData] = useState([]); // array to store data inside modal
  const [modalID, setmodalID] = useState("");
  const [activeTab, setactiveTab] = useState("1"); // tab content to switch between to sections
  const [cardData, setcardData] = useState([]) // array to set colored card Data

  const [updateStringValue, setupdateStringValue] = useState(); // string to add using modal with add button 
  const [riskValue, setriskValue] = useState(); 
  const [stringID, setstringID] = useState(); // string ID in scan setting 
  const [RiskColor, setRiskColor] = useState("riskColorRed");


  const [modal, setModal] = React.useState(false);


  // Colored Cards to save state 
  var [criticalCardPrice, setcriticalCardPrice] = useState(0)
  var [highCardPrice, sethighCardPrice] = useState(0)
  var [mediumCardPrice, setmediumCardPrice] = useState(0)
  var [lowCardPrice, setlowCardPrice] = useState(0)
  var [informationalCardPrice, setinformationalCardPrice] = useState(0)

  const [Checks, setChecks] = useState([]); // array to store scan setting strings 

  var [mainprint, setmainprint] = useState()


  var mainData = [];
  var desiredData = [];


  
  var i = 0;
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
    getPortScanData()
  }, []);

  // toggle fucnction to switch between scan setting and exposed Ports
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  // Toggle functions for modals
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
  function tog_standard4() {
    setmodal_standard4(!modal_standard4);
    // removeBodyCss()
  }

  // const [apiData, setapiData] = useState([]);


  function toSetData(mainData) {
    // console.log("inside tosetdata", mainData);
    setapiData(mainData);
    // console.log("inside tosetdata apidata", apiData);
  }
  async function getPortScanData(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const featureIDForServer = 165112129704796;
    const taskName = "PortScan";
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}taskData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        orgID,
        featureIDForServer,
      }),
    });
    const data = await response.json();
    if (data) {
      // console.log("response", data);
      mainData = await data.data.Data;
      // console.log("Port DAta  ", mainData);
      toSetData(mainData);

      setProductData(mainData);
      
      var tempData = data.data.Data;
      // console.log("tempdaaaata", tempData)

      for (var i = 0; i < tempData.length; i++) {
        for(var j=0 ; j< tempData[i].Ports.length ; j++){
          var temp = tempData[i].Ports[j];
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
      }
      setcardData(tempoverviewChartexpCredentials)
      // for (var i = 0; i < mainData.length; i++) {
      //   desiredData[i] = {
      //     IP: (function () {
      //       if (mainData[i].IP === "") return <>-</>;
      //       else {
      //         return mainData[i].IP;
      //       }
      //     })(),
      //     ID: (function () {
      //       if (mainData[i].ID === "") return <>-</>;
      //       else {

      //         return (<>
      //           <Badge pill className="badge-soft-success ms-1  ">
      //             {mainData[i].ID}
      //           </Badge> </>)
      //       }
      //     })(),
      //     PortCount: (function () {
      //       if (mainData[i].Ports === "") return <>-</>;
      //       else {
      //         return (<>
      //           <Badge pill className="badge-soft-danger ms-1  " key={i}>
      //             {mainData[i].Ports.length}/{mainData[i].Ports[0].Protocol}
      //           </Badge> </>)
      //       }
      //     })(),
      //     More: (
      //       <>
      //         <AvForm key={i}>
      //           {console.log("after cliecekd", mainData[i].Phone)}
      //           <Button
      //             data-id={i}
      //             color="primary"
      //             value={mainData[i].id}
      //             onClick={() => {
      //               console.log("cliecekd");
      //               tog_standard4();
      //               setmodalPopupData(mainData[6].Ports)
      //             }}
      //           >
      //             View More
      //           </Button>
      //         </AvForm>
      //       </>
      //     ),
      //   };
      // }
      // console.log("desired DAta", desiredData);
      // setProductData(desiredData);
      // console.log("inside apiData x`getCredential", apiData);
    } else {
      // alert("data retreival error");
    }
  }

  // Api to hit backend for getting the port scan data
  async function getScanProfileString(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const featureIDForServer = 165112129704796;
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
  const columns = [
    {
      dataField: "ID",
      text: "ID",
      sort: true,
    },
    {
      dataField: "IP",
      text: "IP",
      sort: true,
    },
    {
      dataField: "PortCount",
      text: "Port Count",
      sort: true,
      formatter: (cellContent, productData) => (
        <>
          {(() => {
            if (productData.Ports === "") {
              return (
                <>-</>
              )
            } else {
              return (
                <>
                  <Badge pill className="me-2 bg-danger   " key={i}>
                    {productData.Ports.length}
                  </Badge> </>
              )
            }
          })()}
        </>
      ),
    },
    {
      dataField: "More",
      text: "View Details",
      sort: true,
      formatter: (cellContent, productData) => (

        <>
          <AvForm>
            {/* {console.log("without cliecekd", productData.Ports)} */}
            <Button

              color="primary"
              onClick={() => {
                tog_standard4();
                setmodalPopupData(productData.Ports)
              }}
            >
              View More
            </Button>
          </AvForm>
        </>
      ),
    },
  ];
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  };
  // const { SearchBar } = Search;

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
          <title>Exposed PORTS | GuardLogiX</title>
        </MetaTags>
        <Row>
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="PORT Scanner"
            breadcrumbFeature="PORT Scanner"
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
                      <BarChart/>
                    </div>

                  </Col></Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <Modal
                isOpen={modal_standard4}
                toggle={() => {
                  tog_standard4();
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0" id="myModalLabel">
                    Ports Details
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
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Port</th>
                        <th scope="col">Protocol</th>
                        <th scope="col">Status</th>
                        <th scope="col">Service</th>
                        <th scope="col">Version</th>
                        <th scope="col">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalPopupData.map((value, index) => {
                        return (
                          <tr>
                            {(() => {
                              if (value.ID != null) {
                                return (
                                  <td scope="row">{value.ID}</td>
                                )
                              } else {
                                return (
                                  <td>-</td>
                                )
                              }
                            })()}

                            {(() => {
                              if (value.Port != null) {
                                return (
                                  <td scope="row">{value.Port}</td>
                                )
                              } else {
                                return (
                                  <td>-</td>
                                )
                              }
                            })()}

                            {(() => {
                              if (value.Protocol != null) {
                                return (
                                  <td scope="row">{value.Protocol}</td>
                                )
                              } else {
                                return (
                                  <td>-</td>
                                )
                              }
                            })()}

                            {(() => {
                              if (value.State != null) {
                                if(value.State == "closed"){
                                  
                                return (

                                  <td scope="row"><Badge pill className="me-2 bg-success ">
                                    {value.State}
                                  </Badge></td>
                                )
                                
                                } else if(value.State == "open"){
                                  return (
                                    <td>  <Badge pill className="me-2 bg-danger   ">
                                    {value.State}
                                  </Badge> </td>
                                  )
                                }
                              } else {
                                return (
                                  <td>-</td>
                                )
                              }
                            })()}

                            {(() => {
                              if (value.Service != null) {
                                return (
                                  <td scope="row">{value.Service}</td>
                                )
                              } else {
                                return (
                                  <td>-</td>
                                )
                              }
                            })()}

                            {(() => {
                              if (value.Version != null) {
                                return (
                                  <td scope="row">{value.Version}</td>
                                )
                              } else {
                                return (
                                  <td>-</td>
                                )
                              }
                            })()}

                            {(() => {
                              if (value.Risk === "High") {
                                return (
                                  <td>  <Badge pill className="me-2 bg-danger   ">
                                    High
                                  </Badge> </td>
                                );
                              } else if (value.Risk === "Informational") {
                                return (
                                  <td> <Badge pill className="me-2 bg-info ">
                                    Informational
                                  </Badge></td>
                                );
                              } else if (value.Risk === "Critical") {
                                return (
                                  <td> <Badge pill className="me-2 bg-danger ">
                                    Critical
                                  </Badge></td>
                                );
                              } else if (value.Risk === "Medium") {
                                return (
                                  <td><Badge pill className="me-2 bg-warning ">
                                    Medium
                                  </Badge></td>
                                );
                              } else if (value.Risk === "Low") {
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

                          </tr>)
                      })}
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
                      Exposed Ports
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
                                      // keyField="id"
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
                              ExposedPorts - 165112129704796
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
                                    <th scope="col">Port</th>
                                    {/* <th scope="col">Port</th> */}
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
                                          <th>{data.Port}</th>
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
                                                    data.String
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
                                                    data.String
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

export default PortScan;
