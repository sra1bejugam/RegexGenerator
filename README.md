## regex-nlp
 [![Version](https://img.shields.io/npm/v/@sra1bejugam/regex-nlp.svg)](https://www.npmjs.com/package/@sra1bejugam/regex-nlp) [![Downloads](https://img.shields.io/npm/dt/@sra1bejugam/regex-nlp.svg)](https://www.npmjs.com/package/@sra1bejugam/regex-nlp)

:point_right: regex-nlp Is an npm package where we can get the regex patterns by simply passing the **text/number/any special characters** or **multiple texts/numbers/any special characters ** with some flags like **case sensitive**, **global**, and also in which format you need pattern(either in **words**, **dates** or in **normal form**).


## :electric_plug: Installation

You can install it by running 

**Using npm**

:arrow_right: `npm install --save @sra1bejugam/regex-nlp`

**Using yarn**

:arrow_right: `yarn add @sra1bejugam/regex-nlp`

## :gear: Usage
```js
import regexGenerator from "@sra1bejugam/regex-nlp"
regexGenerator.regexEquation(input, pattern, isCaseSensitive, isGlobal)
```

 >Note:  `isCaseSensitive` and `isGlobal` values are false by default

## :key: Examples


- If we need regex patterns related to **dates** then 

`regexGenerator.regexEquation('12/12/2018','dates')`

**Output** : /[0-9]{2}[^a-z0-9]+[0-9]{2}[^a-z0-9]+[0-9]{2,4}/.

- If we need regex pattern related to **words** then 

`regexGenerator.regexEquation('regex','words', true, true)`

**Output** : /(regex)/ig.

- If we need regex in **normal** pattern

`regexGenerator.regexEquation('version 01','normal', true, true)`

**Output** : /[a-z0-9\s]/ig.



## :memo: Documentation
**regexEquation(input, pattern, isCaseSensitive, isGlobal)**

Takes an input and forms regex patterns

**Params**
- **Any** `input` : Takes any number of words , numbers  or special characters.

-  **Boolean** `isCaseSensitive` : Flag which is tagged to regex pattern to handle case Sensitive cases.

- **Boolean** `isGlobal` :flag which is tagged to attern to handle global cases.

- **String** `pattern `: string where it is used to denote that the pattern should be in words, dates or in normal form.

**Return**
- **RegExp** regular expression pattern


:heart: Wohooo thats it !!!


## :raising_hand_man: Maintainer
@sra1bejugam

## :scroll: License

[ISC][license] © [sra1bejugam][website]


[license]: /LICENSE
[website]: https://github.com/sra1bejugam/RegexGenerator
[gpay-donations]: htps://addcrctsitehere.com
