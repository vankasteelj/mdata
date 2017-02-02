module.exports = class FANART {
    constructor(apiKey) {
        this.client = new (require('fanart.tv'))(apiKey)
        this.params = {
            movie: ['imdb', 'tvdb'],
            show: ['tvdb'],
            season: ['tvdb'],
            episode: []
        }
    }
    
    movie(ids) { // imdb, tvdb
        let id = ids.imdb ? ids.imdb : ids.tvdb
        return this.client.movies.get(id)
    }

    show(ids) { // tvdb
        return this.client.shows.get(ids.tvdb).then(this.extractBestForShow.bind(this))
    }
    
    season(id, season) { // tvdb
        return this.client.shows.get(ids.tvdb).then(response => {
            
        })
    }
    
    episode(id, season, episode) {
        return Promise.resolve(null)
    }

    extractBestForShow(response) {
        let images = {
            poster: null,
            fanart: null
        }

        for (let poster of response.tvposter) {
            if (poster.lang === '0en') {
                images.poster = poster.url
                break
            }
        }

        for (let fanart of response.showbackground) {
            if (fanart.lang === 'en') {
                images.fanart = fanart.url
                break
            }
        }

        return images
    }
}