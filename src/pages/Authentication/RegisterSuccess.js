import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Row, Container, Col, Card } from "reactstrap";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo/whitelogo.svg";
import Banner from "../../components/Common/Banner";
import RegisterSuccesForm from "../../components/authenticate/RegisterSuccessForm";

import success from "../../assets/images/success.png"
import failure from "../../assets/images/failure.png"
const Register = (props) => {
  const [registerStatus, setregisterStatus] = useState(false)
  useEffect(() => {
    const registerStatus = localStorage.getItem("registerStatus")
    // console.log("register", registerStatus)
    if (registerStatus === "true") {
      // console.log("asdbahsvdjiohbvbn")
     setregisterStatus(true)
    }
  }, [])
  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | GuardLogiX </title>
      </MetaTags>


      <div className="auth-page d-flex align-center" style={{ background: "#5156be", padding: "50px 0", minHeight: "100vh" }}>
        <Container fluid className="  justify-content-center">
          <Row className="login_card_row">
            <Col lg={3} md={6} className="d-flex justify-content-center flex-column ">

              <div className="mb-5 mb-md-5 text-center">
                <Link to="" className="d-block auth-logo">
                  <img src={logo} alt="" height="50" />
                </Link>
              </div>

              <Card className="login_card">
                {(() => {
                  if (registerStatus) {
                    return (
                      <div className=" d-flex p-sm-5 p-4 ">


                        <div className="d-flex flex-column w-100">
                          <div className="auth-content my-auto">

                            <div className="mb-4 mb-md-5 text-center">
                              <img src={success} alt="" height="80" />{" "}
                              <span className="logo-txt"></span>
                            </div>
                            <div className="text-center">
                              <h5 className="mb-0">Registration Successfull! </h5>
                              <p className="text-muted mt-2">
                                Login to continue to the GuardLogiX Platform.
                              </p>
                            </div>
                            <div className="mb-3">
                              <button
                                className="btn btn-primary w-100 waves-effect waves-light"
                              // type="submit"
                              >
                                <Link to="/login" className=" btn btn-primary w-100 waves-effect waves-light">
                                  Login
                                </Link>
                              </button>
                            </div>


                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className=" d-flex p-sm-5 p-4 ">


                        <div className="d-flex flex-column w-100">
                          <div className="auth-content my-auto">

                            <div className="mb-4 mb-md-5 text-center">
                              <img src={failure} alt="" height="80" />{" "}
                              <span className="logo-txt"></span>
                            </div>
                            <div className="text-center">
                              <h5 className="mb-0">Registration Failed! </h5>
                              <p className="text-muted mt-2">
                                Please register again to continue to the GuardLogiX Platform.
                              </p>
                            </div>
                            <div className="mb-3">
                              <button
                                className="btn btn-primary w-100 waves-effect waves-light"
                              // type="submit"
                              >
                                <Link to="/register" className=" btn btn-primary w-100 waves-effect waves-light">
                                  Register Again
                                </Link>
                              </button>
                            </div>


                          </div>
                        </div>
                      </div>
                    )
                  }
                })()}
              </Card>

              <div className="mt-4 mt-md-3 text-center">
                <p className="text-white mb-0 ">
                  Don't have an account yet {" "}?
                  <Link
                    to="/register"
                    className=" fw-semibold text-white"
                  >
                    {" "}
                    Register{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
