# MData

A node module making easy the acquisition of metadata 

Currently supporting: 
- images:
 - poster (movie/show/season)
 - fanart (movie/show)
 - screenshot (episode)

3rd party APIs: 
- themoviedb.org
- thetvdb.com
- fanart.tv
- omdbapi.com

### installation

```
npm install mdata
```

### usage

```js
const MData = require('mdata')
const mdata = new MData({
    fanart: <your api key>,
    tmdb: <your api key>,
    tvdb: <your api key>,
    omdb: <your api key>
})
```

### api

```js
mdata.images.movie(args)        // args: Object({imdb, tmdb})
mdata.images.show(args)         // args: Object({imdb, tvdb, tmdb})
mdata.images.season(args)       // args: Object({imdb, tvdb, tmdb, season})
mdata.images.episode(args)      // args: Object({imdb, tvdb, tmdb, season, episode})
```

_imdb, tvdb, tmdb: only one is required, tmdb is recommended though_

### examples

```js
mdata.images.episode({imdb: 'tt0898266', season: 1, episode: 1})
    .then(console.log).catch(console.error);
```

## License 

The MIT License - Copyright (c) 2021 Jean van Kasteel <vankasteelj@gmail.com>

>Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

>The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.