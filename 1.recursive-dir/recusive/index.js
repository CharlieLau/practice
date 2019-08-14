const fs = require('fs');
const path = require('path');

const TInfo = require('./tinfo')

/**
 * TODO: 软连接情况~ cache
 * @param {*} dir 
 */
function readDir(dir) {
    //不存在情况
    if (!fs.existsSync(dir)) return null;
    let resource;
    const current = new TInfo({
        name: path.basename(dir),
        path: dir
    })

    try {
        //目录情况
        resource = fs.readdirSync(dir);
        current.type = 'dir'
    } catch (err) {
        //不是目录情况
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