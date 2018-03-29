// @flow
import R from 'ramda';

type NewNode = {
  typename: string,
  bytes: string[],
};

type Leaf = {
  typename: string,
};
type Node = {
  matches: Leaf[],
  [nextbyte: string]: Node,
};

const toLeaf = (typename: string) => ({ typename: typename });

const isLeaf = (tree, path) => tree && tree.matches && path.length === 0;
export const merge = (node: NewNode) => (tree: Node) => {
  if (node.bytes.length === 0) return tree;
  const currentKey = R.head(node.bytes); // 0
  const path = R.takeLast(node.bytes.length - 1)(node.bytes); // [1,2]

  const currentTree = tree[currentKey];
  // traversed to end. Just add key to leaf.
  if (isLeaf(currentTree, path)) {
    tree[currentKey] = {
      ...tree[currentKey],
      matches: [...tree[currentKey].matches, toLeaf(node.typename)],
    };
    return tree;
  }

  // Path exists already, Merge subtree
  if (tree[currentKey]) {
    tree[currentKey] = merge(createNode(node.typename, path))(tree[currentKey]);
    return tree;
  }

  // Tree did not exist before
  if (!tree[currentKey]) {
    tree[currentKey] = {
      ...tree[currentKey],
      ...createComplexTree(node.typename, path),
    };
  }
  return tree;
};

export const createNode = (typename: string, bytes: string[]) => {
  return { typename, bytes };
};

export const createComplexTree = (key: string, bytes: string[]): Node => {
  const obj: Node = { matches: [] };
  const currentKey = R.head(bytes); // 0
  const path = R.takeLast(bytes.length - 1)(bytes); // [1,2]
  if (bytes.length === 0) {
    return {
      matches: [toLeaf(key.toLowerCase())],
    };
  }

  if (bytes.length === 0) {
    return {
      matches: [toLeaf(key)],
    };
  }
  obj[currentKey] = createComplexTree(key, path);
  return (obj: Node);
};
