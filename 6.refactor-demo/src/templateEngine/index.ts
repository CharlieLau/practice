

const template = `<p>
    Hello,my name is <%name%>. I am  <%age%> years old.
    <% for(let item in nums)  {%> 
        current: <%item%>
    <%}%>
    <% if(condition){%>
        condition is true
    <%}%>
 </p>`;

const data = {
    name: 'zyn',
    age: 31,
    nums: [1, 2, 3, 4],
    condition: true
}

function templateEngine(tpl, data) {

    const reg = /<%([^%>]+)?%>/g
    const reEpr = /for|if|}/g
    let matched
    let cursor = 0
    let code = 'let arr= [];\nwith(data){\n'


    while (matched = reg.exec(tpl)) {
        let line = tpl.slice(cursor, matched.index)
        add(line);
        add(matched[1], true);
        cursor = matched.index + matched[0].length
    }

    let lastLine = tpl.substr(cursor, tpl.length - 1)
    add(lastLine)
    code += '}\n'
    code += `return arr.join('');`

    function add(line, expr = false) {
        if (expr) {
            code += line.match(reEpr) ? line + '\n' : `arr.push(${line});\n`
        } else {
            code += `arr.push(\`${line}\`);\n`
        }
    }

    return new Function('data', code)(data)
}

const result = templateEngine(template, data)
console.log(result)

