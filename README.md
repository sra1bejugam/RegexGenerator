## regex-nlp
 [![Version](https://img.shields.io/npm/v/regex-nlp.svg)](https://www.npmjs.com/package/regex-nlp) [![Downloads](https://img.shields.io/npm/dt/regex-nlp.svg)](https://www.npmjs.com/package/regex-nlp)

:point_right: regex-nlp Is an npm package where we can get the regex patterns by simply passing the **text/number/any special characters** or **multiple texts/numbers/any special characters** with some flags like **case sensitive**, **global**, and also in which format you need pattern(either in **words**, **dates** or in **normal form**).


## :electric_plug: Installation

You can install it by running 

**Using npm**

:arrow_right: `npm install --save regex-nlp`

**Using yarn**

:arrow_right: `yarn add regex-nlp`

## :gear: Usage
```js
import regexGenerator from "regex-nlp";

// if we need regular expression by giving strings/keywords then use this
regexGenerator.getRegexExpression(input, pattern, isCaseInSensitive, isGlobal);

// If we need to test our regex with multiple strings/keywords then use this 
regexGenerator.validateRegexEquation(keywords, regex, method, isReplaceString, isCase, isGlobaly);

```

 >Note:  `isCaseInSensitive` and `isGlobal` values are false by default

## :key: Examples
```js
########################### Method 1 ##################################

let regexGenerator = require('../lib/pattern-generator');
let regexPattern;

// Note: isCaseInSensitive and isGlobal values are false by default

// If we need regex patterns related to **dates** then 
regexPattern = regexGenerator.getRegexExpression('12/12/2018', 'dates');
console.log(regexPattern); // output--> /[0-9]{2}[^a-z0-9]+[0-9]{2}[^a-z0-9]+[0-9]{2,4}/

// If we need regex pattern related to **words** then 
regexPattern = regexGenerator.getRegexExpression('regex', 'words', true, true);
console.log(regexPattern); // output--> /(regex)/ig

// If we need regex in **normal** pattern
regexPattern = regexGenerator.getRegexExpression('version 01', 'normal', true, true)
console.log(regexPattern); // output--> /[a-z0-9\s]/ig.
```
```js
############################# Method 2 ####################################

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

```
## :memo: Documentation

## Method 1:

# getRegexExpression(input, pattern, isCaseInSensitive, isGlobal)

Takes an input and forms regex patterns

**Params**
- **Any** `input` : Takes any number of words , numbers  or special characters or collection of keywords.

-  **Boolean** `isCaseInSensitive` : Flag which is tagged to regex pattern to handle case Sensitive cases.

- **Boolean** `isGlobal` :flag which is tagged to attern to handle global cases.

- **String** `pattern `: string where it is used to denote that the pattern should be in words, dates or in normal form.

**Return**
- **RegExp** regular expression pattern


## Method 2:

# validateRegexEquation(keywords, regex, method, isReplaceString, isCase, isGlobaly)

Takes keyswords and regex as input and tests all the keywords and give back results

**Params**
- **Any** `keywords` : Takes any number of words , numbers  or special characters.

- **RegexExp** `regex` : Takes regular expression.

- **String** `method`: As of now validating only 5 methods like (test, match, exec, replace, search)

- **String** `isReplaceString`: this variable is used when we choose replace method, giving the keyword to this variable will replace the string.

-  **Boolean** `isCaseInSensitive` : Flag which is tagged to regex pattern to handle case Sensitive cases.

- **Boolean** `isGlobal` :flag which is tagged to attern to handle global cases.

**Return**
- **Array of objects** with keyword and result



# Need UI Interface for this package

[regexGenerator.com][UISite]



:heart: Wohooo thats it !!!


## :raising_hand_man: Maintainer
[sra1bejugam][website]
## :scroll: License

[MIT][license] © [sra1bejugam][website]


[license]: /LICENSE
[website]: https://github.com/sra1bejugam/RegexGenerator
[UISite]:https://regex-generator.herokuapp.com/index
[gpay-donations]: htps://addcrctsitehere.com

