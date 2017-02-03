const util = require('../../utils/util.js')

module.exports = class SEASON {
    constructor(clients) {
        this.clients = clients

        // https://apiblog.trakt.tv/how-to-find-the-best-images-516045bcc3b6
        this.bestProviders = ['tmdb', 'tvdb', 'fanart'] 
    }

    getImages(ids) {
        const providers = Array()

        for (let p of this.bestProviders) {
            let provider = this.clients[p]
            provider && util.inArray(ids, provider.params.season) && providers.push(provider)
        }

        if (!providers.length) return Promise.reject(Error('No provider is available for the passed ids'))

        let result = {
            poster: null
        }

        const callProvidersAsync = (providers, ids, idx = 0) => {
            if (typeof providers[idx] != 'object') return result

            return providers[idx].season(ids, ids.season).then((images = {}) => {
                idx++

                !result.poster && (result.poster = images.poster)

                if (result.poster) return result

                return callProvidersAsync(providers, ids, idx)
            }).catch(error => {
                idx++
                return callProvidersAsync(providers, ids, idx)
            })
        }

        return callProvidersAsync(providers, ids)
    }
}