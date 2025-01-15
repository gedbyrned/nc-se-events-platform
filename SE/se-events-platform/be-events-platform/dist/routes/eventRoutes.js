import express from 'express';
import { getEvents } from '../controllers/eventsController';
const router = express.Router();
// Event Routes
router.get('api/events', getEvents); // List all events
router.get('api//events', getEvents); // List all events
export default router;
