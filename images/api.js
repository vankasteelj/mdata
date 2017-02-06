module.exports = class IMAPI {
    constructor(clients) {
        return {
            movie: (ids) => {
                const movie = new (require('./movies/movie.js'))(clients)
                return movie.getImages(ids)
            },
            show: (ids) => {
                const show = new (require('./shows/show.js'))(clients)
                return show.getImages(ids)
            },
            season: (ids) => {
                const season = new (require('./shows/season.js'))(clients)
                return season.getImages(ids)
            },
            episode: (ids) => {
                const episode = new (require('./shows/episode.js'))(clients)
                return episode.getImages(ids)
            },
            entire_show: (ids) => {
                const show = new (require('./shows/show.js'))(clients)
                return show.getAllImages(ids)
            },
        }
    }
}