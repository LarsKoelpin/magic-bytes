import snapshot from './pattern-tree.snapshot'
import tree from './pattern-tree'

describe("Integrate all types", () => {
    it("Creates a whole tree", () => {
        expect(tree()).toEqual(snapshot);
    })
})
