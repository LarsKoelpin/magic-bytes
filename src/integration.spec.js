import snapshot from './tree.snapshot'
import tree from './binary'

describe("Integrate all types", () => {
    it("Creates a whole tree", () => {
        expect(tree()).toEqual(snapshot);
    })
})
