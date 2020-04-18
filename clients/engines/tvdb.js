module.exports = class TVDB {
    constructor(apiKey) {
        this.client = new (require('tvdbapi'))({apikey: apiKey})
        this.clientXML = require('tvdb.js')(apiKey)
        this.images = {
            url: 'https://thetvdb.com/banners/',
            minPosterSize: 780,
            minFanartSize: 720
        }
        this.params = {
            movie: [],
            show: ['tvdb'],
            season: ['tvdb'],
            episode: []
        }
    }
    
    movie(ids) {
        return Promise.resolve(null)
    }

    show(ids) { // tvdb
        const id = ids.tvdb

        if (!id) return Promise.reject(Error('None of the passed ID can be used'))

        let query = this.client.series.images.query
        let images = Object()

        return query({
            id: id,
            keyType: 'poster'
        }).then(d => {
            images.posters = d.data
            return query({
                id: id,
                keyType: 'fanart'
            })
        }).then(d => {
            images.fanarts = d.data
            return images
        }).then(this.extractBestForShow.bind(this))
    }

    entire_show(ids) { // tvdb
        const id = ids.tvdb

        if (!id) return Promise.reject(Error('None of the passed ID can be used'))

        return this.clientXML.find(id).then(this.extractAllImages.bind(this))
    }
    
    season(ids, season) { // tvdb
        return this.client.series.images.query({
            id: ids.tvdb,
            keyType: 'season'
        }).then(d => this.extractBestForSeason(d.data, season))
    }
    
    episode(ids, season, episode) {
        // should come to api v2 at some point
        return Promise.resolve(null)
    }

    extractBestForShow(images) {
        let tmpPoster, tmpFanart

        for (let poster of images.posters) {
            if (!tmpPoster) tmpPoster = poster

            if (
                poster.resolution.split('x')[1] >= this.images.minPosterSize &&
                poster.ratingsInfo.average > tmpPoster.ratingsInfo.average
            ) tmpPoster = poster
        }

        for (let fanart of images.fanarts) {
            if (!tmpFanart) tmpFanart = fanart

            if (
                fanart.resolution.split('x')[1] >= this.images.minFanartSize &&
                fanart.ratingsInfo.average > tmpFanart.ratingsInfo.average
            ) tmpFanart = fanart
        }

        return {
            poster: this.buildUrl(tmpPoster.fileName),
            fanart: this.buildUrl(tmpFanart.fileName)
        }
    }

    extractBestForSeason(images, season) {
        let tmpPoster
        
        for (let poster of images) {
            if (poster.subKey == season) {
                if (!tmpPoster) tmpPoster = poster

                if (poster.ratingsInfo.average > tmpPoster.ratingsInfo.average) tmpPoster = poster
            }
        }
        
        return {
            poster: this.buildUrl(tmpPoster.fileName)
        }
    }

    extractAllImages(response) {
        let result = {
            show: {
                fanart: this.buildUrl(response.fanart),
                poster: this.buildUrl(response.poster)
            },
            seasons: Object()
        }

        for (let ep of response.episodes) {
            let numS = ep.season, numE = ep.number
            
            if (!result.seasons[numS]) result.seasons[numS] = Object()

            result.seasons[numS][numE] = this.buildUrl(ep.filename)
        }

        return result
    }

    buildUrl(path) {
        return this.images.url + path
    }
}