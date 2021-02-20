let regexGenerator = require('../lib/pattern-generator');

let regexPattern;
// Note: isCaseSensitive and isGlobal values are false by default

// If we need regex patterns related to **dates** then 
regexPattern = regexGenerator.getRegexExpression('12/12/2018', 'dates');
console.log(regexPattern); // output--> /[0-9]{2}[^a-z0-9]+[0-9]{2}[^a-z0-9]+[0-9]{2,4}/

// If we need regex pattern related to **words** then 
regexPattern = regexGenerator.getRegexExpression('regex', 'words', true, true);
console.log(regexPattern); // output--> /(regex)/ig

// If we need regex in **normal** pattern
regexPattern = regexGenerator.getRegexExpression('version 01', 'normal', true, true)
console.log(regexPattern); // output--> /[a-z0-9\s]/ig.


