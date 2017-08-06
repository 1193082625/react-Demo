import React,{Component} from 'react'


class Uglify extends Component{
    render() {
        var longVariableName = 'Hello ';
        longVariableName += 'Uglify';
        return (
            <div>
                <h1>I am Uglify</h1>
                <h1>{longVariableName}</h1>
            </div>
        )
    }
}
export default Uglify