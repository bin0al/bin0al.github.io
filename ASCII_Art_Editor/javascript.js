const defaultBanner = "    _      __   __ __   __       _      __  __      _      U  ___ u \nU  /\"\\  u  \\ \\ / / \\ \\ / /      |\"|   U|' \\/ '|uU  /\"\\  u   \\/\"_ \\/ \n \\/ _ \\/    \\ V /   \\ V /     U | | u \\| |\\/| |/ \\/ _ \\/    | | | | \n / ___ \\   U_|\"|_u U_|\"|_u     \\| |/__ | |  | |  / ___ \\.-,_| |_| | \n/_/   \\_\\    |_|     |_|        |_____||_|  |_| /_/   \\_\\\\_)-\\___/  \n \\\\    >>.-,//|(_.-,//|(_       //  \\\\<<,-,,-.   \\\\    >>     \\\\    \n(__)  (__)\\_) (__)\\_) (__)     (_\")(\"_)(./  \\.) (__)  (__)   (__)   ";
document.getElementById('inText').value = defaultBanner;
//This is dumb, but I couldn't come up with another way to guarantee the non-sequential palette layout I wanted, so I stand by it
function paletteColorOrder(i) {
    if (i < 36) { return i + 16; }
    else if (i < 40) { return i + 196; }
    else if (i < 76) { return i + 12; }
    else if (i < 80) { return i + 160; }
    else if (i < 116) { return i + 8; }
    else if (i < 120) { return i + 124; }
    else if (i < 156) { return i + 4; }
    else if (i < 160) { return i + 88; }
    else if (i < 196) { return i; }
    else if (i < 200) { return i + 52; }
    else if (i < 236) { return i - 4; }
    else if (i < 240) { return i + 16; }
}
const globalState = {
    "curCol": "rgb(0,0,0)",
    "curPalCell": "p-36",
    "colMode": "bg",
    "cWidth": 0,
    "cHeight": 0
};
const paletteArrangement = [];
for (i = 0; i < 240; i++) {
    paletteArrangement.push(paletteColorOrder(i));
}
const paletteContainer = document.getElementById('paletteContainer');
for (i = 0; i < 240; i++) {
    const thisCell = document.createElement('div');
    thisCell.setAttribute('class', 'p-cell');
    thisCell.style.backgroundColor = `${AnsiToStyle[`\\u001b[38;5;${paletteArrangement[i]}m`].replaceAll('color: ', '')}`;
    thisCell.setAttribute('id', `p-${i}`);
    thisCell.setAttribute('onclick', `paletteCellClicked("\\\\u001b[38;5;${paletteArrangement[i]}m", ${i})`);
    paletteContainer.appendChild(thisCell);
}

function artCellClicked(x, y) {
    const thisCell = document.getElementById(`char-${x}-${y}`);
    console.log(globalState);
    console.log(thisCell.getAttribute('style'));
    if (globalState.colMode == 'bg') {
        thisCell.setAttribute('style', thisCell.getAttribute('style').replaceAll(/background-color: rgb\([0-9\,]*\)/g, `background-color: ${globalState.curCol}`));
    } else if (globalState.colMode == 'fg') {
        thisCell.setAttribute('style', thisCell.getAttribute('style').replaceAll(/ color: rgb\([0-9\,]*\)/g, ` color: ${globalState.curCol}`));
    }
    console.log(thisCell.getAttribute('style'));
}

function paletteCellClicked(id, blockNum) {
    const targetBlock = document.getElementById(`p-${blockNum}`);
    targetBlock.setAttribute('class', 'p-cell-selected');
    document.getElementById(globalState.curPalCell).setAttribute('class', 'p-cell');
    globalState.curPalCell = targetBlock.getAttribute('id');
    globalState.curCol = `${AnsiToStyle[`\\u001b[38;5;${paletteArrangement[globalState.curPalCell.replaceAll('p-', '')]}m`].replaceAll('color: ', '')}`;
}

function colorTypeClicked(id) {
    if (id == 'fg') {
        globalState.colMode = 'fg';
        document.getElementById('fg').setAttribute('class', 'ui-button-pressed');
        document.getElementById('bg').setAttribute('class', 'ui-button');
    } else if (id == 'bg') {
        globalState.colMode = 'bg';
        document.getElementById('bg').setAttribute('class', 'ui-button-pressed');
        document.getElementById('fg').setAttribute('class', 'ui-button');
    }
}

function loadAndRebuildArt(inString) {
    document.getElementById('artCellGrid').remove();
    const inTextArr = inString.split('\n');
    const heightCt = inTextArr.length;
    let widthCt = 0;
    inTextArr.forEach(line => {
        if (line.length > widthCt) {
            widthCt = line.length;
        }
    });
    const normalizedLines = [];
    inTextArr.forEach(line => {
        normalizedLines.push(`${line}`);
    });
    globalState.cWidth = widthCt;
    globalState.cHeight = heightCt;
    //Base char width 8px, height 12px, or 2:3
    const baseWidth = widthCt * 2;
    const baseHeight = heightCt * 3;
    const containerAspect = `${baseWidth} / ${baseHeight}`;
    const artCellGrid = document.createElement('div');
    artCellGrid.setAttribute("id", "artCellGrid");
    artCellGrid.setAttribute("style", `display: grid; grid-template-columns: repeat(${widthCt}, 1fr); grid-template-rows: repeat(${heightCt}, 1fr); aspect-ratio: ${containerAspect}; width: 100%; `);
    for (y = 0; y < heightCt; y++) {
        for (x = 0; x < widthCt; x++) {
            const thisCell = document.createElement("div");
            thisCell.setAttribute("class", "a-cell");
            thisCell.setAttribute("id", `char-${x}-${y}`);
            thisCell.setAttribute("onclick", `artCellClicked(${x},${y})`);
            thisCell.setAttribute("style", `background-color: rgb(0,0,0); color: rgb(255,255,255); font-size: ${(100 / widthCt) * 1.5}vw`);
            thisCell.appendChild(document.createTextNode(normalizedLines[y][x] || ' '));
            artCellGrid.appendChild(thisCell);
        }
    }
    document.getElementById('artContainer').appendChild(artCellGrid);
}
let loadButtonPressed = false;
function loadClicked() {
    const inTextArea = document.getElementById('inText');
    const loadButton = document.getElementById('loadButton');
    if (!loadButtonPressed) {
        loadButton.setAttribute('class', 'ui-button-pressed');
        loadButtonPressed = true;
        setTimeout(() => {
            document.getElementById('loadButton').setAttribute('class', 'ui-button');
            loadButtonPressed = false;
        }, 500);
    }
    const inText = inTextArea.value.replaceAll('&gt;', '>').replaceAll('&lt;', '<');
    console.log(inText);
    loadAndRebuildArt(inText);
}

function formattedArtString() {
    let outString = '';
    for (y = 0; y < globalState.cHeight; y++) {
        for (x = 0; x < globalState.cWidth; x++) {
            const currentCell = document.getElementById(`char-${x}-${y}`);
            const cellStyle = currentCell.getAttribute('style');
            const fgCol = StyleToAnsi[cellStyle.match(/background-color: rgb\([0-9\,]*\)/)[0]];
            const bgCol = StyleToAnsi[cellStyle.match(/ color: rgb\([0-9\,]*\)/)[0].replaceAll(' color: ', 'color: ')];
            const char = currentCell.innerHTML.replace('&gt;', '>').replace('&lt;', '<')
            outString = `${outString}${fgCol}${bgCol}${char}`
        }
        outString = `${outString}\n`;
    }
    return outString;
}

function saveClicked() {
    outString = formattedArtString();
    const downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outString));
    downloadElement.setAttribute('download', 'exportedBanner.txt');
    downloadElement.style.display = 'none';
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
}

function copyClicked() {
    outString = formattedArtString();
}

document.getElementById(globalState.curPalCell).setAttribute('class', 'p-cell-selected');
loadClicked();