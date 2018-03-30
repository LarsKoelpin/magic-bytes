declare module "magic-bytes.js" {
    type Leaf = {
      typename: string,
    };
    
    type Node = {
        matches: Leaf[]|[];
    };

    type Bytes = string | Uint8Array | Buffer | Blob | undefined | number[] | any;

    export function filetypeinfo(bytes: Bytes): Node;
    export function filetypename(bytes: Bytes): string[];
}