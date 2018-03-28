import tree from './pattern-tree'

require('fs').createWriteStream(__dirname + "/pattern-tree.snapshot.js").write("export default " + JSON.stringify(tree()));