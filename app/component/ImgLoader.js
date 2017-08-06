import React,{Component} from 'react'
import commonStyle from '../assets/css/common.css'
var imgUrl = require('../assets/img/Lighthouse.jpg')

class ImgLoader extends Component{
    render() {
        return (
            <div>
                <h1>I am ImgLoader!</h1>
                <img src={imgUrl} className="imgStyle" alt=""/>
            </div>
        )
    }
}
export default ImgLoader