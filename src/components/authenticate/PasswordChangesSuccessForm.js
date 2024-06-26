


import { Col } from "reactstrap";

// availity-reactstrap-validation
import success from "../../assets/images/success.png"
import { AvForm } from "availity-reactstrap-validation";

import { Link } from "react-router-dom";

export default function PasswordChnageSuccessForm () {
    return(
        
        <div className=" d-flex p-sm-5 p-4 ">


        <div className="d-flex flex-column w-100">
            <div className="auth-content my-auto">

                <div className="mb-4 mb-md-5 text-center">
                    <img src={success} alt="" height="80" />{" "}
                    <span className="logo-txt"></span>
                </div>
                <div className="text-center">
                    <h5 className="mb-0">Password Changed Successfully! </h5>
                    <p className="text-muted mt-2">
                        Please Login to continue to the GuardLogiX Platform.
                    </p>
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                    // type="submit"
                    >
                        <Link to="/login" className=" btn btn-primary w-100 waves-effect waves-light">
                            Go To Login {" "}
                        </Link>
                    </button>
                </div>


            </div>
        </div>
    </div>
    )
}