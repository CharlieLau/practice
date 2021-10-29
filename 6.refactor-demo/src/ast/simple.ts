

export { }


const startTagOpen = /<([a-zA-Z_]+)/
const startTagClose = /^\s*(\/?)>/
const endTag = /<\/(.[^>]*)>/
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

let root
let lastElement
let stack = []

function parseHTML(html) {

    while (html) {
        let htmlEnd = html.indexOf('<')
        if (htmlEnd === 0) {
            // handle startTag
            let startElement = html.match(startTagOpen)
            if (startElement) {
                const match = {
                    tagName: startElement[1],
                    attrs: [],
                    children: [],
                }
                advance(startElement[0].length)

                // handle attrs
                let attr
                // e.g. [' a="1"',"a","=","1" ...]
                while (attr = html.match(attribute)) {
                    match.attrs.push({
                        [attr[1]]: attr[3]
                    })
                    advance(attr[0].length)
                }

                let tagClose = html.match(startTagClose)
                advance(tagClose[0].length)
                start(match)
                continue
            } 
            // handle endTag
            const endElement = html.match(endTag)
            if (endElement) {
                advance(endElement[0].length)
                end()
                continue
            }
        }
        // handle Text
        let text
        if (htmlEnd > 0) {
            text = html.substring(0, htmlEnd)
            if (text) {
                advance(text.length)
                lastElement.children.push(text)
            }
        }
    }

    function advance(n) {
        html = html.substring(n)
    }

    function start(match) {
        if (!root) {
            root = match
        }
        lastElement = match
        stack.push(match)
    }

    function end() {
        let element = stack.pop();
        lastElement = stack[stack.length - 1];
        if (lastElement) {
            lastElement.children.push(element);
        }
    }

    return root
}

const str = '<div  a="1"  b="3" >hi,<span>jerry</span></div>'
const result = parseHTML(str)
console.log(result)

