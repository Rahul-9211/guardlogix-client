import React, { useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import "react-table/react-table.css";
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
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";

import MetaTags from "react-meta-tags";

//import images
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { MdDataSaverOff } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import classnames from "classnames";
import BarChart from "./BarChart";
import CountUp from "react-countup";
import ScoreCard from "./ScoreCard";


const SubdomainFinder = () => {


  const [productData, setProductData] = useState([]);


  const [featureNameID, setfeatureNameID] = useState("");  // used to set Port Scan Card HEader (Name + Id)
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



  var [criticalCardPrice, setcriticalCardPrice] = useState(0)
  var [highCardPrice, sethighCardPrice] = useState(0)
  var [mediumCardPrice, setmediumCardPrice] = useState(0)
  var [lowCardPrice, setlowCardPrice] = useState(0)
  var [informationalCardPrice, setinformationalCardPrice] = useState(0)
  var [mainprint, setmainprint] = useState()
  const [cardData, setcardData] = useState([])


  // userID and organzation ID is set to access user from localStorage
  const userID = localStorage.getItem("userID");
  const orgID = localStorage.getItem("orgID");
  const token = localStorage.getItem("token");

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
  var mainData = [];

  // Columns of DataTable
  const columns = [
    {
      dataField: "ID",
      text: "ID",
      sort: true,
      formatter: (cellContent, productData) => (
        <>
          {(() => {
            if (productData.ID === null) {
              return <>-</>;
            } else {
              return <>{productData.ID}</>;
            }
          })()}
        </>
      ),
    },
    {
      dataField: "IP",
      text: "IP",
      sort: true,
      formatter: (cellContent, productData) => (
        <>
          {(() => {
            if (productData.IP === null) {
              return <>-</>;
            } else {
              return <>{productData.IP}</>;
            }
          })()}
        </>
      ),
    },
    {
      dataField: "Domain",
      text: "Domain Count",
      sort: true,
      formatter: (cellContent, productData) => (
        <>
          {(() => {
            if (productData.Domains === null) {
              return <>-</>;
            } else {
              return <> <Badge pill className="me-2 bg-danger ">{productData.Domains.length}</Badge></>;
            }
          })()}
        </>
      ),
    },
    // {
    //   dataField: "Risk",
    //   text: "Risk",
    //   sort: true,
    //   formatter: (cellContent, productData) => (
    //     <>
    //     {(() => {
    //       if (productData.Risk === "High") {
    //         return (
    //           <Badge pill className="me-2 bg-danger   ">
    //             High
    //           </Badge>
    //         );
    //       } else if (productData.Risk === "Informational") {
    //         return (
    //           <Badge pill className="me-2 bg-info ">
    //             Informational
    //           </Badge>
    //         );
    //       } else if (productData.Risk === "Critical") {
    //         return (
    //           <Badge pill className="me-2 bg-danger ">
    //             Critical
    //           </Badge>
    //         );
    //       } else if (productData.Risk === "Medium") {
    //         return (
    //           <Badge pill className="me-2 bg-warning ">
    //             Medium
    //           </Badge>
    //         );
    //       } else {
    //         return (
    //           <Badge pill className="me-2 bg-success ">
    //             Low
    //           </Badge>
    //         );
    //       }
    //     })()}
    //     </>
    //   ),
    // },

    {
      dataField: "More",
      text: "View Details",
      sort: true,
      formatter: (cellContent, productData) => (

        <>
          <AvForm>
            {/* {console.log("without cliecekd", productData.Domains)} */}
            <Button

              color="primary"
              onClick={() => {
                // console.log("cliecekd");
                tog_standard4();
                setmodalPopupData(productData.Domains)
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
    getReverseIpData();
  }, []);

  // ApI to hit Task Data 
  async function getReverseIpData(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const featureIDForServer = 165112129704642;
    const taskName = "ReverseDNS";
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
      // console.log("response ip ", data);
      // mainData = await data.data[0].data.entries;
      mainData = await data.data.Data;
      // console.log("maindata", data.data[0].Data);
      setProductData(mainData);

      var tempData = data.data.Data;
      // console.log("tempdaaaata", tempData)

      for (var i = 0; i < tempData.length; i++) {
        for (var j = 0; j < tempData[i].Domains.length; j++) {
          var temp = tempData[i].Domains[j];
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
    } else {
      alert("data retreival error");
    }
  }
  // Api to hit backend for getting the port scan data From ScanProfile 
  async function getScanProfileString(event) {
    // event.preventDefault();
    // console.log("email-passs",userCheck)
    const featureIDForServer = 165112129704642;
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
          <title>Exposed ReverseIP| GuardLogiX</title>
        </MetaTags>
        <Row>
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Reverse IP Details"
            breadcrumbFeature="Reverse IP Details"
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

          <Modal
            isOpen={modal_standard4}
            toggle={() => {
              tog_standard4();
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Domain Details
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
                    <th scope="col">Domain</th>
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
                          if (value.Domain != null) {
                            return (
                              <td scope="row">{value.Domain}</td>
                            )
                          } else {
                            return (
                              <td>-</td>
                            )
                          }
                        })()}
                        {(() => {
                          if (value.Risk === null) {
                            return (
                              <td scope="row">-</td>
                            )
                          } else
                            if (value.Risk === "High") {
                              return <td> <Badge pill className="badge-soft-danger ms-1  ">High</Badge> </td>;
                            } else if (value.Risk === "Informational") {
                              return <td> <Badge pill className="badge-soft-info me-1 ">Informational</Badge> </td>;
                            } else if (value.Risk === "Critical") {
                              return <td> <Badge pill className="badge-soft-danger me-1 ">Critical</Badge> </td>;
                            } else if (value.Risk === "Medium") {
                              return <td> <Badge pill className="badge-soft-warning me-1 ">Medium</Badge> </td>;
                            } else {
                              return <td> <Badge pill className="badge-soft-success me-1 ">Low</Badge> </td>;
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
                      Exposed  ReverseIP
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
                                  >
                                    {/* <img src={logo} alt="" height="28" />{" "} */}
                                    {/* <span className="logo-txt">Minia</span> */}
                                  </Link>
                                </div>
                                <div className="auth-content my-auto">
                                  {/* <div className="text-center">
                      <h5 className="mb-0">Show Entries</h5>
                      <button
                        type="submit"
                        onClick={createSubdomainFinderData}
                        className="btn btn-primary  waves-effect waves-light"
                      >
                        Create Task
                      </button>
                    </div> */}
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
                                                {/* <Row className="align-items-md-center mt-30">
                                    <Col className="inner-custom-pagination d-flex">
                                      <div className="text-md-right ms-auto">
                                        <PaginationListStandalone
                                          {...paginationProps}
                                        />
                                      </div>
                                    </Col>
                                  </Row> */}

                                                {/* <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-hover"
                                    }
                                    responsive
                                    bordered={false}x
                                    striped={false}
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
                            </Row> */}
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
                                ExposedReverseIP - 165112129704642
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

export default SubdomainFinder;
