import { Router } from 'express';
const router = new Router();

router.post('/fetchRegex', async (req, res) => {
	// const payload = req.body;
	try {
		const productIds = new PatternGenerator().getProductByIds(req.body)
        console.log("🚀 ~ file: fetchRegex.js ~ line 10 ~ router.post ~ productIds", productIds);
		res.statusCode = 200;
		return res.json({
			success: 1,
			productIds
		});
	} catch (error) {
		return res.boom.badRequest('Error getting data in fetchRegex', error);
	}
});

export default router;
