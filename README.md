# Magic bytes

Detects type of file using https://en.wikipedia.org/wiki/List_of_file_signatures file signatures.
[![Build Status](https://travis-ci.org/LarsKoelpin/magic-bytes.svg?branch=master)](https://travis-ci.org/LarsKoelpin/magic-bytes)

Example
```javascript
fs.open('./gif.gif', 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    // TODO
    var buffer = new Buffer(100);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer)
        console.log(guessFile(buffer))
    });
});
```

Which emits in dev mode:
```bash
<Buffer 47 49 46 38 39 61 d9 00 d9 00 f7 00 00 ff 15 15 ff 21 15 fe 29 15 fe 2f 15 fd 34 15 fd 38 15 fc 3c 15 fc 40 15 fb 43 14 fb 47 14 fa 4a 14 fa 4c 14 f9 ... >
Current byte from file: 0x47
Tree Left: {"0x49":{"0x46":{"0x38":{"0x39":{"0x61":{"key":["gif"]}}}}},"key":["mpeg"]}
Current byte from file: 0x49
Tree Left: {"0x46":{"0x38":{"0x39":{"0x61":{"key":["gif"]}}}}}
Current byte from file: 0x46
Tree Left: {"0x38":{"0x39":{"0x61":{"key":["gif"]}}}}
Current byte from file: 0x38
Tree Left: {"0x39":{"0x61":{"key":["gif"]}}}
Current byte from file: 0x39
Tree Left: {"0x61":{"key":["gif"]}}
Current byte from file: 0x61
[ 'gif' ]
```
