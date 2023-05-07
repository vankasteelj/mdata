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
    let id = ids.imdb ? ids.imdb.match('tt') ? ids.imdb : 'tt' + ids.imdb : ids.tvdb
    return this.client.movies.get(id).then(this.extractBestForMovie.bind(this))
  }

  show(ids) { // tvdb
    return this.client.shows.get(ids.tvdb).then(this.extractBestForShow.bind(this))
  }

  season(ids, season) { // tvdb
    return this.client.shows.get(ids.tvdb).then(response => this.extractBestForSeason(response, season))
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
      images.poster = poster.url
      if (poster.lang === 'en' || poster.lang === '') break
    }

    for (let fanart of response.showbackground) {
      images.fanart = fanart.url
      if (fanart.lang === 'en' || fanart.lang === '') break
    }

    return images
  }

  extractBestForMovie(response) {
    let images = {
      poster: null,
      fanart: null
    }

    for (let poster of response.movieposter) {
      images.poster = poster.url
      if (poster.lang === 'en' || poster.lang === '') break
    }

    for (let fanart of response.moviebackground) {
      images.fanart = fanart.url
      if (fanart.lang === 'en' || fanart.lang === '') break
    }

    return images
  }

  extractBestForSeason(response, season) {
    let images = {
      poster: null
    }

    for (let poster of response.seasonposter) {
      if (poster.season == season) {
        images.poster = poster.url
        if (poster.lang === 'en' || post.lang == '') break
      }
    }

    return images
  }
}