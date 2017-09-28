var fs = require('fs');

//读取layout与view
function getViewHTML(viewPath, layoutPath) {
    if (viewPath == undefined || viewPath == '') {
        throw ('the viewPath must not be empty!');
        return;
    }

    var html = readFile(viewPath);    
    if (layoutPath != undefined && layoutPath != '') {
        var layout = readFile(layoutPath);
        html = layout.replace('<!--snowf-renderbody-->', html);
    }

    return html;
}

//读取文件内容
function readFile(filePath) {
    var data = fs.readFileSync(filePath);
    return data.toString();
}

module.exports = {
    startRender: function (viewModel, viewPath, layoutPath) {
        var html = getViewHTML(viewPath, layoutPath); 
        var vm=`<script>var viewModel=${JSON.stringify(viewModel)};</script>`;
        return html.replace('<!--snowf-viewModel-->',vm);
    }
}