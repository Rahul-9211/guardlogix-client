import React, { useState, useEffect, useRef } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import CountUp from "react-countup";

import FormData from "form-data";
import swal from "sweetalert";
import FeatherIcon from "feather-icons-react";
import Dropzone from "react-dropzone";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import "react-table/react-table.css";
import {
    Badge,
    CardBody,
    Col,
    Form,
    Modal,
    Row,
    CardTitle,
    CardSubtitle,
    Card,
    Button,
    Input,
    Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

import MetaTags from "react-meta-tags";

//import images
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Select from "react-select";

import axios from "axios";
const AssetList = () => {
    const [productData, setProductData] = useState([]);
    const [modal_standard4, setmodal_standard4] = useState(false); // View More button Modal of ExposedCredentials
    const [assetType_modal, setassetType_modal] = useState(false);
    const [assetType_modal_dependent, setassetType_modal_dependent] =
        useState(false);
        const [applicationName , setApplicationName] = useState()
        const [projectName , setprojectName] = useState()

    var [domainCard, setdomainCard] = useState(0);
    var [SubdomainCardPrice, setSubdomainCardPrice] = useState(0);
    var [MobileApplicationCardPrice, setMobileApplicationCardPrice] = useState(0);
    var [SourceCodeCardPrice, setSourceCodeCardPrice] = useState(0);
    var [IpCardPrice, setIpCardPrice] = useState(0);
    var [addAssetType, setAddAssetType] = useState();
    var [DomainValue, setDomainValue] = useState();
    var [SubdomainValue, setSubdomainValue] = useState();
    var [IPValue, setIPValue] = useState();
    var [InputApk, setInputApk] = useState();


    const [modalPopupData, setmodalPopupData] = useState([]); // set data inside view more modal
    const [TempData, setTempData] = useState([
        {
            ID: 165339330201160,
            Type: "Domain",
            Value: [],
        },
        {
            ID: 165339330218485,
            Type: "Subdomain",
            Value: [],
        },
        {
            ID: 165339330304670,
            Type: "IP",
            Value: [],
        },
    ]);

    const [btn, setBtn] = useState({
        domain: "light",
        subdomain: "light",
        ip: "light",
        mobileApplication: "light",
        sourceCode: "light",
    });

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
            text: "View Details",
            sort: true,
            formatter: (cellContent, productData) => (
                <>
                    <AvForm>
                        {/* {console.log("without cliecekd", productData.Domains)} */}
                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => {
                                // console.log("cliecekd", productData.Value);
                                // tog_standard4();
                                // setmodalPopupData(productData.tempArray)
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

    var tempoverviewChartexpCredentials = [
        {
            id: 1,
            title: "Domain",
            background: "#38a4f8",
            link: "/assetinventory/domain",
            price: domainCard,
            rank: "+$20.9k",
            icon: "chrome",
            isDoller: true,
            postFix: "",
            statusColor: "success",
            series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
        },
        {
            id: 2,
            title: "Subdomain",
            background: "#38a4f8",
            link: "/assetinventory/subdomain",
            price: SubdomainCardPrice,
            rank: "+$20.9k",
            icon: "package",
            isDoller: true,
            postFix: "",
            statusColor: "success",
            series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
        },
        {
            id: 3,
            title: "IP",
            background: "#38a4f8",
            link: "/assetinventory/ip",
            price: IpCardPrice,
            rank: "+$20.9k",
            icon: "grid",
            isDoller: true,
            postFix: "",
            statusColor: "success",
            series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
        },
        {
            id: 4,
            title: "Mobile Application",
            background: "#38a4f8",
            link: "/assetinventory/mobileapplication",
            price: MobileApplicationCardPrice,
            rank: "+$20.9k",
            icon: "codepen",
            isDoller: true,
            postFix: "",
            statusColor: "success",
            series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
        },
        {
            id: 5,
            title: "Source Code",
            background: "#38a4f8",
            link: "/assetinventory/sourcecode",
            price: SourceCodeCardPrice,
            rank: "+$20.9k",
            icon: "code",
            isDoller: true,
            postFix: "",
            statusColor: "success",
            series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
        },
    ];
    var mainData = [];

    useEffect(async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEFAULTPATH}jwtauth`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            }
        );
        const data = await response.json();
        if (!data.status) {
            window.location.href = "/login";
        }
        getassetListData();
    }, []);
    function tog_standard4() {
        setmodal_standard4(!modal_standard4);
        // toggle for view more button
    }
    function tog_assetType_modal() {
        setassetType_modal(!assetType_modal);
        // toggle for view more button
    }
    function tog_assetType_modal_dependent() {
        setassetType_modal_dependent(!assetType_modal_dependent);
        // toggle for view more button
    }

    // ApI to hit Task Data
    async function getassetListData(event) {
        console.log("games");
        const response = await fetch(
            `${process.env.REACT_APP_DEFAULTPATH}getassetlist`,
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
            console.log("response", data.assetList);
            // mainData = await data.data[0].data.entries;
            let tempArray = new Array();
            let domain = await data.assetList.Domain;
            let DomainCounter = 0;
            let IPCounter = 0;
            let SubdomainCounter = 0;
            let MobileApplicationCounter = 0;
            let SourceCodeCounter = 0;

            for (let i = 0; i < data.assetList.length; i++) {
                if (data.assetList[i].Feature === "Domain") {
                    DomainCounter++;
                }
                if (data.assetList[i].Feature === "Subdomain") {
                    SubdomainCounter++;
                }
                if (data.assetList[i].Feature === "IP") {
                    IPCounter++;
                }
                if (data.assetList[i].Feature === "MobileApplication") {
                    MobileApplicationCounter++;
                }
                if (data.assetList[i].Feature === "SourceCode") {
                    SourceCodeCounter++;
                }
            }
            if (domain) {
                let domainCounter = 0;
                for (let i = 0; i < domain.length; i++) {
                    domainCounter++;
                    tempArray.push({
                        ID: domain[i].ID,
                        Type: "Domain",
                        Value: domain[i].Value,
                        Source: domain[i].Source,
                        Status: domain[i].Status,
                        DateTime: domain[i].DateTime,
                    });
                }
                setdomainCard(domainCounter);
            }
            // let ip = await data.assetList.IP;
            // if (ip) {
            //     let IPCounter = 0
            //     for (let i = 0; i < ip.length; i++) {
            //         IPCounter++;
            //         tempArray.push({
            //             ID: ip[i].ID,
            //             Type: "IP",
            //             Value: ip[i].Value,
            //             Source: ip[i].Source,
            //             Status: ip[i].Status,
            //             DateTime: ip[i].DateTime,
            //         })
            //         console.log("insise loop", IPCounter)
            //     }
            //     setIpCardPrice(IPCounter)
            // }
            // let subdomain = await data.assetList.Subdomain;
            // if (subdomain) {
            //     let subdomianCounter = 0;
            //     for (let i = 0; i < subdomain.length; i++) {
            //         subdomianCounter++;
            //         tempArray.push({
            //             ID: subdomain[i].ID,
            //             Type: "Subdomain",
            //             Value: subdomain[i].Value,
            //             Source: subdomain[i].Source,
            //             Status: subdomain[i].Status,
            //             DateTime: subdomain[i].DateTime,
            //         })
            //     }
            //     setSubdomainCardPrice(subdomianCounter)
            // }
            // let mobileApplication = await data.assetList.MobileApplication;
            // if (mobileApplication) {
            //     let mobileApplicationCounter = 0;
            //     for (let i = 0; i < mobileApplication.length; i++) {
            //         mobileApplicationCounter++;
            //         tempArray.push({
            //             ID: mobileApplication[i].ID,
            //             Type: "MobileApplication",
            //             Value: mobileApplication[i].FileName,
            //             Source: mobileApplication[i].Source,
            //             Status: mobileApplication[i].Status,
            //             DateTime: mobileApplication[i].DateTime,
            //         })
            //     }
            //     setMobileApplicationCardPrice(mobileApplicationCounter)
            // }
            // console.log("tempArray", tempArray)
            setProductData(data.assetList);
            setIpCardPrice(IPCounter);
            setdomainCard(DomainCounter);
            setSubdomainCardPrice(SubdomainCounter);
            setMobileApplicationCardPrice(MobileApplicationCounter);
            setSourceCodeCardPrice(SourceCodeCounter);

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
    const handleAddAsset = () => {
        console.log("cliecked");
        tog_assetType_modal();
    };
    const options = [
        { value: "Domain", label: "Domain" },
        { value: "Subdomain", label: "Subdomain" },
        { value: "IP", label: "IP" },
        { value: "APK", label: "Mobile Application " },
    ];
    const ApplicationPlatformOptions = [
        { value: "APK", label: "APK" },
        { value: "IPK", label: "IPK" },
    ];
    const projectLanguageOptions = [
        { value: "C", label: "C" },
        { value: "C++", label: "C++" },
    ];

    let assetType_ref = useRef(null); // ref for severity
    let applicationPlatformRef = useRef(null); // ref for severity
    let projectLanguageRef = useRef(null); // ref for severity
    async function clearValue() {
        // console.log(" assetType_ref.current.state.value.value", assetType_ref.current.state.value.value)
        // console.log("selectRef_severity", assetType_ref.current.state.value.value)
        // // let value = assetType_ref.current.state.value.value
        // // console.log("value ", value)
        // // setSeverity(value)
        // // assetType_ref.select.clearValue();
        // console.log("addAssetType", assetType_ref.current.state.value.value)
        // setAddAssetType(assetType_ref.current.state.value.value)
        // assetType_ref.current.select.clearValue()
        tog_assetType_modal_dependent();
        // selectRef_status.current.select.clearValue()
    }

    const [selectedFiles, setselectedFiles] = useState([]);

    function handleAcceptedFiles(files) {
        console.log("fiels", files);
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setselectedFiles(files);
    }

    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    async function addVulnerabilities() {
        var formData = new FormData();
        // formData.append("checkListName", checkListName);
        // // formData.append("status_severity", status_severity);
        // formData.append("checkListVersion", checkListVersion);
        // formData.append("checkListYear", checkListYear);
        // formData.append("checkLIstStatus", checkLIstStatus);
        // formData.append("checkLIstType", checkList_Type);
        formData.append("auditorID", "2132r432r");
        // formData.append("status_vulnerability_status", status_vulnerability_status);
        // formData.append("vulnerabilityImg1", vulnerabilityImg1[0], "vulnerability_status_img.png");
        // console.log(checkListName, checkListVersion, checkListYear, checkLIstStatus)

        try {
            // const response = await fetch('http://localhost:1338/add-auditee', {
            //     method : "POST",
            //     headers : {
            //         "content-Type" : "application/json"
            //     },
            //     body:formData
            // })
            await axios
                .post(`${process.env.REACT_APP_DEFAULTPATH}saveAssetList`, formData)
                .then(() => {
                    // getCustomers();
                    // tog_standard4
                    // tog_standard_add_auditee()
                    // tog_standard_add_checklist()
                    // window.location.reload();
                });
        } catch (error) {
            console.log(error);
        }
    }
    const saveAssetData = async () => {
        console.log("data");
        if (addAssetType === "Domain") {
            let domainRegex =
                /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
            // console.log(e.target.value)
            if (domainRegex.test(DomainValue)) {
                tog_assetType_modal_dependent();
                console.log("true");
                const response = await fetch(
                    `${process.env.REACT_APP_DEFAULTPATH}saveAssetList-scalable`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orgID,
                            DomainValue,
                            addAssetType,
                        }),
                    }
                );
                getassetListData();
                console.log("return response ", response.data);
            } else {
                swal("Job Fail!", "You entered wrong domain!", "error");
            }
        }

        if (addAssetType === "Subdomain") {
            let subdomain_regex = /(^|^[^:]+:\/\/|[^\.]+\.)dream11\.com/;
            if (subdomain_regex.test(SubdomainValue)) {
                tog_assetType_modal_dependent();

                const response = await fetch(
                    `${process.env.REACT_APP_DEFAULTPATH}saveAssetList-scalable`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orgID,
                            SubdomainValue,
                            addAssetType,
                        }),
                    }
                );
                getassetListData();
                console.log("return response ", response.data);
            } else {
                swal("Job Fail!", "You entered wrong subdomain!", "error");
            }
        }

        if (addAssetType === "IP") {
            let ip_regex =
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (ip_regex.test(IPValue)) {
                tog_assetType_modal_dependent();

                const response = await fetch(
                    `${process.env.REACT_APP_DEFAULTPATH}saveAssetList-scalable`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orgID,
                            IPValue,
                            addAssetType,
                        }),
                    }
                );
                getassetListData();
                console.log("return response ", response.data);
            } else {
                swal("Job Fail!", "You entered wrong IP address!", "error");
            }
        }

        if (addAssetType === "APK") {
            tog_assetType_modal_dependent();
            // addVulnerabilities() 
            console.log("applicationPlatformRef",applicationPlatformRef.current.state.value.value )
            const formData = new FormData();
            formData.append("apkFile", InputApk[0]);
            formData.append("addAssetType", "APK");
            formData.append("applicationPlatform", applicationPlatformRef.current.state.value.value);
            formData.append("applicationName", applicationName);
            formData.append("orgID", orgID);
            for (var pair of formData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }

            // console.log("formData", formData)
            // console.log(`${process.env.REACT_APP_DEFAULTPATH}saveAssetList`)

            try {
                axios
                    .post(
                        `${process.env.REACT_APP_DEFAULTPATH}saveAssetList-scalable`,
                        formData
                    )
                    .then((res) => {
                        getassetListData();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } catch (error) {
                console.log(error);
            }

            // const obj = Object.fromEntries(formData);
            // const response = await fetch(
            //     `${process.env.REACT_APP_DEFAULTPATH}saveAssetList`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             // "Content-Type": "application/json",
            //             'Content-Type': 'multipart/form-data'
            //         },
            //         body: formData
            //         // body: JSON.stringify({name : "name"})
            //     }
            // ).then((res) => { console.log("res", res) })
            //     .catch((err) => { console.error(err) })
        }

        if (addAssetType === "SourceCode") {
            tog_assetType_modal_dependent();
            // addVulnerabilities() 
            // console.log("applicationPlatformRef",applicationPlatformRef.current.state.value.value )
            const formData = new FormData();
            formData.append("apkFile", InputApk[0]);
            formData.append("addAssetType", "SourceCode");
            formData.append("projectLanguage", projectLanguageRef.current.state.value.value);
            formData.append("projectName", projectName);
            formData.append("orgID", orgID);
            console.log("assetList Form Datat", formData)
            for (var pair of formData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }

            // console.log("formData", formData)
            // console.log(`${process.env.REACT_APP_DEFAULTPATH}saveAssetList`)

            try {
                axios
                    .post(
                        `${process.env.REACT_APP_DEFAULTPATH}saveAssetList-scalable`,
                        formData
                    )
                    .then((res) => {
                        getassetListData();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } catch (error) {
                console.log(error);
            }

            // const obj = Object.fromEntries(formData);
            // const response = await fetch(
            //     `${process.env.REACT_APP_DEFAULTPATH}saveAssetList`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             // "Content-Type": "application/json",
            //             'Content-Type': 'multipart/form-data'
            //         },
            //         body: formData
            //         // body: JSON.stringify({name : "name"})
            //     }
            // ).then((res) => { console.log("res", res) })
            //     .catch((err) => { console.error(err) })
        }
    };
    return (
        <React.Fragment>
            <div className="userProfile credentialBreachProfile">
                <MetaTags>
                    <title>Exposed Subdomains | GuardLogiX</title>
                </MetaTags>
                <Row>
                    <Breadcrumbs
                        title="Dashboard"
                        breadcrumbItem="Asset Inventory "
                        breadcrumbFeature="AssetInventory"
                    />
                </Row>
                {
                    // <Button onClick={() => {
                    //     var fdata = new FormData();
                    //     fdata.append("name", "name");
                    //     console.log("fdata", fdata);
                    //     for (var pair of fdata.entries()) {
                    //         console.log(pair[0] + ', ' + pair[1]);
                    //     }
                    //     console.log("URL", `${process.env.REACT_APP_DEFAULTPATH}saveAssetList`)
                    //     axios.post(`http://localhost:1337/saveAssetList`, { name: "name" }).then((res) => {
                    //         console.log("res", res)
                    //     }).catch((err) => {
                    //         console.error(err)
                    //     })
                    //     // fetch(`${process.env.REACT_APP_DEFAULTPATH}saveAssetList`, {
                    //     //     method: "POST",
                    //     //     headers: {
                    //     //         "Content-Type": "application/json",
                    //     //     },
                    //     //     body:new FormData(document.getElementById("form"))
                    //     // }).then((res) => {
                    //     //     console.log("res", res)
                    //     // }).catch((err) => {
                    //     //     console.error(err)
                    //     // })
                    // }}>test</Button>
                }

                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>
                                <Row>
                                    {(tempoverviewChartexpCredentials || []).map(
                                        (widget, key) => (
                                            <Col
                                                xl={2}
                                                md={6}
                                                key={key}
                                                className="assetInventoryCards"
                                            >
                                                <Card className="card-h-100 m-2">
                                                    <CardBody className="p-0">
                                                        <Row className="align-items-center">
                                                            <Col
                                                                xs={12}
                                                                className="cards"
                                                                style={{
                                                                    background: `${widget.background}`,
                                                                    borderRadius: "5px",
                                                                    padding: "12px",
                                                                }}
                                                            >
                                                                <span
                                                                    className="text-muted mb-3 lh-1 d-block textWhiteCard"
                                                                    style={{
                                                                        fontSize: "21px",
                                                                        fontWeight: "800",
                                                                    }}
                                                                >
                                                                    {widget.title} <br />
                                                                    <FeatherIcon
                                                                        icon={widget.icon}
                                                                        className="mt-3"
                                                                    />
                                                                </span>
                                                                <h3
                                                                    className=" text-white text-center"
                                                                    style={{
                                                                        fontSize: "70px",
                                                                        marginTop: "",
                                                                        marginBottom: "63px",
                                                                    }}
                                                                >
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

                                                            <Col xs={12} className="button">
                                                                <Link to={widget.link}>
                                                                    <Button color="danger">View more</Button>
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    )}

                                    {/* {(tempoverviewChartexpCredentials || []).map((widget, key) => (
                                     
                                        <Col xl={2} md={6} key={key}>
                                            <Card className="card-h-100">
                                                <CardBody className="" style={{ background: `${widget.background}` }}>
                                                    <Row className="align-items-center">
                                                        <Col xs={12}>
                                                            <span className="text-muted mb-3 lh-1 d-block textWhiteCard" style={{ fontSize: "21px", fontWeight: "800" }}>
                                                                {widget.title} <br />
                                                                <FeatherIcon icon={widget.icon} className="mt-3" />
                                                            </span>
                                                            <h3 className=" text-white text-center" style={{ fontSize: "70px", marginTop: "27px" }}>
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
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))} */}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
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
                                Asset Details
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
                                        <th scope="col">Value</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">DateTime</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modalPopupData.map((value, index) => {
                                        return (
                                            <tr>
                                                {(() => {
                                                    if (value.ID != null) {
                                                        return <td scope="row">{value.ID}</td>;
                                                    } else {
                                                        return <td>-</td>;
                                                    }
                                                })()}
                                                {(() => {
                                                    if (value.Value != null) {
                                                        return <td scope="row">{value.Value}</td>;
                                                    } else {
                                                        return <td>-</td>;
                                                    }
                                                })()}{" "}
                                                {(() => {
                                                    if (value.Source != null) {
                                                        return <td> {value.Source}</td>;
                                                    } else {
                                                        return <td>-</td>;
                                                    }
                                                })()}
                                                {(() => {
                                                    if (value.Status != null) {
                                                        return (
                                                            <td>
                                                                {" "}
                                                                <Badge
                                                                    pill
                                                                    className="badge-soft-success ms-1  "
                                                                >
                                                                    {value.Status}
                                                                </Badge>{" "}
                                                            </td>
                                                        );
                                                    } else {
                                                        return <td>-</td>;
                                                    }
                                                })()}
                                                {(() => {
                                                    if (value.DateTime != null) {
                                                        return <td scope="row">{value.DateTime}</td>;
                                                    } else {
                                                        return <td>-</td>;
                                                    }
                                                })()}
                                                {/* {(() => {
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
                        })()} */}
                                            </tr>
                                        );
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
                    <Row className="content">
                        <Col lg={4} md={5} className="col-xxl-9 userData credentialData">
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
                                                        pagination={paginationFactory(pageOptions)}
                                                    >
                                                        {({ paginationProps, paginationTableProps }) => (
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
                                                                            <div className="d-flex justify-content-end pe-3">
                                                                                <Button
                                                                                    className="btn-danger"
                                                                                    onClick={handleAddAsset}
                                                                                >
                                                                                    Add Asset
                                                                                </Button>
                                                                            </div>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col xl="12">
                                                                                <div className="table-responsive">
                                                                                    <BootstrapTable
                                                                                        keyField={"id"}
                                                                                        responsive
                                                                                        bordered={false}
                                                                                        striped={false}
                                                                                        defaultSorted={defaultSorted}
                                                                                        classes={
                                                                                            "table align-middle table-nowrap"
                                                                                        }
                                                                                        headerWrapperClasses={"thead-light"}
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

                {/* Modal to add assets and check asset Type  */}
                <Modal
                    className="modal-sm  zindex-dropdown"
                    isOpen={assetType_modal}
                    toggle={() => {
                        tog_assetType_modal();
                    }}
                >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0 modal-xl" id="myModalLabel">
                            Asset Details
                        </h5>
                        <button
                            type="button"
                            onClick={() => {
                                setassetType_modal(false);
                            }}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ overflow: "visible" }}>
                        <div className="" style={{ position: "relative", zIndex: "5000" }}>
                            {/* <Select
                            style={{
                                position: "relative",
                                zIndex: "5000"
                            }}
                            options={options}
                            // placeholder={addAssetType}
                            ref={assetType_ref}
                            // onChange={(e) => {
                            //     console.log(e.value)
                            //     setAddAssetType(e.value);
                            //     // console.log("daasdasd", assetType_ref.current.state.value.value)
                            //     // handleSelectOptions_empSize(e.value);
                            //     // console.log(selectedOptions_empSize)
                            // }}
                            className="zindex-sticky" /> */}

                            <button
                                type="button"
                                onClick={() => {
                                    setBtn({
                                        ip: "light",
                                        mobileApplication: "light",
                                        domain: "success",
                                        subdomain: "light",
                                        sourceCode: "light",
                                    });
                                    setAddAssetType("Domain");
                                }}
                                className={`btn btn-${btn.domain} waves-effect mx-2`}
                            >
                                Domain
                            </button>
                            <button
                                onClick={() => {
                                    setBtn({
                                        ip: "success",
                                        mobileApplication: "light",
                                        domain: "light",
                                        subdomain: "light",
                                        sourceCode: "light",
                                    });
                                    setAddAssetType("IP");
                                }}
                                type="button"
                                className={`btn btn-${btn.ip} waves-effect mx-2`}
                            >
                                IP
                            </button>
                            <button
                                onClick={() => {
                                    setBtn({
                                        ip: "light",
                                        mobileApplication: "light",
                                        domain: "light",
                                        subdomain: "success",
                                        sourceCode: "light",
                                    });
                                    setAddAssetType("Subdomain");
                                }}
                                type="button"
                                className={`btn btn-${btn.subdomain} waves-effect mx-2`}
                            >
                                Subdomain
                            </button>
                            <button
                                onClick={() => {
                                    setBtn({
                                        ip: "light",
                                        mobileApplication: "success",
                                        domain: "light",
                                        subdomain: "light",
                                        sourceCode: "light",
                                    });
                                    setAddAssetType("APK");
                                }}
                                type="button"
                                className={`btn btn-${btn.mobileApplication} waves-effect mx-2`}
                            >
                                Mobile Application
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setBtn({
                                        ip: "light",
                                        mobileApplication: "light",
                                        domain: "light",
                                        subdomain: "light",
                                        sourceCode: "success",
                                    });
                                    setAddAssetType("SourceCode");
                                }}
                                className={`btn btn-${btn.sourceCode} waves-effect mx-2`}
                            >
                                Source Code
                            </button>
                        </div>

                        {/* <select name="cars" id="cars" 
                            ref={assetType_ref}>
                            <option value="IP">IP</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select> */}
                    </div>
                    <div className="modal-footer" style={{ zIndex: "2" }}>
                        <button
                            type="button"
                            onClick={() => {
                                tog_assetType_modal();
                                setassetType_modal(false);
                            }}
                            className="btn btn-secondary "
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                tog_assetType_modal();
                                clearValue();
                            }}
                            className="btn btn-primary "
                            data-dismiss="modal"
                        >
                            Next
                        </button>
                    </div>
                </Modal>

                {/* modal on the basis of asset checklist  */}
                <Modal
                    className="modal-sm  zindex-dropdown"
                    isOpen={assetType_modal_dependent}
                    toggle={() => {
                        tog_assetType_modal_dependent();
                    }}
                >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0 modal-xl" id="myModalLabel">
                            {(() => {
                                if (addAssetType === "Domain") {
                                    return "Domain Details";
                                }
                                if (addAssetType === "IP") {
                                    return "IP Details";
                                }
                                if (addAssetType === "Subdomain") {
                                    return "Subdomain Details";
                                }
                                if (addAssetType === "APK") {
                                    return "Mobile Application Details";
                                }
                                if (addAssetType === "SourceCode") {
                                    return "Source Code Details";
                                }
                            })()}
                        </h5>
                        <button
                            type="button"
                            onClick={() => {
                                setassetType_modal_dependent(false);
                            }}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ overflow: "visible" }}>
                        {(() => {
                            if (addAssetType === "Domain") {
                                return (
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="example.com"
                                            onChange={(e) => {
                                                setDomainValue(e.target.value);
                                            }}
                                        />{" "}
                                    </>
                                );
                            }
                            if (addAssetType === "Subdomain") {
                                return (
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="example.dream11.com"
                                            onChange={(e) => {
                                                // console.log(e.target.value)
                                                setSubdomainValue(e.target.value);
                                            }}
                                        />{" "}
                                    </>
                                );
                            }
                            if (addAssetType === "IP") {
                                return (
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="192.168.0.196"
                                            onChange={(e) => {
                                                // console.log(e.target.value)
                                                setIPValue(e.target.value);
                                            }}
                                        />{" "}
                                    </>
                                );
                            }
                            if (addAssetType === "APK") {
                                return (
                                    <>
                                        <div>
                                            <Label htmlFor="applicationName"> Application Name</Label>
                                            <Input
                                                type="text"
                                                id="applicationName"
                                                placeholder="application Name"
                                                className="mb-3"
                                                onChange={(e) => {
                                                    // console.log("val", e.target.value);
                                                    setApplicationName(e.target.value)
                                                }}
                                            />

                                            <Label htmlFor="applicationPlatform">
                                                Application Platform
                                            </Label>
                                            <Select
                                                id="applicationPlatform"
                                                placeholder="application Platform"
                                                className="mb-4"
                                                options={ApplicationPlatformOptions}
                                                ref={applicationPlatformRef}
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            id="myfile"
                                            name="myfile"
                                            accept=".apk"
                                            onChange={(e) => {
                                                setInputApk(e.target.files);
                                            }}
                                        ></input>
                                    </>
                                );
                                // <Row>
                                //   <Col className="col-12">
                                //     <Card>
                                //       <CardBody>
                                //         <CardTitle>Dropzone</CardTitle>
                                //         <CardSubtitle className="mb-3">
                                //           {" "}
                                //           DropzoneJS is an open source library that provides
                                //           drag’n’drop file uploads with image previews.
                                //         </CardSubtitle>
                                //         <Form>
                                //           <Dropzone
                                //             onDrop={acceptedFiles => {
                                //               handleAcceptedFiles(acceptedFiles)
                                //             }}
                                //             accept='.apk'
                                //           >
                                //             {({ getRootProps, getInputProps }) => (
                                //               <div className="dropzone">
                                //                 <div
                                //                   className="dz-message needsclick mt-2"
                                //                   {...getRootProps()}
                                //                 >
                                //                   <input {...getInputProps()} />
                                //                   <div className="mb-3">
                                //                     <i className="display-4 text-muted bx bxs-cloud-upload" />
                                //                   </div>
                                //                   <h4>Drop files here or click to upload.</h4>
                                //                 </div>
                                //               </div>
                                //             )}
                                //           </Dropzone>
                                //           <div className="dropzone-previews mt-3" id="file-previews">
                                //             {selectedFiles.map((f, i) => {
                                //               return (
                                //                 <Card
                                //                   className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                //                   key={i + "-file"}
                                //                 >
                                //                   <div className="p-2">
                                //                     <Row className="align-items-center">
                                //                       <Col className="col-auto">
                                //                         <img
                                //                           data-dz-thumbnail=""
                                //                           height="80"
                                //                           className="avatar-sm rounded bg-light"
                                //                           alt={f.name}
                                //                           src={f.preview}
                                //                         />
                                //                       </Col>
                                //                       <Col>
                                //                         <Link
                                //                           to="#"
                                //                           className="text-muted font-weight-bold"
                                //                         >
                                //                           {f.name}
                                //                         </Link>
                                //                         <p className="mb-0">
                                //                           <strong>{f.formattedSize}</strong>
                                //                         </p>
                                //                       </Col>
                                //                     </Row>
                                //                   </div>
                                //                 </Card>
                                //               )
                                //             })}
                                //           </div>
                                //         </Form>

                                //         <div className="text-center mt-4">
                                //           <button
                                //             type="button"
                                //             className="btn btn-primary "
                                //           >
                                //             Send Files
                                //           </button>
                                //         </div>
                                //       </CardBody>
                                //     </Card>
                                //   </Col>
                                // </Row>
                            }
                            if (addAssetType === "SourceCode") {
                                return (
                                    <>
                                        <div>
                                            <Label htmlFor="projectName"> Project Name</Label>
                                            <Input
                                                type="text"
                                                id="projectName"
                                                placeholder="project Name"
                                                className="mb-3"
                                                onChange={(e) => {
                                                    // console.log("val", e.target.value);
                                                    setprojectName(e.target.value)
                                                }}
                                            />

                                            <Label htmlFor="projectLanguage">
                                                Project Platform
                                            </Label>
                                            <Select
                                                id="projectLanguage"
                                                placeholder="project Platform"
                                                className="mb-4"
                                                options={projectLanguageOptions}
                                                ref={projectLanguageRef}
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            id="myfile"
                                            name="myfile"
                                            accept=".rar"
                                            onChange={(e) => {
                                                setInputApk(e.target.files);
                                            }}
                                        ></input>
                                    </>
                                );
                            }
                        })()}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={() => {
                                tog_assetType_modal_dependent();
                                setassetType_modal_dependent(false);
                            }}
                            className="btn btn-warning "
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                // tog_assetType_modal_dependent();
                                saveAssetData();
                                // clearValue();
                            }}
                            className="btn btn-warning "
                            data-dismiss="modal"
                        >
                            Save
                        </button>
                    </div>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AssetList;
