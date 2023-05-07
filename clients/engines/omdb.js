module.exports = class OMDB {
  constructor(apiKey) {
    this.client = new (require('omdbapi'))(apiKey);
    this.params = {
      movie: ['imdb'],
      show: ['imdb'],
      season: [],
      episode: ['imdb']
    }
  }

  movie(ids) { //imdb
    return this.client.get({
      id: ids.imdb, 
      type: 'movie'
    })
  }

  show(ids) { //imdb
    return this.client.get({
      id: ids.imdb, 
      type: 'series'
    })
  }

  season(ids, season) {
    return Promise.resolve(null)
  }

  episode(ids, season, episode) { //imdb
    return this.client.get({
      id: ids.imdb,
      season: season,
      episode: episode,
      type: 'episode'
    })
  }
}
