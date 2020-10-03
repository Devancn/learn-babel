
// https://astexplorer.net 在线ast生产工具
const generator = require("@babel/generator"); // 代码生成器
const parser = require('@babel/parser'); // 解析器
const traverse = require("@babel/traverse"); //遍历器
const t = require("@babel/types"); // babel工具

function compile(code) {
    // 1. 解析
    const ast = parser.parse(code);

    // 2. 遍历器
    const visitor = {
        CallExpression(path) { // 某个想要访问的节点
            console.log(path.node)
            const { callee } = path.node;
            if (
                t.isMemberExpression(callee)
                && callee.object.name === "console"
                && callee.property.name === "log"
            ) {
                const funcPath = path.findParent(p => p.isFunctionDeclaration())
                // log函数参数原来基础上新增一个参数
                path.node.arguments.unshift(
                    t.stringLiteral(`[${funcPath.node.id.name}]`),
                );
            }

        }
    }
    traverse.default(ast, visitor);

    // 3. 代码生产
    return generator.default(ast, {}, code)
}
// input
const code = `
function foo() {
    console.log('bar');
}
`


const result = compile(code);
console.log(result.code)
// output
/*
function foo() {
    console.log("[foo]", 'bar');
}
*/