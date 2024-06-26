import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Row, Col, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
import logo from "../../assets/images/logo-sm.svg";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const Register = (props) => {
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
    dispatch(apiError(""));
  }, [dispatch]);

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [organization, setorganization] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [results, setresult] = useState("");
  // const [confirmPassword, setconfirmPassword] = useState("");

  async function registerUser(event) {
    // event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        jobTitle,
        organization,
        phone,
        email,
        password,
      }),
    })
    .then((response) => {
      const data =  response.json()
      console.log(data.then((result)=>{
        if(result.status === "ok"){
          window.location.href = "/register-success"
        }
        else{
          // alert("Already Registered Email")
        }
      }))
    })
    .catch(
      error => null
      ) // Handle the error response object
    // const data = await response.json();
    // if(data.status === 'ok'){
    //   navigate.push('/login')
    // }
    // console.log("data",data);
    // console.log("name",name);
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Minia - React Admin & Dashboard Template</title>
      </MetaTags>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="28" />{" "}
                        <span className="logo-txt">Minia</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Register Account</h5>
                        <p className="text-muted mt-2">
                          Get your free Minia account now.
                        </p>
                      </div>
                      <AvForm
                        className="needs-validation custom-form mt-4 pt-2"
                        onValidSubmit={registerUser}
                      >
                        {user && user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}
                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null}
                        <div className="mb-3">
                          <label htmlFor="fname">First Name</label>
                          <input
                            id="fname"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter First Name"
                            type="name"
                            required
                            onChange={(e) => setfname(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lname">Last Name</label>
                          <input
                            id="lname"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter Last Name"
                            type="name"
                            required
                            onChange={(e) => setlname(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="jobTitle">Job Title</label>
                          <input
                            id="jobTitle"
                            name="jobTitle"
                            label="jobTitle"
                            className="form-control"
                            type="name"
                            required
                            placeholder="Enter Job Title : Software Developer , CTO ...."
                            onChange={(e) => setjobTitle(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="organization">
                            Organization Name
                          </label>
                          <input
                            id="organization"
                            name="organization"
                            label="organization"
                            className="form-control"
                            type="name"
                            required
                            placeholder="Enter Organization "
                            onChange={(e) => setorganization(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                            onChange={(e) => setemail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="mobile">Mobile</label>
                          <input
                            id="mobile"
                            name="mobile"
                            label="mobile"
                            className="form-control"
                            placeholder="Enter mobile"
                            type="phone"
                            required
                            onChange={(e) => setphone(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="pass">Password</label>
                          <input
                            id="pass"
                            name="password"
                            label="Password"
                            className="form-control"
                            type="password"
                            required
                            placeholder="Enter Password"
                            onChange={(e) => setpassword(e.target.value)}
                          />
                        </div>
                        {/* <div className="mb-3">
                          <label htmlFor="cPass">Confirm Password</label>
                          <input
                            id="cPass"
                            name="password"
                            label="Password"
                            className="form-control"
                            type="password"
                            required
                            placeholder="Enter Confirm password"
                            onChange={(e) => setconfirmPassword(e.target.value)}
                          />
                        </div> */}
                        <div className="mb-4">
                          <p className="mb-0">
                            By registering you agree to the Minia{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </AvForm>

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
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Minia . Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
