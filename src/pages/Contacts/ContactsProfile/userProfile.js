import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  CardHeader,
  DropdownToggle,
  Nav,
  UncontrolledAlert,
  NavItem,
  NavLink,
  Row,
  CardFooter,
  TabContent,
  Modal,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";

import MetaTags from "react-meta-tags";
import { Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
// import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { AiOutlinePlus } from "react-icons/ai";

// import images
// import logo from "../../assets/images/logo-sm.svg";
// import logo from "../../assets/images/logo/logo-2.png";
// import CarouselPage from "../AuthenticationInner/CarouselPage";

//import images
import avatar from "../../../assets/images/users/avatar-2.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";

import classnames from "classnames";
import ProfileTab1 from "./ProfileTab1";
import ProfileTab2 from "./Profiletab2";
import ProfileTab3 from "./Profiletab3";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import swal from 'sweetalert';

const UserProfile = () => {
  // console.log("token", localStorage.getItem("userID"));
  const userCheck = localStorage.getItem("userID");

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [detailBtn, setdetailBtn] = useState(true);
  const [detailPassBtn, setdetailPassBtn] = useState(true);
  const [Temp, setTemp] = useState("");

  const [currentPass, setcurrentPass] = useState("");
  const [NewPass, setNewPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");

  const [pass, setpass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [passStatus, setpassStatus] = useState("");
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  const ordID = localStorage.getItem("orgID");

  // validation state
  const [fnameError, setfnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [jobTiteError, setjobTiteError] = useState("");
  const [currentPassError, setcurrentPassError] = useState("");
  const [newPassError, setnewPassError] = useState("");
  const [confirmPassError, setconfirmPassError] = useState("");

  const [modal_standard4, setmodal_standard4] = useState(false); // View More button Modal of ExposedCredentials

  const [modal_standard3, setmodal_standard3] = useState(false);
  const [activeTab, toggleTab] = useState("1");


  var name_regx = /^[A-Za-z ]{3,20}$/;
  var phone_regx = /^\d{9,20}$/;

  var password_regx =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  // between 7 to 15 characters which contain at least one numeric digit and a special character


  useEffect(async () => {
    getUser();
  }, [])

  function tog_standard4() {
    setmodal_standard4(!modal_standard4);
    // toggle for view more button 
  }
  function tog_standard3() {
    setmodal_standard3(!modal_standard3);
    // toggle for view more button 
  }
  async function getUser(event) {
    // event.preventDefault();
    // console.log("token passes " , userCheck)
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}user-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCheck,
      }),
    });
    const data = await response.json();
    if (data) {
      const newdata = data.user;
      // console.log("data retrived")
      setfname(newdata.FirstName);
      setlname(newdata.LastName);
      setemail(newdata.Email);
      setphone(newdata.Phone);
      setjobTitle(newdata.JobTitle);
      // console.log("main profile", newdata.FirstName);
    } else {
      alert("data retreival error");
    }
  }

  async function changePassword(event) {
    // event.preventDefault();
    // console.log("email-passs",email,password)
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}user-profile/change-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCheck,
        pass,
        newPass,
        confirmPass,
      }),
    });
    const data = await response.json();
    if (data) {
      // console.log("main profile", data);
    } else {
      alert("password change error");
    }
  }

  async function updatePersonalDetails() {
    // console.log("this is me", fname, lname, phone, jobTitle)
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}user-profile/updatepersonaldetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        fname: fname.charAt(0).toUpperCase() + fname.slice(1),
        lname: lname.charAt(0).toUpperCase() + lname.slice(1),
        phone,
        jobTitle,
      }),
    })
    const data = await response.json()
    if (data.status) {
      return true
    }else{
      return false
    }
  }

  async function updatePass() {
    // console.log("this is me", pass, newPass , confirmPass)
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}user-profile/updatepass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        pass,
        newPass,
        confirmPass
      }),
    })
    const data = await response.json()
    if (data.status) {
      return data
    }
    else {
      return data
    }
  }

  // Swwet alert or modal to confirm detials  should modify for perosnal Details 
  function updatePersonalDetails_sweetAlert(){
    swal({
      title: "Are you sure?",
      text: "Once done, you will update your personal details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        if(updatePersonalDetails()){
          swal("Poof! Your perosnal details has been updated!", {
            icon: "success",
            buttons:true
          }).then((reload) => {
            if(reload){
              window.location.reload(false);
            }
        
          })
        }
        else{
          
        swal("Reload operation has been aborted!");
        }
      } else {
        swal("Operation has been aborted!");
      }
    });
  }
  
  // Swwet alert or modal to confirm detials  should modify for change Oassword 
  function updateChangePassword_sweetAlert(){
    swal({
      title: "Are you sure?",
      text: "Once done, you will update your passoword to new password!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const response = await updatePass();
        if(response.status){
          swal("Poof! Your password has been updated successfully!", {
            icon: "success",
            buttons:true
          }).then((reload) => {
            if(reload){
              window.location.reload(false);
            }
        
          })
        }
        else{
        swal(`${response.message}`);
        }
      } else {
        swal("Operation has been aborted!");
      }
    });
  }



  // functions to validate regex firstName
  function checkFnameValidation(fname_val) {
    if (fname_val === " ") {
      setfnameError("enter first name")
      setdetailBtn(true)
    }
    else if (name_regx.test(fname_val)) {
      setfnameError("")
      setdetailBtn(false)
    }
    else if (fname_val.length < 3) {
      setfnameError("name must contain 3 characters")
      setdetailBtn(true)
    }
    else {
      setfnameError(`name doesn't contain "0-9  , & @ "`)
      setdetailBtn(true)
    }
  }

  // functions to validate regex LastName
  function checklnameValidation(lname_val) {
    if (lname_val === " ") {
      setlnameError("enter first name")
      setdetailBtn(true)
    }
    else if (name_regx.test(lname_val)) {
      setlnameError("")
      setdetailBtn(false)
    }
    else if (lname_val.length < 3) {
      setlnameError("name must contain 3 characters")
      setdetailBtn(true)
    }
    else {
      setlnameError(`name doesn't contain "0-9  , & @ "`)
      setdetailBtn(true)
    }
  }

  // functions to validate regex Phone
  function checkphoneValidation(phone_val) {
    // console.log("phone val", phone_val)
    if (phone_val === " ") {
      setphoneError("enter first name")
      setdetailBtn(true)
    }
    else if (phone_regx.test(phone_val)) {
      setphoneError("")
      setdetailBtn(false)
    }
    else if(phone_val.length < 9){
      setphoneError("minimum length 8 digit")
      setdetailBtn(true)
    }
    else {
      setphoneError("Invalid credentials - doesn't contain 'a-z , A-Z , @'")
      setdetailBtn(true)
    }
  }

  // functions to validate regex Jobtitle
  function checkjobTitleValidation(jobTitle_val) {
    if (jobTitle_val === " ") {
      setjobTiteError("enter first name")
      setdetailBtn(true)
    }
    else if (name_regx.test(jobTitle_val)) {
      setjobTiteError("")
      setdetailBtn(false)
    }
    else if (jobTitle_val.length < 3) {
      setjobTiteError(" must contain 3 characters")
      setdetailBtn(true)
    }
    else {
      setjobTiteError(`job title doesn't contain "0-9  , & @ "`)
      setdetailBtn(true)
    }
  }

  // functions to validate regex CurrentPass
  function checkCurrentPass(Current_Pass) {
    if (Current_Pass === " ") {
      setcurrentPassError("Password cannot be empty")
      setdetailPassBtn(true)
    }
    else if (Current_Pass === newPass) {
      if (newPass != "") {
        setnewPassError("Current and New password cannot be same")
        setdetailPassBtn(false)
      }
    }
    else if (password_regx.test(Current_Pass)) {
      setcurrentPassError("")
      setdetailPassBtn(false)
    }
    else {
      setcurrentPassError(`Invalid credentials Must Contain "A-Z , @  ,1-9"`)
      setdetailPassBtn(true)
    }
  }
  
  // functions to validate regex new PAssword
  function checknewPass(new_Pass) {
    if (new_Pass === pass) {
      if (pass != "") {

        setnewPassError("Current and New password cannot be same")
        setdetailPassBtn(false)
      }
    }
    else if (new_Pass === " ") {
      setnewPassError("Password cannot be empty")
      setdetailPassBtn(true)
    }
    else if (password_regx.test(new_Pass)) {
      if (new_Pass === confirmPass) {
        setnewPassError("")
        setdetailPassBtn(false)
      }
      else {
        setnewPassError("new password doesnt match to confirm password")
        setdetailPassBtn(true)
      }
    }
    else {
      setnewPassError(`Invalid credentials Must Contain "A-Z , @  ,1-9"`)
      setdetailPassBtn(true)
    }
  }

  // functions to validate regex CofirnNew Password
  function checkconfirmPass(confirm_new_Pass) {
    // console.log("confirm_new_Pass", confirm_new_Pass)
    // console.log("new_Pass", newPass)
    if (confirm_new_Pass === " ") {
      setconfirmPassError("Password cannot be empty")
      setdetailPassBtn(true)
    }
    else if (confirm_new_Pass != newPass) {
      setconfirmPassError("confirm password doesnt match to new password")
      setdetailPassBtn(true)
    }
    else if (password_regx.test(confirm_new_Pass)) {
      setnewPassError("")
      setconfirmPassError("")
      setdetailPassBtn(false)
    }
    else {
      setconfirmPassError(`Invalid credentials Must Contain "A-Z , @  ,1-9"`)
      setdetailPassBtn(true)
    }
  }



  return (
    <React.Fragment>
      <div className="userProfile">
        <Row>
          <Breadcrumbs breadcrumbItem="Profile" title="Dashboard"
            breadcrumbFeature="My profile" />
        </Row>
        <Row className="content">

          <Col xl="6" className=" userData">
            <div className="auth-full-page-content d-flex p-sm-5 p-4 ">
              <div className="w-100 " >
                <div className="d-flex flex-column h-100 ">
                  <div className="mb-4  text-center">
                    <Link to="/dashboard" className="d-block auth-logo">
                      {/* <img src={logo} alt="" height="28" />{" "} */}
                      {/* <span className="logo-txt">Minia</span> */}
                    </Link>
                  </div>
                  <div className="auth-content my-auto">
                    <div className="text-center">
                      <h5 className="mb-0">Personal Details</h5>
                      <p className="text-muted mt-2"></p>
                    </div>
                    <AvForm
                      className="needs-validation custom-form mt-4 pt-2"
                    // onValidSubmit={registerUser}
                    >
                      {/* {user && user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}
                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null} */}
                      <div className="mb-3 firstName">
                        <label htmlFor="fname">First Name</label>
                        <input
                          id="fname"
                          name="firstName"
                          value={fname}
                          className="form-control"
                          placeholder="Enter First Name"
                          type="name"
                          // contentEditable
                          required
                          //   value={fname}
                          onChange={(e) => {
                            setfname(e.target.value)
                            checkFnameValidation(e.target.value)
                          }}
                        />
                        <span className="validate-span">{fnameError}</span>
                      </div>
                      <div className="mb-3 lastName">
                        <label htmlFor="lname">Last Name</label>
                        <input
                          id="lname"
                          name="lastName"
                          value={lname}
                          className="form-control"
                          placeholder="Enter Last Name"
                          type="name"
                          required
                          onChange={(e) => {
                            setlname(e.target.value)
                            checklnameValidation(e.target.value)
                          }}
                        />
                        <span className="validate-span">{lnameError}</span>
                      </div>
                      <div className="mb-3 contactEmail">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          name="email"
                          value={email}
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          disabled
                          required
                        //   onChange={(e) => setemail(e.target.value)}
                        />
                        {/* <span className="validate-span">{emailError}</span> */}
                      </div>
                      <div className="mb-3 contactPhone">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                          id="mobile"
                          name="mobile"
                          label="mobile"
                          value={phone}
                          className="form-control"
                          placeholder="Enter mobile"
                          type="phone"
                          required
                          onChange={(e) => {
                            setphone(e.target.value)
                            setTemp(phone)
                            checkphoneValidation(e.target.value)
                          }}
                        />
                        <span className="validate-span">{phoneError}</span>
                      </div>
                      <div className="mb-3 jobName">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                          id="jobTitle"
                          name="jobTitle"
                          value={jobTitle}
                          label="jobTitle"
                          className="form-control"
                          type="name"
                          required
                          placeholder="Enter Job Title : Software Developer , CTO ...."
                          onChange={(e) => {
                            setjobTitle(e.target.value)
                            checkjobTitleValidation(e.target.value)
                          }}
                        />
                        <span className="validate-span">{jobTiteError}</span>
                      </div>
                      {/* <div className="mb-3">
                        <label htmlFor="pass">Password</label>
                        <input
                          id="pass"
                          name="password"
                          label="Password"
                          className="form-control"
                          type="password"
                          required
                          placeholder="Enter Password"
                          // onChange={(e) => setpassword(e.target.value)}
                        />
                      </div> */}
                      {/* <div className="mb-4">
                        <input
                          id="check"
                          name="check"
                          label="check"
                          // className="form-control"
                          type="checkbox"
                          required
                          placeholder="Enter Password"
                          // onChange={(e) => setpassword(e.target.value)}
                        />
                        <label htmlFor="check">
                          <p className="mb-0">
                            By registering you agree to the Minia{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </label>
                      </div> */}
                      <div className="mb-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          onClick={() => {
                            // setmodal_standard4(true)
                            updatePersonalDetails_sweetAlert()
                          }}
                          disabled={detailBtn}
                        >
                          Update Details
                        </button>
                      </div>
                    </AvForm>
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
            </div>
          </Col>

          <Col xl="6" className="  changePass bg-white">
            <div className="auth-full-page-content d-flex p-sm-5 p-4">
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4  text-center">
                    <Link to="/dashboard" className="d-block auth-logo">
                      {/* <img src={logo} alt="" height="28" />{" "} */}
                      {/* <span className="logo-txt">Minia</span> */}
                    </Link>
                  </div>
                  <div className="auth-content ">
                    <div className="text-center">
                      <h5 className="mb-0">Change Password</h5>
                      <p className="text-muted mt-2"></p>
                    </div>
                    <AvForm
                      className="needs-validation custom-form mt-4 pt-2"
                      onValidSubmit={changePassword}
                    >
                      {/* {user && user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}
                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null} */}
                      <div className="mb-3">
                        <label htmlFor="pass">Current Password</label>
                        <input
                          id="pass"
                          name="password"
                          label="Password"
                          className="form-control"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={(e) => {
                            setpass(e.target.value)
                            checkCurrentPass(e.target.value)
                          }}
                        />

                        <span className="validate-span">{currentPassError}</span>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pass">New Password</label>
                        <input
                          id="pass"
                          name="password"
                          label="Password"
                          className="form-control"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={(e) => {
                            setnewPass(e.target.value)
                            checknewPass(e.target.value)
                          }}
                        />
                        <span className="validate-span">{newPassError}</span>

                      </div>
                      <div className="mb-3">
                        <label htmlFor="pass">Confirm New Password</label>
                        <input
                          id="pass"
                          name="password"
                          label="Password"
                          className="form-control"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={(e) => {
                            setconfirmPass(e.target.value)
                            checkconfirmPass(e.target.value)
                          }}
                        />
                        <span className="validate-span">{confirmPassError}</span>
                      </div>
                      {/* <div className="mb-4">
                        <input
                          id="check"
                          name="check"
                          label="check"
                          // className="form-control"
                          type="checkbox"
                          required
                          placeholder="Enter Password"
                          // onChange={(e) => setpassword(e.target.value)}
                        />
                        <label htmlFor="check">
                          <p className="mb-0">
                            By registering you agree to the Minia{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </label>
                      </div> */}
                      <div className="mb-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          onClick={() => {
                            // setmodal_standard3(true)
                            updateChangePassword_sweetAlert()
                          }}
                          disabled={detailPassBtn}
                        >
                          Update Password
                        </button>
                      </div>
                    </AvForm>
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
            </div>
          </Col>
        </Row>

      </div>
    </React.Fragment>
  );
};

export default UserProfile;
