export type PathlessNewNode = {
  info: Info;
  typename: string;
};

export type NewNode = PathlessNewNode & {
  bytes: string[];
};

export type Leaf = Info & {
  typename: string;
};

export type Info = {
  mime?: string;
  extension?: string;
};

export type Node = {
  matches?: Leaf[];
  bytes: {
    [nextbyte: string]: Node;
  };
};

const toLeaf = (leaf: PathlessNewNode): Leaf => ({
  typename: leaf.typename,
  mime: leaf.info.mime,
  extension: leaf.info.extension
});

const isLeaf = (tree: Node, path: string[]) =>
  tree && tree.matches && path.length === 0;

const head = (arr: any[]) => arr[0];
const tail = (arr: any[]) => arr.slice(1, arr.length);

export const merge = (node: NewNode, tree: Node): Node => {
  if (node.bytes.length === 0) return tree;
  const currentByte = head(node.bytes); // 0
  const path = tail(node.bytes); // [1,2]

  const currentTree: Node = tree.bytes[currentByte];
  // traversed to end. Just add key to leaf.
  if (isLeaf(currentTree, path)) {
    tree.bytes[currentByte] = {
      ...tree.bytes[currentByte],
      matches: [
        ...(currentTree.matches ? currentTree.matches : []),
        toLeaf(node)
      ]
    };
    return tree;
  }

  // Path exists already, Merge subtree
  if (tree.bytes[currentByte]) {
    tree.bytes[currentByte] = merge(
      createNode(node.typename, path, node.info),
      tree.bytes[currentByte]
    );
    return tree;
  }

  // Tree did not exist before
  if (!tree.bytes[currentByte]) {
    tree.bytes[currentByte] = {
      ...tree.bytes[currentByte],
      ...createComplexTree(node.typename, path, node.info)
    };
  }
  return tree;
};

export const createNode = (
  typename: string,
  bytes: string[],
  info?: Info
): NewNode => {
  return { typename, bytes, info: info ? info : {} };
};

export const createComplexTree = (
  typename: string,
  bytes: string[],
  info?: Info
): Node => {
  let obj: Node = {
    bytes: {},
    matches: undefined
  };
  const currentKey = head(bytes); // 0
  const path = tail(bytes); // [1,2]
  if (bytes.length === 0) {
    return {
      matches: [
        toLeaf({
          typename: typename,
          info: info ? { extension: info.extension, mime: info.mime } : {}
        })
      ],
      bytes: {}
    };
  }
  obj.bytes[currentKey] = createComplexTree(typename, path, info);
  return obj;
};
