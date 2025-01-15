import { getAllEvents, getEventById } from '../models/eventsModel.js';
// Function to handle the GET request for fetching all events
export const getEvents = async (req, res) => {
    try {
        const events = await getAllEvents(); // Fetch all events from the model
        res.status(200).send(events);
    }
    catch (error) {
        res.status(500).send({ message: 'Error fetching events' });
    }
};
export const getEvent = async (req, res) => {
    const { event_id } = req.params;
    console.log(req.params);
    // Validate the event_id parameter
    if (isNaN(Number(event_id))) {
        res.status(400).send({ msg: 'Invalid event ID' });
        return;
    }
    try {
        const event = await getEventById(Number(event_id)); // Fetch event by ID from the model
        if (event) {
            res.status(200).send(event);
        }
        else {
            res.status(404).send({ msg: 'Event not found' });
        }
    }
    catch (error) {
        res.status(500).send({ msg: 'Error fetching event' });
    }
};
