module.exports = class TVDB {
    constructor(apiKey) {
        this.client = new (require('tvdbapi'))({apikey: apiKey})
        this.params = {
            movie: ['tvdb'],
            show: ['tvdb'],
            season: [],
            episode: []
        }
    }
    
    movie(ids) {
        const id = ids.tvdb

        if (!id) return Promise.reject(Error('None of the passed ID can be used'))

        let query = this.client.movies.get
        let images = Object()

        return query({
            id: id
        }).then(d => {
            return {
              poster: d.data.image
            }
        })
    }

    show(ids) { // tvdb
        const id = ids.tvdb

        if (!id) return Promise.reject(Error('None of the passed ID can be used'))

        let query = this.client.series.get
        let images = Object()

        return query({
            id: id
        }).then(d => {
            return {
              poster: d.data.image
            }
        })
    }
    
    season(ids, season) {
        return Promise.resolve(null)
    }
    
    episode(ids, season, episode) {
        return Promise.resolve(null)
    }
}