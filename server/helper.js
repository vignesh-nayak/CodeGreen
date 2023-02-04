
const getNumbers = (numberOfNumbers) => {
    let tempArr = new Set([]);
    while (tempArr.size !== numberOfNumbers + 1) {
        const num = Math.floor(Math.random() * 10);
        tempArr.add(num);
    }
    return [...tempArr];
}

const getColors = (UIarr, DBarr) => {
    const tempArr = [];
    for (let index = 0; index < UIarr.length; index++) {
        if (UIarr[index] === DBarr[index]) {
            tempArr.push('G');
            // tempArr[index] = 'G'; using index for more help for player.
            UIarr[index] = -1;
        }
    }
    for (let index = 0; index < UIarr.length; index++) {
        if (DBarr.includes(UIarr[index])) {
            tempArr.push('B');
            UIarr[index] = -1;
        }
    }
    while (tempArr.length !== DBarr.length) {
        tempArr.push('N');
    }
    return tempArr;
}

const getCorrectSequence = (arr) => {
    return [parseInt(arr.inputOne, 10), parseInt(arr.inputTwo, 10), parseInt(arr.inputThree, 10), parseInt(arr.inputFour, 10), parseInt(arr.inputFive, 10), parseInt(arr.inputSix, 10), parseInt(arr.inputSeven, 10), parseInt(arr.inputEight, 10)]
}

module.exports = {
    getNumbers,
    getColors,
    getCorrectSequence
}