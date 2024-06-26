import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";

//Import Icons
import FeatherIcon from "feather-icons-react";

import { Row, Col, Alert, Container, Card } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";

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
import { set } from "lodash";

const Login = (props) => {
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

    const [loginBtnStatus , setloginBtnStatus] = useState(true)

    let history = useHistory();
    function handleClick() {
        history.push("/login");
    }

    const token = localStorage.getItem("token");
    useEffect(() => {
    }, [])
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
            localStorage.setItem("token", data.token);
            localStorage.setItem("userID", data.userID);
            localStorage.setItem("orgID", data.orgID);
            localStorage.setItem("authUser", false)
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

                                <div className=" d-flex p-sm-5 p-4 ">


                                    <div className="d-flex flex-column w-100">
                                        <div className="auth-content my-auto">


                                            <div className="text-center">
                                                <h5 className="mb-0">Welcome </h5>
                                                <p className="text-muted mt-2">
                                                    Login to continue to the GuardLogiX Platform.
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
                                                            {/* <div className="">
                                                                <Link
                                                                    to="/forgot-password"
                                                                    className="text-muted"
                                                                >
                                                                    Forgot password?
                                                                </Link>
                                                            </div> */}
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
                                                            onChange={(e) => {
                                                                if(email != " " && password != " "){
                                                                    setloginBtnStatus(false)
                                                                }
                                                                setpassword(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="text-primary" style={{}}>
                                                        <Link
                                                            to="/forgot-password"
                                                            className="text-primary"
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <button
                                                        className="btn btn-primary w-100 waves-effect waves-light"
                                                        type="submit"
                                                        disabled={loginBtnStatus}
                                                    >
                                                        Login
                                                        <FeatherIcon icon="arrow-right" size={18} className="ms-2" />
                                                    </button>
                                                </div>
                                            </AvForm>


                                        </div>
                                    </div>
                                </div>
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

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
};
