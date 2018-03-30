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
    export function filetypeextension(bytes: Bytes): string[];
    export function filetypemime(bytes: Bytes): string[];
}