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

export const merge = (node: NewNode) => (tree: Node) => {
    if (node.bytes.length === 0) return tree;
    const currentKey = R.head(node.bytes); // 0
    const path = R.takeLast(node.bytes.length - 1)(node.bytes); // [1,2]
    const currentTreeProp = tree[currentKey];
    if (!currentTreeProp) {
        // merge
        tree[currentKey] = merge(node)(tree);
    } else {
        // create
        tree[currentKey] = {key: tree[currentKey].key, ...createComplexTree(node.key, path)};
    }
    return tree;
}

export const Tree = (key: string, byte: string) => {
    const obj = {key};
    obj[byte] = {};
    return obj;
}

export const createNode = (key: string, bytes: string[]) => {
    return {key, bytes}
}

export const createComplexTree = (key: string, bytes: string[]) => {
    if(bytes.length === 0) return {
        key: [key]
    };
    const obj = {};
    const currentKey = R.head(bytes); // 0
    const path = R.takeLast(bytes.length - 1)(bytes); // [1,2]
    obj[currentKey] = createComplexTree(key, path);
    return obj;
}