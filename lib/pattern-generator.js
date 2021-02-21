const regexExp = require('../utils/knowledge-base');
class PatternGenerator {

    //?! if i is not chosen then change equation to lowercase
    formPattern(keyword, isWordFormats, isDateFormats, isCaseInSenitive) {
        console.log("🚀 ~ file: pattern-generator.js ~ line 6 ~ PatternGenerator ~ formPattern ~ keyword, isWordFormats, isDateFormats, isCaseInSenitive", keyword, isWordFormats, isDateFormats, isCaseInSenitive);
        try {
            let pattern;
            if (isWordFormats) { //?! handle abc123 case..it shld be may be covered in other case check...
                pattern = keyword.replace(regexExp.specialChars, '[^a-z0-9]+'); //special chars check for single or not
            } else if (isDateFormats) {
                if (regexExp.digits.test(keyword)) { // all number dates
                    pattern = this.datesEquation(keyword);
                } else if (regexExp.monthsRegex.test(keyword)) { // all alpha numeric dates
                    pattern = this.monthsEquation(keyword, isCaseInSenitive);
                }
            } else {
                if (regexExp.onlyDigits.test(keyword)) { // Digit cases
                    if (keyword.length === 1) {
                        pattern = '^[0-9]$';
                    } else {
                        pattern = '^[0-9]+$';
                    }
                } else if (regexExp.strictAlphabets.test(keyword)) { // Alphabet cases
                    if (keyword.length === 1) {
                        pattern = '^[a-z]$';
                    } else {
                        pattern = '^[a-z]+$';
                    }
                } else if (regexExp.strictSpecialChars.test(keyword)) { // special chars case
                    pattern = '^[^a-z0-9]+$';
                } else if (regexExp.alphaNumeric.test(keyword)) { // Alpha numneric cases
                    pattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
                } else if (regexExp.alphaNumericWithSpecialChars.test(keyword)) { // Alpha numneric specialchars cases
                    pattern = '^(?=.*[a-z])(?=.*[0-9])[a-z0-9-.\/!@#$%^&*\(\).~\`\\s]+$';
                } else if (regexExp.amounts.test(keyword)) { //Amounts case
                    pattern = '^[0-9.,\-\+]+$';
                } else if (regexExp.alphaSpecialChars.test(keyword)) { // Alpha specialcharacters cases
                    pattern = '^[a-z-.\/\s!@#$%^&*\(\).~`]+$';
                } else if (regexExp.digitsSpecialChars.test(keyword)) { // digits Secial chars case
                    pattern = '^[0-9-.\/\s!@#$%^&*\(\).~`]+$';
                }
            }
            console.log("🚀 ~ file: pattern-generator.js ~ line 43 ~ PatternGenerator ~ formPattern ~ pattern", pattern)
            return pattern;
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ formPattern ~ err", err);
        }
    }

    // Check this function totally..
    datesEquation(keyword) { //?! do dynamic for those digits...
        try {
            console.log("🚀 ~ file: pattern-generator.js ~ line 53 ~ PatternGenerator ~ datesEquation ~ keyword", keyword)
            let finalEquation = '';
            let filteredKey = keyword.replace(regexExp.specialChars, '[^a-z0-9]');
            let numbersArray = filteredKey.split('[^a-z0-9]');
            let formedRegex = [];
            numbersArray.forEach((item) => {
                formedRegex.push('[0-9]' + '{' + `${item.length}` + '}');
            });
            let replacedDate = keyword.replace(/[0-9]+/g, 'date');
            let modified_date = replacedDate.replace(regexExp.specialChars, '[^a-z0-9]');
            // loop here
            finalEquation += modified_date.replace('date', formedRegex[0]).replace('date', formedRegex[1]).replace('date', formedRegex[2]);
            return finalEquation;
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ datesEquation ~ err", err);
        }
    }

