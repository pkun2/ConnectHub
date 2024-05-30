import express from 'express';
import { updateUserSettings, getUserSettings } from '../controller/userSettingsController.js';

const router = express.Router();

router.put('/:userId', updateUserSettings);
router.get('/read/:userId', getUserSettings);

export default router;
