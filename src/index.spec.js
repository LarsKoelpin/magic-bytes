import {filetypeinfo, filetypename, filetypemime, filetypeextension} from './index';

describe("Tests the public API", () => {
  it("filetypeinfo", () => {
      const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      expect(filetypeinfo(bytes)).toHaveLength(1)
      expect(filetypeinfo(bytes)[0]).toHaveProperty("typename")
  })

  it("filetypename", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      expect(filetypename(bytes)).toHaveLength(1)
      expect(filetypename(bytes)).toEqual(["png"])
  })


  it("filetypename failure", () => {
    const bytes = [0x89, 0x00, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      expect(filetypename(bytes)).toHaveLength(0)
      expect(filetypename(bytes)).toEqual([])
  })

  it('filetypemime', () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypemime(bytes)).toHaveLength(1)
    expect(filetypemime(bytes)).toEqual(["image/png"])
  })

  it('filetypemime not found', () => {
    const bytes = [0x89, 0x50, 0x00, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
    expect(filetypemime(bytes)).toHaveLength(0)
    expect(filetypemime(bytes)).toEqual([])
  })

  it('filetypeextension', () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypeextension(bytes)).toHaveLength(1)
    expect(filetypeextension(bytes)).toEqual(["png"])
  })

  it("filetypextension not found", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
    expect(filetypeextension(bytes)).toHaveLength(0)
    expect(filetypeextension(bytes)).toEqual([])
  })
})