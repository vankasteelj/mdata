module.exports = class TMDB {
    constructor(apiKey) {
        this.client = new (require('tmdbapi'))({apiv3: apiKey})
        this.images = {
            url: 'https://image.tmdb.org/t/p/',
            minPosterWidth: 780,
            posterSizePath: 'w780',
            minBackdropHeight: 720,
            backdropSizePath: 'original',
            langs: ['en', null]
        }
        this.params = {
            movie: ['imdb', 'tmdb'],
            show: ['imdb', 'tvdb', 'tmdb'],
            season: ['imdb', 'tvdb', 'tmdb'],
            episode: ['imdb', 'tvdb', 'tmdb']
        }
    }
    
    movie(ids) { // imdb, tmdb
        return this.matchId('movie', ids, 'movie_results').then(tmdb =>
            this.client.movie.images({movie_id: tmdb})
        ).then(this.extractBestForShowMovie.bind(this))
    }

    show(ids) { // imdb, tvdb, tmdb
        return this.matchId('show', ids, 'tv_results').then(tmdb =>
            this.client.tv.images({tv_id: tmdb})
        ).then(this.extractBestForShowMovie.bind(this))
    }
    
    season(ids, season) { // imdb, tvdb, tmdb
        return this.matchId('season', ids, 'tv_season_results').then(tmdb =>
            this.client.tv.season.images({tv_id: tmdb, season: season})
        ).then(this.extractBestForSeason.bind(this))
    }
    
    episode(ids, season, episode) { // imdb, tvdb, tmdb
        return this.matchId('episode', ids, 'tv_episode_results').then(tmdb =>
            this.client.tv.episode.images({tv_id: tmdb, season: season, episode: episode})
        ).then(this.extractBestForEpisode.bind(this))
    }

    matchId(type, ids, match) {
        if (ids.tmdb) return Promise.resolve(ids.tmdb)

        let matchingId = Object()

        for (let available of this.params[type]) {
            if (ids[available]) {
                matchingId.type = available + '_id',
                matchingId.id = ids[available]
                break
            }
        }

        if (!matchingId.id) return Promise.reject(Error('None of the passed ID can be used'))

        return this.client.find({
            external_id: matchingId.id,
            external_source: matchingId.type
        }).then(found => {
            if (found[match].length) {
                return found[match][0].id
            } else {
                return Promise.reject(Error('No tmdb match found'))
            }
        })
    }

    extractBestForShowMovie(response) {
        let images = {
            poster: null,
            fanart: null
        }

        for (let poster of response.posters) {
            if (
                this.images.langs.indexOf(poster.iso_639_1) !== -1 &&
                poster.width >= this.images.minPosterWidth
            ) {
                images.poster = this.buildUrl(poster.file_path, this.images.posterSizePath)
                break
            }
        }

        for (let fanart of response.backdrops) {
            if (
                this.images.langs.indexOf(fanart.iso_639_1) !== -1 &&
                fanart.height >= this.images.minBackdropHeight
            ) {
                images.fanart = this.buildUrl(fanart.file_path, this.images.backdropSizePath)
                break
            }
        }

        return images
    }

    extractBestForSeason(response) {
        let images = {
            poster: null
        }

        for (let poster of response.posters) {
            if (
                this.images.langs.indexOf(poster.iso_639_1) !== -1 &&
                poster.width >= this.images.minPosterWidth
            ) {
                images.poster = this.buildUrl(poster.file_path, this.images.posterSizePath)
                break
            }
        }

        return images
    }

    extractBestForEpisode(response) {
        let images = {
            screenshot: null
        }

        for (let screenshot of response.stills) {
            if (screenshot.height >= this.images.minBackdropHeight) {
                images.screenshot = this.buildUrl(screenshot.file_path, this.images.backdropSizePath)
                break
            }
        }

        return images
    }

    buildUrl(path, size) {
        return this.images.url + size + path
    }
}