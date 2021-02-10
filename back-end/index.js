
const PatternGenerator = require('./lib/pattern-generator');
module.exports = new PatternGenerator();


// const express = require('express');
// const app = express();
// const Parser = require('body-parser');
// const port = 8000;
// const cors = require('cors')
// const {
//     createProxyMiddleware
// } = require('http-proxy-middleware');

// const fs = require('fs');
// app.use(
//     Parser.json({
//         limit: '50mb'
//     })
// );
// app.use(cors());

// app.use('/api', createProxyMiddleware({
//     target: 'http://localhost:8000/fetchRegex', //original url
//     changeOrigin: true,
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//         proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));

// app.post('/fetchRegex', async (req, res) => {
//     try {
//         const productIds = regexEquation(req.body.data);
//         res.statusCode = 200;
//         return res.json({
//             success: 1,
//             productIds
//         });
//     } catch (error) {
//         console.log('error in routes fetchRegex', error);
//     }
// });

// app.post('/testRegex', async (req, res) => {
//     try {
//         console.log('came hit from frntend2-----------', req.body.data);
//         const testRes = testRegexEquation(req.body.data);
//         console.log("🚀 ~ file: testRegexEquation.js ~ line 10 ~ router.post ~ testRes", testRes);
//         res.statusCode = 200;
//         return res.json({
//             success: 1,
//             testRes
//         });
//     } catch (error) {
//         console.log('error in routes testRegexEquation', error);
//     }
// });

// app.get('/', (req, res) => {
//     res.send('came to home route');
// });


// Add The Routes
// build(app);

// app.listen(port, () => {
//     console.log('App is Listening on ', `${port}`);
// });

// export default app;
