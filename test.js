const API = require('./metadata.js')
const api = new API({
    //fanart: 'FILL_ME',
    //tmdb: 'FILL_ME',
    //tvdb: 'FILL_ME'
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
    console.log('Unable to load test for %s, error:', call.type, error)
}

const movie = {
    title: 'Star Wars VII: The Force Awakens',
    type: 'movie',
    ids: {
        imdb: 'tt2488496', 
        tmdb: 140607
    }
}

const show = {
    title: 'The Big Bang Theory',
    type: 'show',
    ids: {
        tvdb: 80379,
        imdb: 'tt0898266',
        tmdb: 1418
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
