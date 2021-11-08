const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const bundel = [];

const inputPath = path.resolve(__dirname, "styles");
const outputPath = path.resolve(__dirname, "project-dist");

  fs.readdir(inputPath, {withFileTypes: true}, (error, files) => {
    if(error) {
        console.log('Error:', error);}
    else {
      files.forEach(file => {
        if (file.isFile() && file.name.split('.')[1] === 'css') {
            bundel.push(fsProm.readFile(path.resolve(inputPath, file.name)));
            Promise.all(bundel).then(value => {
            fsProm.writeFile(path.resolve(outputPath, 'bundle.css'), value.join('\n'));
          });
        }
      });
    }
  });



// После завершения работы скрипта в папке project-dist должен находиться файл bundle.css содержащий стили из всех файлов папки styles.

// При добавлении/удалении/изменении файлов стилей в папке styles и повторном запуске скрипта файл bundle.css перезаписывается и содержит актуальные стили.

// Любые файлы имеющие расширение отличное от css или директории игнорируются.

// Стили находящиеся в файле bundle.css созданном в процессе сборки не должны быть повреждены.

// Итого: 20 баллов.