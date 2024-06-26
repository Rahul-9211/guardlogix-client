import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    CardHeader,
    Row,
    Modal,
    CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Icons
import { AiOutlinePlus } from "react-icons/ai";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

const ScanSetting = () => {

    const userID = localStorage.getItem("userID");
    const orgID = localStorage.getItem("orgID");
    const token = localStorage.getItem("token");


    const [riskValue, setriskValue] = useState(); // state to store the changes in Risk DropDown
    // const [RiskColor, setRiskColor] = useState("riskColorRed"); // state to store color of risk 

    const [featureNameIDCredentials, setfeatureNameIDCredentials] = useState()
    const [ScanProfileIdCredentials, setScanProfileIdCredentials] = useState()
    const [updateStringValueForCredentials, setupdateStringValueForCredentials] = useState()
    const [stringIDCredentials, setsetstringIDCredentials] = useState()



    const [ChecksCredentials, setChecksCredentials] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSaveCredentials, setmodalToSaveCredentials] = useState(false); // stored state for save botton
    const [modalToDeleteCredentials, setmodalToDeleteCredentials] = useState(false); // stored state for save botton
    const [modalToAddCredentials, setmodalToAddCredentials] = useState(false); // stored state for save botton

    function tog_CredentialsToSave() {
        setmodalToSaveCredentials(!modalToSaveCredentials);
        // toggle modal Save 
    } function tog_CredentialsToDelete() {
        setmodalToDeleteCredentials(!modalToDeleteCredentials);
        // toggle modal Save 
    } function tog_CredentialsToAdd() {
        setmodalToAddCredentials(!modalToAddCredentials);
        // toggle modal Save 
    }


    // subdomains ------------------------->
    const [featureNameIDSubdomains, setfeatureNameIDSubdomains] = useState()
    const [ScanProfileIdSubdomains, setScanProfileIdSubdomains] = useState()
    const [updateStringValueForSubdomains, setupdateStringValueForSubdomains] = useState()
    const [stringIDSubdomains, setsetstringIDSubdomains] = useState()

    const [ChecksSubdomains, setChecksSubdomains] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSaveSubdomains, setmodalToSaveSubdomains] = useState(false); // stored state for save botton
    const [modalToDeleteSubdomains, setmodalToDeleteSubdomains] = useState(false); // stored state for save botton
    const [modalToAddSubdomains, setmodalToAddSubdomains] = useState(false); // stored state for save botton

    function tog_SubdomainsToSave() {
        setmodalToSaveSubdomains(!modalToSaveSubdomains);
        // toggle modal Save 
    } function tog_SubdomainsToDelete() {
        setmodalToDeleteSubdomains(!modalToDeleteSubdomains);
        // toggle modal Save 
    } function tog_SubdomainsToAdd() {
        setmodalToAddSubdomains(!modalToAddSubdomains);
        // toggle modal Save 
    }


    // Exposed WHOIS ------------------------->
    const [featureNameIDWHOIS, setfeatureNameIDWHOIS] = useState()
    const [ScanProfileIdWHOIS, setScanProfileIdWHOIS] = useState()
    const [updateStringValueForWHOIS, setupdateStringValueForWHOIS] = useState()
    const [stringIDWHOIS, setsetstringIDWHOIS] = useState()

    const [ChecksWHOIS, setChecksWHOIS] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSaveWHOIS, setmodalToSaveWHOIS] = useState(false); // stored state for save botton
    const [modalToDeleteWHOIS, setmodalToDeleteWHOIS] = useState(false); // stored state for save botton
    const [modalToAddWHOIS, setmodalToAddWHOIS] = useState(false); // stored state for save botton

    function tog_WHOISToSave() {
        setmodalToSaveWHOIS(!modalToSaveWHOIS);
        // toggle modal Save 
    } function tog_WHOISToDelete() {
        setmodalToDeleteWHOIS(!modalToDeleteWHOIS);
        // toggle modal Save 
    } function tog_WHOISToAdd() {
        setmodalToAddWHOIS(!modalToAddWHOIS);
        // toggle modal Save 
    }


    // Exposed DNS ------------------------->
    const [featureNameIDDNS, setfeatureNameIDDNS] = useState()
    const [ScanProfileIdDNS, setScanProfileIdDNS] = useState()
    const [updateStringValueForDNS, setupdateStringValueForDNS] = useState()
    const [stringIDDNS, setsetstringIDDNS] = useState()

    const [ChecksDNS, setChecksDNS] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSaveDNS, setmodalToSaveDNS] = useState(false); // stored state for save botton
    const [modalToDeleteDNS, setmodalToDeleteDNS] = useState(false); // stored state for save botton
    const [modalToAddDNS, setmodalToAddDNS] = useState(false); // stored state for save botton

    function tog_DNSToSave() {
        setmodalToSaveDNS(!modalToSaveDNS);
        // toggle modal Save 
    } function tog_DNSToDelete() {
        setmodalToDeleteDNS(!modalToDeleteDNS);
        // toggle modal Save 
    } function tog_DNSToAdd() {
        setmodalToAddDNS(!modalToAddDNS);
        // toggle modal Save 
    }

    // Exposed Ports ------------------------->
    const [featureNameIDPorts, setfeatureNameIDPorts] = useState()
    const [ScanProfileIdPorts, setScanProfileIdPorts] = useState()
    const [updateStringValueForPorts, setupdateStringValueForPorts] = useState()
    const [stringIDPorts, setsetstringIDPorts] = useState()

    const [ChecksPorts, setChecksPorts] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSavePorts, setmodalToSavePorts] = useState(false); // stored state for save botton
    const [modalToDeletePorts, setmodalToDeletePorts] = useState(false); // stored state for save botton
    const [modalToAddPorts, setmodalToAddPorts] = useState(false); // stored state for save botton

    function tog_PortsToSave() {
        setmodalToSavePorts(!modalToSavePorts);
        // toggle modal Save 
    } function tog_PortsToDelete() {
        setmodalToDeletePorts(!modalToDeletePorts);
        // toggle modal Save 
    } function tog_PortsToAdd() {
        setmodalToAddPorts(!modalToAddPorts);
        // toggle modal Save 
    }

    // ReverseDNS ------------------------->
    const [featureNameIDReverseDNS, setfeatureNameIDReverseDNS] = useState()
    const [ScanProfileIdReverseDNS, setScanProfileIdReverseDNS] = useState()
    const [updateStringValueForReverseDNS, setupdateStringValueForReverseDNS] = useState()
    const [stringIDReverseDNS, setsetstringIDReverseDNS] = useState()

    const [ChecksReverseDNS, setChecksReverseDNS] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSaveReverseDNS, setmodalToSaveReverseDNS] = useState(false); // stored state for save botton
    const [modalToDeleteReverseDNS, setmodalToDeleteReverseDNS] = useState(false); // stored state for save botton
    const [modalToAddReverseDNS, setmodalToAddReverseDNS] = useState(false); // stored state for save botton

    function tog_ReverseDNSToSave() {
        setmodalToSaveReverseDNS(!modalToSaveReverseDNS);
        // toggle modal Save 
    } function tog_ReverseDNSToDelete() {
        setmodalToDeleteReverseDNS(!modalToDeleteReverseDNS);
        // toggle modal Save 
    } function tog_ReverseDNSToAdd() {
        // console.log("tog_reverseIP")
        setmodalToAddReverseDNS(!modalToAddReverseDNS);
        // toggle modal Save 
    }



    // ReverseIP ------------------------->
    const [featureNameIDReverseIP, setfeatureNameIDReverseIP] = useState()
    const [ScanProfileIdReverseIP, setScanProfileIdReverseIP] = useState()
    const [updateStringValueForReverseIP, setupdateStringValueForReverseIP] = useState()
    const [stringIDReverseIP, setsetstringIDReverseIP] = useState()

    const [ChecksReverseIP, setChecksReverseIP] = useState([]);  // To Assign The complete data of Port Scan Card from MOngoDb 

    const [modalToSaveReverseIP, setmodalToSaveReverseIP] = useState(false); // stored state for save botton
    const [modalToDeleteReverseIP, setmodalToDeleteReverseIP] = useState(false); // stored state for save botton
    const [modalToAddReverseIP, setmodalToAddReverseIP] = useState(false); // stored state for save botton

    function tog_ReverseIPToSave() {
        setmodalToSaveReverseIP(!modalToSaveReverseIP);
        // toggle modal Save 
    } function tog_ReverseIPToDelete() {
        setmodalToDeleteReverseIP(!modalToDeleteReverseIP);
        // toggle modal Save 
    } function tog_ReverseIPToAdd() {
        // console.log("tog_reverseIP")
        setmodalToAddReverseIP(!modalToAddReverseIP);
        // toggle modal Save 
    }



    // Api to hit backend for getting the port scan data From ScanProfile 
    async function getScanProfileStringCredentials(event) {
        // event.preventDefault();
        // console.log("email-passs",userCheck)
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
        const data = await response.json();
        // console.log("respose creddential", data)
        const tempArr = [];
        if (data.data) {
            // console.log("response", data);
            // console.log("feature", data.featureNameID);
            // const tempNameID = `${data.featureNameID.FeatureName}-${data.featureNameID.FeatureID}`;
            // setfeatureNameIDCredentials(tempNameID);
            const Checksss = data.data.Checks;
            setChecksCredentials(Checksss);
            // console.log(ChecksCredentials)
            const tempScanPRofileID = data.data.ScanProfileID;
            // console.log(tempScanPRofileID)
            setScanProfileIdCredentials(tempScanPRofileID);
        } else {
            // alert("data retreival error");
        }
    }
    // Api to hit backend for getting the port scan data From ScanProfile Subdomains
    async function getScanProfileStringSubdomains(event) {
        // event.preventDefault();
        // console.log("email-passs",userCheck)
        const featureIDForServer = 165112129704687;
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
        // console.log("data of resp", data)
        const tempArr = [];
        if (data.data) {
            // console.log("response", data);
            // console.log("feature", data.featureNameID);
            // const tempNameID = `${data.featureNameID[0].FeatureName}-${data.featureNameID[0].FeatureID}`;
            // console.log(tempNameID)
            // setfeatureNameIDSubdomains(tempNameID);
            const Checks = await data.data.Checks;
            // console.log("checks", Checks)
            setChecksSubdomains(Checks);
            // setUsers(Checks);
            const tempScanPRofileID = await data.data.ScanProfileID;
            setScanProfileIdSubdomains(tempScanPRofileID);
        } else {
            // alert("data retreival error");
        }
    }

    // Api to hit backend for getting the port scan data WHOIS 
    async function getScanProfileStringWHOIS(event) {
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
        // console.log("WHI data", data)
        const tempArr = [];
        if (data.data) {
            // console.log("response", data);
            // console.log("feature", data.featureNameID);
            // const tempNameID = `${data.featureNameID[0].FeatureName}-${data.featureNameID[0].FeatureID}`;
            // console.log(tempNameID)
            // setfeatureNameIDWHOIS(tempNameID);
            const Checks = await data.data.Checks;
            // console.log("checks", Checks)
            setChecksWHOIS(Checks);
            // setUsers(Checks);
            const tempScanPRofileID = await data.data.ScanProfileID;
            setScanProfileIdWHOIS(tempScanPRofileID);
            //  console.log("ScanProfileId",ScanProfileId)
            // mainData = await data.data[0].Data;
            // console.log("checks", Checks)
            //   for (let index = 0; index < Checks.length; index++) {
            //     var str = Checks[index].Keyword;
            //     if (str.match(desiredDomainInfo.Domain)) {
            //       setRiskColor(Checks[index].Risk);
            //       break;
            //     } 
            //   }
            // setstringContainer(tempArr);
            // setstringContainer(tempstringContainer);
            // setProductData(mainData);
            // console.log("maindata", mainData);
            // console.log("product", productData);
        } else {
            // alert("data retreival error");
        }
    }
    // Api to hit backend for getting the port scan data DNS
    async function getScanProfileStringDNS(event) {
        // event.preventDefault();
        // console.log("email-passs",userCheck)
        const featureIDForServer = 165112129704677;
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
        // console.log("DNS data", data)
        if (data.data) {
            // console.log("response", data);
            // console.log("feature", data.featureNameID);
            // const tempNameID = `${data.featureNameID[0].FeatureName}-${data.featureNameID[0].FeatureID}`;
            // console.log(tempNameID)
            // setfeatureNameIDDNS(tempNameID);
            const Checks = await data.data.Checks;
            // console.log("checks", Checks)
            setChecksDNS(Checks);
            // setUsers(Checks);
            const tempScanPRofileID = await data.data.ScanProfileID;
            setScanProfileIdDNS(tempScanPRofileID);
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
        } else {
            // alert("data retreival error");
        }
    }


    // Api to hit backend for getting the port scan data Ports
    async function getScanProfileStringPorts(event) {
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
            // setfeatureNameIDPorts(tempNameID);
            const Checks = await data.data.Checks;
            // console.log("checks", Checks)
            setChecksPorts(Checks);
            // setUsers(Checks);
            const tempScanPRofileID = await data.data.ScanProfileID;
            setScanProfileIdPorts(tempScanPRofileID);
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
        } else {
            // alert("data retreival error");
        }
    }

    // Api to hit backend for getting the port scan data From ReverseDNS  
    async function getScanProfileStringReverseDNS(event) {
        // event.preventDefault();
        // console.log("email-passs",userCheck)
        const featureIDForServer = 165112129704189;
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
            // setfeatureNameIDReverseDNS(tempNameID);
            const Checks = await data.data.Checks;
            // console.log("checks", Checks)
            setChecksReverseDNS(Checks);
            // setUsers(Checks);
            const tempScanPRofileID = await data.data.ScanProfileID;
            setScanProfileIdReverseDNS(tempScanPRofileID);
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
        } else {
            // alert("data retreival error");
        }
    }
    // Api to hit backend for getting the port scan data From Reverse IP 
    async function getScanProfileStringReverseIP(event) {
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
            // setfeatureNameIDReverseIP(tempNameID);
            const Checks = await data.data.Checks;
            // console.log("checks", Checks)
            setChecksReverseIP(Checks);
            // setUsers(Checks);
            const tempScanPRofileID = await data.data.ScanProfileID;
            setScanProfileIdReverseIP(tempScanPRofileID);
        } else {
            // alert("data retreival error");
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
            getScanProfileStringCredentials();
            getScanProfileStringSubdomains();
            getScanProfileStringWHOIS();
            getScanProfileStringDNS();
            getScanProfileStringPorts();
            getScanProfileStringReverseDNS();
            getScanProfileStringReverseIP();
        }
    }


    

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
        getScanProfileStringCredentials()
        getScanProfileStringSubdomains()
        getScanProfileStringWHOIS();
        getScanProfileStringDNS();
        getScanProfileStringPorts();
        getScanProfileStringReverseDNS();
        getScanProfileStringReverseIP();
    }, [])

    // Change color of Risk dropDown
    function changeRiskValue(e) {
        // if ((e.targer.value) === "Critical") {
        //   setRiskColor("riskColorSolidRed");
        // }
        // console.log("risk value ", e.target.value);
        if (e.target.value === "Medium") {
            // setRiskColor("setOrange");
        }
        if (e.target.value === "Critical") {
            // setRiskColor("riskColorRed");
        }
        if (e.target.value === "Low") {
            // setRiskColor("setYellow");
        }
        if (e.target.value === "High") {
            // setRiskColor("setGreen");
        }
        if (e.target.value === "Informational") {
            // setRiskColor("setGrey");
        }

        setriskValue(e.target.value);
    }
    // array to get data in modal on add event of port Scan Card 
    var riskArrforForm = [
        " ",
        "Critical",
        "High",
        "Medium",
        "Low",
        "Informational",
    ];

    return (
        <React.Fragment>
            <div className="userProfile">
                <Row>
                       
                    <Breadcrumbs title="Dashboard"  
                    breadcrumbItem="Scan Settings"
                        breadcrumbFeature="Scan settings" />
                </Row>

                {/* <Row className="mt-2">

                    <Col xl="12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="fw-bold">Scan Profile Setting</CardTitle>
                            </CardHeader>
                            <CardBody style={{ paddingBottom: "72px", display: "flex", flexWrap: "wrap" }}>


                            </CardBody>
                            <CardFooter>
                                Footer
                            </CardFooter>
                        </Card>
                    </Col>
                </Row> */}

                <Row className="mt-3">
                    <Col xl="4" >
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed Credentials
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">
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
                                        {ChecksCredentials.map((data, index) => {
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
                                                                // id={RiskColor}
                                                                class="form-select"
                                                                onChange={(e) => {
                                                                    // changeRiskValue(e);
                                                                    // console.log(riskValue)
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
                                                                    tog_CredentialsToSave();
                                                                    setupdateStringValueForCredentials(
                                                                        data.Keyword
                                                                    );
                                                                    setsetstringIDCredentials(data.ID);
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-soft-danger waves-effect waves-ligh"
                                                                onClick={() => {
                                                                    tog_CredentialsToDelete();
                                                                    setupdateStringValueForCredentials(
                                                                        data.Keyword
                                                                    );
                                                                    setsetstringIDCredentials(data.ID);
                                                                }}
                                                                data-toggle="modal"
                                                                data-target="#myModal"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>

                                                    {/* modal to save  for credential Breach */}
                                                    <Modal
                                                        isOpen={modalToSaveCredentials}
                                                        toggle={() => {
                                                            tog_CredentialsToSave();
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
                                                                    setmodalToSaveCredentials(false);
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
                                                                    tog_CredentialsToSave();
                                                                    setmodalToSaveCredentials(false);
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
                                                                        updateStringValueForCredentials,
                                                                        ScanProfileIdCredentials,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDCredentials,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSaveCredentials(false);
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </Modal>


                                                    {/* modal to delete  */}
                                                    <Modal
                                                        isOpen={modalToDeleteCredentials}
                                                        toggle={() => {
                                                            tog_CredentialsToDelete();
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
                                                                    setmodalToDeleteCredentials(false);
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
                                                                    {updateStringValueForCredentials}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_CredentialsToDelete();
                                                                    setmodalToDeleteCredentials(false);
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
                                                                        updateStringValueForCredentials,
                                                                        ScanProfileIdCredentials,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDCredentials,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeleteCredentials(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table></CardBody>
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_CredentialsToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddCredentials}
                                    toggle={() => {
                                        tog_CredentialsToAdd();
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
                                                modalToAddCredentials(false);
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
                                                    setupdateStringValueForCredentials(
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
                                                tog_CredentialsToAdd();
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
                                                    updateStringValueForCredentials,
                                                    ScanProfileIdCredentials,
                                                    riskValue,
                                                    6,
                                                    stringIDCredentials,
                                                    "addString"
                                                );

                                                setmodalToAddCredentials(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed Subdomain
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">
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
                                        {ChecksSubdomains.map((data, index) => {
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
                                                                // id={RiskColor}
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
                                                                    tog_SubdomainsToSave();
                                                                    setupdateStringValueForSubdomains(
                                                                        data.Keyword
                                                                    );
                                                                    setsetstringIDSubdomains(data.ID);
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-soft-danger waves-effect waves-ligh"
                                                                onClick={() => {
                                                                    tog_SubdomainsToDelete();
                                                                    setupdateStringValueForSubdomains(
                                                                        data.Keyword
                                                                    );
                                                                    setsetstringIDSubdomains(data.ID);
                                                                }}
                                                                data-toggle="modal"
                                                                data-target="#myModal"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>

                                                    <Modal
                                                        isOpen={modalToDeleteSubdomains}
                                                        toggle={() => {
                                                            tog_SubdomainsToDelete();
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
                                                                    setmodalToDeleteSubdomains(false);
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
                                                                    {updateStringValueForSubdomains}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_SubdomainsToDelete();
                                                                    setmodalToDeleteSubdomains(false);
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
                                                                        updateStringValueForSubdomains,
                                                                        ScanProfileIdSubdomains,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDSubdomains,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeleteSubdomains(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>

                                                    <Modal
                                                        isOpen={modalToSaveSubdomains}
                                                        toggle={() => {
                                                            tog_SubdomainsToSave();
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
                                                                    setmodalToSaveSubdomains(false);
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
                                                                    tog_SubdomainsToSave();
                                                                    setmodalToSaveSubdomains(false);
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
                                                                        updateStringValueForSubdomains,
                                                                        ScanProfileIdSubdomains,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDSubdomains,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSaveSubdomains(false);
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
                                </table></CardBody>
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_SubdomainsToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddSubdomains}
                                    toggle={() => {
                                        tog_SubdomainsToAdd();
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
                                                setmodalToAddSubdomains(false);
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
                                                    setupdateStringValueForSubdomains(
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
                                                tog_SubdomainsToAdd();
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
                                                    updateStringValueForSubdomains,
                                                    ScanProfileIdSubdomains,
                                                    riskValue,
                                                    6,
                                                    stringIDSubdomains,
                                                    "addString"
                                                );

                                                setmodalToAddSubdomains(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed WHOIS
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">

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
                                        {ChecksWHOIS.map((data, index) => {
                                            // i = index;
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
                                                                    // id={RiskColor}
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
                                                                        tog_WHOISToSave();
                                                                        setupdateStringValueForWHOIS(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDWHOIS(data.ID);
                                                                    }}
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-soft-danger waves-effect waves-ligh"
                                                                    onClick={() => {
                                                                        tog_WHOISToDelete();
                                                                        setupdateStringValueForWHOIS(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDWHOIS(data.ID);
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
                                                        isOpen={modalToDeleteWHOIS}
                                                        toggle={() => {
                                                            tog_WHOISToDelete();
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
                                                                    setmodalToDeleteWHOIS(false);
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
                                                                    {updateStringValueForWHOIS}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_WHOISToDelete();
                                                                    setmodalToDeleteWHOIS(false);
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
                                                                        updateStringValueForWHOIS,
                                                                        ScanProfileIdWHOIS,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDWHOIS,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeleteWHOIS(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>

                                                    <Modal
                                                        isOpen={modalToSaveWHOIS}
                                                        toggle={() => {
                                                            tog_WHOISToSave();
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
                                                                    setmodalToSaveWHOIS(false);
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
                                                                    tog_WHOISToSave();
                                                                    setmodalToSaveWHOIS(false);
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
                                                                        updateStringValueForWHOIS,
                                                                        ScanProfileIdWHOIS,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDWHOIS,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSaveWHOIS(false);
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
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_WHOISToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddWHOIS}
                                    toggle={() => {
                                        tog_WHOISToAdd();
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
                                                setmodalToAddWHOIS(false);
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
                                                    setupdateStringValueForWHOIS(
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
                                                tog_WHOISToAdd();
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
                                                    updateStringValueForWHOIS,
                                                    ScanProfileIdWHOIS,
                                                    riskValue,
                                                    5,
                                                    stringIDWHOIS,
                                                    "addString"
                                                );

                                                setmodalToAddWHOIS(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl="4" className="mt-4">
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed DNS
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">

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
                                        {ChecksDNS.map((data, index) => {
                                            // i = index;
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
                                                                    // id={RiskColor}
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
                                                                        tog_DNSToSave();
                                                                        setupdateStringValueForDNS(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDDNS(data.ID);
                                                                    }}
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-soft-danger waves-effect waves-ligh"
                                                                    onClick={() => {
                                                                        tog_DNSToDelete();
                                                                        setupdateStringValueForDNS(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDDNS(data.ID);
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
                                                        isOpen={modalToDeleteDNS}
                                                        toggle={() => {
                                                            tog_DNSToDelete();
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
                                                                    setmodalToDeleteDNS(false);
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
                                                                    {updateStringValueForDNS}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_DNSToDelete();
                                                                    setmodalToDeleteDNS(false);
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
                                                                        updateStringValueForDNS,
                                                                        ScanProfileIdDNS,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDDNS,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeleteDNS(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>

                                                    <Modal
                                                        isOpen={modalToSaveDNS}
                                                        toggle={() => {
                                                            tog_DNSToSave();
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
                                                                    setmodalToSaveDNS(false);
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
                                                                    tog_DNSToSave();
                                                                    setmodalToSaveDNS(false);
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
                                                                        updateStringValueForDNS,
                                                                        ScanProfileIdDNS,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDDNS,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSaveDNS(false);
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
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_DNSToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddDNS}
                                    toggle={() => {
                                        tog_DNSToAdd();
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
                                                setmodalToAddDNS(false);
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
                                                    setupdateStringValueForDNS(
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
                                                tog_DNSToAdd();
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
                                                    updateStringValueForDNS,
                                                    ScanProfileIdDNS,
                                                    riskValue,
                                                    6,
                                                    stringIDDNS,
                                                    "addString"
                                                );

                                                setmodalToAddDNS(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xl="4" className="mt-4">
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed Ports
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">

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
                                        {ChecksPorts.map((data, index) => {
                                            // i = index;
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
                                                                    // id={RiskColor}
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
                                                                        tog_PortsToSave();
                                                                        setupdateStringValueForPorts(
                                                                            data.String
                                                                        );
                                                                        setsetstringIDPorts(data.ID);
                                                                    }}
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-soft-danger waves-effect waves-ligh"
                                                                    onClick={() => {
                                                                        tog_PortsToDelete();
                                                                        setupdateStringValueForPorts(
                                                                            data.String
                                                                        );
                                                                        setsetstringIDPorts(data.ID);
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
                                                        isOpen={modalToDeletePorts}
                                                        toggle={() => {
                                                            tog_PortsToDelete();
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
                                                                    setmodalToDeletePorts(false);
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
                                                                    {updateStringValueForPorts}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_PortsToDelete();
                                                                    setmodalToDeletePorts(false);
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
                                                                        updateStringValueForPorts,
                                                                        ScanProfileIdPorts,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDPorts,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeletePorts(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>

                                                    <Modal
                                                        isOpen={modalToSavePorts}
                                                        toggle={() => {
                                                            tog_PortsToSave();
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
                                                                    setmodalToSavePorts(false);
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
                                                                    tog_PortsToSave();
                                                                    setmodalToSavePorts(false);
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
                                                                        updateStringValueForPorts,
                                                                        ScanProfileIdPorts,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDPorts,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSavePorts(false);
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
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_PortsToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddPorts}
                                    toggle={() => {
                                        tog_PortsToAdd();
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
                                                setmodalToAddPorts(false);
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
                                                    setupdateStringValueForPorts(
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
                                                tog_PortsToAdd();
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
                                                    updateStringValueForPorts,
                                                    ScanProfileIdPorts,
                                                    riskValue,
                                                    6,
                                                    stringIDPorts,
                                                    "addString"
                                                );

                                                setmodalToAddPorts(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>

                    
                    <Col xl="4" className="mt-4">
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed ReverseDNS
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">

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
                                        {ChecksReverseDNS.map((data, index) => {
                                            // i = index;
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
                                                                    // id={RiskColor}
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
                                                                        tog_ReverseDNSToSave();
                                                                        setupdateStringValueForReverseDNS(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDReverseDNS(data.ID);
                                                                    }}
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-soft-danger waves-effect waves-ligh"
                                                                    onClick={() => {
                                                                        tog_ReverseDNSToDelete();
                                                                        setupdateStringValueForReverseDNS(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDReverseDNS(data.ID);
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
                                                        isOpen={modalToDeleteReverseDNS}
                                                        toggle={() => {
                                                            tog_ReverseDNSToDelete();
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
                                                                    setmodalToDeleteReverseDNS(false);
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
                                                                    {updateStringValueForReverseDNS}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_ReverseDNSToDelete();
                                                                    setmodalToDeleteReverseDNS(false);
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
                                                                        updateStringValueForReverseDNS,
                                                                        ScanProfileIdReverseDNS,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDReverseDNS,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeleteReverseDNS(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>

                                                    <Modal
                                                        isOpen={modalToSaveReverseDNS}
                                                        toggle={() => {
                                                            tog_ReverseDNSToSave();
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
                                                                    setmodalToSaveReverseDNS(false);
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
                                                                    tog_ReverseDNSToSave();
                                                                    setmodalToSaveReverseDNS(false);
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
                                                                        updateStringValueForReverseDNS,
                                                                        ScanProfileIdReverseDNS,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDReverseDNS,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSaveReverseDNS(false);
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
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_ReverseDNSToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddReverseDNS}
                                    toggle={() => {
                                        tog_ReverseDNSToAdd();
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
                                                setmodalToAddReverseDNS(false);
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
                                                    setupdateStringValueForReverseDNS(
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
                                                tog_ReverseDNSToAdd();
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
                                                    updateStringValueForReverseDNS,
                                                    ScanProfileIdReverseDNS,
                                                    riskValue,
                                                    6,
                                                    stringIDReverseDNS,
                                                    "addString"
                                                );

                                                setmodalToAddReverseDNS(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    
                <Col xl="4" className="mt-4">
                        <Card>
                        <h5 className="card-header bg-transparent border-bottom  subdomainPortScanCardHead p-0 px-3 pt-1">
                              <div className="mt-4 mt-md-0 d-flex ScanProfileHeading">
                              Exposed ReverseIP
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
                            <CardBody style={{ height: "350px", overflow: "auto" }} className="widgets">

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
                                        {ChecksReverseIP.map((data, index) => {
                                            // i = index;
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
                                                                    // id={RiskColor}
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
                                                                        tog_ReverseIPToSave();
                                                                        setupdateStringValueForReverseIP(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDReverseIP(data.ID);
                                                                    }}
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-soft-danger waves-effect waves-ligh"
                                                                    onClick={() => {
                                                                        tog_ReverseIPToDelete();
                                                                        setupdateStringValueForReverseIP(
                                                                            data.Keyword
                                                                        );
                                                                        setsetstringIDReverseIP(data.ID);
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
                                                        isOpen={modalToDeleteReverseIP}
                                                        toggle={() => {
                                                            tog_ReverseIPToDelete();
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
                                                                    setmodalToDeleteReverseIP(false);
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
                                                                    {updateStringValueForReverseIP}
                                                                </strong>
                                                                ?
                                                            </p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_ReverseIPToDelete();
                                                                    setmodalToDeleteReverseIP(false);
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
                                                                        updateStringValueForReverseIP,
                                                                        ScanProfileIdReverseIP,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDReverseIP,
                                                                        "delete"
                                                                    );

                                                                    setmodalToDeleteReverseIP(false);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Modal>

                                                    <Modal
                                                        isOpen={modalToSaveReverseIP}
                                                        toggle={() => {
                                                            tog_ReverseIPToSave();
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
                                                                    setmodalToSaveReverseIP(false);
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
                                                                    tog_ReverseIPToSave();
                                                                    setmodalToSaveReverseIP(false);
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
                                                                        updateStringValueForReverseIP,
                                                                        ScanProfileIdReverseIP,
                                                                        riskValue,
                                                                        index,
                                                                        stringIDReverseIP,
                                                                        "updateRisk"
                                                                    );

                                                                    setmodalToSaveReverseIP(false);
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
                            <CardFooter className=" bg-transparent border-top text-muted d-flex justify-content-between p-0 px-2 pb-2">
                                <div >

                                </div>
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
                                            tog_ReverseIPToAdd();
                                        }}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <AiOutlinePlus className="icon" /> &nbsp; ADD
                                    </button>
                                </div>


                                {/* Add button modal  */}
                                <Modal
                                    isOpen={modalToAddReverseIP}
                                    toggle={() => {
                                        tog_ReverseIPToAdd();
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
                                                setmodalToAddReverseIP(false);
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
                                                    setupdateStringValueForReverseIP(
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
                                                tog_ReverseIPToAdd();
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
                                                    updateStringValueForReverseIP,
                                                    ScanProfileIdReverseIP,
                                                    riskValue,
                                                    6,
                                                    stringIDReverseIP,
                                                    "addString"
                                                );

                                                setmodalToAddReverseIP(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </Modal>

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default ScanSetting;
