import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"

import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"
// import  {MockService, ApiService} from 'axios-mock-adapter'
// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import "./assets/scss/preloader.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend";
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import CredentialBreach from './pages/Features/CredentialBreach/CredentialBreach'
import Dashboard2 from './pages/Dashboard/Dashboard2'
import UserProfile from './pages/Contacts/ContactsProfile/userProfile'
import ScanSetting from './pages/Features/Scan Setting/ScanSetting'
import AssetList from './pages/Features/Asset Setting/AssetList'
import SubdomainFinder from './pages/Features/SubdomainFinder/SubdomainFinder'
import PortScan from './pages/Features/PORT Scanner/PortScan'
import DNSLookup from './pages/Features/DNS Lookup/DNSLookup'
import ReverseIPLookup from "./pages/Features/Reverse_IP_Lookup/Reverse_IP_Lookup";
import ReverseDNSLookup from "./pages/Features/Reverse_DNS_Lookup/Reverse_DNS_Lookup";
import WHOisRecords from './pages/Features/WHOIS Records/WHOisReacords'


import Logout from "./pages/Authentication/Logout"
import RegisterSucces from "./pages/Authentication/RegisterCheck"
import ForgetPwd from "./pages/Authentication/ForgetPassword"
import GoToEmail from "./pages/Authentication/GoToEmail"
import CreateNewPassword from "./pages/Authentication/CreateNewPassword";
import RegisterCheck from './pages/Authentication/RegisterCheck'
import RegisterSuccess from './pages/Authentication/RegisterSuccess'
import ChangePasswordSuccess from './pages/Authentication/ChangePasswordSuccess'
import ForgetPassword from './pages/Authentication/ForgetPassword'

// Activating fake backend
fakeBackend()
// // Remove this to disable mock API
// MockService.init();

// // API service init
// ApiService.init();
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = props => {

  const token = localStorage.getItem("token");
  const [state, setstate] = useState()
  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_DEFAULTPATH}jwtauth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token
      }),
    })
    const data = await response.json()
    if (data.status === false) {
      // console.log("responsed ", data)
    }
    else {
      setstate(true)
      // console.log("responsed ", data)
    }
  })
  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>


      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>

    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)