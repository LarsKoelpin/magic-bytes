const fs = require('fs');

const patterns = new Map();



fs.open('./testfiles/somegif.gif', 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    // TODO
    var buffer = new Buffer(100);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer);
        console.log(buffer[0])
        console.log(buffer[1])
        console.log(buffer[2])
        console.log(isGif(buffer))
    });
});