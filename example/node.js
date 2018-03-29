import {filetype} from '../index';
const fs = require('fs');


fs.open('./example/d.docx', 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    // TODO
    var buffer = new Buffer(100);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer)
        console.log(filetype(buffer))
    });
});