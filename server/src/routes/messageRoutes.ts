import express from 'express';
import { createMessage, getMessages, markAsRead } from '../controllers/messageController';

const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.patch('/:messageId/read', markAsRead);

export default router; 