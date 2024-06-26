


import { Col } from "reactstrap";

// availity-reactstrap-validation
import success from "../../assets/images/success.png"
import { AvForm } from "availity-reactstrap-validation";

import failure from "../../assets/images/failure.png"
import { Link } from "react-router-dom";

export default function PasswordChangeFailureForm () {
    return(
        
        <div className=" d-flex p-sm-5 p-4 ">


        <div className="d-flex flex-column w-100">
            <div className="auth-content my-auto">

                <div className="mb-4 mb-md-5 text-center">
                    <img src={failure} alt="" height="80" />{" "}
                    <span className="logo-txt"></span>
                </div>
                <div className="text-center">
                    <h5 className="mb-0">An Error Occured </h5>
                    <p className="text-muted mt-2">
                        Please try again to continue to the GuardLogiX Platform.
                    </p>
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                    // type="submit"
                    >
                        <Link to="/forgot-password" className=" btn btn-primary w-100 waves-effect waves-light">
                            Reset Again
                        </Link>
                    </button>
                </div>


            </div>
        </div>
    </div>
    )
}