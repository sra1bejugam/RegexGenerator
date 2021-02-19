## regex-nlp

Is an npm package where we can get the regex patterns by simply passing the **text/number/any special characters** or **multiple texts/numbers/any special characters ** with some flags like **case sensitive**, **global**, and also in which format you need pattern(either in **words**, **dates** or in **normal form**).

Wohooo thats it !!!

**Table of Contents**

[[_TOC_]]

## Install

You can install it by running 

**Using npm**

`npm install --save @sra1bejugam/regex-nlp`

**Using yarn**

`yarn add @sra1bejugam/regex-nlp`

## Usage

`import regexGenerator from "@sra1bejugam/regex-nlp"`
`regexGenerator.regexEquation(input, pattern, isCaseSensitive, isGlobal)`

>Note:  `isCaseSensitive` and `isGlobal` values are false by default

## Example

- If we need regex patterns related to **dates** then 

`regexGenerator.regexEquation('12/12/2018','dates')`

**Output** : /[0-9]{2}[^a-z0-9]+[0-9]{2}[^a-z0-9]+[0-9]{2,4}/.

- If we need regex pattern related to **words** then 

`regexGenerator.regexEquation('regex','words', true, true)`

**Output** : /(regex)/ig.

- If we need regex in **normal** pattern

`regexGenerator.regexEquation('version 01','normal', true, true)`

**Output** : /[a-z0-9\s]/ig.



## Documentation
**regexEquation(input, pattern, isCaseSensitive, isGlobal)**

Takes an input and forms regex patterns

**Params**
- **Any** `input` : Takes any number of words , numbers  or special characters.

-  **Boolean** `isCaseSensitive` : Flag which is tagged to regex pattern to handle case Sensitive cases.

- **Boolean** `isGlobal` :flag which is tagged to attern to handle global cases.

- **String** `pattern `: string where it is used to denote that the pattern should be in words, dates or in normal form.

**Return**
- **RegExp** regular expression pattern

## Maintainer
@sra1bejugam

## License

ISC &copy; @sra1bejugam

## Keywords
**regex** **pattern** **regular**  **expressions**  **node** 

## End
