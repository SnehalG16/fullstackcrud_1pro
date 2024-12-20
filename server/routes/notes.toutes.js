const express = require("express"); // Calculating...
const { notesCreate } = require("../controllers/notes.controllers");
const { auth } = require("../middleware/Auth");
const { GetSingleNotesByUser, GetAllNotesByUser } = require("../controllers/notes.controller");

const notesRouter = express.Router();

notesRouter.post("/create",auth, notesCreate);

notesRouter.delete("/delete:noteId",auth, notesDelete);

notesRouter.get("/GetAllNotesByUser:userId",auth, GetAllNotesByUser);
notesRouter.get("/getsingalnotes/:notesId", auth, GetSingleNotesByUser);

notesRouter.patch(
    "/update/:notesId",
    auth,
    upload.single("file"),
    notesUpdate
  );
  
  // admin Routes
  notesRouter.get("/getallnotes", auth, isAdmin, GetAllNotesByAdmin);
  notesRouter.delete("/deleteallnotes",auth, isAdmin, DeleteAllNotesByAdmin);
module.exports = notesRouter;
