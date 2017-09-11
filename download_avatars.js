var request = require('request');
var fs = require('fs');
console.log('Welcome to the Github Avatar Downloader');

var GITHUB_USER = 'brandonday7';
var GITHUB_TOKEN = '77c654116d70e01b4d42e819c69243f56168d60d';

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var USER_AGENT_HEADER = 'Github Avatar Downloader - Student Project';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': USER_AGENT_HEADER}
  }
  var avatarURLs = {};
  request.get(options, function(error, response, body) {
    if (error) {
      console.log("There was an error! Error number: ", error)
      throw error;
    }

    var list = JSON.parse(body);
    for (contributor in list) {
      avatarURLs[contributor] = list[contributor]['avatar_url'];
    }
    cb(null, avatarURLs);
  })
}


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      console.log("There was an error!")
    })
    .on('response', function() {
      console.log("Downloading...");
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
      console.log("Donwload complete!")
    });
}


// getRepoContributors("jquery", "jquery", function(err, result) {
//   for (link in result) {
//     console.log(result[link]);
//   }
// });

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466avatars/kvirani.jpg", "./pic.jpg")

