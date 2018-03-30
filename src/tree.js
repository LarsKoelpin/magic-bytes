// @flow
type NewNode = {
  typename: string,
  bytes: string[],
};

type Leaf = {
  typename: string,
};
export type Node = {
  matches?: Leaf[],
  [nextbyte: string]: Node,
};

const toLeaf = (typename: string) => ({ typename: typename });

const isLeaf = (tree, path) => tree && tree.matches && path.length === 0;

const head = (arr: any[]) => arr[0];
const tail = (arr: any[]) => arr.slice(1, arr.length);

export const merge = (node: NewNode) => (tree: Node) => {
  if (node.bytes.length === 0) return tree;
  const currentKey = head(node.bytes); // 0
  const path = tail(node.bytes); // [1,2]

  const currentTree = tree[currentKey];
  // traversed to end. Just add key to leaf.
  if (isLeaf(currentTree, path)) {
    tree[currentKey] = {
      ...tree[currentKey],
      matches: [...currentTree.matches ? currentTree.matches : [], toLeaf(node.typename)],
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
  const obj = {};
  const currentKey = head(bytes); // 0
  const path = tail(bytes); // [1,2]
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
