import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import commonStyle from '../assets/css/common.css'

const isActiveFunc = (match) => {
    console.log(match,'contact')
    return match
}


class Menu extends Component{
    render() {
        return (
            <nav className={commonStyle.nav}>
                <NavLink exact activeClassName={commonStyle.active} to="/">Home</NavLink>
                <NavLink activeStyle={{color: 'green'}} to='/cssfile'>CssFile</NavLink>
                <NavLink activeClassName={commonStyle.active} to='/uglify'>Uglify</NavLink>
                <NavLink activeClassName={commonStyle.active} to='/codejsx'>CodeJSX</NavLink>
                <NavLink
                    isActive={isActiveFunc}
                    activeClassName={commonStyle.active}
                    to="/imgloader">ImgLoader</NavLink>
            </nav>
        )
    }
}

export default Menu