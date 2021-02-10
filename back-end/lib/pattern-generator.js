const regexExp = require('../utils/knowledge-base');
class PatternGenerator {
    keyGenerator(keyword, isWordFormats, isDateFormats) {
        let pattern = undefined;
        if (isWordFormats) { //?! handle abc123 case..it shld be may be covered in other case check...
            console.log('entered in words format****************************')
            pattern = keyword.replace(/[^a-z0-9]/ig, '[^a-z0-9]+'); //special chars check for single or not
        } else if (isDateFormats) {
            if (/^[0-9\/\s\-\.\,]+$/.test(keyword)) { // all number dates
                pattern = datesEquation(keyword);
            } else if (regexExp.monthsRegex.test(keyword)) { // all alpha numeric dates
                pattern = monthsEquation(keyword);
            }
        } else {
            if (/^\d+$/g.test(keyword)) { // Digit cases
                if (keyword.length === 1) {
                    pattern = '^[0-9]$';
                } else {
                    pattern = '^[0-9]+$';
                }
            } else if (/^[a-z]+$/ig.test(keyword)) { // Alphabet cases
                if (keyword.length === 1) {
                    pattern = '^[a-z]$';
                } else {
                    pattern = '^[a-z]+$';
                }
            } else if (/^[^a-z0-9]+$/ig.test(keyword)) { // special chars case
                pattern = '^[^a-z0-9]+$';
            } else if (/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/ig.test(keyword)) { // Alpha numneric cases
                pattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
            } else if (/^(?=.*[a-z])(?=.*[0-9])[a-z0-9-.\/!@#$%^&*\(\).~`\s]+$/ig.test(keyword)) { // Alpha numneric specialchars cases
                pattern = '^(?=.*[a-z])(?=.*[0-9])[a-z0-9-.\/!@#$%^&*\(\).~`\s]+$';
            } else if (/^[0-9.,\-\+]+$/g.test(keyword)) { //Amounts case
                pattern = '^[0-9.,\-\+]+$';
            } else if (/^[a-z-.\/!@#$%^&*\(\)\s.~`]+$/ig.test(keyword)) { // Alpha specialcharacters cases
                pattern = '^[a-z-.\/!@#$%^&*\(\).~`]+$';
            } else if (/^[0-9-.\/!@#$%^&*\(\).~`\s]+$/) { // digits Secial chars case
                pattern = '^[0-9-.\/!@#$%^&*\(\).~`]+$';
            }

        }
        // console.log("🚀 ~ file: regexGenerator.js ~ line 22 ~ keyGenerator ~ equation-------->", pattern);
        return pattern;
    };

    datesEquation(keyword) {
        let finalEquation = '';
        let filteredKey = keyword.replace(/[^a-z0-9]+/g, '[^a-z0-9]');
        let numbersArray = filteredKey.split('[^a-z0-9]');
        let formedRegex = []
        numbersArray.forEach((item) => {
            formedRegex.push('[0-9]' + '{' + `${item.length}` + '}');
        })
        let replacedDate = keyword.replace(/[0-9]+/g, 'date');
        let modified_date = replacedDate.replace(/[^a-z0-9]+/g, '[^a-z0-9]');
        // loop here
        finalEquation += modified_date.replace('date', formedRegex[0]).replace('date', formedRegex[1]).replace('date', formedRegex[2]);
        return finalEquation;
    }

    monthsEquation(keyword) {
        let finalEq = '';
        let changeNums = '';
        let spclKey = keyword.replace(/[^a-z0-9]/g, 'spcl');
        let changeMonths = spclKey.replace(regexExp.monthsRegex, `${regexExp.monthsEq}`);
        let count = changeMonths.match(/[0-9]+/g);
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
            // console.log("🚀 ~ file: regexGenerator.js ~ line 46 ~ regexFormater ~ finalEq", finalEq);
        }
        return finalEq;
    }

    getRegexMethodEq(regexEq, value, keyword, isCase, isGlobal, isReplace) {
        let eq = '';
        let filteredRegex = regexEq.replace(/^./, '').replace(/((\/i?g?))$/, '');
        let patternValue = value.value;
        console.log("🚀 ~ file: index.js ~ line 159 ~ getRegexMethodEq ~ regexEq", filteredRegex, typeof filteredRegex);
        let equation = new RegExp(filteredRegex, `${isCase+isGlobal}`);
        console.log("🚀 ~ file: index.js ~ line 159 ~ getRegexMethodEq ~ regexEq--", equation, keyword, patternValue);
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
        console.log('switch case=======', eq);
        return {
            keyword,
            eq
        };
    }

    testRegexEquation(data) {
        let isCaseSenitive = data.isCase ? 'i' : ''; //change
        let isGlobal = data.isGlobal ? 'g' : '';
        let keywords = data.inputData;
        // let testEquation = getRegexMethodEq(data.regexEq, data.method);
        // console.log("🚀 ~ file: index.js ~ line 191 ~ testRegexEquation ~ testEquation", testEquation);
        let inputkeys = '';
        let finalRes = [];
        if (/\[.*\]/.test(keywords)) {
            inputkeys = keywords.replace(/^./, '').replace(/.$/, '').split(',');
        } else {
            inputkeys = keywords;
        }

        if (typeof (inputkeys) != 'string') {
            inputkeys.forEach((text) => {
                let finalEq = getRegexMethodEq(data.regexEq, data.method, text, isCaseSenitive, isGlobal, data.isReplace);
                finalRes.push(finalEq);
            })
        } else {
            console.log('##################################', data.isReplace)
            let finalEq = getRegexMethodEq(data.regexEq, data.method, inputkeys, isCaseSenitive, isGlobal, data.isReplace);
            console.log("🚀 ~ file: index.js ~ line 215 ~ testRegexEquation ~ finalEq", finalEq);
            finalRes.push(finalEq);
        }
        console.log("🚀 ~ file: index.js ~ line 215 ~ testRegexEquation ~ finalRes", finalRes);
        return finalRes;
    }
    // inputData,
    // isCase,
    // isGlobal,
    // isWords
    // function regexEquation(keywords, isWordFormats = true, isDateFormats = false) {
    regexEquation(data) {
        // console.log("🚀 ~ file: index.js ~ line 154 ~ regexEquation ~ data", data);
        let isWordFormats = false;
        let isDateFormats = false;
        let isCaseSenitive = data.isCase ? 'i' : '';
        let isGlobal = data.isGlobal ? 'g' : '';
        if (/words/i.test(data.isWords)) {
            // console.log("🚀 ~ file:%%%%%%%%%%%%%%%%%%%%%%%", isWordFormats);
            isWordFormats = true;
        } else if (/dates/i.test(data.isWords)) {
            isDateFormats = true;
        } else if (/normal/i.test(data.isWords)) {
            isWordFormats = false;
            isDateFormats = false;
        }
        let keywords = data.inputData;
        let multiplePatterns = [];
        let formedRegex = '';
        let input = '';
        // console.log("🚀 ~ file: index.js ~ line 150 ~ regexEquation ~ input type&&&&&&&&", typeof (input), input);
        if (/\[.*\]/.test(keywords)) {
            // console.log("🚀 ~ ________----------------------- ~ keywords", keywords)
            input = keywords.replace(/^./, '').replace(/.$/, '').split(',');
        } else {
            input = keywords;
        }
        if (typeof (input) != 'string') {
            input.forEach((keyword) => {
                formedRegex = keyGenerator(keyword, isWordFormats, isDateFormats);
                multiplePatterns.push(formedRegex);
            })
            // console.log("🚀 ~ file: regexGenerator.js ~ line 53 ~ regexEquation ~ finalRegex", multiplePatterns);
            let expression = regexFormater(multiplePatterns, isCaseSenitive, isGlobal);
            return expression;
        } else {
            console.log('entered in one case');
            formedRegex = keyGenerator(input, isWordFormats, isDateFormats);
            const res = formedRegex ? [formedRegex] : undefined;
            return regexFormater(res, isCaseSenitive, isGlobal);
        }
    }

}

module.exports = PatternGenerator;
