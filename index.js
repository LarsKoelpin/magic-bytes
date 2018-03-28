import tree from './src/pattern-tree'
const fs = require('fs');

const hex = num => new Number(num).toString(16).toLowerCase();
const toHex = num => `0x${hex(num).length === 1 ? '0' + hex(num) : hex(num)}`;

const guessFile = (bytes: number[]) => {
    let currentByteIndex = 0;
    let foundForSure = false;
    let guessFile = null;
    const t = tree();
    let step = t;
    while (!foundForSure) {
        const currentByte = toHex(bytes[currentByteIndex]);
        step = step[currentByte];

        if(!step) {
            console.log("No next step")
            return guessFile;
        }
        console.log("Current byte from file: " + currentByte);
        console.log("Tree Left: " + JSON.stringify(step));

        if (step && step.key) {
            guessFile = step.key;
        }
        currentByteIndex += 1;
    }
}

fs.open('./gif.gif', 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    // TODO
    var buffer = new Buffer(100);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer)
        console.log(guessFile(buffer))

    });
});