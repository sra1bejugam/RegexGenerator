// import {
// 	Router
// } from 'express';
// const router = new Router();

// router.post('/fetchRegex', async (req, res) => {
// 	try {
// 		let regexExpresion;
// 		if (req.body.testRegex) {
// 			regexExpresion = new PatternGenerator().regexEquation(req.body.inputData, req.body.isCase, req.body.isGlobal, req.body.isWords, req.body.testRegex)
// 		} else {
// 			regexExpresion = new PatternGenerator().regexEquation(req.body.inputData, req.body.isCase, req.body.isGlobal, req.body.isWords, req.body.testRegex)
// 		}
// 		res.statusCode = 200;
// 		return res.json({
// 			success: 1,
// 			regexExpresion
// 		});
// 	} catch (error) {
// 		return res.boom.badRequest('Error getting data in fetchRegex', error);
// 	}
// });

// export default router;
