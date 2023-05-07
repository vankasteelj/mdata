const util = require('../../utils/util.js')

module.exports = class EPISODE {
  constructor(clients) {
    this.clients = clients

    // https://apiblog.trakt.tv/how-to-find-the-best-images-516045bcc3b6
    this.bestProviders = ['tmdb'] //tvdb v2 doenst have it yet (feb 2, 2017).
  }

  getImages(ids) {
    const providers = Array()

    for (let p of this.bestProviders) {
      let provider = this.clients[p]
      provider && util.inArray(ids, provider.params.episode) && providers.push(provider)
    }

    if (!providers.length) return Promise.reject(Error('No provider is available for the passed ids'))

    let result = {
      screenshot: null
    }

    const callProvidersAsync = (providers, ids, idx = 0) => {
      if (typeof providers[idx] != 'object') return result

      return providers[idx].episode(ids, ids.season, ids.episode).then((images = {}) => {
        idx++

        !result.screenshot && (result.screenshot = images.screenshot)

        if (result.screenshot) return result

        return callProvidersAsync(providers, ids, idx)
      }).catch(error => {
        idx++
        return callProvidersAsync(providers, ids, idx)
      })
    }

    return callProvidersAsync(providers, ids)
  }
}