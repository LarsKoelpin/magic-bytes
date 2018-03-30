// @flow

type PathlessNewNode = {
  info: Info;
  typename: string;
}

type NewNode = PathlessNewNode & {
  bytes: string[],
};

type Leaf = Info & {
  typename: string,
};

export type Info = {
  mime?: string;
  extension?: string;
}

export type Node = {
  matches?: Leaf[],
  [nextbyte: string]: Node,
};

const toLeaf = (leaf: PathlessNewNode) => ({typename: leaf.typename, mime: leaf.info.mime, extension: leaf.info.extension})

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
      matches: [...currentTree.matches ? currentTree.matches : [], toLeaf(node)],
    };
    return tree;
  }

  // Path exists already, Merge subtree
  if (tree[currentKey]) {
    tree[currentKey] = merge(createNode(node.typename, path, node.info))(tree[currentKey]);
    return tree;
  }

  // Tree did not exist before
  if (!tree[currentKey]) {
    tree[currentKey] = {
      ...tree[currentKey],
      ...createComplexTree(node.typename, path, node.info),
    };
  }
  return tree;
};

export const createNode = (typename: string, bytes: string[], info?: Info): NewNode => {
  return { typename, bytes, info: info ? info : {} };
};

export const createComplexTree = (typename: string, bytes: string[], info?: Info): Node => {
  const obj = {};
  const currentKey = head(bytes); // 0
  const path = tail(bytes); // [1,2]
  if (bytes.length === 0) {
    return {
      matches: [toLeaf({typename: typename, info: info ? {extension: info.extension, mime: info.mime} : {}})],
    };
  }
  obj[currentKey] = createComplexTree(typename, path, info);
  return (obj: Node);
};
