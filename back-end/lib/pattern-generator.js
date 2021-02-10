const regexExp = require('../utils/knowledge-base');
class PatternGenerator {

    keyGenerator(keyword, isWordFormats, isDateFormats) {
        let pattern = undefined;
        if (isWordFormats) { //?! handle abc123 case..it shld be may be covered in other case check...
            pattern = keyword.replace(regexExp.specialChars, '[^a-z0-9]+'); //special chars check for single or not
        } else if (isDateFormats) {
            if (regexExp.digits.test(keyword)) { // all number dates
                pattern = datesEquation(keyword);
            } else if (regexExp.months.test(keyword)) { // all alpha numeric dates
                pattern = monthsEquation(keyword);
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
                pattern = '^(?=.*[a-z])(?=.*[0-9])[a-z0-9-.\/!@#$%^&*\(\).~`\s]+$';
            } else if (regexExp.amounts.test(keyword)) { //Amounts case
                pattern = '^[0-9.,\-\+]+$';
            } else if (regexExp.alphaSpecialChars.test(keyword)) { // Alpha specialcharacters cases
                pattern = '^[a-z-.\/!@#$%^&*\(\).~`]+$';
            } else if (regexExp.digitsSpecialChars.test(keyword)) { // digits Secial chars case
                pattern = '^[0-9-.\/!@#$%^&*\(\).~`]+$';
            }
        }
        return pattern;
    }

    datesEquation(keyword) {
        let finalEquation = '';
        let filteredKey = keyword.replace(regexExp.specialChars, '[^a-z0-9]');
        let numbersArray = filteredKey.split('[^a-z0-9]');
        let formedRegex = []
        numbersArray.forEach((item) => {
            formedRegex.push('[0-9]' + '{' + `${item.length}` + '}');
        })
        let replacedDate = keyword.replace(regexExp.strictDigit, 'date');
        let modified_date = replacedDate.replace(regexExp.specialChars, '[^a-z0-9]');
        // loop here
        finalEquation += modified_date.replace('date', formedRegex[0]).replace('date', formedRegex[1]).replace('date', formedRegex[2]);
        return finalEquation;
    }

    monthsEquation(keyword) {
        let finalEq = '';
        let changeNums = '';
        let spclKey = keyword.replace(regexExp.specialChars, 'spcl');
        let changeMonths = spclKey.replace(regexExp.monthsRegex, `${regexExp.monthsEq}`);
        let count = changeMonths.match(regexExp.strictDigit / g);
        // loop here
        if (count && count.length === 1) {
            changeNums = changeMonths.replace(count[0], '[0-9]{' + count[0].length + '}');
        } else if (count.length > 1) {
            changeNums = changeMonths.replace(count[0], '[0-9]{' + count[0].length + '}').replace(count[1], '[0-9]{' + count[1].length + '}');
        }
        finalEq = changeNums.replace(/(spcl)/g, '[^a-z0-9]');
        return finalEq;
    }

    regexFormater(data, isCaseSenitive, isGlobal) {
        let finalEq = 'Choose valid options and input';
        if (data && data.length) {
            let equation = '';
            data.forEach((item) => {
                equation += '(' + item + ')|';
            })
            equation = equation.slice(0, -1);
            finalEq = '/' + equation + '/' + isCaseSenitive + isGlobal;
        }
        return finalEq;
    }

    getRegexMethodEq(regexEq, value, keyword, isCase, isGlobal, isReplace) {
        let eq = '';
        let filteredRegex = regexEq.replace(regexEq.startValue, '').replace(regexEq.flagsAtEnd, '');
        let patternValue = value.value;
        let equation = new RegExp(filteredRegex, `${isCase+isGlobal}`);
        //    let execRes= [ 'abcd res',
        //   'abcd res',
        //   index: 0,
        //   input: 'abcd res',
        //   groups: undefined ]
        switch (patternValue) { // handle cases for match
            case 'exec': {
                eq = equation.exec(keyword);
                console.log("🚀 ~ file: index.js ~ line 176 ~ getRegexMethodEq ~ exec", eq);
                break;
            }
            case 'test': { // perfect
                eq = equation.test(keyword);
                break;
            }
            case 'match': {
                let matchedRes = keyword.match(equation);
                eq = keyword.match(equation);
                break;
            }
            case 'replace': { //perfect
                eq = keyword.replace(equation, `${isReplace}`);
                break;
            }
            case 'search': { //perfect
                eq = keyword.search(equation);
                break;
            }
            default:
                break;
        }
        return {
            keyword,
            eq
        };
    }

