import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Row, Col, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser, apiError } from "../../store/actions";

//Import Icons
import FeatherIcon from "feather-icons-react";
//redux
import { useSelector, useDispatch } from "react-redux";

import GoToEmailForm from "../../components/authenticate/GoToEmailForm";
import Banner from "../../components/Common/Banner";
import { Link } from "react-router-dom";

// import images
// import logo from "../../assets/images/logo-sm.svg";
import logo from "../../assets/images/logo/whitelogo.svg";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const RegisterCheck = (props) => {
  const dispatch = useDispatch();

  const { user, registrationError } = useSelector((state) => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  // handleValidSubmit
  const handleValidSubmit = (values) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    setStatus();
  }, []);
  


  const taskName = "DNSRecords";
  const token = window.location.href.split("account-verify/")[1];
  // console.log(token);
  async function setStatus(event) {
    // e.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}changestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        taskName
      }),
    });
    const data = await response.json();
    console.log("data" , data)
    if(data.status){
      localStorage.setItem("registerStatus", true);
      window.location.href = "/account-verify-message";
    }
    else{
      localStorage.setItem("registerStatus", false);
      window.location.href = "/account-verify-message";
    }
    // window.location.href = "/account-verify-message";
    // if (data.status === "ok") {
    //   console.log("password change success");
    //   window.location.href = "/Login";
    // }
    // console.log(data.data);
    // window.location.href = "/Login";
  }


  return (
    <React.Fragment>
      <MetaTags>
        <title>GuardLogiX - Signin-Success</title>
      </MetaTags>
      <div className="auth-page">
        <div className="homeDivRegister">
          
      <Container fluid className="p-0">
            <Row>
              <div className=" md-5 text-center mt-4 mb-4">
                <Link to="/dashboard" className="d-block auth-logo">
                  {/* <img src={logo} alt="" height="50" /> */}
                </Link>
              </div>
              </Row>
            <Row className="g-0 main_register_card">
              
            </Row>
            <Row>
              {/* <div className="mt-4 mt-md-3 text-center">
                <p className="text-white mb-0 ">
                  Already have an account {" "}?
                  <Link
                    to="/login"
                    className=" fw-semibold text-white"
                  >
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </p>
              </div> */}
              </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterCheck;
