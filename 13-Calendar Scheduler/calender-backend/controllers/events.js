const { response } = require('express'); // recuperar el intellisense
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  // Retornar todos los eventos
  const events = await Event.find().populate('user', 'name');
  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventDb = await event.save();

    res.json({
      ok: true,
      event: eventDb,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Please be in contact with the administrator',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist with that id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to edit this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      event: updateEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Please be in contact with the administrator',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist with that id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to delete this event',
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Please be in contact with the administrator',
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
