require.ensure(['./component/CodeSplit'],function (require) {
    var content = require('./component/CodeSplit');
    var _html = `
        <div>
            <h1>Code splitting</h1>
            `+ content +`
        </div>
    `
    document.getElementById('codeSplit').innerHTML = _html;
})