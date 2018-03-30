import {type Node} from './tree';
import patternTree from './pattern-tree.snapshot';

const hex = num => new Number(num).toString(16).toLowerCase();
const toHex = num => `0x${hex(num).length === 1 ? '0' + hex(num) : hex(num)}`;

export const filetypeinfo = (bytes: number[]): Leaf => {
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
    if (step && step.matches) {
      guessFile = step.matches;
    }
    currentByteIndex += 1;
  }
  return [];
};
export default filetypeinfo;

export const filetypename = (bytes: any[]): string[] => filetypeinfo(bytes).map(e => e.typename)
export const filetypemime = (bytes: any[]): string[] => filetypeinfo(bytes).map(e => e.mime ? e.mime : "")
export const filetypeextension = (bytes: any[]): string[] => filetypeinfo(bytes).map(e => e.extension ? e.extension : "")