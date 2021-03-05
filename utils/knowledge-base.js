module.exports = { // removed g flag for normal case...
    monthsEq: '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)',
    monthsRegex: /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)/i,
    monthsRegexGlobal: /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)/ig,
    words: /words/i,
    dates: /dates/i,
    normal: /normal/i,
    isArray: /\[.*\]/,
    startValue: /^./,
    endValue: /.$/,
    specialChars: /[^a-z0-9]+/ig,
    digits: /^[0-9\/\s\-\.\,]+$/,
    strictDigit: /[0-9]+/g,
    flagsAtEnd: /((\/i?g?)|(\/g?i?))$/,
    onlyDigits: /^\d+$/,
    strictAlphabets: /^[a-z]+$/i,
    strictSpecialChars: /^[^a-z0-9]+$/i,
    alphaNumeric: /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/i,
    alphaNumericWithSpecialChars: /^(?=.*[a-z])(?=.*[0-9]).*$/i, // /^(?=.*[a-z])(?=.*[0-9])[a-z0-9\\W]+$/i
    amounts: /^[0-9.,\-\+]+$/,
    alphaSpecialChars: /^[a-z-.\/!@#$%^&*\(\)\s.~`]+$/i,
    digitsSpecialChars: /^[0-9-.\/!@#$%^&*\(\).~\`\\s]+$/
};