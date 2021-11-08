const { error } = require('console');
const fs = require('fs');
const path = require('path');

const pathFile = path.resolve(__dirname,'text.txt');

const readStream = fs.createReadStream(pathFile, 'utf-8');

readStream
.on('data', (chunk) => console.log(chunk))
.on('error', error => console.log('Error', error.message));


// Внутри папки 01-read-file находятся 2 файла index.js и text.txt

// При выполнении команды node 01-read-file в корневом каталоге репозитория в консоль выводится содержимое файла text.txt.

// В коде не должны быть использованы синхронные методы чтения файла.

// Чтение файла должно происходить с помощью ReadStream.

// Итого: 20 баллов.