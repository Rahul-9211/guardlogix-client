
import React, { useState } from "react";
import { Col, Input, Spinner } from "reactstrap";

// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation";

import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import RegisterSuccesForm from "./RegisterSuccessForm";
import GoToEmailForm from "./GoToEmailForm";
import RegisterFailureForm from "./RegisterFailureForm";

export default function RegisterInputForm() {

    // values for used to check validation
    var _valueFname = "";
    var _valueLname = "";
    var _valueEmail = "";
    var _valuePhone = "";
    var _valuePasswords = "";
    var _valueOrg = "";
    var _valueJobTitle = "";

    // values stored of form
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [jobTitle, setjobTitle] = useState("");
    const [organization, setorganization] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");

    // states to show form status 
    const [registerForm, setRegisterForm] = useState(true);
    const [registerSuccessForm, setregisterSuccessForm] = useState(false)
    const [registerFailForm, setregisterFailForm] = useState(false)

    // spinner 
    const [spinner, setspinner] = useState(false)

    //popUp email 
    const [popUpEmail, setpopUpEmail] = useState("");

    // values stored of form
    const [fnameStatusBtn, setfnameStatusBtn] = useState(false);
    const [lnameStatusBtn, setlnameStatusBtn] = useState(false);
    const [jobTitleStatusBtn, setjobTitleStatusBtn] = useState(false);
    const [organizationStatusBtn, setorganizationStatusBtn] = useState(false);
    const [emailStatusBtn, setemailStatusBtn] = useState(false);
    const [passwordStatusBtn, setpasswordStatusBtn] = useState(false);
    const [phoneStatusBtn, setphoneStatusBtn] = useState(false);
    const [registerBtnStatus, setregisterBtnStatus] = useState(true);

    // validation state error 
    const [fnameError, setfnameError] = useState("");
    const [lnameError, setlnameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [passError, setpassError] = useState("");
    const [OrgError, setOrgError] = useState("");
    const [jobTiteError, setjobTiteError] = useState("");

    // validation state 
    const [validation, setValidation] = useState({
        fnm: null,
        lnm: null,
        email: null,
        phone: null,
        job: null,
        org: null,
        pass: null,
    });
    const checkBtnStatus = (checkBoxStatus) => {
        if (checkBoxStatus === 'on') {
            if (
                fnameStatusBtn === true &&
                lnameStatusBtn === true &&
                emailStatusBtn === true &&
                phoneStatusBtn === true &&
                organizationStatusBtn === true &&
                jobTitleStatusBtn === true &&
                passwordStatusBtn === true
            ) {
                setregisterBtnStatus(!registerBtnStatus)
            }
        }
    }
    //   function handleSubmit(e) {
    //     e.preventDefault();
    //     const modifiedV = { ...validation };
    //     var fnm = document.getElementById("validationTooltip01").value;
    //     var lnm = document.getElementById("validationTooltip02").value;
    //     var email = document.getElementById("validationTooltipUsername").value;
    //     var phone = document.getElementById("validationTooltip03").value;
    //     var org = document.getElementById("validationTooltip04").value;
    //     var pass = document.getElementById("validationTooltip04").value;

    //     if (fnm === "") {
    //       modifiedV["fnm"] = false;
    //     } else {
    //       modifiedV["fnm"] = true;
    //     }

    //     if (lnm === "") {
    //       modifiedV["lnm"] = false;
    //     } else {
    //       modifiedV["lnm"] = true;
    //     }

    //     if (email === "") {
    //       modifiedV["email"] = false;
    //     } else {
    //       modifiedV["email"] = true;
    //     }

    //     if (phone === "") {
    //       modifiedV["phone"] = false;
    //     } else {
    //       modifiedV["phone"] = true;
    //     }

    //     if (org === "") {
    //       modifiedV["org"] = false;
    //     } else {
    //       modifiedV["org"] = true;
    //     }

    //     if (pass === "") {
    //       modifiedV["pass"] = false;
    //     } else {
    //       modifiedV["pass"] = true;
    //     }
    //     setValidation(modifiedV);
    //   }

    // individual check functions ----------------->>>

    const checkFirstName = (fieldName, value) => {
        setfname(value);
        _valueFname = value;
        // console.log("testName" , testName);
        const funName = "firstName";
        checkValidation(fieldName, funName);
    };

    const checkLastName = (fieldName, value) => {
        setlname(value);
        _valueLname = value;
        // console.log("testName" , testName);
        const funName = "lastName";
        checkValidation(fieldName, funName);
    };

    const checkEmail = (fieldName, value) => {
        setemail(value);
        _valueEmail = value;
        // console.log("testName" , testName);
        const funName = "email";
        checkValidation(fieldName, funName);
    };

    const checkPhone = (fieldName, value) => {
        setphone(value);
        _valuePhone = value;
        // console.log("testName" , testName);
        const funName = "phone";
        checkValidation(fieldName, funName);
    };

    const checkPassword = (fieldName, value) => {
        setpassword(value);
        _valuePasswords = value;
        // console.log("testName" , testName);
        const funName = "password";
        checkValidation(fieldName, funName);
    };

    const checkOrg = (fieldName, value) => {
        setorganization(value);
        _valueOrg = value;
        // console.log("testName" , testName);
        const funName = "organization";
        checkValidation(fieldName, funName);
    };
    const checkJobTitle = (fieldName, value) => {
        setjobTitle(value);
        _valueJobTitle = value;
        // console.log("testName" , testName);
        const funName = "jobTitle";
        checkValidation(fieldName, funName);
    };

    //for change tooltip display propery
    const onChangeValidationFname = (fieldName, value) => {
        checkFirstName(fieldName, value);
    };
    const onChangeValidationLname = (fieldName, value) => {
        checkLastName(fieldName, value);
    };
    const onChangeValidationEmail = (fieldName, value) => {
        checkEmail(fieldName, value);
    };
    const onChangeValidationPhone = (fieldName, value) => {
        checkPhone(fieldName, value);
    };
    const onChangeValidationOrg = (fieldName, value) => {
        checkOrg(fieldName, value);
    };
    const onChangeValidationJob = (fieldName, value) => {
        checkJobTitle(fieldName, value);
    };
    const onChangeValidationPassword = (fieldName, value) => {
        checkPassword(fieldName, value);
    };

    // validation functions
    var checkValidation = (fieldName, funName) => {
        var name = /^[A-Za-z ]{3,20}$/;
        var organization = /^[A-Za-z0-9.\- ]{3,100}$/;
        var jobTitle = /^[A-Za-z0-9.\- ]{2,50}$/;
        var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
        var phoneValidation = /^\d{8,12}$/;
        var passValidation =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        // between 7 to 15 characters which contain at least one numeric digit and a special character

        const modifiedV = { ...validation };

        // Name validation
        if (funName === "firstName") {
            if (name.test(_valueFname)) {
                setfnameError("");
                setfnameStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (fname === "") {
                setfnameError("Enter First Name");
                setfnameStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            } else {
                setfnameError("Only Charaters Allowed");
                setfnameStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }

        if (funName === "lastName") {
            if (name.test(_valueLname)) {
                setlnameError("");
                setlnameStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (lname === "") {
                setlnameError("Enter Last Name");
                setlnameStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            } else {
                setlnameError("Only Charaters Allowed");
                setlnameStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }
        // Name Validation

        // Email validation
        if (funName === "email") {
            if (emailValidation.test(_valueEmail)) {
                setemailError("");
                setemailStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (email === "") {
                setemailError("Enter Email ");
                setemailStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            } else {
                setemailError("Invalid Email");
                setemailStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }
        // Email validation

        // phone validation
        if (funName === "phone") {
            if (phoneValidation.test(_valuePhone)) {
                setphoneError("");
                setphoneStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (phone === "") {
                setphoneError("Enter Phone ");
                setphoneStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            } else {
                setphoneError("Invalid Phone Details");
                setphoneStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }
        // phone validation

        // pass validation
        if (funName === "password") {
            if (passValidation.test(_valuePasswords)) {
                setpassError("");
                setpasswordStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (password === "") {
                setpassError("Enter Password ");
                setpasswordStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            } else {
                setpassError("Invalid Pass");
                setpasswordStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }
        // pass validation

        // organization validation
        if (funName === "organization") {
            if (organization.test(_valueOrg)) {
                setOrgError("");
                setorganizationStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (organization === "") {
                setOrgError("Enter Valid Details ");
                setorganizationStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            } else {
                setOrgError("Invalid Details");
                setorganizationStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }

        // job  validation
        if (funName === "jobTitle") {
            if (jobTitle.test(_valueJobTitle)) {
                setjobTiteError("");
                setjobTitleStatusBtn(true);
                modifiedV[fieldName] = true;
                setValidation(modifiedV);
            } else if (jobTitle === "") {
                setjobTitleStatusBtn(false);
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
                setjobTiteError("Enter Valid Details ");
            } else {
                setjobTitleStatusBtn(false);
                setjobTiteError("Invalid Details");
                modifiedV[fieldName] = false;
                setValidation(modifiedV);
            }
        }

        // if (
        //   fnameError === "" &&
        //   lnameError === "" &&
        //   emailError === "" &&
        //   phoneError === "" &&
        //   passError === ""
        // ) {
        //   // console.log("me")
        //   return true;
        // }
    };

    async function registerUser(event) {
        // console.log("check --");

        if (
            fnameStatusBtn === true &&
            lnameStatusBtn === true &&
            emailStatusBtn === true &&
            phoneStatusBtn === true &&
            organizationStatusBtn === true &&
            jobTitleStatusBtn === true &&
            passwordStatusBtn === true
        ) {
            setspinner(true)
            setRegisterForm(false);
            // event.preventDefault();
            //   console.log("check -- 2 ");
            const response = await fetch(
                `${process.env.REACT_APP_DEFAULTPATH}register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fname: fname.charAt(0).toUpperCase() + fname.slice(1),
                        lname: lname.charAt(0).toUpperCase() + lname.slice(1),
                        jobTitle,
                        organization,
                        phone,
                        email,
                        password,
                    }),
                }
            );
            const data = await response.json();
            if (data.status) {
                setpopUpEmail(data.email)
                setTimeout(() => {
                    setregisterSuccessForm(true);
                    setregisterFailForm(false);
                    setRegisterForm(false);
                    setspinner(false)
                }, 3000);
                // localStorage.setItem("userID", data.userID);
                // console.log("status okss22");
                // window.location.href = "/gotoemail";
            }
            else {
                setemailError("Email already exist")
                setRegisterForm(true);
                // setTimeout(() => {
                //     setregisterSuccessForm(false);
                //     setregisterFailForm(true);
                //     setRegisterForm(false);
                //     setspinner(false)
                // }, 3000);
            }

            // const taskList = await fetch(`${process.env.REACT_APP_DEFAULTPATH}taskCreate`, {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     fname,
            //     lname,
            //     jobTitle,
            //     organization,
            //     phone,
            //     email,
            //     password,
            //   }),
            // });
            // const data = await response.json();
            // console.log("name",name);
            // .then((response) => {
            //     //   const data = response.json();
            //     //   console.log(
            //     //     data.then((result) => {
            //     //       if (result.status === "ok") {
            //     //         window.location.href = "/register-success";
            //     //       } else {
            //     //         // alert("Already Registered Email")
            //     //       }
            //     //     })
            //     //   );
            //     // })
            //     // .catch((error) => null); // Handle the error response object
        }
    }




    return (
        <Col lg={6} md={6} className="col-xxl-6 bg-white register-about-form" style={{ minHeight: "70vh" }}>
            <div className="auth-full-page-content d-flex  p-5 pt-2 pb-2">
                <div className="w-100">
                    {(() => {
                        if (registerForm) {
                            return (
                                <div className="d-flex flex-column h-100">
                                    <div className="mb-4 mb-md-5 text-center">
                                        <Link to="/dashboard" className="d-block auth-logo">
                                            {/* <img src={logo} alt="" height="28" />{" "} */}
                                            {/* <span className="logo-txt">Minia</span> */}
                                        </Link>
                                    </div>
                                    <div className="auth-content my-auto">
                                        <div className="text-center">
                                            <h5 className="mb-0">Create Account</h5>
                                            <p className="text-muted mt-2">
                                                Begin Monitoring Your Organization External Threats and Risks Today!
                                            </p>
                                        </div>
                                        <AvForm
                                            className="needs-validation custom-form mt-4 pt-2"
                                            onValidSubmit={registerUser}
                                        >

                                            <div className="name">
                                                <div className="mb-3 firstName">
                                                    <label htmlFor="fname">First Name</label>
                                                    <Input
                                                        name="firstName"
                                                        className="form-control"
                                                        placeholder="Enter First Name"
                                                        type="name"
                                                        required
                                                        value={fname}

                                                        id="validationTooltip01"
                                                        onChange={(event) => {
                                                            onChangeValidationFname("fnm", event.target.value);
                                                        }}
                                                        valid={validation["fnm"] === true}
                                                        invalid={
                                                            validation["fnm"] !== true &&
                                                            validation["fnm"] !== null
                                                        }
                                                    />
                                                    <span className="validate-span">{fnameError}</span>
                                                </div>
                                                <div className="mb-3 lastName">
                                                    <label htmlFor="lname">Last Name</label>
                                                    <Input
                                                        name="lastName"
                                                        className="form-control"
                                                        placeholder="Enter Last Name"
                                                        type="name"
                                                        required
                                                        value={lname}
                                                        id="validationTooltip01"
                                                        onChange={(event) => {
                                                            onChangeValidationLname("lnm", event.target.value);
                                                        }}
                                                        valid={validation["lnm"] === true}
                                                        invalid={
                                                            validation["lnm"] !== true &&
                                                            validation["lnm"] !== null
                                                        }
                                                    />
                                                    <span className="validate-span">{lnameError}</span>
                                                </div>
                                            </div>
                                            <div className="contact">
                                                <div className="mb-3 contactEmail">
                                                    <label htmlFor="email">Email</label>
                                                    <Input
                                                        name="email"
                                                        label="Email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        value={email}
                                                        required

                                                        id="validationTooltip01"
                                                        onChange={(event) => {
                                                            onChangeValidationEmail("email", event.target.value);
                                                        }}
                                                        valid={validation["email"] === true}
                                                        invalid={
                                                            validation["email"] !== true &&
                                                            validation["email"] !== null
                                                        }
                                                    />
                                                    <span className="validate-span">{emailError}</span>
                                                </div>
                                                <div className="mb-3 contactPhone">
                                                    <label htmlFor="mobile">Mobile</label>
                                                    <Input
                                                        name="mobile"
                                                        label="mobile"
                                                        className="form-control"
                                                        placeholder="Enter mobile"
                                                        type="phone"
                                                        value={phone}
                                                        required

                                                        id="validationTooltip01"
                                                        onChange={(event) => {
                                                            onChangeValidationPhone("phone", event.target.value);
                                                        }}
                                                        valid={validation["phone"] === true}
                                                        invalid={
                                                            validation["phone"] !== true &&
                                                            validation["phone"] !== null
                                                        }
                                                    />
                                                    <span className="validate-span">{phoneError}</span>
                                                </div>
                                            </div>
                                            <div className="mb-3 jobName">
                                                <label htmlFor="jobTitle">Job Title</label>
                                                <Input
                                                    name="jobTitle"
                                                    label="jobTitle"
                                                    className="form-control"
                                                    type="name"
                                                    value={jobTitle}
                                                    required
                                                    placeholder="Enter Job Title : Software Developer , CTO ...."

                                                    id="validationTooltip01"
                                                    onChange={(event) => {
                                                        onChangeValidationJob("job", event.target.value);
                                                    }}
                                                    valid={validation["job"] === true}
                                                    invalid={
                                                        validation["job"] !== true &&
                                                        validation["job"] !== null
                                                    }
                                                />
                                                <span className="validate-span">{jobTiteError}</span>
                                            </div>
                                            <div className="mb-3 orgName">
                                                <label htmlFor="organization">
                                                    Organization Name
                                                </label>
                                                <Input
                                                    name="organization"
                                                    label="organization"
                                                    className="form-control"
                                                    type="name"
                                                    value={organization}
                                                    required
                                                    placeholder="Enter Organization "

                                                    id="validationTooltip01"
                                                    onChange={(event) => {
                                                        onChangeValidationOrg("org", event.target.value);
                                                    }}
                                                    valid={validation["org"] === true}
                                                    invalid={
                                                        validation["org"] !== true &&
                                                        validation["org"] !== null
                                                    }
                                                />
                                                <span className="validate-span">{OrgError}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pass">Password</label>
                                                <Input
                                                    name="password"
                                                    label="Password"
                                                    className="form-control"
                                                    type="password"
                                                    required
                                                    placeholder="Enter Password"
                                                    id="validationTooltip01"
                                                    onChange={(event) => {
                                                        onChangeValidationPassword("pass", event.target.value);
                                                    }}
                                                    valid={validation["pass"] === true}
                                                    invalid={
                                                        validation["pass"] !== true &&
                                                        validation["pass"] !== null
                                                    }
                                                />
                                                <span className="validate-span">{passError}</span>
                                            </div>
                                            <div className="mb-4">
                                                <Input
                                                    id="check"
                                                    name="check"
                                                    label="check"
                                                    type="checkbox"
                                                    onChange={(event) => {
                                                        checkBtnStatus(event.target.value);
                                                    }}
                                                    required
                                                    placeholder="Enter Password"
                                                />
                                                <label htmlFor="check">
                                                    <p className="mb-0">
                                                        I confirm that I have read and that I agree to the {" "}
                                                        <Link to="#" className="text-primary">
                                                            Terms of Service.
                                                        </Link>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="mb-3 w-100 text-end">
                                                <button
                                                    className="btn btn-primary w-50 waves-effect waves-light "
                                                    type="submit"
                                                    disabled={registerBtnStatus}
                                                >
                                                    Create Account
                                                    <FeatherIcon icon="arrow-right" size={18} className="ms-2" />
                                                </button>
                                            </div>
                                        </AvForm>
                                    </div>
                                </div>
                            )
                        } else if (registerSuccessForm) {
                            return (
                                <GoToEmailForm popUpEmail={popUpEmail} heading="Check Your Email" para="Please check your email and click the link to confirm your account"/>
                            )
                        } else if (registerFailForm) {
                            return (
                                <RegisterFailureForm popUpEmail={popUpEmail} />
                            )
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
        </Col>)
}
