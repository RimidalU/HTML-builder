const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');

const inputPath = path.resolve(__dirname, "files");
const outputPath = path.resolve(__dirname, "files-copy");

async function copyDirectory() {
    await fsProm.rm(outputPath, { recursive: true, force: true });
    await fsProm.mkdir(outputPath, { recursive: true });
    await fs.readdir(inputPath, (error, files) => {
        if(error) {
            console.log('Error:', error);
        }else{
        files.forEach(file => {
            fs.copyFile(path.resolve(inputPath, file), path.resolve(outputPath, file), (error) => {
                if (error) console.log('Error:', error); })
        })
    }})
}
    copyDirectory();



    // После завершения работы функции создаётся папка files-copy содержимое которой является точной копией исходной папки files.

    // При добавлении/удалении/изменении файлов в папке files и повторном запуске node 04-copy-directory содержимое папки files-copy актуализируется.
    
    // Запрещается использование fsPromises.cp()

    // Итого: 20 баллов.