    // check user given first letter and pass the same case sensitive to the user
    monthsEquation(keyword, isCaseInSenitive) {
        try {
            console.log("🚀 ~ file: pattern-generator.js ~ line 74 ~ PatternGenerator ~ monthsEquation ~ keyword, isCaseInSenitive", keyword, isCaseInSenitive)
            let finalEq = '';
            let changeNums = '';
            let spclKey = keyword.replace(regexExp.specialChars, 'spcl');
            let changeMonths = spclKey.replace(regexExp.monthsRegexGlobal, `${regexExp.monthsEq}`);
            let count = changeMonths.match(regexExp.strictDigit);
            // loop here
            if (count && count.length === 1) {
                changeNums = changeMonths.replace(count[0], '[0-9]{' + count[0].length + '}');
            } else if (count.length > 1) {
                changeNums = changeMonths.replace(count[0], '[0-9]{' + count[0].length + '}').replace(count[1], '[0-9]{' + count[1].length + '}');
            }
            finalEq = changeNums.replace(/(spcl)/g, '[^a-z0-9]');
            return finalEq;
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ monthsEquation ~ err", err);
        }
    }

    regexFormater(data, isCaseInSenitive, isGlobal) {
        try {
            console.log("🚀 ~ file: pattern-generator.js ~ line 93 ~ PatternGenerator ~ regexFormater ~ data, isCaseInSenitive, isGlobal", data, isCaseInSenitive, isGlobal)
            let finalEq = 'Choose valid options and input';
            if (data && data.length) {
                let equation = '';
                data.forEach((item) => {
                    equation += '(' + item + ')|';
                });
                equation = equation.slice(0, -1);
                finalEq = '/' + equation + '/' + isCaseInSenitive + isGlobal;
            }
            return finalEq;
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ regexFormater ~ err", err);
        }
    }

    //    let execRes= [ 'abcd res',
    //   'abcd res',
    //   index: 0,
    //   input: 'abcd res',
    //   groups: undefined ]
    getRegexMethodEq(regexEq, method, keyword, isCase, isGlobal, isReplace) {
        try {
            let result = 'not passed';//for failing cases handle result to undefined or failed something
            console.log("🚀 ~ file: pattern-generator.js ~ line 116 ~ PatternGenerator ~ getRegexMethodEq ~ regexEq, method, keyword, isCase, isGlobal, isReplace", regexEq, method, keyword, isCase, isGlobal, isReplace)
            let stringRegex = regexEq.toString();
            console.log("🚀 ~ file: pattern-generator.js ~ line 98 ~ PatternGenerator ~ getRegexMethodEq ~ stringRegex", stringRegex);
            let filteredRegex = stringRegex.replace(regexExp.startValue, '').replace(regexExp.flagsAtEnd, '');
            console.log("🚀 ~ file: pattern-generator.js ~ line 99 ~ PatternGenerator ~ getRegexMethodEq ~ filteredRegex", filteredRegex);
            let equation;
            if (/(test)|exec/.test(method)) { // 'g' case will fail for test and exec methods
                equation = new RegExp(filteredRegex, `${isCase}`);
            } else {
                equation = new RegExp(filteredRegex, `${isCase + isGlobal}`);
            }
            console.log("🚀 ~ file: pattern-generator.js ~ line 99 ~ PatternGenerator ~ getRegexMethodEq ~ equation", equation);

            switch (method) {
                case 'test':
                    result = equation.test(keyword);
                    break;
                case 'exec':
                    result = equation.exec(keyword) === null ? 'null' : equation.exec(keyword)[0]; // change this result to identify index for exec
                    break;
                case 'match':
                    result = keyword.match(equation) === null ? 'null' : keyword.match(equation)[0]; // change this result to identify index for match
                    break;
                case 'replace':
                    result = keyword.replace(equation, `${isReplace}`);
                    break;
                case 'search':
                    result = keyword.search(equation);
                    break;
                default:
                    break;
            }
            console.log("🚀 ~ file: pattern-generator.js ~ line 131 ~ PatternGenerator ~ getRegexMethodEq ~ result",keyword, result);
            return {
                keyword,
                result
            };
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ getRegexMethodEq ~ err", err);
        }
    }

