import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Row, Col, Alert, Container  , Card} from "reactstrap";

// availity-reactstrap-validation

// action
import { registerUser, apiError } from "../../store/actions";

//Import Icons
import FeatherIcon from "feather-icons-react";
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
// import logo from "../../assets/images/logo-sm.svg";
import logo from "../../assets/images/logo/whitelogo.svg";
import TokenError from "../../components/authenticate/TokenError";
import CreateNewPassForm from "../../components/authenticate/CreateNewPassForm";

const CheckForgotPassToken = (props) => {
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

    const [tokenError , setTokenError] = useState(false)
    const [createNewPassword , setcreateNewPassword] = useState(false)

    //   const taskName = "DNSRecords";
    const token = window.location.href.split("account-password-reset/")[1];
    // console.log(token);
    async function setStatus(event) {
        // e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}check-forgot-password-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        });
        const data = await response.json();
        // console.log("data", data)
        if (data.status) {
            setcreateNewPassword(true)
            // localStorage.setItem("passToken", true);
            localStorage.setItem("userID", data.userID);
            // window.location.href = "/create-new-password";
        }
        else {
            // localStorage.setItem("passToken", false);
            setTokenError(true)
            // window.location.href = "/create-new-password";
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
                                {(()=>{
                                    if(tokenError){
                                        return(
                                            <TokenError heading="Token Expired" para="Please resend an email to continue with your account"/>
                                        )
                                    }
                                    if(createNewPassword){
                                        return(
                                            <CreateNewPassForm/>
                                        )
                                    }
                                })()}

                                {/* <CreateNewPassForm/> */}
                            </Card>

                            {/* <div className="mt-4 mt-md-3 text-center">
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
                            </div> */}
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CheckForgotPassToken;
