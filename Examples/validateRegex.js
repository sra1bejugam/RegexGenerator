let regexGenerator = require('../lib/pattern-generator');

let res;
// Note: isCaseInSensitive and isGlobal values are false by default

res = regexGenerator.validateRegexEquation('some', '/[a-z]/i', 'test', false, true, true);
console.log(res); // output--> {keyword: 'some', result: true}

res = regexGenerator.validateRegexEquation('some', '/(some)/i', 'exec');
console.log(res); // output-->  {keyword: 'some', result: 'some'}

res = regexGenerator.validateRegexEquation('some', '/(some)/i', 'match');
console.log(res); // output-->  {keyword: 'some', result: 'some'}

res = regexGenerator.validateRegexEquation('some', '/(some)/ig', 'replace', '1234', true, true);
console.log(res); // output-->  {keyword: 'some', result: 1234}

res = regexGenerator.validateRegexEquation('this find find index of @', '/@/', 'search');
console.log(res); // output-->  {keyword: 'this find find index of @', result: 24}
