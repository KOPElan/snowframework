var fs = require('fs');
var readline = require('readline');

//读取文件内容
function readFile(filePath) {
    var data = fs.readFileSync(filePath);
    return data.toString();
}

//读取view section
function getViewSection(viewPath) {
    return new Promise((resolve, reject) => {
        if (viewPath == undefined || viewPath == '') {
            reject(new Error('the viewPath must not be empty!'));
        }

        var section = [];

        var frs = fs.createReadStream(viewPath);
        var objReadline = readline.createInterface({
            input: frs,
        });

        var temp = {};
        objReadline.on('line', (line) => {
            line = line.trim();
            if (line == '') {
                return;
            }

            if (line.startsWith('<!--snowf')) {
                if (temp.tag != undefined) {
                    section.push(temp);
                    temp = {};
                }
                temp.tag = line;
            } else if (line != undefined && line != '') {
                temp.content = temp.content == undefined ? line : temp.content + line;
            }
        });

        objReadline.on('close', () => {
            section.push(temp);
            console.log('read viewSection close');
            resolve(section);
        });
    });
}

//渲染上下文
function renderContext(html, viewModel) {
    if (viewModel == null || viewModel == undefined) {
        return html;
    }
    var vm = `<script>var viewModel=${JSON.stringify(viewModel)};</script>`;
    html = html.replace('</head>', 
    `${vm}
    </head>`);

    if (viewModel.viewbag == undefined) {
        return html;
    }

    for (let i in viewModel.viewbag) {
        var reg=new RegExp('\\{\\{viewbag.'+i+'\\}\\}','g');
        html = html.replace(reg, viewModel.viewbag[i]);
    }

    return html;
}

module.exports = {
    startRender: function (viewModel, viewPath, layoutPath, callback) {
        if (layoutPath == undefined || layoutPath == null || layoutPath == '') {
            return renderContext(readFile(viewPath), viewModel);
        }

        var layout = readFile(layoutPath);

        getViewSection(viewPath).then(function (section) {
            for (let i = 0; i < section.length; i++) {
                layout = layout.replace(section[i].tag, section[i].content);
            }
            callback(renderContext(layout, viewModel));
        });
    }
}