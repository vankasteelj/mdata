const API = require('./metadata.js')
const api = new API({
  fanart: 'FILL_ME',
  tmdb: 'FILL_ME',
  tvdb: 'FILL_ME',
  omdb: 'FILL_ME'
})


const Test = (call) => {
  console.time(call.type+' time')

  return api.images[call.type](call.ids)
    .then(images => {
    console.log(call.title, images)
    console.timeEnd(call.type+' time')
    return images
  })
}

const Reject = (error, call) => {
  console.log('Unable to load test for %s.', call.type, error)
}

const movie = {
  title: 'Star Wars VII: The Force Awakens',
  type: 'movie',
  ids: {
    imdb: 'tt2488496', 
    tmdb: 140607,
    tvdb: 213
  }
}

const show = {
  title: 'Baron Noir',
  type: 'show',
  ids: {
    tvdb: '306246',
    imdb: 'tt4835480',
    tmdb: 65430
  }
}

const season = {
  title: 'Battlestar Galactica',
  type: 'season',
  ids: {
    tvdb: 73545,
    imdb: 'tt0407362',
    tmdb: 1972,
    season: 1
  }
}

const episode = {
  title: 'Game of Thrones',
  type: 'episode',
  ids: {
    tvdb: 121361, 
    imdb: 'tt0944947', 
    tmdb: 1399, 
    season: 1,
    episode: 1
  }
}

Test(movie).catch((error) => Reject(error, movie))
Test(show).catch((error) => Reject(error, show))
Test(season).catch((error) => Reject(error, season))
Test(episode).catch((error) => Reject(error, episode))