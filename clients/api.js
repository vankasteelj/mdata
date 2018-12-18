module.exports = class CLIENTS {
    constructor(apiKeys) {
        for (let c of ['fanart', 'omdb', 'tmdb', 'tvdb']) 
            if (apiKeys[c]) this[c] = this.construct(c, apiKeys[c])

        return this
    }

    // requirejs client wrapper
    construct(client, apiKey) {
        return new (require('./engines/'+client+'.js'))(apiKey)
    }
}