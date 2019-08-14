//请用nodejs实现读取指定本地目录文件，生成html文件，并包含文件目录树结构的展示及样式的脚本


const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const express = require('express')

const recursive = require('./recusive/index.js')
const indextpl = fs.readFileSync(path.join(__dirname, './template/index.ejs'), 'utf8')
const nodetpl = fs.readFileSync(path.join(__dirname, './template/node.ejs'), 'utf8')


const app = express();


app.get('/', (req, res) => {
    const treeData = recursive(path.join(__dirname, './mock'));
    const indexRender = ejs.compile(indextpl);

    const html = indexRender({
        tree:[treeData],
        render: ejs.compile(nodetpl)
    })
    res.send(html)
})




app.listen(8083, () => {
    console.log('server runing at 8083...');
});