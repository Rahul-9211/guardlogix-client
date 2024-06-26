import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row className="editFooter">
            <Col className="col-xxl-6" >{new Date().getFullYear()} © GuardLogiX.</Col>
            <Col className="col-xxl-6  text-sm-center text-lg-end pe-4" >
              <div className="">
                Design & Develop by
                <Link to="#" className="ms-1 text-decoration-underline">
                  GuardLogiX
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
