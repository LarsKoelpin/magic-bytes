# Magic bytes

[![Build Status](https://travis-ci.org/LarsKoelpin/magic-bytes.svg?branch=master)](https://travis-ci.org/LarsKoelpin/magic-bytes)


Magic Bytes is a javascript library analyszing the first bytes of a file, to tell you its type. The analyzing
is based on the files byte signature from https://en.wikipedia.org/wiki/List_of_file_signatures.

# Installation

# Usage

On server:
```
import filetype from 'magic-byte.js'

filetype(fs.readFileSync("myimage.png")) // ["png"]
```

Using HTML:
```
<input type="file" id="file" />

<script src="./bundle.js" type="application/javascript"></script>
<script>
    document.getElementById("file").addEventListener('change', (event, x) => {
      const fileReader = new FileReader();
      fileReader.onloadend = (f) => {
        const bytes = new Uint8Array(f.target.result);
        console.log("Possible filetypes: " + filetype(bytes))
      }
      fileReader.readAsArrayBuffer(event.target.files[0])
    })
</script>
```

# Tests
Run  `npm test`

# Example
See examples/
