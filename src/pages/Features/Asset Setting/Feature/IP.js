import React, { useState, useEffect, useRef } from "react";

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
    CardBody,
    Col,
    Modal,
    Row,
    Button,
    Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

import MetaTags from "react-meta-tags";
import swal from 'sweetalert';
//import images
import Breadcrumbs from "../../../../components/Common/Breadcrumb";


import axios from "axios"
const IP = () => {


    const [productData, setProductData] = useState([]);
    const [modal_standard4, setmodal_standard4] = useState(false); // View More button Modal of ExposedCredentials

    const [editValue, seteditValue] = useState(); // set data inside view more modal
    const [updatedValue, setupdatedValue] = useState(); // modal to stored edited or updated value
    const [updatedValueID, setupdatedValueID] = useState(); // modal to stored edited or updated value ID

    const orgID = localStorage.getItem("orgID");
    const token = localStorage.getItem("token");

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
            dataField: "Type",
            text: "Type",
            sort: true,
            formatter: (cellContent, productData) => (
                <>
                    {(() => {
                        if (productData.Feature === null) {
                            return <>-</>;
                        } else {
                            return   <Badge pill className="me-2 bg-danger ">
                            {productData.Feature}
                        </Badge>;
                        }
                    })()}
                </>
            ),
        },
        {
            dataField: "Asset",
            text: "Asset",
            sort: true,
            formatter: (cellContent, productData) => (
                <>
                    {(() => {
                        if (productData.Domain === null && productData.FileName === null &&  productData.Subdomain && productData.IP && productData.ProjectName ) {
                            return <>-</>;
                        } else {
                            return (
                                <>
                                    {(() => {
                                        if (productData.Domain) {
                                            return (
                                                <td>
                                                {productData.Domain}
                                                </td>
                                            );
                                        } 
                                        if (productData.Subdomain) {
                                            return (
                                                <td>
                                                {productData.Subdomain}
                                                </td>
                                            );
                                        }
                                        if (productData.IP) {
                                            return (
                                                <td>
                                                {productData.IP}
                                                </td>
                                            );
                                        }
                                        if (productData.ApplicationName) {
                                            return (
                                                <td>
                                                {productData.ApplicationName}
                                                </td>
                                            );
                                        }
                                        if (productData.ProjectName) {
                                            return (
                                                <td>
                                                {productData.ProjectName}
                                                </td>
                                            );
                                        }
                                    })()}
                                    {/* <td>  <Badge pill className="me-2 bg-danger ">{productData.Value || productData.FileName}</Badge></td> */}
                                </>
                            );
                        }
                    })()}
                </>
            ),
        },
        {
            dataField: "Source",
            text: "Source",
            sort: true,
            formatter: (cellContent, productData) => (
                <>
                    {(() => {
                        if (productData.Source === null) {
                            return <>-</>;
                        } else {
                            return <Badge pill className="me-2 bg-success ">
                            {productData.Source}
                        </Badge>;
                        }
                    })()}
                </>
            ),
        },
        {
            dataField: "Status",
            text: "Status",
            sort: true,
            formatter: (cellContent, productData) => (
                <>
                    {(() => {
                        if (productData.Status === null) {
                            return <>-</>;
                        } else {
                            return <>
                            {productData.Status}</>;
                        }
                    })()}
                </>
            ),
        },
        // {
        //     dataField: "DateTime",
        //     text: "DateTime",
        //     sort: true,
        //     formatter: (cellContent, productData) => (
        //         <>
        //             {(() => {
        //                 if (productData.DateTime === null) {
        //                     return <>-</>;
        //                 } else {
        //                     return <>{productData.DateTime}</>;
        //                 }
        //             })()}
        //         </>
        //     ),
        // },
        {
            dataField: "More",
            text: "Action",
            sort: true,
            formatter: (cellContent, productData) => (

                <>
                    <AvForm>
                        {/* {console.log("without cliecekd", productData.Domains)} */}
                        {/* <Button
                            color="primary"
                            onClick={() => {
                                // console.log("cliecekd", productData.Value);
                                // tog_standard4();
                                // seteditValue(productData.tempArray)
                            }}
                        >
                            View More
                        </Button> */}
                        <Button
                            className="me-3"
                            color="warning"
                            size="sm"
                            onClick={() => {
                                tog_standard4();
                                seteditValue(productData.IP)
                                setupdatedValueID(productData.ID)
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={() => {
                                // console.log("product", productData.ID)
                                setupdatedValueID(productData.ID)
                                deleteElement(productData.ID)
                            }}
                        >
                            Delete
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
        getassetListData();
    }, []);
    function tog_standard4() {
        setmodal_standard4(!modal_standard4);
        // toggle for view more button 
    }

    // ApI to hit Task Data 
    async function getassetListData(event) {
        const response = await fetch(
            `${process.env.REACT_APP_DEFAULTPATH}getassetlist-ip`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orgID,
                }),
            }
        );
        const data = await response.json();
        if (data) {
            console.log("response", data);
            // mainData = await data.data[0].data.entries;
            // let parentArray = new Array();
            // let tempArray = new Array();
            // let domain = await data.assetList.Domain;
            // if (domain) {
            //     for (let i = 0; i < domain.length; i++) {
            //         tempArray.push({
            //             ID: domain[i].ID,
            //             Type: "Domain",
            //             Value: domain[i].Value,
            //             Source: domain[i].Source,
            //             Status: domain[i].Status,
            //             DateTime: domain[i].DateTime,
            //         })
            //     }
            //     // parentArray.push({tempArray : tempArray , Type : "Domain"})
            // }
            // let ip = await data.assetList.IP;
            // if (ip) {
            //     for (let i = 0; i < ip.length; i++) {
            //         tempArray.push({
            //             ID: ip[i].ID,
            //             Type : "IP",
            //             Value: ip[i].Value,
            //             Source: ip[i].Source,
            //             Status: ip[i].Status,
            //             DateTime: ip[i].DateTime,
            //         })
            //     }
            //     // parentArray.push({tempArray : tempArray , Type : "IP"})
            // }
            // let subdomain = await data.assetList.Subdomain;
            // if (subdomain) {
            //     let tempArray = new Array();
            //     for (let i = 0; i < subdomain.length; i++) {
            //         tempArray.push({
            //             ID: subdomain[i].ID,
            //             Type : "Subdomain",
            //             Value: subdomain[i].Value,
            //             Source: subdomain[i].Source,
            //             Status: subdomain[i].Status,
            //             DateTime: subdomain[i].DateTime,
            //         })
            //     }
            //     parentArray.push({tempArray : tempArray , Type : "Subdomain"})
            // }
            // let mobileApplication = await data.assetList.MobileApplication;
            // if (mobileApplication) {
            //     let tempArray = new Array();
            //     for (let i = 0; i < mobileApplication.length; i++) {
            //         tempArray.push({
            //             ID: mobileApplication[i].ID,
            //             Type : "MobileApplication",
            //             Value:  mobileApplication[i].ApplicationName ,
            //             Source: mobileApplication[i].Source,
            //             Status: mobileApplication[i].Status,
            //             DateTime: mobileApplication[i].DateTime,
            //         })
            //     }
            //     parentArray.push({tempArray : tempArray , Type : "MobileApplication"})
            // }
            // console.log("tempArray", tempArray)
            setProductData(data.ipList);
            // setIpCardPrice(parentArray[1].Value.length)
            // setdomainCard(parentArray[0].Value.length)
            // setSubdomainCardPrice(parentArray[2].Value.length)


            // console.log("mainData", mainData)
            // if (mainData) {
            //     for (var i = 0; i < mainData.length; i++) {
            //         if (mainData[i].Type === "Domain") {
            //             // console.log("me insied domain")
            //             TempData[0].Value.push(mainData[i])

            //         }
            //         else if (mainData[i].Type === "Subdomain") {
            //             TempData[1].Value.push(mainData[i])
            //         }
            //         else if (mainData[i].Type === "IP") {
            //             TempData[2].Value.push(mainData[i])
            //         }
            //     }
            //     // console.log("tempData", TempData)
            //     setProductData(TempData);
            //     setIpCardPrice(TempData[1].Value.length)
            //     setdomainCard(TempData[0].Value.length)
            //     setSubdomainCardPrice(TempData[2].Value.length)
            // }
        } else {
            // alert("data retreival error");
        }
    }

    // function to edit values 
    async function editIPValue() {
        // console.log("updated value", updatedValue)

        let ip_regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        if (ip_regex.test(updatedValue)) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        // console.log("willDelete", willDelete)
                        await axios.post(`${process.env.REACT_APP_DEFAULTPATH}edit-ip-assetlist`, {
                            orgID, updatedValue, updatedValueID
                        }).then((res) => {
                            getassetListData()
                            swal("Poof! Your imaginary file has been updated!", {
                                icon: "success",
                            });
                        }).catch((err) => {
                            swal("Poof! Your imaginary file has not been updated!", {
                                icon: "delete",
                            });
                        })
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
        else {
            swal("Job Fail!", "You entered wrong IP address!", "error");
        }
    }

    //function  to delete element 
    async function deleteElement(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    console.log("updatedValueID ip", updatedValueID)
                    await axios.post(`${process.env.REACT_APP_DEFAULTPATH}delete-assetlist-ip-element`, {
                        orgID, updatedValueID: id
                    }).then((res) => {
                        getassetListData()
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    }).catch((err) => {
                        swal("Poof! Your imaginary file has not been deleted!", {
                            icon: "danger",
                        });
                    })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    return (
        <React.Fragment>
            <div className="userProfile credentialBreachProfile">
                <MetaTags>
                    <title>Exposed Subdomains | GuardLogiX</title>
                </MetaTags>
                <Row>
                    <Breadcrumbs
                        title="Asset Inventory"
                        breadcrumbItem="IP "
                        breadcrumbFeature="IP"
                    />
                </Row>


                <Row>
                    {/* view more modal  */}
                    <Modal
                        isOpen={modal_standard4}
                        toggle={() => {
                            tog_standard4();
                        }}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                                Edit Domain Details
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

                            <Input type="email" placeholder={editValue}

                                onChange={(e) => {
                                    setupdatedValue(e.target.value)
                                    // setPassword(e.target.value)
                                }}
                            />

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={() => {
                                    tog_standard4();
                                    setmodal_standard4(false);
                                }}
                                className="btn  btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    tog_standard4();
                                    setmodal_standard4(false);
                                    editIPValue()
                                }}
                                className="btn btn-primary "
                                data-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </Modal>
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
                                            </Link>
                                        </div>
                                        <div className="auth-content my-auto">

                                            <div className="mainTable">
                                                <CardBody>
                                                    <PaginationProvider
                                                        pagination={paginationFactory(
                                                            pageOptions
                                                        )}
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
                                                                        {

                                                                        }
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


            </div>
        </React.Fragment>
    );
};

export default IP;
