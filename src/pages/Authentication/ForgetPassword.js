import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState } from "react"
import { Row, Col, Alert, Container } from "reactstrap"


import { withRouter, Link } from "react-router-dom"

//Import Icons
import FeatherIcon from "feather-icons-react";


// import images
import logo from "../../assets/images/logo/whitelogo.svg"
import ForgotPasswordForm from "../../components/authenticate/ForgotPasswordForm"
import Banner from "../../components/Common/Banner"

const ForgetPasswordPage = props => {



  return (
    <React.Fragment>
      <MetaTags>
        <title>Forgot Password -GuardLogiX</title>
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

              {/* <CarouselPage /> */}


              <Banner />

              <ForgotPasswordForm />


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
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
