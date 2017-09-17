var productController = {
    indexAction: function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("hellow product");
    },

    testAction: function (req, res) {

    }
}

module.exports = productController;