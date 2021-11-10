const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const bundel = [];
const bundelHTML = [];

const inputPath = path.resolve(__dirname, 'assets');
const outputPath = path.resolve(__dirname, 'project-dist' , 'assets');

const inputPathCSS = path.resolve(__dirname, 'styles');
const outputPathCSS = path.resolve(__dirname, 'project-dist');

const inputPathHTML = path.resolve(__dirname, 'components');
// const outputPathHTML = path.resolve(__dirname, 'project-dist');
let inputHTML = path.resolve(__dirname, 'template.html');
let outputHTML = path.resolve(__dirname, 'project-dist', 'index.html');


// копируем assets

fs.readdir(inputPath, (error, folders) => {
    if(error) {
        console.log('Error', error.message)}
    else {
        folders.forEach(folder => {            
            copyDirectory(folder)
      })}})

async function copyDirectory(folder) {
    await fsProm.rm(path.resolve(outputPath, folder), { recursive: true, force: true });
    await fsProm.mkdir(path.resolve(outputPath, folder), { recursive: true });
    await fs.readdir(path.resolve(inputPath, folder), (error, files) => {
        if(error) {
            console.log('Error:', error);
        }else{
        files.forEach(file => {
            fs.copyFile(path.resolve(inputPath, folder, file), path.resolve(outputPath, folder, file), (error) => {
                if (error) console.log('Error:', error); })
        })
    }})
}

// fs.copyFile(path.resolve(__dirname, 'template.html'), path.resolve(outputPathHTML, 'index.html'), (error) => {
//   if (error) console.log('Error:', error); })

// fs.copyFile(path.resolve(__dirname, 'template.html'), path.resolve(outputPathHTML, 'index.html'), (error) => {
//     if (error) console.log('Error:', error); });

// let outputHTML = path.resolve(__dirname, 'project-dist', 'index.html');
// let dataHTML = fsProm.readFile(outputHTML, 'utf-8');
    
// создаем CSS

  fs.readdir(inputPathCSS, {withFileTypes: true}, (error, files) => {
    if(error) {
        console.log('Error:', error);}
    else {
      files.forEach(file => {
        if (file.isFile() && file.name.split('.')[1] === 'css') {
            bundel.push(fsProm.readFile(path.resolve(inputPathCSS, file.name)));
            Promise.all(bundel).then(value => {
            fsProm.writeFile(path.resolve(outputPathCSS, 'style.css'), value.join('\n'));
          });
        }
      });
    }
  });

// создаем HTML

async function createHtml() {
  
  let dataHTML = await fsProm.readFile(inputHTML, {encoding: 'utf-8'}); 
  const nodesHTML = await fsProm.readdir(inputPathHTML, { withFileTypes: true });

  for (const node of nodesHTML) {

    const nodePath = path.join(inputPathHTML, node.name);

    if (node.isFile() && path.extname(nodePath) === '.html') {
      const nodeContent = await fsProm.readFile(nodePath, {encoding: 'utf-8'});
      const nodeName = node.name.replace('.html', '')

      dataHTML = dataHTML.replace(`{{${nodeName}}}`, nodeContent);
    };
  };

  await fsProm.writeFile(outputHTML, dataHTML);
}

createHtml()


// async function createHtml() {
   
//  await fs.readdir(inputPathHTML, {withFileTypes: true}, (error, files) => {
//     if(error) {
//         console.log('Error:', error);}
//     else {
//       files.forEach(file => {
//         if (file.isFile() && file.name.split('.')[1] === 'html') {
//             bundelHTML.push(fsProm.readFile(path.resolve(inputPathHTML, file.name)));
//             Promise.all(bundelHTML).then (value => {
               // console.log( dataHTML)
//               // console.log(value)

//             //  dataHTML = dataHTML.replace(`{{${file.name.split('.')[0]}}}`, value);
              
//             //  fsProm.writeFile(outputHTML);
//             fsProm.writeFile((path.resolve(outputPathHTML, 'index.html')), value);
//           });
//         }
//       });
//     }
//   });

// }

// createHtml()

// function add (file, value){
//   dataHTML = dataHTML.replace(`{{${file.name.split('.')[0]}}}`, value);
// }

// async function createHtml() {


// fs.readdir(inputPathHTML, {withFileTypes: true}, (error, files) => {
//     if(error) {
//         console.log('Error:', error);}
//     else {
//       files.forEach(file => {
//         if (file.isFile() && file.name.split('.')[1] === 'html') {
//             bundelHTML.push(fsProm.readFile(path.resolve(inputPathHTML, file.name)));
//             Promise.all(bundelHTML).then(value => {
              
//               console.log( dataHTML)
//               add(value)

//             // dataHTML = dataHTML.replace(`{{${file.name.split('.')[0]}}}`, value);
              
              
//               console.log(value)
//               // fsProm.writeFile(outputHTML);
//             // fsProm.writeFile((path.resolve(outputPathHTML, 'index.html')), value);
//           });
//         }
//       });
//     }
//   });
// }
//   createHtml()


// После завершения работы скрипта должна быть создана папка project-dist

//  В папке project-dist должны находиться файлы index.html и stye.css

//  В папке project-dist должна находиться папка assets являющаяся точной копией папки assets находящейся в 06-build-page
 
//  Запрещается использование fsPromises.cp()
 
//  Файл index.html должен содержать разметку являющуюся результатом замены шаблонных тегов в файле template.html
 
//  Файл style.css должен содержать стили собранные из файлов папки styles
 
//  При добавлении компонента в папку и соответствующего тега в исходный файл template.html повторное выполнение скрипта приведёт файл index.html в папке project-dist в актуальное состояние перезаписав его. Файл style.css и папка assets так же должны поддерживать актуальное состояние
 
//  Исходный файл template.html не должен быть изменён в ходе выполнения скрипта
 
//  Запись в шаблон содержимого любых файлов кроме файлов с расширением .html является ошибкой

//  Итого: 40 баллов из 50. - К сожалению, не успел сделать полноценную вставку блоков в HTML. Если дадите неного времени, то доделаю