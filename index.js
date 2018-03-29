import patternTree from './src/pattern-tree.snapshot'
const fs = require('fs');

const hex = num => new Number(num).toString(16).toLowerCase();
const toHex = num => `0x${hex(num).length === 1 ? '0' + hex(num) : hex(num)}`;

export const filetype = (bytes: number[]) => {
    let currentByteIndex = 0;
    let foundForSure = false;
    let guessFile = null;
    const t = patternTree;
    let step = t;
    while (!foundForSure) {

        // TODO STEP THROUGH WILDCARD
        const currentByte = toHex(bytes[currentByteIndex]);
        // There is ? ONLY! PROTENTIAL BUG?
        if(step['?'] && Object.keys(step).length === 1) {
            step = step['?'];
        } else {
            step = step[currentByte];
        }

        if(!step) {
            return guessFile;
        }
        if (step && step.key) {
            guessFile = step.key;
        }
        currentByteIndex += 1;
    }
}