import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState } from "react";

//Import Icons
import FeatherIcon from "feather-icons-react";

import { Row, Col, Alert, Container, Card } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
// import logo from "../../assets/images/logo/logoSVG.svg";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
// import logo from "../../assets/images/logo-sm.svg";
import logo from "../../assets/images/logo/whitelogo.svg";

//Import config
import { facebook, google } from "../../config";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const TestLogin = (props) => {
    const dispatch = useDispatch();

    const { error } = useSelector((state) => ({
        error: state.Login.error,
    }));

    // handleValidSubmit
    const handleValidSubmit = (event, values) => {
        dispatch(loginUser(values, props.history));
    };

    const signIn = (res, type) => {
        if (type === "google" && res) {
            const postData = {
                name: res.profileObj.name,
                email: res.profileObj.email,
                token: res.tokenObj.access_token,
                idToken: res.tokenId,
            };
            dispatch(socialLogin(postData, props.history, type));
        } else if (type === "facebook" && res) {
            const postData = {
                name: res.name,
                email: res.email,
                token: res.accessToken,
                idToken: res.tokenId,
            };
            dispatch(socialLogin(postData, props.history, type));
        }
    };

    //handleGoogleLoginResponse
    const googleResponse = (response) => {
        signIn(response, "google");
    };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    const facebookResponse = (response) => {
        signIn(response, "facebook");
    };

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [invalidStatus, setinvalidStatus] = useState(false);

    async function loginUser(event) {
        // event.preventDefault();
        // console.log("email-passs",email,password)
        // console.log(`${process.env.REACT_APP_DEFAULTPATH}`);
        const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        if (data.status === "ok") {
            console.log("data of login", data);
            localStorage.setItem("userID", data.userid);
            localStorage.setItem("orgID", data.orgID);
            // alert("Login successfull ");
            window.location.href = "/dashboard";
        } else {
            setinvalidStatus(true);
            // alert("please Check ur email pass combo ");
            // window.location.href = "/login";
        }
        // console.log("data",data);
        // console.log("name",name);
    }
    return (
        <React.Fragment>
            <MetaTags>
                <title>Login | GuardLogiX</title>
            </MetaTags>


            {/* <Container fluid>
                <div className="pt-sm-3 pb-sm-3 pt-2 pb-2 ps-sm-5 pe-sm-5 ps-4 pe-4 register-header">
                    <Row className="g-0">
                        <Col lg={5} md={6} className="col-xxl-5 col-7 mt-auto mb-auto">
                            <div className="register-logo">
                                <img src={logo} alt="" height="28" />
                            </div>
                        </Col>

                        <Col lg={7} md={6} className="col-xxl-7 col-5">
                            <div className="register-login-btn">
                                <Link to="/register" className="btn-primary">
                                    Register
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container> */}
            {/* background  */}
            <div className="auth-pages">
                <div className="upper_div">
                    <div className="mid_div">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
                            <g fill="#ffffff">
                                <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
                            </g>
                        </svg>

                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                        <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                    </svg> */}
                </div>

                <div className="lower_div"></div>

            </div>
            <div className="auth-page">
                <Container fluid className="  justify-content-center">
                    <Row className="login_card_row">
                        <Col lg={3} md={6} className="d-flex justify-content-center flex-column">

                            <div className="mb-5 mb-md-5 text-center">
                                <Link to="/dashboard" className="d-block auth-logo">
                                    <img src={logo} alt="" height="50" />
                                </Link>
                            </div>
                            <Card className="login_card">

                                <div className=" d-flex p-sm-5 p-4 ">


                                    <div className="d-flex flex-column w-100">
                                        <div className="auth-content my-auto">


                                            <div className="text-center">
                                                <h5 className="mb-0">Welcome Back !</h5>
                                                <p className="text-muted mt-2">
                                                    Sign in to continue to GuardLogiX.
                                                </p>
                                            </div>
                                            {(() => {
                                                if (invalidStatus) {
                                                    return (
                                                        <Alert
                                                            color="danger"
                                                            className="alert-label-icon label-arrow"
                                                        >
                                                            <i className="mdi mdi-block-helper label-icon"></i>
                                                            <strong>Error</strong> - Invalid Email and
                                                            Password
                                                        </Alert>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })()}
                                            <AvForm
                                                className="custom-form mt-4 pt-2"
                                                onValidSubmit={loginUser}
                                            >
                                                {error ? <Alert color="danger">{error}</Alert> : null}
                                                <div className="mb-3">
                                                    <AvField
                                                        name="email"
                                                        label="Email"
                                                        value={email}
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        required
                                                        onChange={(e) => setemail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-grow-1">
                                                            <label className="form-label">Password</label>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="">
                                                                <Link
                                                                    to="/forgot-password"
                                                                    className="text-muted"
                                                                >
                                                                    Forgot password?
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <AvField
                                                            name="password"
                                                            value={password}
                                                            type="password"
                                                            className="form-control"
                                                            required
                                                            placeholder="Enter Password"
                                                            onChange={(e) => setpassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="remember-check"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="remember-check"
                                                            >
                                                                Remember me
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <button
                                                        className="btn btn-primary w-100 waves-effect waves-light"
                                                        type="submit"
                                                    >
                                                        Log In
                                                    </button>
                                                </div>
                                            </AvForm>

                                            {/* <div className="mt-4 text-center">
                                                <h5 className="font-size-14 mb-3">Sign in with</h5>

                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <FacebookLogin
                                                            appId={facebook.APP_ID}
                                                            autoLoad={false}
                                                            callback={facebookResponse}
                                                            render={(renderProps) => (
                                                                <Link
                                                                    to="#"
                                                                    className="social-list-item bg-primary text-white border-primary"
                                                                    onClick={renderProps.onClick}
                                                                >
                                                                    <i className="mdi mdi-facebook" />
                                                                </Link>
                                                            )}
                                                        />
                                                    </li>

                                                    <li className="list-inline-item">
                                                        <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={(renderProps) => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => {}}
                            />
                                                    </li>
                                                </ul>
                                            </div> */}

                                            <div className="mt-5 text-center">
                                                <p className="text-muted mb-0">
                                                    Don't have an account ?{" "}
                                                    <Link
                                                        to="/register"
                                                        className="text-primary fw-semibold"
                                                    >
                                                        {" "}
                                                        Signup now{" "}
                                                    </Link>{" "}
                                                </p>
                                            </div>
                                            {/* 
                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className="text-primary fw-semibold"
                          >
                            {" "}
                            Login{" "}
                          </Link>{" "}
                        </p>
                      </div> */}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <div className="mt-4 mt-md-3 text-center">
                                <p className="mb-0">
                                    © {new Date().getFullYear()} GuardLogiX . Crafted with{" "}
                                    <i className="mdi mdi-heart text-danger"></i> by
                                    GuardLogiX
                                </p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(TestLogin);

TestLogin.propTypes = {
    history: PropTypes.object,
};
