import React from "react";
import MetaTags from "react-meta-tags";
import { Row, Container, Col , Card} from "reactstrap";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo/whitelogo.svg";
import Banner from "../../components/Common/Banner";
import CreateNewPassForm from "../../components/authenticate/CreateNewPassForm";

const CreateNewPassword = (props) => {

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | GuardLogiX </title>
      </MetaTags>

      
      <div className="auth-page d-flex align-center" style={{ background: "#5156be", padding: "50px 0", minHeight: "100vh" }}>
        <Container fluid className="  justify-content-center">
          <Row className="login_card_row">
            <Col lg={3} md={6} className="d-flex justify-content-center flex-column ">

              <div className="mb-5 mb-md-5 text-center">
                <Link to="" className="d-block auth-logo">
                  <img src={logo} alt="" height="50" />
                </Link>
              </div>

              <Card className="login_card">
                
              <CreateNewPassForm/>
              </Card>

              <div className="mt-4 mt-md-3 text-center">
                <p className="text-white mb-0 ">
                  Don't have an account yet {" "}?
                  <Link
                    to="/register"
                    className=" fw-semibold text-white"
                  >
                    {" "}
                    Register{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateNewPassword;
