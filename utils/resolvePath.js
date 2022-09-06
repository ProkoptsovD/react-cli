const path = require('path');
const { capitalize } = require('./capitalize');

const resolvePath = (name) => name ? path.resolve(process.cwd() + '/' + capitalize(name)) : path.resolve(process.cwd());

module.exports = {
    resolvePath
}