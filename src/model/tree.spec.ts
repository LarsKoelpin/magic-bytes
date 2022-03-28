import { createComplexNode, createNode, merge } from "./tree";

describe("tree", () => {
  it("Creates complex node", () => {
    const tree: any = createComplexNode("mpe", ["0x00", "0x01"]);
    expect(tree.bytes["0x00"].bytes["0x01"]).toHaveProperty("matches");
    expect(tree.bytes["0x00"].bytes["0x01"]["matches"][0].typename).toBe("mpe");
  });

  it("Merges trees", () => {
    const tree = createComplexNode("pic", ["0x00"]);
    const dba = createNode("dba", ["0x00", "0x01", "0x02", "0x03"]);
    const merged: any = merge(dba, tree);
    expect(merged.bytes["0x00"].matches[0].typename).toBe("pic");
    expect(
      merged.bytes["0x00"].bytes["0x01"].bytes["0x02"].bytes["0x03"].matches[0]
        .typename
    ).toBe("dba");
  });

  it("Merges overlapping", () => {
    const tree = createComplexNode("pic", ["0x00"]);
    const dba = createNode("pif", ["0x00"]);
    const merged = merge(dba, tree);
    expect(merged.bytes["0x00"].matches).toHaveLength(2);
  });

  it("Merges deep overlapping", () => {
    const gifA = createComplexNode(
      "gif",
      ["0x47", "0x49", "0x46", "0x38", "0x37", "0x61"],
      { mime: "image/gif", extension: "gif" }
    );
    const gifB = createNode(
      "gif",
      ["0x47", "0x49", "0x46", "0x38", "0x38", "0x61"],
      { mime: "image/gif", extension: "gif" }
    );
    const gifC = createNode(
      "gif",
      ["0x47", "0x49", "0x46", "0x38", "0x39", "0x61"],
      { mime: "image/gif", extension: "gif" }
    );
    const mergeA: any = merge(gifB, gifA);
    const mergeB: any = merge(gifC, mergeA);
    expect(
      mergeB.bytes["0x47"].bytes["0x49"].bytes["0x46"].bytes["0x38"].bytes[
        "0x37"
      ].bytes["0x61"].matches[0]
    ).toEqual({ typename: "gif", extension: "gif", mime: "image/gif" });
    expect(
      mergeB.bytes["0x47"].bytes["0x49"].bytes["0x46"].bytes["0x38"].bytes[
        "0x39"
      ].bytes["0x61"].matches[0]
    ).toEqual({ typename: "gif", extension: "gif", mime: "image/gif" });
    expect(
      mergeB.bytes["0x47"].bytes["0x49"].bytes["0x46"].bytes["0x38"].bytes[
        "0x38"
      ].bytes["0x61"].matches[0]
    ).toEqual({ typename: "gif", extension: "gif", mime: "image/gif" });
  });
});
