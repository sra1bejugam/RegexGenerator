const regexExp = require('../utils/knowledge-base');
class PatternGenerator {

    keyGenerator(keyword, isWordFormats, isDateFormats) {
        let pattern = undefined;
        if (isWordFormats) { //?! handle abc123 case..it shld be may be covered in other case check...
            pattern = keyword.replace(regexExp.specialChars, '[^a-z0-9]+'); //special chars check for single or not
        } else if (isDateFormats) {
            if (regexExp.digits.test(keyword)) { // all number dates
                pattern = this.datesEquation(keyword);
            } else if (regexExp.months.test(keyword)) { // all alpha numeric dates
                pattern = this.monthsEquation(keyword);
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
        console.log("🚀 ~ file: pattern-generator.js ~ line 76 ~ PatternGenerator ~ regexFormater ~ isGlobal", isGlobal)
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

    //    let execRes= [ 'abcd res',
    //   'abcd res',
    //   index: 0,
    //   input: 'abcd res',
    //   groups: undefined ]
    
    getRegexMethodEq(regexEq, method, keyword, isCase, isGlobal, isReplace) {
        let eq = '';
        console.log("🚀 ~ file: pattern-generator.js ~ line 96 ~ PatternGenerator ~ getRegexMethodEq ~ isCase", isCase,isGlobal,keyword)
        console.log("🚀 ~ file: pattern-generator.js ~ line 97 ~ PatternGenerator ~ getRegexMethodEq ~ regexEq", regexEq)
        let stringRegex = regexEq.toString();
        console.log("🚀 ~ file: pattern-generator.js ~ line 98 ~ PatternGenerator ~ getRegexMethodEq ~ stringRegex", stringRegex)
        let filteredRegex = stringRegex.replace(regexExp.startValue, '').replace(regexExp.flagsAtEnd, '');
        console.log("🚀 ~ file: pattern-generator.js ~ line 99 ~ PatternGenerator ~ getRegexMethodEq ~ filteredRegex", filteredRegex)
        let equation = new RegExp(filteredRegex, `${isCase + isGlobal}`);
        console.log("🚀 ~ file: pattern-generator.js ~ line 99 ~ PatternGenerator ~ getRegexMethodEq ~ equation", equation);
        console.log("🚀 ~ file: pattern-generator.js ~ line 106 ~ PatternGenerator ~ exec Eq", equation.exec(keyword));

        switch (method) {
            case 'test':
                eq = equation.test(keyword);
                break;
            case 'exec':
                eq = equation.exec(keyword) === null ? 'null': equation.exec(keyword)[0]; // change this eq to identify index for exec
                break;
            case 'match':
                eq = keyword.match(equation)=== null ? 'null' : keyword.match(equation)[0]; // change this eq to identify index for match
                break;
            case 'replace':
                eq = keyword.replace(equation, `${isReplace}`);
                break;
            case 'search':
                eq = keyword.search(equation);
                break;
            default:
                break;
        }
        console.log("🚀 ~ file: pattern-generator.js ~ line 131 ~ PatternGenerator ~ getRegexMethodEq ~ eq", eq);
        return {
            keyword,
            eq
        };
    }

    validateRegexEquation(keywords, isCase, isGlobaly, regex, method, isReplaceString) {
        let isCaseSenitive = isCase ? 'i' : '';
        let isGlobal = isGlobaly ? 'g' : '';
        let inputkeys = '';
        let finalRes = [];
        if (regexExp.isArray.test(keywords)) {
            inputkeys = keywords.replace(/^./, '').replace(/.$/, '').split(',');
        } else {
            inputkeys = keywords;
        }

        if (typeof (inputkeys) != 'string') {
            inputkeys.forEach((text) => {
                let finalEq = this.getRegexMethodEq(regex, method, text, isCaseSenitive, isGlobal, isReplaceString);
                finalRes.push(finalEq);
            })
        } else {
            let finalEq = this.getRegexMethodEq(regex, method, inputkeys, isCaseSenitive, isGlobal, isReplaceString);
            console.log("🚀 ~ file: index.js ~ line 215 ~ testRegexEquation ~ finalEq", finalEq);
            finalRes.push(finalEq);
        }
        return finalRes;
    }

    // inputData,
    // isCase,
    // isGlobal,
    // isWords
    // function regexEquation(keywords, isWordFormats = true, isDateFormats = false) {
    regexEquation(inputData, isCase, isGlobaly, isWords) {
        let isWordFormats = false;
        let isDateFormats = false;
        let isCaseSenitive = isCase ? 'i' : '';
        let isGlobal = isGlobaly ? 'g' : '';
        console.log("🚀 ~ file: pattern-generator.js ~ line 164 ~ PatternGenerator ~ regexEquation ~ isGlobal", isGlobal)
        let keywords = inputData;
        let multiplePatterns = [];
        let formedRegex = '';
        let inputkeys = '';

        if (regexExp.words.test(isWords)) {
            isWordFormats = true;
        } else if (regexExp.dates.test(isWords)) {
            isDateFormats = true;
        } else if (regexExp.normal.test(isWords)) {
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
                formedRegex = this.keyGenerator(keyword, isWordFormats, isDateFormats);
                multiplePatterns.push(formedRegex);
            });
            let expression = this.regexFormater(multiplePatterns, isCaseSenitive, isGlobal);
            return expression;
        } else {
            console.log('entered in one case');
            formedRegex = this.keyGenerator(inputkeys, isWordFormats, isDateFormats);
            const res = formedRegex ? [formedRegex] : undefined;
            return this.regexFormater(res, isCaseSenitive, isGlobal);
        }
    }
}
module.exports = PatternGenerator;
