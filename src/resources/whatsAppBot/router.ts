import express from 'express';
import controller from './controller';
const router = express.Router();
// routes
router.route('/webhook').get(controller.configureHook).post(controller.botHook);
export default router;
