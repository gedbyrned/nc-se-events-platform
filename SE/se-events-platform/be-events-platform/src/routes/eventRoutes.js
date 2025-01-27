const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  getEvent, 
  postEvent,
  patchEvent,
  deleteEvent,
  addEventToGoogleCalendar
} = require('../controllers/eventController');
const { authenticateJWT } = require('../controllers/authController'); 


const checkStaff = (req, res, next) => {
  if (req.user && req.user.user_type === 'staff') {
    return next(); 
  }
  return res.status(403).send({ msg: 'You must be a staff member to perform this action' }); 
};

router.get('/events', getEvents); 
router.get('/events/:event_id', getEvent);

router.post('/events', authenticateJWT, checkStaff, postEvent);
router.patch('/events/:event_id', authenticateJWT, checkStaff, patchEvent);
router.delete('/events/:event_id', authenticateJWT, checkStaff, deleteEvent);


module.exports = router;
