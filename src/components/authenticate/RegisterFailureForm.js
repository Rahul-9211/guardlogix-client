


import { Col } from "reactstrap";

import failure from "../../assets/images/failure.png"
// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation";

import { Link } from "react-router-dom";

export default function RegisterFailureForm (props) {
    return(
        <div className="d-flex flex-column h-100">
            <div className="auth-content my-auto">
                <div className="mb-4 mb-md-5 text-center">
                        <img src={failure} alt="" height="80" />{" "}
                        <span className="logo-txt"></span>
                </div>
                <div className="text-center">
                    <h5 className="mb-0">Registration Failed</h5>
                    <p className="text-muted mt-2">
                    Please click on below button to Register Again.
                    {/* Please check your email "<strong>{props.popUpEmail}</strong>" <br/> and try to register again  */}
                        
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
                                { pathname: "register" }
                            } target="_blank" className=" btn btn-primary w-100 waves-effect waves-light">
                                Register Again
                            </Link>
                        </button>
                    </div>
                </AvForm>

                {/* <div className="mt-5 text-center">
                    <p className="text-muted mb-0">
                        Need to register with different account ?{" "}
                        <Link
                            to="/register"
                            target="_blank"
                            className="text-primary fw-semibold"
                        >
                            {" "}
                            Click here {" "}
                        </Link>{" "}
                    </p>
                </div> */}
            </div>
            {/* <div className="mt-4 mt-md-5 text-center">
            <p className="mb-0">
                © {new Date().getFullYear()} GuardLogiX . Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by
                GuardLogiX
            </p>
        </div> */}
        </div>)
}