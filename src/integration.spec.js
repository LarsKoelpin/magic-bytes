import {createComplexTree, createNode, merge} from './tree'
describe("", () => {
    it("", () => {
        let tree = null
        const add = (key, signature, offset) => {
            if(tree === null) {
                tree = createComplexTree(key, signature);
            } else {
                tree = merge(createNode(key, signature))(tree);
            }
        }
        add("rpm", ["0xed", "0xab", "0xee", "0xdb"]);
        add("bin", ["0x53", "0x50", "0x30", "0x31"]);
        add("pic", ["0x00"]);
        add("pif", ["0x00"]);
        add("sea", ["0x00"]);
        add("ytr", ["0x00"]);
        add("pdb",  [
            "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00",
            "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00",
            "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00"
        ]);
        
        console.log(JSON.stringify(tree));
    })
})
