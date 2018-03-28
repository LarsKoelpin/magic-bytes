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

    it("Merges overlapping", () => {
        const tree = createComplexTree("pic", ["0x00"]);
        const dba = createNode("pif", ["0x00"])
        const merged = merge(dba)(tree)
        expect(merged["0x00"].key).toHaveLength(2);
    })

    it("Merges deep overlapping", () => {
        const gifA =  createComplexTree("gif", ["0x47", "0x49", "0x46", "0x38", "0x37", "0x61"]);
        const gifB =  createNode("gif", ["0x47", "0x49", "0x46", "0x38", "0x38", "0x61"]);
        const gifC =  createNode("gif", ["0x47", "0x49", "0x46", "0x38", "0x39", "0x61"]);
        const mergeA = merge(gifB)(gifA)
        const mergeB = merge(gifC)(mergeA)
        console.log(JSON.stringify(mergeB))
        expect(mergeB["0x47"]["0x49"]["0x46"]["0x38"]["0x37"]["0x61"].key).toBe("gif")
    })
})