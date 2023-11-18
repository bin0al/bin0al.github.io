//Defining a set of objects for direct lookups from ANSI Escape colors to CSS Styles, and vice-versa.
//The colors chosen are particular to Powershell 6, sourced from https://en.wikipedia.org/wiki/ANSI_escape_code
//Codes 30-37, 40-47, 90-97, and 100-107 are statically defined. However, the others are able to be calculated.
//This AnsiToStyleStatic definition sets these static colors, then the loops afterward define the others as AnsiToStyle.
//These full results will be logged after creation, since this will likely be useful in a lot of scenarios.
const AnsiToStyleStatic = {
    "\\u001b[30m":             "color: rgb(0,0,0)",
    "\\u001b[40m":  "background-color: rgb(0,0,0)",
    "\\u001b[31m":             "color: rgb(128,0,0)",
    "\\u001b[41m":  "background-color: rgb(128,0,0)",
    "\\u001b[32m":             "color: rgb(0,128,0)",
    "\\u001b[42m":  "background-color: rgb(0,128,0)",
    "\\u001b[33m":             "color: rgb(238,237,240)",
    "\\u001b[43m":  "background-color: rgb(238,237,240)",
    "\\u001b[34m":             "color: rgb(0,0,128)",
    "\\u001b[44m":  "background-color: rgb(0,0,128)",
    "\\u001b[35m":             "color: rgb(1,36,86)",
    "\\u001b[45m":  "background-color: rgb(1,36,86)",
    "\\u001b[36m":             "color: rgb(0,128,128)",
    "\\u001b[46m":  "background-color: rgb(0,128,128)",
    "\\u001b[37m":             "color: rgb(192,192,192)",
    "\\u001b[47m":  "background-color: rgb(192,192,192)",
    "\\u001b[90m":             "color: rgb(128,128,128)",
    "\\u001b[100m": "background-color: rgb(128,128,128)",
    "\\u001b[91m":             "color: rgb(255,0,0)",
    "\\u001b[101m": "background-color: rgb(255,0,0)",
    "\\u001b[92m":             "color: rgb(0,255,0)",
    "\\u001b[102m": "background-color: rgb(0,255,0)",
    "\\u001b[93m":             "color: rgb(255,255,0)",
    "\\u001b[103m": "background-color: rgb(255,255,0)",
    "\\u001b[94m":             "color: rgb(0,0,255)",
    "\\u001b[104m": "background-color: rgb(0,0,255)",
    "\\u001b[95m":             "color: rgb(255,0,255)",
    "\\u001b[105m": "background-color: rgb(255,0,255)",
    "\\u001b[96m":             "color: rgb(0,255,255)",
    "\\u001b[106m": "background-color: rgb(0,255,255)",
    "\\u001b[97m":             "color: rgb(255,255,255)",
    "\\u001b[107m": "background-color: rgb(255,255,255)",
};
const StyleToAnsiStatic = {};
for (code in AnsiToStyleStatic) {
    StyleToAnsiStatic[AnsiToStyleStatic[code]] = code;
}
function intToRgb(i) {
    const r = Math.floor(i/36);
    const g = Math.floor((i-(r*36))/6);
    const b = (i-(r*36))-(g*6);
    return `rgb(${r*51},${g*51},${b*51})`;
}
const AnsiToStyle = {};
for (let i=0;i<216;i++) {
    AnsiToStyle[`\\u001b[38:5:${i+16}m`] = `color: ${intToRgb(i)}`;
    AnsiToStyle[`\\u001b[48:5:${i+16}m`] = `background-color: ${intToRgb(i)}`;
}
for (i=0;i<24;i++) {
    const colorNum = Math.floor(i*(255/23));
    const colorStr = `rgb(${colorNum},${colorNum},${colorNum})`;
    AnsiToStyle[`\\u001b[38:5:${i+232}m`] = `color: ${colorStr}`;
    AnsiToStyle[`\\u001b[48:5:${i+232}m`] = `background-color: ${colorStr}`;
}
const StyleToAnsi = {};
for (code in AnsiToStyle) {
    StyleToAnsi[AnsiToStyle[code]] = code;
};
console.log(AnsiToStyle);