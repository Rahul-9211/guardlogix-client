import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Row, Container } from "reactstrap";

import { Link } from "react-router-dom";

// import images
import logo from "../../assets/images/logo/whitelogo.svg";
import PasswordChnageSuccessForm from "../../components/authenticate/PasswordChangesSuccessForm";
import Banner from "../../components/Common/Banner";

const ChangePasswordSuccess = (props) => {
  return (
    
    <React.Fragment>
      <MetaTags>
        <title>Register | GuardLogiX </title>
      </MetaTags>

      <div className="auth-page">
        <div className="homeDivRegister">
          <Container fluid className="p-0">
            <Row>
              <div className=" md-5 text-center mt-4 mb-4">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img src={logo} alt="" height="50" />
                </Link>
              </div>
            </Row>
            <Row className="g-0 main_register_card">

              {/* Banner for register  */}
              <Banner />

              {/* Register form  */}
              <PasswordChnageSuccessForm/>

            </Row>
            <Row>
              <div className="mt-4 mt-md-3 text-center">
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
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordSuccess;
