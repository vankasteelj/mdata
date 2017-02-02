module.exports = class MD {

    constructor(apiKeys) {
        this.clients = new (require('./clients/api.js'))(apiKeys)
        this.images = new (require('./images/api.js'))(this.clients)
    }

}