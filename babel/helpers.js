const helpers = require('@babel/helpers');
const types = require('@babel/types');

const typeofHelper = helpers.get('typeof');
console.log(types.isExpressionStatement(typeofHelper));