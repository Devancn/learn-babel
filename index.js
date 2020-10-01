const generator = require("@babel/generator");
const parser = require('@babel/parser');
const traverse = require("@babel/traverse");
const t = require("@babel/types");

function compile(code) {
    // 1. parse
    const ast = parser.parse(code);

    // 2. traverse
    const visitor = {
        CallExpression(path) {
            console.log(path.node)
            const { callee } = path.node;
            if (
                t.isMemberExpression(callee)
                && callee.object.name === "console"
                && callee.property.name === "log"
            ) {
                const funcPath = path.findParent(p => p.isFunctionDeclaration())
                path.node.arguments.unshift(
                    t.stringLiteral(`[${funcPath.node.id.name}]`),
                );
            }

        }
    }
    traverse.default(ast, visitor);

    // 3. generate

    return generator.default(ast, {}, code)
}

const code = `
function foo() {
    console.log('bar');
}
`
const result = compile(code);
console.log(result.code)