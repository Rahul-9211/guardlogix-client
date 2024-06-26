// DUMP_FILE 

import React from "react";
import MetaTags from "react-meta-tags";
import { Row, Container } from "reactstrap";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo/whitelogo.svg";
import GoToEmailForm from "../../components/authenticate/GoToEmailForm";
import Banner from "../../components/Common/Banner";

const RegisterSucces = (props) => {
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
                  <img src={logo} alt="" height="50" />
                </Link>
              </div>
              </Row>
            <Row className="g-0 main_register_card">


              {/* Banner  */}
              <Banner/>
              
              {/* gotoEmail form  */}
              <GoToEmailForm/>
              
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

export default RegisterSucces;
