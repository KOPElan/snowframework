var actionResult = {
    'view': { type: 'view' },
    'file': { type: 'file' },
    'content': function (contenttype) {
        return { type: 'content', contentType: contenttype }
    }
};

module.exports = actionResult;