
import { Col } from "reactstrap";

// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation";

import { Link } from "react-router-dom";


export default function RegisterSuccesForm() {
    return (

        <Col lg={6} md={6} className="col-xxl-6 bg-white register-about-form" style={{ minHeight: "70vh" }}>

            <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                    <div className="d-flex flex-column h-100">
                        <div className="mb-4 mb-md-5 text-center">
                            <Link to="/dashboard" className="d-block auth-logo">
                                {/* <img src={logo} alt="" height="28" />{" "} */}
                                <span className="logo-txt"></span>
                            </Link>
                        </div>
                        <div className="auth-content my-auto">
                            <div className="text-center">
                                <h5 className="mb-0">Go to Login</h5>
                                <p className="text-muted mt-2">
                                    Get your free acess to new account now.
                                </p>
                            </div>
                            <AvForm
                                className="needs-validation custom-form mt-4 pt-2"
                            // onValidSubmit={registerUser}
                            >

                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary w-100 waves-effect waves-light"
                                    // type="submit"
                                    >
                                        <Link to={
                                            { pathname: "login" }
                                        } className=" btn btn-primary w-100 waves-effect waves-light">
                                           Login
                                        </Link>
                                    </button>
                                </div>
                            </AvForm>

                            <div className="mt-5 text-center">
                                <p className="text-muted mb-0">
                                    Need to register with different account ?{" "}
                                    <Link
                                        to="/register"
                                        className="text-primary fw-semibold"
                                    >
                                        {" "}
                                        Register{" "}
                                    </Link>{" "}
                                </p>
                            </div>
                        </div>
                        {/* <div className="mt-4 mt-md-5 text-center">
                            <p className="mb-0">
                                © {new Date().getFullYear()} GuardLogiX . Crafted with{" "}
                                <i className="mdi mdi-heart text-danger"></i> by
                                GuardLogiX
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </Col>)
}