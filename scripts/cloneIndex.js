const fs = require('fs');

// destination.txt will be created or overwritten by default.
fs.copyFile('build/index.html', 'build/404.html', (err) => {
  if (err) throw err;
  console.log('Index html was copied to 404');
});