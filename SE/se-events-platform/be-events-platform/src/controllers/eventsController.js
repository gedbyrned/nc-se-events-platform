const { getAllEvents, getEventById } = require('../models/eventsModel.js');

const getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).send(events); 
  } catch (error) {
    res.status(500).send({ message: 'Error fetching events' });
  }
};

const getEvent = async (req, res) => {
  const { event_id } = req.params;

  if (isNaN(Number(event_id))) {
    res.status(400).send({ msg: 'Invalid event ID' });
    return;
  }

  try {
    const event = await getEventById(Number(event_id));
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send({ msg: 'Event not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching event' });
  }
};

module.exports = { getEvents, getEvent };
