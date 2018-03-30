declare module "magic-bytes.js" {
    export function filetypeinfo(bytes: number[]): any;
    export function filetypename(bytes: number[]): string[];
}