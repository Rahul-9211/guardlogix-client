import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";

import ReactApexChart from "react-apexcharts";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Card, CardBody, Col, Container, Row } from "reactstrap";

import CountUp from "react-countup";

/** import Mini Widget data */
import { WidgetsData } from "../../common/data/dashboard";
import WalletBalance from "./WalletBalance";
import InvestedOverview from "./InvestedOverview";
import MarketOverview from "./MarketOverview";
import Locations from "./Locations";
import Trading from "./Trading";
import Transactions from "./Transactions";
import RecentActivity from "./RecentActivity";
import NewSlider from "./NewSlider";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

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



const Dashboard = () => {

  
  // userID and organzation ID is set to access user from localStorage
  const userID = localStorage.getItem("userID");
  const orgID = localStorage.getItem("orgID");


useEffect(()=>{
  getRiskCalculated();
}, [])

// api to get risk calculated 
async function getRiskCalculated(){
  const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}riskcalculator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
      orgID,
    }),
  });
  const data = await response.json();
  console.log("riskCalculated value " , data)
}


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Risk Dashboard | GuardLogiX</title>
        </MetaTags>
        <Container fluid>
          {/* <Breadcrumb/> */}
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Dashboard"
            breadcrumbFeature="Dashboard "
          />

          <Row>
            {(WidgetsData || []).map((widget, key) => (
              <Col xl={3} md={6} key={key}>
                <Card className="card-h-100">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col xs={6}>
                        <span className="text-muted mb-3 lh-1 d-block text-truncate">
                          {widget.title}
                        </span>
                        <h4 className="mb-3">
                          {widget.isDoller === true ? "$" : ""}
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              end={widget.price}
                              duration={12}
                            />
                            {widget.postFix}
                          </span>
                        </h4>
                      </Col>
                      <Col xs={6}>
                        <ReactApexChart
                          options={options}
                          series={[{ data: [...widget["series"]] }]}
                          type="line"
                          className="apex-charts"
                          dir="ltr"
                        />
                      </Col>
                    </Row>
                    <div className="text-nowrap">
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
                      <span className="ms-1 text-muted font-size-13">
                        Since last week
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <WalletBalance />
            <Col>
              <Row>
                <InvestedOverview />
                <NewSlider />
              </Row>
            </Col>
          </Row>
          <Row>
            <MarketOverview />
            <Locations />
          </Row>
          <Row>
            <Trading />
            <Transactions />
            <RecentActivity />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
