let request = require('request');
let fs = require('fs');
let mkdirp = require('mkdirp');
require('dotenv').config();

console.log('Welcome to the Github Avatar Downloader');
// let args = process.argv;
// if (args.length !== 4)
// {
//   properInput();
//   return;
// }

//validate .env file
//ensure there is an env file
//ensure the file contains GITHUB_USER and GITHUB_TOKEN variables
//ensure these variables are not empty
if (!process.env.GITHUB_USER) {
  console.log("There is no username in your dotenv file. Please add one to your dotenv file.");
  return;
}
else if (!process.env.GITHUB_TOKEN) {
  console.log("There is no token in your dotenv file. Please add one to your dotenv file.");
  return;
}


let GITHUB_USER = process.env.GITHUB_USER;
let GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// const REPO_NAME = args[2];
// const REPO_OWNER = args[3];

// if (REPO_NAME && REPO_OWNER) {

//   getRepoContributors(REPO_OWNER, REPO_NAME, function(err, result) {
//     mkdirp('./avatars', function(err) {
//       if (err) {
//         console.log("The download directory does not exist.");
//       }
//       else {
//         for (contributor in result) {
//         let url = result[contributor]['avatar_url'];
//         let filePath = './avatars/' + result[contributor].login + '.jpg'; //make sure there is an empty avatars folder on comp
//         downloadImageByURL(url, filePath);
//         }
//       }
//     })

//   for (contributor in result) {
//     let url = result[contributor]['avatar_url'];
//     let filePath = './avatars/' + result[contributor].login + '.jpg'; //make sure there is an empty avatars folder on comp
//     downloadImageByURL(url, filePath);
//   }
// });


// }

// else {
//   properInput();
// }

function properInput() {
  console.log("Please input a valid repo owner and name!");
  console.log("Example: ");
  console.log("\tnode download_avatars.js repoOwner repoName");
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
    try {
      let list = JSON.parse(body);
      cb(null, list);
    }
    catch (e) {
      console.log("There was an error downloading the avatars. Ensure name and owner are valid. ");
      return;
    }
  })
}



function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('response', function() {
      console.log("Downloading...");
    })
    .pipe(fs.createWriteStream(filePath))
    .on('error', function(err) {
      console.log("There was an error downloading the images!")
    })
    .on('finish', function() {
      console.log("Donwload complete!")
    });
}


function starredRepos(repoOwner, repoName, cb) {
  let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let USER_AGENT_HEADER = 'Github Avatar Downloader - Student Project';
  let options = {
    url: requestURL,
    headers: {
      'User-Agent': USER_AGENT_HEADER}
  }

  request.get(options, function(error, response, body) {
    let contrList = JSON.parse(body);
    for (member in contrList) {
      let starredURL = contrList[member]['starred_url'];
      starredURL = starredURL.split('').reverse().splice(15).reverse().join('');
      console.log(starredURL); //now contains the link to the starred page
    }

  })

}
starredRepos("jquery", "jquery", function() {
  console.log("Errors:", err);
  console.log("Result:", result);
})


