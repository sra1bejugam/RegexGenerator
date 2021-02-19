## regex-nlp
Is an npm package where we can get the regex patterns by simply passing the **text/number/any special characters** or **multiple texts/numbers/any special characters ** with some flags like **case sensitive**, **global**, and also in which format you need pattern(either in **words**, **dates** or in **normal form**).

Wohooo thats it !!!

**Table of Contents**

[TOC]


## Install

You can install it by running 

**Using npm**

`npm install --save @sra1bejugam/regex-nlp`

**Using yarn **

`yarn add @sra1bejugam/regex-nlp`

## Usage
```sh
import regexGenerator from "@sra1bejugam/regex-nlp"
regexGenerator.regexEquation(input, isCaseSensitive, isGlobal, areWords)```

## Documentation
**regexEquation(input, isCaseSensitive, isGlobal, areWords)**

Takes an input and forms regex patterns

**Params**
- **Any** `input` : Takes any number of words , numbers  or special characters.

-  **Boolean** `isCaseSensitive` : Flag which is tagged to regex pattern to handle case Sensitive cases.

- **Boolean** `isGlobal` :flag which is tagged to attern to handle global cases.

- **String** `areWords `: string where it is used to denote that the pattern should be in words, dates or in normal form.

**Return**
- **RegExp** regular expression pattern

## Maintainer
@sra1bejugam

## License

ISC &copy; @sra1bejugam

## Keywords
**regex** **pattern** **regular**  **expressions**  **node** 

## End



