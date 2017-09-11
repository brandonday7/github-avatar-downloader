var request = require('request');
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


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});



