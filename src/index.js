import patternTree from './pattern-tree.snapshot';

const hex = num => new Number(num).toString(16).toLowerCase();
const toHex = num => `0x${hex(num).length === 1 ? '0' + hex(num) : hex(num)}`;

export const filetype = (bytes: number[]) => {
  let currentByteIndex = 0;
  let guessFile = [];
  let step = patternTree;
  while (true) {
    const currentByte = toHex(bytes[currentByteIndex]);
    if (step['?'] && !step[currentByte]) {
      step = step['?'];
    } else {
      step = step[currentByte];
    }

    if (!step) {
      return guessFile;
    }
    if (step && step.key) {
      guessFile = step.key;
    }
    currentByteIndex += 1;
  }
  return [];
};
export default filetype;
