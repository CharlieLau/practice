module.exports = class TInfo {
    // name;
    // type;
    // _path;
    // children;
    constructor({
        name,
        type,
        path
    }) {
        path && (this.path = path);
        name && (this.name = name);
        type && (this._type = type);
    }
    set type(val) {
        if (val.startsWith('.')) {
            this._type = val.substr(1);
        } else {
            this._type = val;
        }
    }
}