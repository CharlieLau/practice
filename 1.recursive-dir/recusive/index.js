const TInfo = require('./tinfo')

const fs = require('fs');
const path = require('path');


/**
 * TODO: 软连接情况~ cache
 * @param {*} dir 
 */
function readDir(dir) {
    if (!fs.existsSync(dir)) return null;
    let resource;
    const current = new TInfo({
        name: path.basename(dir),
        path: dir
    })

    try {
        resource = fs.readdirSync(dir);
        current.type = 'dir'
    } catch (err) {
        resource = [];
        current.type = path.extname(dir) || 'unknown'
    }

    const children = resource.map(item => readDir(path.join(dir, item)))
    if (children.length) {
        current.children = children;
    }
    return current;

}

module.exports = readDir;