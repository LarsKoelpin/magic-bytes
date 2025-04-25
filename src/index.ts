import { createTree, add } from "./model/pattern-tree";
import { fromHex, toHex } from "./model/toHex";
import { GuessedFile, Node, Tree, Info } from "./model/tree";

const patternTree = createTree();

export const filetypeinfo = (
  bytes: number[] | Uint8Array | Uint8ClampedArray
): GuessedFile[] => {
  let tree: Tree = patternTree;
  for (const k of Object.keys(tree.offset)) {
    const offset = fromHex(k);
    const offsetExceedsFile = offset >= bytes.length;
    if (offsetExceedsFile) {
      continue;
    }
    const node: Node = (patternTree as any).offset[k];
    const guessed = walkTree(offset, bytes, node);
    if (guessed.length > 0) {
      return guessed;
    }
  }
  if (tree.noOffset === null) {
    return [];
  }
  return walkTree(0, bytes, tree.noOffset);
};

const walkTree = (
  index: number,
  bytes: number[] | Uint8Array | Uint8ClampedArray,
  node: Node
): GuessedFile[] => {
  let step: Node = node;
  let guessFile: GuessedFile[] = [];
  while (true) {
    const currentByte = toHex(bytes[index]);
    if (step.bytes["?"] && !step.bytes[currentByte]) {
      step = step.bytes["?"];
    } else {
      step = step.bytes[currentByte];
    }
    if (!step) {
      return guessFile;
    }
    if (step && step.matches) {
      guessFile = step.matches.slice(0);
    }
    index += 1;
  }
};

export default filetypeinfo;

export const filetypename = (
  bytes: number[] | Uint8Array | Uint8ClampedArray
): string[] => filetypeinfo(bytes).map((e) => e.typename);

export const filetypemime = (
  bytes: number[] | Uint8Array | Uint8ClampedArray
): string[] =>
  filetypeinfo(bytes)
    .map((e) => (e.mime ? e.mime : null))
    .filter((x) => x !== null) as string[];

export const filetypeextension = (
  bytes: number[] | Uint8Array | Uint8ClampedArray
): string[] =>
  filetypeinfo(bytes)
    .map((e) => (e.extension ? e.extension : null))
    .filter((x) => x !== null) as string[];

export const register = (
  typename: string,
  signature: string[],
  additionalInfo?: Info | undefined,
  offset?: number
) => {
  add(typename, signature, additionalInfo, offset);
}
