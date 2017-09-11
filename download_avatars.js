let request = require('request');
let fs = require('fs');
console.log('Welcome to the Github Avatar Downloader');
let args = process.argv;

let GITHUB_USER = 'brandonday7';
let GITHUB_TOKEN = '77c654116d70e01b4d42e819c69243f56168d60d';

const REPO_NAME = args[2];
const REPO_OWNER = args[3];

if (REPO_NAME && REPO_OWNER) {

  getRepoContributors(REPO_OWNER, REPO_NAME, function(err, result) {
  for (contributor in result) {
    let url = result[contributor]['avatar_url'];
    console.log(result[contributor].login, ": ", url);
    let filePath = './avatars/' + result[contributor].login + '.jpg'; //make sure there is an empty avatars folder on comp
    downloadImageByURL(url, filePath);
  }
});

}


else {
  console.log("A repo name and owner must be input!");
  console.log("Example: ");
  console.log("\tnode download_avatars.js jquery jquery");
}






function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let USER_AGENT_HEADER = 'Github Avatar Downloader - Student Project';
  let options = {
    url: requestURL,
    headers: {
      'User-Agent': USER_AGENT_HEADER}
  }

  request.get(options, function(error, response, body) {
    if (error) {
      console.log("There was an error! Error number: ", error)
      throw error;
    }

    let list = JSON.parse(body);

    cb(null, list);
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





