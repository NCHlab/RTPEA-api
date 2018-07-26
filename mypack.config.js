const path = require('path');

module.exports = function(config)= {
name : 'client',
target : 'web',
devtool : config.compiler_devtool,
resolve : {
root : paths.client(),
extensions : ['', '.js', '.jsx', '.json', '.coffee', '.node']
},
node: {
fs: 'empty',
net: 'empty',
tls: 'empty',
mongodb: 'empty'
},
module : {}
}