    //?! Ask and remove the redundent code

    // testRegexEquation(data) {
    //     let isCaseSenitive = data.isCase ? 'i' : ''; //change
    //     let isGlobal = data.isGlobal ? 'g' : '';
    //     let keywords = data.inputData;
    //     // console.log("🚀 ~ file: index.js ~ line 191 ~ testRegexEquation ~ testEquation", testEquation);
    //     let inputkeys = '';
    //     let finalRes = [];
    //     if (regexExp.isArray.test(keywords)) {
    //         inputkeys = keywords.replace(/^./, '').replace(/.$/, '').split(',');
    //     } else {
    //         inputkeys = keywords;
    //     }

    //     if (typeof (inputkeys) != 'string') {
    //         inputkeys.forEach((text) => {
    //             let finalEq = getRegexMethodEq(data.regexEq, data.method, text, isCaseSenitive, isGlobal, data.isReplace);
    //             finalRes.push(finalEq);
    //         })
    //     } else {
    //         let finalEq = getRegexMethodEq(data.regexEq, data.method, inputkeys, isCaseSenitive, isGlobal, data.isReplace);
    //         console.log("🚀 ~ file: index.js ~ line 215 ~ testRegexEquation ~ finalEq", finalEq);
    //         finalRes.push(finalEq);
    //     }
    //     return finalRes;
    // }

    // inputData,
    // isCase,
    // isGlobal,
    // isWords
    // function regexEquation(keywords, isWordFormats = true, isDateFormats = false) {
    regexEquation(inputData, isCase, isGlobal, isWords, testRegex = false) {
        let isWordFormats = false;
        let isDateFormats = false;
        let isCaseSenitive = isCase ? 'i' : '';
        let isGlobally = isGlobal ? 'g' : '';
        let keywords = inputData;
        let multiplePatterns = [];
        let formedRegex = '';
        let inputkeys = '';
        if (!testRegex) {
            if (regexExp.words.test(isWords)) {
                isWordFormats = true;
            } else if (regexExp.dates.test(isWords)) {
                isDateFormats = true;
            } else if (regexExp.normal.test(isWords)) {
                isWordFormats = false;
                isDateFormats = false;
            }
        }

        if (regexExp.isArray.test(keywords)) {
            inputkeys = keywords.replace(regexExp.startValue, '').replace(regexExp.endValue, '').split(',');
        } else {
            inputkeys = keywords;
        }

        if (typeof (inputkeys) != 'string') {
            inputkeys.forEach((keyword) => {
                if (testRegex) {
                    formedRegex = getRegexMethodEq(data.regexEq, data.method, text, isCaseSenitive, isGlobal, data.isReplace);
                } else {
                    formedRegex = keyGenerator(keyword, isWordFormats, isDateFormats);
                }
                multiplePatterns.push(formedRegex);
            });
            if (testRegex) {
                return multiplePatterns;
            } else {
                let expression = regexFormater(multiplePatterns, isCaseSenitive, isGlobally);
                return expression;
            }
        } else {
            console.log('entered in one case');
            if (testRegex) {
                formedRegex = getRegexMethodEq(data.regexEq, data.method, inputkeys, isCaseSenitive, isGlobal, data.isReplace);
                multiplePatterns.push(formedRegex);
                return multiplePatterns;
            } else {
                formedRegex = keyGenerator(inputkeys, isWordFormats, isDateFormats);
                const res = formedRegex ? [formedRegex] : undefined;
                return regexFormater(res, isCaseSenitive, isGlobal);
            }
        }
    }
}
module.exports = PatternGenerator;
