
import { useState } from "react"
import {NavLink} from "react-router-dom"


const PrivateRoute = (props) =>{
    // const [jwt , setjwt] = useState(false)
    return props.jwt ? props.Children : <NavLink to="/login" />
}

export default PrivateRoute;