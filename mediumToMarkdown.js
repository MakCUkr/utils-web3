const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/@maksimjeet/revolution-in-web3-gaming-65e8d18dce0b')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});