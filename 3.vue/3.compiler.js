// 模板  =》 解析器+优化器 + 代码生成器 =》 渲染函数

// 1. 解析器   
// 模板(html解析器，文本解析器，过滤器解析器)解析成 AST 


// 2. 优化器 
// 遍历所有AST  给静态节点打上标记 重新渲染的时候不会新建虚拟节点

// 3. 代码生成器
// AST转成渲染函数  “代码字符串”




// 解析器

// start tag
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)

// attribute
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

// start tag  close
const startTagClose = /^\s*(\/?)>/

// end tag
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

// comment
const comment = /^<!--/

// conditionalComment
const conditionalComment = /^<!\[/

// doctype
const doctype = /^<!DOCTYPE [^>]+>/i



parseHtml()

function parseHtml(html, options) {

}