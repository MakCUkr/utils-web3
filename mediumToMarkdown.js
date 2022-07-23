const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/@anuragsista111/introduction-to-web3-games-and-guilds-59c05e0565d3')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});