import React, { Component } from 'react'

// require('../assets/css/common.css')
import commonCss from '../assets/css/common.css'

class CssFile extends Component{
    render() {
        return (
            <div>
                <h1 className={commonCss.c333}>I am CssFile!</h1>
                <h2 className="c666">测试样式</h2>
            </div>
        )
    }
}

export default CssFile