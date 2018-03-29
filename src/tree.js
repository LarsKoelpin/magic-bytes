// @flow
import R from 'ramda';

type NewNode = {
    key: string;
    bytes: string[];
}

type Node = {
    key: string[];
    [key: number]: Node;
}

const isLeaf = (tree, path) => tree && tree.key && path.length === 0;
export const merge = (node: NewNode) => (tree: Node) => {
    if (node.bytes.length === 0) return tree;
    const currentKey = R.head(node.bytes); // 0
    const path = R.takeLast(node.bytes.length - 1)(node.bytes); // [1,2]

    const currentTree = tree[currentKey];
    // traversed to end. Just add key to leaf.
    if(isLeaf(currentTree, path)) {
        tree[currentKey] = {...tree[currentKey], key: [...tree[currentKey].key, node.key]};
        return tree;
    } 

    // Path exists already, Merge subtree
    if(tree[currentKey]) {
        tree[currentKey] = merge(createNode(node.key, path))(tree[currentKey]);
        return tree;
    }

    // Tree did not exist before
    if (!tree[currentKey]) {
        tree[currentKey] = { ...tree[currentKey], ...createComplexTree(node.key, path)};  
    }
    return tree;
}

export const Tree = (key: string, byte: string) => {
    const obj = {key: key.toLowerCase()};
    obj[byte] = {};
    return obj;
}

export const createNode = (key: string, bytes: string[]) => {
    return {key, bytes}
}

export const createComplexTree = (key: string, bytes: string[]) => {
    const obj = {};
    const currentKey = R.head(bytes); // 0
    const path = R.takeLast(bytes.length - 1)(bytes); // [1,2]
    if (bytes.length === 0) {
        return {
            key: [key.toLowerCase()]
          };
    }

    if (bytes.length === 0) return {
        key: [key]
    };
    obj[currentKey] = createComplexTree(key, path);
    return obj;
}