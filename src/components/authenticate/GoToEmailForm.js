

import { Col } from "reactstrap";

import success from "../../assets/images/mail.png"
// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation";

import { Link } from "react-router-dom";


export default function GoToEmailForm(props) {
    return (

        <div className="d-flex flex-column h-100">
            <div className="auth-content my-auto">
                <div className="mb-4 mb-md-5 text-center">
                        <img src={success} alt="" height="98" />{" "}
                        <span className="logo-txt"></span>
                </div>
                <div className="text-center">
                    <h5 className="mb-0">{props.heading}</h5>
                    <p className="text-muted mt-2 text-center">
                        {props.para} <br/>
                        <strong>{props.popUpEmail} </strong>
                    </p>
                </div>
                <AvForm
                    className="needs-validation custom-form mt-4 pt-2"
                // onValidSubmit={registerUser}
                >

                    <div className="mb-3">
                        {/* <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                        // type="submit"
                        >
                            <Link to={
                                { pathname: "games.com" }
                            } target="_blank" className=" btn btn-primary w-100 waves-effect waves-light">
                                Check Email
                            </Link>
                        </button> */}
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

