import {Tree, merge, createNode, createSimpleNode, createComplexTree} from './tree';


describe("tree", () => {

    it("Creates simple node", () => {
        expect(Tree("mpe", "0x11")).toHaveProperty("0x11");
        expect(Tree("mpe", "0x11")["key"]).toBe("mpe");
    })

    it("Creates complex node", () => {
        const tree = createComplexTree("mpe", ["0x00", "0x01"]);
        expect(tree["0x00"]["0x01"]).toHaveProperty("key");
        expect(tree["0x00"]["0x01"]["key"]).toContain("mpe");
    })

    it("Merges trees", () => {
        const tree = createComplexTree("pic", ["0x00"]);
        const dba = createNode("dba", ["0x00", "0x01", "0x02", "0x03"])
        const merged = merge(dba)(tree)
        expect(merged["0x00"].key).toContain("pic");
        expect(merged["0x00"]["0x01"]["0x02"]["0x03"].key).toContain("dba");
    })
})