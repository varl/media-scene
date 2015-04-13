var http = require('http');
var fs = require('fs');
var q = require('q');

var _media = {
  'music': undefined,
  'movies': undefined,
  'tv': undefined
};

var findMedia = function (category, path, callback) {
  var deferred = q.defer();
  fs.readdir(path, function (err, files) {
    if (err) deferred.reject(err);
    var obj = {};
    obj[category] = files;
    deferred.resolve(obj);
  });
  return deferred.promise.nodeify(callback);
};

var requestListener = function (request, response) {
  switch (request.url) {
    case '/movies':
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(_media.movies));
      break;
    case '/music':
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(_media.music));
      break;
    case '/tv-series':
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(_media.tv));
      break;

    case '/':
    default:
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      });
      response.end(JSON.stringify(_media));
      break;
  }
};

var all = q.all([
      findMedia('movies', '/projects/media-artwork/tmp/movies'),
      findMedia('music', '/projects/media-artwork/tmp/music'),
      findMedia('tv', '/projects/media-artwork/tmp/tv')
    ]);

var setup = function(media) {
  media.forEach(function (m) {
    if (m.movies) {
      _media.movies = m.movies;
    } else if (m.music) {
      _media.music = m.music;
    } else if (m.tv) {
      _media.tv = m.tv;
    } else {
      console.log('did not work!');
    }
  });
  var server = http.createServer(requestListener);
  server.listen('7070', '127.0.0.1');
  console.log('Running...');
};

all.then(setup, console.error);
