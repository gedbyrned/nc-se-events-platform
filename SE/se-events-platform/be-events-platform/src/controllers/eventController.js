const { google } = require("googleapis");
const { getAllEvents, getEventById, addEvent, updateEvent, deleteEventById } = require("../models/eventModel.js");
const { getUserById } = require("../models/userModel.js"); // Assuming you have this model function

const getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ message: "Error fetching events" });
  }
};

const getEvent = async (req, res) => {
  const { event_id } = req.params;

  if (isNaN(Number(event_id))) {
    res.status(400).send({ msg: "Invalid event ID" });
    return;
  }

  try {
    const event = await getEventById(Number(event_id));
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error fetching event" });
  }
};

const postEvent = async (req, res, next) => {
  const { event_name, description, location, start_time, end_time } = req.body;

  if (!event_name || !description || !location || !start_time || !end_time) {
    return res.status(400).send({ msg: "400: Bad Request" });
  }

  const created_by = req.user.id; // Use authenticated user ID from JWT

  if (!created_by) {
    return res.status(400).send({ msg: "400: Missing user ID" });
  }

  try {
    const event = await addEvent(event_name, description, location, start_time, end_time, created_by);
    res.status(201).send({ event });
  } catch (error) {
    next(error);
  }
};



// Update and delete event methods remain unchanged
const patchEvent = async (req, res, next) => {
  const { event_name, description, location, start_time, end_time } = req.body;

  if (!event_name || !description || !location || !start_time || !end_time) {
    return res.status(400).send({ msg: "400: Bad Request, missing fields" });
  }

  const { event_id } = req.params;

  try {
    const updatedEvent = await updateEvent(event_id, event_name, description, location, start_time, end_time);
    res.status(200).send({ event: updatedEvent });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res) => {
  const { event_id } = req.params;

  if (isNaN(Number(event_id))) {
    return res.status(400).send({ msg: "Invalid event ID" });
  }

  try {
    const event = await getEventById(Number(event_id));

    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }

    await deleteEventById(Number(event_id));
    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send({ msg: "Failed to delete event" });
  }
};

module.exports = {
  getEvents,
  getEvent,
  postEvent,
  patchEvent,
  deleteEvent
};
