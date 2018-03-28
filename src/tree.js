// @flow
import R from 'ramda';

type NewNode = {
    key: string[];
    bytes: string[];
}

type Node = {
    key: string[];
    [key: number]: Node;
}

const isOverlapping = (tree, path) => tree && tree.key && path.length === 0;
export const merge = (node: NewNode) => (tree: Node) => {
    if (node.bytes.length === 0) return tree;
    const currentKey = R.head(node.bytes); // 0
    const path = R.takeLast(node.bytes.length - 1)(node.bytes); // [1,2]
    const currentTree = tree[currentKey];
    if(isOverlapping(currentTree, path)) {
        tree[currentKey] = {...tree[currentKey], key: [...tree[currentKey].key, node.key.toLowerCase()]};
    } else {
        tree[currentKey] = {...createComplexTree(node.key, path), ...tree[currentKey]};
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

export const createComplexTree = (key: string, bytes: string[], oldNode: Node) => {
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