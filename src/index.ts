import { createTree, add } from "./model/pattern-tree";
import { fromHex, toHex } from "./model/toHex";
import { GuessedFile, Node, Tree, Info } from "./model/tree";

const patternTree = createTree();

export const filetypeinfo = (
  bytes: number[] | Uint8Array | Uint8ClampedArray
): GuessedFile[] => {
  const tree: Tree = patternTree;
  const found: GuessedFile[] = [];
  // Every offset is checked, and the offset-less patterns on top of them. A file
  // matching at one offset may well match at another one too - reporting only the
  // first hit would hide the remaining types from callers validating uploads.
  for (const k of Object.keys(tree.offset)) {
    const offset = fromHex(k);
    const offsetExceedsFile = offset >= bytes.length;
    if (offsetExceedsFile) {
      continue;
    }
    const node: Node = tree.offset[k];
    found.push(...walkTree(offset, bytes, node));
  }
  if (tree.noOffset !== null) {
    found.push(...walkTree(0, bytes, tree.noOffset));
  }
  return unique(found);
};

// The nodes hold the only copy of their matches, so they are cloned on the way out.
// Handing out the originals lets a caller mutating a result corrupt every later
// detection in the process.
const unique = (found: GuessedFile[]): GuessedFile[] => {
  const seen = new Set<string>();
  const result: GuessedFile[] = [];
  for (const guess of found) {
    const key = JSON.stringify([guess.typename, guess.mime, guess.extension]);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push({ ...guess });
  }
  return result;
};

const walkTree = (
  index: number,
  bytes: number[] | Uint8Array | Uint8ClampedArray,
  node: Node
): GuessedFile[] => {
  let step: Node = node;
  let guessFile: GuessedFile[] = [];
  while (true) {
    if (index >= bytes.length) {
      return guessFile;
    }
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
