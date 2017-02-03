const util = require('../../utils/util.js')

module.exports = class MOVIE {
    constructor(clients) {
        this.clients = clients

        // https://apiblog.trakt.tv/how-to-find-the-best-images-516045bcc3b6
        this.bestProviders = ['tmdb', 'fanart', 'omdb'] 
    }

    getImages(ids) {
        const providers = Array()

        for (let p of this.bestProviders) {
            let provider = this.clients[p]
            provider && util.inArray(ids, provider.params.movie) && providers.push(provider)
        }

        if (!providers.length) throw Error('No provider is available for the passed ids')

        let result = {
            poster: null,
            fanart: null
        }

        const callProvidersAsync = (providers, ids, idx = 0) => {
            if (typeof providers[idx] != 'object') return result

            return providers[idx].movie(ids).then((images = {}) => {
                idx++

                !result.poster && (result.poster = images.poster)
                !result.fanart && (result.fanart = images.fanart)

                if (result.poster && result.fanart) return result

                return callProvidersAsync(providers, ids, idx)
            }).catch(error => {
                idx++
                return callProvidersAsync(providers, ids, idx)
            })
        }

        return callProvidersAsync(providers, ids)
    }
}