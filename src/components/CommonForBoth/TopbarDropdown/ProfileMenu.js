import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// users
// import user1 from "../../../assets/images/users/avatar-1.jpg";
import user1 from "../../../assets/images/user.png";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"));
  //       setusername(obj.displayName);
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"));
  //       setusername(obj.username);
  //     }
  //   }
  // }, [props.success]);

  // changing the name of user --------------------------------->>>>>>>>>>>>>
  
  // console.log("token", localStorage.getItem("userID"));
  const userCheck = localStorage.getItem("userID");
  
  // const [fname , setfname] = useState("");

    useEffect(()=>{
    })

    getUser();
  async function getUser(event) {
    // event.preventDefault();
    // console.log("token passes " , userCheck)
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}user-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCheck,
      }),
    });
    const data = await response.json();
    if (data) {
      const newdata = data.user;
      setusername(newdata.FirstName);
      // console.log("main profile", newdata.FirstName);
    } else {
      alert("data retreival error");
    }
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item bg-soft-light border-start border-end"
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
                <FeatherIcon icon="user" />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/myprofile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("My Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="/assetinventory">
            {/* <span className="badge bg-success float-end">11</span> */}
            <i className="bx bx-box font-size-16 align-middle me-1" />
            {props.t("Asset Inventory")}  
          </DropdownItem>
          <DropdownItem tag="a" href="/scansettings">
            {/* <span className="badge bg-success float-end">11</span> */}
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Scan Settings")}  
          </DropdownItem>
          <DropdownItem tag="a" href="/subscription">
            {/* <span className="badge bg-success float-end">11</span> */}
            <i className="bx bx-wifi font-size-16 align-middle me-1" />
            {props.t("Subscription")}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/page-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/login" className="dropdown-item" onClick={()=>{
                window.localStorage.clear("token")
                window.localStorage.clear("authUser")
                window.location.reload(false);

                window.location.pathname = "/login"
              }}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Sign out")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
