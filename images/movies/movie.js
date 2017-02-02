module.exports = class MOVIE {
    constructor(clients) {
        this.clients = clients
    }

    getImages(ids) {
        return Promise.all([
            //this.clients.omdb.movie(ids.imdb),
            this.clients.fanart.movie(ids.imdb)
        ])
    }
}