const express = require("express");
const router = express.Router();
const db = require("../modules/db");
const middleware = require("../modules/middleware");

router.get("/api/public/notes/get", async (req, res) => {
  try {
    var notes = await db.getNotes({visibility: "public"});
    res.json(notes);
  } catch (error) {
    res.json({message: "Error"});
  }
});

router.get("/api/secured/notes/get", middleware.isLogged, async (req, res) => {
  try {
    console.log("%o", req.user);
    var notes = await db.getNotes({user_id: req.user, visibility: "public"});
    res.json(notes);
  } catch (error) {
    res.json({message: "Error"});
  }
});

router.post("/api/secured/notes/add", middleware.isLogged, async (req, res) => {
  try {
    var note = {
      user_id: req.body.user_id,
      type: req.body.type,
      content: req.body.content,
      visibility: req.body.visibility
    }
    var result = await db.addNote(note);
    res.json(result);
  } catch (error) {
    res.json({message: "Error"});
  }
});

module.exports = router;