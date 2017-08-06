import React from 'react'
import {render} from 'react-dom'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import NavRoute from './component/NavRoute'

import Hello from './component/Hello'
import CssFile from './component/CssFile'
import ImgLoader from './component/ImgLoader'
import Menu from './component/NavLink'
import Uglify from './component/Uglify'
import CodeJSX from './component/CodeJSX'


const load = require('bundle-loader!./component/CodeSplit.js')
load(function (file) {
    var _html = `
        <div>
            <h1>Code splitting with bundle-loader</h1>
            `+ file +`
        </div>
    `
    document.getElementById('otherCodeSplit').innerHTML = _html
})

var _html = `
    <div>
        <h1>Vendor chunk</h1>
        <span>I am Vendor Chunk</span>
    </div>
`
$('#VendorChunk').html(_html)

// getUserConfirmation: func 使用场景：当需要用户进入页面前执行什么操作时可用
const getConfirmation = (message,callback) => {
    const allowTransition = window.confirm(message)
    callback(allowTransition)
}

var dom = (
    <Router getUserConfirmation={getConfirmation('Are you sure?', function () {console.log(1111)})}>
        <div>
            <Menu />

            <Route exact path="/" component={Hello}></Route>
            <Route path="/cssfile" component={CssFile}></Route>
            <Route path="/imgloader" component={ImgLoader}></Route>
            <Route path="/uglify" component={Uglify}></Route>
            <Route path="/codejsx" component={CodeJSX}></Route>
            <Route
                strict
                path="/about/"
                render={() => <h2>About render</h2>}></Route>
            <Route
                path="/demo"
                children={({match}) => match && <h2>demo</h2>}></Route>

        </div>
    </Router>
)
render(dom,document.getElementById('root'))