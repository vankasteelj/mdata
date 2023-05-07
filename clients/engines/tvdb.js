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

    return Promise.resolve({
      poster: `https://artworks.thetvdb.com/banners/posters/${id}-1.jpg`,
      fanart: `https://artworks.thetvdb.com/banners/fanart/original/${id}-1.jpg`
    })

    /*let query = this.client.movies.get
    let images = Object()

    return query({
        id: id
    }).then(d => {
        return {
          poster: d.data.image
        }
    })*/
  }

  show(ids) { // tvdb
    const id = ids.tvdb

    if (!id) return Promise.reject(Error('None of the passed ID can be used'))

    //workaround in v4
    return Promise.resolve({
      poster: `https://artworks.thetvdb.com/banners/posters/${id}-1.jpg`,
      fanart: `https://artworks.thetvdb.com/banners/fanart/original/${id}-1.jpg`
    })

    /* normal way
        let query = this.client.series.get
        let images = Object()

        return query({
            id: id
        }).then(d => {
            return {
              poster: d.data.image
            }
        })*/
  }

  season(ids, season) {
    return Promise.resolve(null)
  }

  episode(ids, season, episode) {
    return Promise.resolve(null)
  }
}