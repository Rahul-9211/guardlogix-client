import React, { useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import CountUp from "react-countup";


import FeatherIcon from "feather-icons-react";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import "react-table/react-table.css";
import {
    Badge,
    CardBody,
    Col,
    Modal,
    Row,
    Card,
    Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

import MetaTags from "react-meta-tags";

//import images
import Breadcrumbs from "../../../components/Common/Breadcrumb";


const Subscription = () => {



    return (
        <React.Fragment>
            <div className="userProfile credentialBreachProfile">
                <MetaTags>
                    <title>Subscription | GuardLogiX</title>
                </MetaTags>
                <Row>
                    <Breadcrumbs
                        title="Dashboard"
                        breadcrumbItem="Subscription"
                        breadcrumbFeature="Subscription"
                    />
                </Row>


            </div>
        </React.Fragment>
    );
};

export default Subscription;
