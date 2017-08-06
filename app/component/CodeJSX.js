import React,{Component} from 'react'
import style from '../assets/css/common.css'

/**
 *

 Mounting：已插入真实 DOM
 Updating：正在被重新渲染
 Unmounting：已移出真实 DOM

 React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

 componentWillMount()
 componentDidMount()
 componentWillUpdate(object nextProps, object nextState)
 componentDidUpdate(object prevProps, object prevState)
 componentWillUnmount()

 componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
 shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用


 */




var NotesList = React.createClass({
    propTypes: {
        // 验证组件实例的属性是否符合要求
      title: React.PropTypes.string.isRequired
    },
    getInitialState: function () { // 设置状态值
        return {
            liked: false,
            value: 'defaultValue!',
            opacity: 1.0
        }
    },
    getDefaultProps: function () { // 设置组件属性的默认值
      return  {
          title: 'I am default title'
      }
    },
    handleClick: function () {
      this.refs.myTextInput.focus() // 从组件获取真实DOM的节点
    },
    changState: function () {
      this.setState({liked: !this.state.liked});
    },
    changeValue: function (event) {
        this.setState({value: event.target.value});
    },
    componentDidMount: function () {
      this.timer = setInterval(function () {
          var opacity = this.state.opacity;
          opacity -= .05;
          if(opacity < 0.1){
              opacity = 1.0
          }
          this.setState({
              opacity: opacity
          });
      }.bind(this),100)
    },
    render: function () {
        var text = this.state.liked ? 'like' : 'haven\'t liked'
        var value = this.state.value;
        return (
            <div>
                <h1> {this.props.title} </h1>
                <ol>
                    {
                        React.Children.map(this.props.children,function(child){
                            return <li>{child}</li>
                        })
                    }
                </ol>
                <br/>
                <div>
                    <input type="text" ref="myTextInput" />
                    <input type="button" value="Focus the text input" onClick={this.handleClick} />
                </div>
                <br/>
                <p>
                    <span style={{opacity: this.state.opacity}} className="c666">You {text} this.</span>
                    <button onClick={this.changState}>Click to toggle</button>
                </p>
                <br/>
                <div>
                    <input type="text" value={value} onChange={this.changeValue} />
                    <p>{value}</p>
                </div>
            </div>
        )
    }
})

// Promise对象传入组件
var RepoList = React.createClass({
    getInitialState: function () {
        return {
            loading:true,
            error: null,
            data: null
        }
    },
    componentDidMount(){
        this.props.promise.then(
            value => this.setState({loading: false, data: value}),
            error => this.setState({loading: false, data: error})
        )
    },
    render: function () {
        if(this.state.loading){
            return <span>Loading...</span>
        }else if(this.state.error !== null){
            return <span>Error: {this.state.error.message}</span>
        }else{
            var repos = this.state.data.items
            var repoList = repos.map(function (repo) {
                return (
                    <li key={repo.name}>
                        <a href={repo.html_url}>{repo.name}</a>({repo.stargazers_count} stars) <br/> {repo.description}
                    </li>
                )
            })
            return (
                <main>
                    <h1>Most Popular Javascript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </main>
            )
        }
    }
})

// Ajax请求
var UserGist = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            lastGistUrl: ''
        }
    },
    componentDidMount: function () {
        this.mounted = true;
        $.get(this.props.source,function (result) {
            var lastGist = result[0];
            if(this.mounted){
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                })
            }
        }.bind(this))
    },
    componentWillUnmount() {
        this.mounted = false;
    },
    render: function () {
        return (
            <div>
                {this.state.username}'s last gist is
                <a href={this.state.lastGistUrl}>here</a>
            </div>
        )
    }
})

class CodeJSX extends Component{
    render() {
        var names = ['Alice', 'Emily', 'Kate']
        var arr = [
            <h1 key="x">Hello Arr1</h1>,
            <p key="y">我是数组的内容</p>
        ]
        return (
            <div className="bgBox">
                <br/>
                <br/>
                <br/>
                <h1>I am CodeJSX</h1>
                {
                    names.map(function (name) {
                        return <h2 key={name}>Hello,{name}!</h2>
                    })
                }
                <hr/>
                <div>{arr}</div>
                <hr/>
                <NotesList title="I am required Title">
                    <span>Note</span>
                    <span>List</span>
                </NotesList>
                <br/>
                <br/>
                <hr/>
                <h1>promise请求</h1>
                <RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>
                <br/>
                <br/>
                <hr/>
                <h1>ajax请求</h1>
                <UserGist source="https://api.github.com/users/octocat/gists"/>
            </div>
        )
    }
}
export default CodeJSX