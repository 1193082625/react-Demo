import React,{Component} from 'react'
import {
    Route
} from 'react-router-dom'

class NavRoute extends Component{
    render() {
        return (
            <Route {...rest} render={props => (
                <Component {...props} />
            )} />
        )
    }
}
export default NavRoute