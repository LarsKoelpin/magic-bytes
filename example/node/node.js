import {filetype} from '../../index';
const fs = require('fs');


fs.open('./example/node/test', 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    var buffer = new Buffer(100);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer)
        console.log(filetype(buffer))
    });
});