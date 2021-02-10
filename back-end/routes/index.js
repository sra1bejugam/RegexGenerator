// const fs = require('fs');

// // const Router = {
// function build(app) {
//     const routes = fs
//         .readdirSync(__dirname)
//         .filter(file => file !== 'index.js')
//         .filter(file => file.match(/^(?!.*\.test\.js$).*\.js$/))
//         .map(file => file.split('.')[0])
//     routes.forEach(route => {
//         app.use(`/${route}`, this.importSubRouter(`./${route}.js`))
//     })
// };

// function importSubRouter(filePath) {
//     return require(filePath);
// }
// // }

// // export default Router;
