
import React, { useEffect, useState } from "react";
import { Col, Alert } from "reactstrap";


import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation";
import success from "../../assets/images/success.png"
// import images
import logo from "../../assets/images/logo/logoSVG.svg";
import PasswordChnageSuccessForm from "./PasswordChangesSuccessForm";
import PasswordChangeFailureForm from "./PasswordChangeFailure";

export default function CreateNewPassForm() {

    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [createNewPassForm, setcreateNewPassForm] = useState(true)
    const [passwordChangeSuccess, setpasswordChangeSuccess] = useState(false)
    const [passwordChangeFailure, setpasswordChangeFailure] = useState(false)

    const [newPassError , setnewPassError] =  useState("")
    const [ConfirmPasswordDisableStatus , SetConfirmPasswordDisableStatus] = useState(true)

    const userID = localStorage.getItem("userID");
    // console.log(userID)

    //validation
    //   console.log("data", window.location.href);
    // const token = window.location.href.split("account-password-reset/")[1];
    // console.log(token);
    async function setNewPassword(event) {
        if(password === ConfirmPassword){
            
        // e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}setnewpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                password
            }),
        });
        const data = await response.json();
        // console.log("pdata", data);

        if (data.status) {
            localStorage.clear()
            // console.log("password change success", data);
            setcreateNewPassForm(false)
            setpasswordChangeSuccess(true)
            setpasswordChangeFailure(false)
            setStatus(true);
            localStorage.clear()
            // window.location.href = "/login";
        }
        else {
            localStorage.clear()
            setStatus(false);
            setcreateNewPassForm(false)
            setpasswordChangeSuccess(false)
            setpasswordChangeFailure(true)
        }
        // console.log(data.data);
        }
        else{
            setStatus(true)
        }
    }
    
    var passValidation =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
// between 7 to 15 characters which contain at least one numeric digit and a special character
    const checkNewPass = (value) =>{
        if(passValidation.test(value)){
            setnewPassError("")
        }
        else if(value.length < 7){
            setnewPassError(`Length should be > 7    `)
            SetConfirmPasswordDisableStatus(true)
        }
        if(value.length >= 7){
            SetConfirmPasswordDisableStatus(false)
        }
        else{
            setnewPassError(`Invalid credentials Must Contain "A-Z , @ ,1-9" `)
        }
    }


    return (<>
        {(() => {
            if (createNewPassForm) {
                return (
                    <div className="d-flex flex-column h-100 p-5">
                        <div className="mb-4 mb-md-5 text-center">
                            <Link to="/dashboard" className="d-block auth-logo">
                                {/* <img src={logo} alt="" height="28" />{" "} */}
                                {/* <span className="logo-txt">Minia</span> */}
                            </Link>
                        </div>

                        <div className="auth-content my-auto">
                            <div className="text-center">
                                <h5 className="mb-0">Create New Password</h5>
                                <p className="text-muted mt-2">Create New Password with GuardLogiX.</p>
                            </div>

                            {(() => {
                                if (status) {
                                    return (
                                        <Alert
                                            color="danger"
                                            className="alert-label-icon label-arrow"
                                        >
                                            <i className="mdi mdi-block-helper label-icon"></i>
                                            <strong>Error</strong> - Confirm Password did'nt matched
                                        </Alert>
                                    );
                                } else {
                                    return null;
                                }
                            })()}


                            <AvForm
                                className="custom-form mt-4"
                                onValidSubmit={setNewPassword}
                            >
                                <div className="mb-3">
                                    <input
                                        name="password"
                                        label="Password"
                                        value={password}
                                        className="form-control"
                                        placeholder="Enter New Password"
                                        type="password"
                                        required
                                        onChange={(e) => {
                                            checkNewPass(e.target.value)
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    <small className="text-danger">{newPassError}</small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        name="password"
                                        label="Password"
                                        className="form-control"
                                        value={ConfirmPassword}
                                        placeholder="Enter confirm Password"
                                        disabled={ConfirmPasswordDisableStatus}
                                        type="password"
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 mt-4">
                                    <button
                                        className="btn btn-primary w-100 waves-effect waves-light"
                                        type="submit"
                                    >
                                        Reset Password
                                    </button>
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
            } else if (passwordChangeSuccess) {
                return (
                    <PasswordChnageSuccessForm />
                )
            } else if (passwordChangeFailure) {
                return (
                    <PasswordChangeFailureForm />
                )
            }
        })()}

    </>
    )
}