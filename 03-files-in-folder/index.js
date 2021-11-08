const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');

const pathFolder = path.resolve(__dirname,'secret-folder');

fs.readdir(pathFolder, (error, files) => {
    if(error) {
        console.log('Error', error.message)}
    else {
      files.forEach(file => {
        fsProm.lstat(path.resolve(pathFolder, file))
          .then(stats => {
            if (stats.isFile()) {
              console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stats.size / 1024}kb`);
            }
          });
      });
    }
  });




//  При выполнении команды node 03-files-in-folder в корневом каталоге репозитория в консоль выводится информация о файлах содержащихся внутри 03-files-in-folder/secret-folder. Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>. Пример: example - txt - 128.369kb (округлять не нужно, конвертация в кб по желанию!)
 
//  Информация должна выводиться только для файлов. Наличие информации о директориях считается ошибкой.

//  Итого: 20 баллов.