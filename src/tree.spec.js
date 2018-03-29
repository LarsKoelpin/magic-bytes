import {
  merge,
  createNode,
  createSimpleNode,
  createComplexTree,
} from './tree';

describe('tree', () => {
  it('Creates complex node', () => {
    const tree = createComplexTree('mpe', ['0x00', '0x01']);
    expect(tree['0x00']['0x01']).toHaveProperty('matches');
    expect(tree['0x00']['0x01']['matches'][0].typename).toBe('mpe');
  });

  it('Merges trees', () => {
    const tree = createComplexTree('pic', ['0x00']);
    const dba = createNode('dba', ['0x00', '0x01', '0x02', '0x03']);
    const merged = merge(dba)(tree);
    expect(merged['0x00'].matches[0].typename).toBe('pic');
    expect(merged['0x00']['0x01']['0x02']['0x03'].matches[0].typename).toBe(
      'dba'
    );
  });

  it('Merges overlapping', () => {
    const tree = createComplexTree('pic', ['0x00']);
    const dba = createNode('pif', ['0x00']);
    const merged = merge(dba)(tree);
    expect(merged['0x00'].matches).toHaveLength(2);
  });

  it('Merges deep overlapping', () => {
    const gifA = createComplexTree('gif', [
      '0x47',
      '0x49',
      '0x46',
      '0x38',
      '0x37',
      '0x61',
    ]);
    const gifB = createNode('gif', [
      '0x47',
      '0x49',
      '0x46',
      '0x38',
      '0x38',
      '0x61',
    ]);
    const gifC = createNode('gif', [
      '0x47',
      '0x49',
      '0x46',
      '0x38',
      '0x39',
      '0x61',
    ]);
    const mergeA = merge(gifB)(gifA);
    const mergeB = merge(gifC)(mergeA);
    console.log(JSON.stringify(mergeB));
    expect(
      mergeB['0x47']['0x49']['0x46']['0x38']['0x37']['0x61'].matches[0]
    ).toEqual({ typename: 'gif' });
    expect(
      mergeB['0x47']['0x49']['0x46']['0x38']['0x39']['0x61'].matches[0]
    ).toEqual({ typename: 'gif' });
    expect(
      mergeB['0x47']['0x49']['0x46']['0x38']['0x38']['0x61'].matches[0]
    ).toEqual({ typename: 'gif' });
  });
});
