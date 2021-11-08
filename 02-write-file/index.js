const fs = require('fs');
const path = require('path');
const process = require('process');
const readLine = require('readline');


const pathFile = path.resolve(__dirname,'text.txt');

const consoleStream = readLine.createInterface(process.stdin, process.stdout);
const writeStream = fs.createWriteStream(pathFile, 'utf-8');

console.log('Привет! Начнём тест! Введи, пожалуйста, текст: \n')

function exit() {
    console.log('Ввод текста закончен. До свидания! \n');
    consoleStream.close()
};

consoleStream
.on('line', (data) => {
    if (data === 'exit'|| data === 'Exit'){
    exit()}
    else{
        console.log('Продолжим ввод?(для выхода набери exit или нажми ctrl+c): \n')
        writeStream.write(`${data} \n`)}})

.on('SIGINT', () => { exit() })
.on('error', error => console.log('Error', error.message));






// Внутри папки 02-write-file находится 1 файл index.js

//  При выполнении команды node 02-write-file в папке 02-write-file создаётся текстовый файл, а в консоль выводится приглашение на ввод текста(На ваш выбор)

//  После ввода текста в каталоге 02-write-file введённый текст должен быть записан в созданный ранее файл. Процесс не завершается и ждёт нового ввода.

//  После следующего ввода созданный изначально текстовый файл дополняется новым текстом, процесс продолжает ждать ввод.

//  При нажатии сочетания клавиш ctrl + c или вводе exit в консоль выводится прощальная фраза и процесс завершается.

//  Итого: 20 баллов.