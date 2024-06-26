import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback } from "react";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import images
import giftBox from "../../assets/images/giftbox.png";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();
  const token = localStorage.getItem("token");
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard" className="">
                <FeatherIcon icon="home" />
                <span>{props.t("Risk Dashboard")}</span>
              </Link>
            </li>
            {/* <li className="menu-title">{props.t("Domain")} </li> */}
           
            <li>
              <Link to="/exposedcredentials" className="" onLoad={async()=>{
                const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}jwtauth` , {
                  method:"POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    token
                  }),
                })
                const data = await response.json()
                if(!data.status){
                  window.location.href = "/login";
                }
              }}>
                <FeatherIcon icon="file-text" />
                <span>{props.t("Exposed Credentials")}</span>
              </Link>
            </li>

            
            <li>
              <Link to="/exposedsubdomains" className="">
                <FeatherIcon icon="list" />
                <span>{props.t("Exposed Subdomains")}</span>
              </Link>
            </li>

            <li>
              <Link to="/exposedwhois" className="">
                <FeatherIcon icon="book-open" />
                <span>{props.t("Exposed WHOIS")}</span>
              </Link>
            </li> 


            {/* DNS Lookup */}
            <li>
              <Link to="/exposeddns" className="">
                <FeatherIcon icon="check-square" />
                <span>{props.t("Exposed DNS ")}</span>
              </Link>
            </li>
            {/* WHOIS Record */}
           {/* Subdomain Finder */}
            {/* <li className="menu-title">{props.t("Human Assets")} </li>  */}
            {/* credentialbreach */}
            
            {/* <li className="menu-title">{props.t("Network")} </li> */}
            {/* PORT Scanner */}
            <li>
              <Link to="/exposedports"  className="">
                <FeatherIcon icon="list" />
                <span>{props.t("Exposed PORTS")}</span>
              </Link>
            </li>

            
            <li>
              <Link to="/exposedreversedns"  className="">
                <FeatherIcon icon="list" />
                <span>{props.t("Exposed Reverse DNS")}</span>
              </Link>
            </li>

            {/* <li className="menu-title">{props.t("Others")} </li> */}
            {/* Reverse IP Lookup */}
            <li>
              <Link to="/exposedreverseip"  className="">
                <FeatherIcon icon="check-square" />
                <span>{props.t("Exposed Reverse IP")}</span>
              </Link>
            </li>
            {/* Reverse DNS Lookup */}

            <div className="sideHeaderBorder"></div>

            <li className="menu-title">{props.t("My Account")} </li>
            {/* My profile */}
            <li>
              <Link to="/myprofile" className="">
                <FeatherIcon icon="user" />
                <span>{props.t("My Profile")}</span>
              </Link>
            </li>
            {/* AssetList Setting*/}
            <li>
              <Link to="/assetinventory" className="">
                <FeatherIcon icon="list" />
                <span>{props.t("Asset Inventory")}</span>
              </Link>
            </li>
            {/* Scan Setting*/}
            <li>
              <Link to="/scansettings" className="">
                <FeatherIcon icon="server" />
                <span>{props.t("Scan Settings")}</span>
              </Link>
            </li>
            {/* Subscription*/}
            <li>
              <Link to="/subscription" className="" aria-disabled>
                <FeatherIcon icon="rss" />
                <span>{props.t("Subscription")}</span>
              </Link>
            </li>
            {/*Sign Out*/}
            <li>
              <Link to="/login" className="" onClick={()=>{
                window.localStorage.clear("token")
                window.localStorage.clear("authUser")
                window.location.reload(false);
                window.location.pathname = "/login"
              }}>
                <FeatherIcon icon="log-out" />
                <span>{props.t("Sign out")}</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon
                  icon="grid"
                />
                <span>{props.t("Apps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/apps-calendar">{props.t("Calendar")}</Link>
                </li>
                <li>
                  <Link to="/apps-chat">
                    {props.t("Chat")}
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>{props.t("Email")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/email-inbox">{props.t("Inbox")}</Link>
                    </li>
                    <li>
                      <Link to="/email-read">{props.t("Read Email")} </Link>
                    </li>

                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>{props.t("Invoices")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/invoices-list">{props.t("Invoice List")}</Link>
                    </li>
                    <li>
                      <Link to="/invoices-detail">{props.t("Invoice Detail")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <span>{props.t("Contacts")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                    </li>
                    <li>
                      <Link to="/contacts-list">{props.t("User List")}</Link>
                    </li>
                    <li>
                      <Link to="/contacts-profile">{props.t("Profile")}</Link>
                    </li>
                  </ul>
                </li>

              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon
                  icon="users"
                />
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/page-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/page-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail">{props.t("Confirm Mail")}</Link>
                </li>
                <li>
                  <Link to="/page-email-verification">
                    {props.t("Email Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-two-step-verification">
                    {props.t("Two Step Verification")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="file-text"
                />
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/pages-500">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li className="menu-title">{props.t("Elements")}</li> */}
            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-tone"></i>
                <span>{props.t("Components")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-drawer">{props.t("Drawer")}</Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="gift"
                />
                <span>{props.t("Extended")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/extended-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/extended-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/extended-sweet-alert">{props.t("Sweet Alert")}</Link>
                </li>
                <li>
                  <Link to="/extended-session-timeout">{props.t("Session Timeout")}</Link>
                </li>
                <li>
                  <Link to="/extended-rating">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="/extended-notifications">{props.t("Notifications")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="">
                <FeatherIcon
                  icon="box"
                />
                <span className="badge rounded-pill bg-danger float-end">
                  10
                </span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/form-elements">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Advanced Plugins")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="sliders"
                />
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tables-basic">{props.t("Bootstrap Basic")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("DataTables")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{props.t("Editable")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon icon="pie-chart" />
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="/charts-apex">{props.t("Apexcharts")}</Link>
                </li>
                <li>
                  <Link to="/charts-echart">{props.t("Echarts")}</Link>
                </li>
                <li>
                  <Link to="/charts-chartjs">{props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="/charts-knob">{props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="/charts-sparkline">{props.t("Sparkline")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon icon="cpu" />
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon icon="map" />
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/maps-google">{props.t("Google")}</Link>
                </li>
                <li>
                  <Link to="/maps-vector">{props.t("Vector")}</Link>
                </li>
                <li>
                  <Link to="/maps-leaflet">{props.t("Leaflet")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon icon="share-2" />
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
          {/* <div className="card sidebar-alert border-0 text-center mx-4 mb-0 mt-5">
            <div className="card-body">
              <img src={giftBox} alt="" />
              <div className="mt-4">
                <h5 className="alertcard-title font-size-16">
                  Unlimited Access
                </h5>
                <p className="font-size-13">
                  Upgrade your plan from a Free trial, to select ‘Business
                  Plan’.
                </p>
                <a href="#!" className="btn btn-primary mt-2">
                  Upgrade Now
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
