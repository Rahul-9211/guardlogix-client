

import FeatherIcon from "feather-icons-react";
import {Col } from "reactstrap"


export default function Banner() {
    return (
        <Col
            lg={6}
            md={6}
            className="col-xxl-6 register-about auth-full-page-content "
        >
            <div className="heading">Features & Benefits</div>
            <div className="content">
                <div className="icon">
                    <FeatherIcon icon="globe" size="32" fill="white" />
                </div>
                <div className="text">
                    <h1>Complete Assets Discovery</h1>
                    <p>
                        GuardLogiX distributed engines discover all your external assets in minutes.
                    </p>
                </div>
            </div>
            <div className="content">
                <div className="icon">
                    <FeatherIcon icon="eye" size="32" fill="white" />
                </div>
                <div className="text">
                    <h1>Find Unseen Subdomains</h1>
                    <p>
                        GuardLogiX will show complete subdomain related to a given domain name to reveal a company's entire web infrasture.
                    </p>
                </div>
            </div>
            <div className="content">
                <div className="icon">
                    <FeatherIcon icon="eye" size="32" fill="white" />
                </div>
                <div className="text">
                    <h1>Reveal Associated Domains</h1>
                    <p>
                        Understand the relationship between domains, companies, and individuals. Unveil any associated domains.
                    </p>
                </div>
            </div>
            <div className="content">
                <div className="icon">
                    <FeatherIcon icon="globe" size="32" fill="white" />
                </div>
                <div className="text">
                    <h1>Reveal Company's Data Leak</h1>
                    <p>
                        Continuously scan the internet to identify publicly exposed data leaks or leaked credentials related to your organisation.
                    </p>
                </div>
            </div>
        </Col>

    )
}

