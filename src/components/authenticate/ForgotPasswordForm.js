

import React, { useState } from "react"
import { Row, Col, Alert, Container } from "reactstrap"
// availity-reactstrap-validation
import { withRouter, Link } from "react-router-dom"
import FeatherIcon from "feather-icons-react";
import { AvForm, AvField } from "availity-reactstrap-validation"
import GoToEmailForm from "./GoToEmailForm"
import resetPass from "../../assets/images/resetPass.png"

export default function ForgotPasswordForm() {

    const [email, setEmail] = useState("")
    const [status, setStatus] = useState(false)
    const [sentEmail, setsentEmail] = useState(false)
    const [emailForm, setemailForm] = useState(true)
    const [emailSentSuccess, setemailSentSuccess] = useState(false)
    // spinner 
    const [spinner, setspinner] = useState(false)

    const [resetBtnStatus , setresetBtnStatus] = useState(true)
    //popUp email 
    const [popUpEmail, setpopUpEmail] = useState("");
    //validation 
    async function checkEmail(event) {
        // e.preventDefault()
        console.log(email)
        setspinner(true)
        setemailForm(false)
        setpopUpEmail(email)
        const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}forgotpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        });
        const data = await response.json();
        console.log('data', data)
        if (data.status) {
            console.log("Booooom")
            setTimeout(() => {
                setspinner(false)
                setemailForm(false)
                setemailSentSuccess(true)
            }, 3000);
            // window.location.href = "/gotoemail";
        }
        else {
            // console.log("data nahi gya");
            setStatus(true)
            setspinner(false)
            setemailForm(true)
            setemailSentSuccess(false)
        }
    }


    return (
        <Col lg={6} md={6} className="col-xxl-6 bg-white register-about-form" style={{ minHeight: "70vh" }}>
            <div className="auth-full-page-content d-flex  p-5 pt-2 pb-2">
                <div className="w-100">
                    {(() => {
                        if (emailForm) {
                            return (
                                <div className="d-flex flex-column h-100">
                                    <div className="auth-content my-auto">
                                        <div className=" mb-md-3 text-center">
                                            <img src={resetPass} alt="" height="98" />{" "}
                                            {/* <span className="logo-txt">Minia</span> */}
                                        </div>
                                        <div className="text-center">
                                            <h5 className="mb-0">GuardLogix Account Recovery</h5>
                                            <p className="text-muted mt-2">
                                                Enter the email address associated with your account and we will send you a link to reset your password.</p>
                                        </div>

                                        {(() => {
                                            if (status) {
                                                return (
                                                    <Alert
                                                        color="danger"
                                                        className="alert-label-icon label-arrow"
                                                    >
                                                        <i className="mdi mdi-block-helper label-icon"></i>
                                                        <strong>Error</strong> - Account does'nt exist
                                                    </Alert>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })()}

                                        <AvForm className="custom-form mt-4"
                                            onValidSubmit={checkEmail}
                                        >
                                            <div className="mb-3">
                                                <input
                                                    name="email"
                                                    label="Email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    required
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                        if(email != null){
                                                            setresetBtnStatus(false)}
                                                    }}

                                                />
                                            </div>
                                            <div className="mb-3 mt-4 w-50 text-center" style={{ margin: "auto" }}>
                                                <button className="btn btn-primary w-100 waves-effect waves-light" type="submit" 
                                                    disabled={resetBtnStatus} onSubmit={checkEmail}>Reset Password {" "}
                                                    <FeatherIcon icon="arrow-right" size={18} className="ms-2" /></button>
                                            </div>
                                        </AvForm>

                                        <div className="mt-5 text-center">
                                            <p className="text-muted mb-0">Remember It ?  <a href="login"
                                                className="text-primary fw-semibold"> Login </a> </p>
                                        </div>
                                    </div>



                                    {/* <div className="mt-4 mt-md-5 text-center">
                                        <p className="mb-0">© {new Date().getFullYear()} GuardLogiX   . Crafted with <i className="mdi mdi-heart text-danger"></i> by GuardLogiX </p>
                                    </div> */}
                                </div>
                            )
                        }
                        else if (emailSentSuccess) {
                            return (
                                <GoToEmailForm popUpEmail={popUpEmail} heading="Check Your Email" para="We have emailed you a link to reset your passwordt" />)
                        }
                        else if (spinner) {
                            return (
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div class="loader-spinner">
                                        <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <circle class="load one" cx="60" cy="60" r="20" pathLength="1" />
                                            <circle class="load two" cx="60" cy="60" r="10" />
                                            <circle class="load three" cx="60" cy="60" r="30" pathLength="1" />
                                        </svg>
                                    </div>
                                </div>)
                        }
                    })()}
                </div>
            </div>
        </Col>
    )
}