    validateRegexEquation(keywords, regex, method, isReplaceString, isCase=false, isGlobaly=false) {
        try {
            let isCaseInSenitive = isCase ? 'i' : '';
            let isGlobal = isGlobaly ? 'g' : '';
            console.log("🚀 ~ file: pattern-generator.js ~ line 161 ~ PatternGenerator ~ validateRegexEquation ~ keywords, regex, method, isReplaceString, isCase=false, isGlobaly", keywords, regex, method, isReplaceString, isCaseInSenitive, isGlobal);
            let inputkeys = '';
            let finalRes = [];
            if (regexExp.isArray.test(keywords)) {
                inputkeys = keywords.replace(/^./, '').replace(/.$/, '').split(',');
            } else {
                inputkeys = keywords;
            }

            if (typeof (inputkeys) != 'string') {
                inputkeys.forEach((text) => {
                    let finalEq = this.getRegexMethodEq(regex, method, text, isCaseInSenitive, isGlobal, isReplaceString);
                    finalRes.push(finalEq);
                });
            } else {
                let finalEq = this.getRegexMethodEq(regex, method, inputkeys, isCaseInSenitive, isGlobal, isReplaceString);
                console.log("🚀 ~ file: index.js ~ line 215 ~ testRegexEquation ~ finalEq", finalEq);
                finalRes.push(finalEq);
            }
            return finalRes;
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ validateRegexEquation ~ err", err);

        }
    }

    // inputData,
    // isCase,
    // isGlobal,
    // pattern
    // function getRegexExpression(keywords, isWordFormats = true, isDateFormats = false) {
    getRegexExpression(inputData, pattern, isCase = false, isGlobaly = false) {
        try {
            let isWordFormats = false;
            let isDateFormats = false;
            let isCaseInSenitive = isCase ? 'i' : '';
            let isGlobal = isGlobaly ? 'g' : '';
            console.log("🚀 ~ file: pattern-generator.js ~ line 195 ~ PatternGenerator ~ getRegexExpression ~ inputData, pattern, isCase = false, isGlobaly = false", inputData, pattern, isCaseInSenitive, isGlobal);
            let keywords = inputData;
            let multiplePatterns = [];
            let formedRegex = '';
            let inputkeys = '';

            if (regexExp.words.test(pattern)) {
                isWordFormats = true;
            } else if (regexExp.dates.test(pattern)) {
                isDateFormats = true;
            } else if (regexExp.normal.test(pattern)) {
                isWordFormats = false;
                isDateFormats = false;
            }

            if (regexExp.isArray.test(keywords)) {
                inputkeys = keywords.replace(regexExp.startValue, '').replace(regexExp.endValue, '').split(',');
            } else {
                inputkeys = keywords;
            }

            if (typeof (inputkeys) != 'string') {
                inputkeys.forEach((keyword) => {
                    formedRegex = this.formPattern(keyword, isWordFormats, isDateFormats, isCaseInSenitive);
                    multiplePatterns.push(formedRegex);
                });
                let expression = this.regexFormater(multiplePatterns, isCaseInSenitive, isGlobal);
                return expression;
            } else {
                console.log('entered in one case',inputkeys,isWordFormats,isDateFormats,isCaseInSenitive);
                let filteredInput = inputkeys.replace(/^[\"\']/,'').replace(/[\"\']$/,'');
                formedRegex = this.formPattern(filteredInput, isWordFormats, isDateFormats, isCaseInSenitive);
                const res = formedRegex ? [formedRegex] : undefined;
                console.log("🚀 ~ file: pattern-generator.js ~ line 231 ~ PatternGenerator ~ getRegexExpression ~ res", res)
                return this.regexFormater(res, isCaseInSenitive, isGlobal);
            }
        } catch (err) {
            console.log("🚀 ~ file: pattern-generator.js ~ catch ~ PatternGenerator ~ getRegexExpression ~ err", err);
        }
    }
}

module.exports = PatternGenerator;
