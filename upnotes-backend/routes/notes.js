const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const { findByIdAndUpdate } = require("../models/Note");
const Note = require("../models/Note");

const router = express.Router();

// endpoint to fetch all notes GET request  and Login required.

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//  Route : 2 . add a note using POST request on path api/notes/addnote : LOGIN required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title can not be empty").isLength({ min: 3 }),
    body("description", "Description an not be emopty").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      const { title, description, tag } = req.body;

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//  Route : 3 . update a note using PUT request on path api/notes/update/id : LOGIN required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};

  try {
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowes");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//  Route : 4 . delete a note using DELETE request on path api/notes/delete/id : LOGIN required

router.delete("/delete/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a newNote object

  // Find the note to be updated and update it
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
